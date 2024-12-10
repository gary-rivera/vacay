import { Leetcode } from '@codingsnack/leetcode-api';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();
export const LCQuestionFetcher = async () => {
	// csrfToken after you've logged in
	const csrfToken =
		'03VdaQdxvMOGqNywHKAd2yoYotu582hddZdsQPIUtcaKwlxw9ikP2d1OhfrwNg4X';
	// LEETCODE_SESSION after you've logged in
	const session =
		'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiNzg0NjA2MSIsIl9hdXRoX3VzZXJfYmFja2VuZCI6ImFsbGF1dGguYWNjb3VudC5hdXRoX2JhY2tlbmRzLkF1dGhlbnRpY2F0aW9uQmFja2VuZCIsIl9hdXRoX3VzZXJfaGFzaCI6IjJmZGUxMGM4ODc3YzM5MGNlOTM1Y2JkZTQ3OGE4ZDQ5Y2YwMThmYzQ3MDJmYjQwYzFmYzE0NWZkMzQzNGI5OTQiLCJzZXNzaW9uX3V1aWQiOiJlNTg1MGMyMSIsImlkIjo3ODQ2MDYxLCJlbWFpbCI6ImEuZ2FyeS5yaXZlcmFAZ21haWwuY29tIiwidXNlcm5hbWUiOiJncml2ZXJhX19fIiwidXNlcl9zbHVnIjoiZ3JpdmVyYV9fXyIsImF2YXRhciI6Imh0dHBzOi8vYXNzZXRzLmxlZXRjb2RlLmNvbS91c2Vycy9ncml2ZXJhX19fL2F2YXRhcl8xNzI3MjM1NjkwLnBuZyIsInJlZnJlc2hlZF9hdCI6MTczMzc4MjU3OCwiaXAiOiIyNjAxOjYwMzo0ZTAxOjRkYTA6ZTEwYzoxNjY0OmVhNWI6YmI5MiIsImlkZW50aXR5IjoiMDg0NWIzMDljN2I5Yjk1N2FmZDllY2Y3NzVhNGMyMWYiLCJkZXZpY2Vfd2l0aF9pcCI6WyJmYjgyMGE1ODZlMjIyNGE3YjllOWRhOWYyMzg3ZWUwMiIsIjI2MDE6NjAzOjRlMDE6NGRhMDplMTBjOjE2NjQ6ZWE1YjpiYjkyIl0sIl9zZXNzaW9uX2V4cGlyeSI6MTIwOTYwMH0.H6qGDyYu_Kug2u_FJx2bpuNnC3tLyX4BMhzxPaRqoyM';

	const lc = new Leetcode({ csrfToken, session });

	try {
		const problem = await lc.getRandomQuestion();
		// console.log('problem', problem);
		const { titleSlug, content } = problem;
		const $ = cheerio.load(content);
		const readableContent = $(content).text();
		// console.log('slug', titleSlug);
		// console.log('Problem:', readableContent);
		return { titleSlug, readableContent };
	} catch (error) {
		console.error('Error fetching problem:', error);
	}
};

LCQuestionFetcher();
