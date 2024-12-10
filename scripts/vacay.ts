import { exec } from 'child_process';
import { readdirSync, copyFileSync } from 'fs';
import path from 'path';
import { LCQuestionFetcher } from './lc-question-fetcher';
import { solveViaGPT } from './gpt-question-solver';

const snippetsDir = path.join(__dirname, '..', 'snippets');
const solutionsDir = path.join(__dirname, '..', 'solutions');

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
	let destinationDir;

	// fetch random question from LeetCode
	try {
		const resp = await LCQuestionFetcher();
		question = resp?.readableContent;

		if (resp?.titleSlug)
			destinationDir = path.join(
				snippetsDir,
				`solution-${timestamp}-${resp?.titleSlug}`
			);
	} catch (err) {
		console.error('Error fetching question from API:', err);
	}

	// if failed, handle within local snippets
	if (!question) {
		const files = readdirSync(snippetsDir);
		if (!files.length) {
			console.log('No snippets found');
			process.exit(0);
		}
		const randomFile = files[Math.floor(Math.random() * files.length)];
		destinationDir = path.join(
			solutionsDir,
			`solution-${timestamp}-${randomFile}`
		);
		copyFileSync(path.join(snippetsDir, randomFile), destinationDir);

		// TODO: handle deleting the snippet file once copied
		// TODO: handle generating question from snippet content (a la getProblems(params))
	} else {
		// solve the fetched question
		try {
			console.log('Attempting to solve question:', question, '\n');
			const solution = await solveViaGPT(question);
			console.log('Solution:', solution);
		} catch (err) {
			console.error('Error solving question:', err);
		}
	}

	// Git operations
	try {
		await runCmd('git add .');
		await runCmd(`git commit -m "Add solution ${destinationDir}"`);
		await runCmd('git push');
		console.log('Committed and pushed successfully');
	} catch (err) {
		console.error('Error during commit/push:', err);
	}
}

main().catch(console.error);
