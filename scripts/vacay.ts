import { exec } from 'child_process';
import { readdirSync, copyFileSync, writeFileSync } from 'fs';
import path from 'path';
import { LCQuestionFetcher } from './lc-question-fetcher';
import { solveViaGPT } from './gpt-question-solver';

// TODO: add fallbacks in case api reqeuest fails
// TODO: auto generate fallback questions
// TODO: auto generate fallback solutions
// const fallbacksDir = path.join(__dirname, '..', 'fallbacks');
let solutionsDir = path.join(__dirname, '..', 'solutions');

function runCmd(cmd: string) {
	return new Promise((resolve, reject) => {
		exec(cmd, (err, stdout, stderr) => {
			if (err) return reject(stderr || err.message);
			resolve(stdout);
		});
	});
}

async function main() {
	const timestamp = Date.now();
	let question;
	let solution;
	let solutionsFileName = 'placeholder.ts';

	// fetch random question from LeetCode
	try {
		const resp = await LCQuestionFetcher();
		question = resp?.readableContent;

		if (resp?.titleSlug)
			solutionsFileName = `${resp?.titleSlug}-${timestamp}.ts`;

		solutionsDir = path.join(solutionsDir, solutionsFileName);
	} catch (err) {
		console.error('Error fetching question from API:', err);
	}

	if (question) {
		// if question is fetched, solve it
		try {
			// console.log({
			// 	question,
			// 	solutionsFileName,
			// 	solutionsDir,
			// });
			// console.log('Attempting to solve question:', question, '\n');
			solution = await solveViaGPT(question);
			// console.log('Solution:', solution);
		} catch (err) {
			console.error('Error solving question:', err);
		}
	}

	// write solution to file
	if (solution) {
		try {
			writeFileSync(
				solutionsDir,
				`${solution}\n\n/*\nquestion: ${question} */\n`
			);
			// await runCmd(`echo "${solution}" >> ${solutionsFileName}`);
			console.log('Solution written to:', solutionsFileName);
		} catch (err) {
			console.error('Error writing solution to file:', err);
		}
	}

	// Git operations
	try {
		await runCmd('git add .');
		await runCmd(`git commit -m "Add solution ${solutionsFileName}"`);
		await runCmd('git push');
		console.log('Committed and pushed successfully');
	} catch (err) {
		console.error('Error during commit/push:', err);
	}
}

main().catch(console.error);
