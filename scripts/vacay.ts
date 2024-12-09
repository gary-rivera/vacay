import { exec } from 'child_process';
import { readdirSync, copyFileSync } from 'fs';
import path from 'path';

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
	const files = readdirSync(snippetsDir);
	if (!files.length) {
		console.log('No snippets found');
		process.exit(0);
	}

	const randomFile = files[Math.floor(Math.random() * files.length)];
	const timestamp = Date.now();
	const dest = path.join(solutionsDir, `solution-${timestamp}-${randomFile}`);
	copyFileSync(path.join(snippetsDir, randomFile), dest);

	// Git operations
	try {
		await runCmd('git add .');
		await runCmd(`git commit -m "Add solution ${randomFile}"`);
		await runCmd('git push');
		console.log('Committed and pushed successfully');
	} catch (err) {
		console.error('Error during commit/push:', err);
	}
}

main().catch(console.error);
