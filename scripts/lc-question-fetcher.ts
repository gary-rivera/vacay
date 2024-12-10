import { Leetcode } from '@codingsnack/leetcode-api';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();
const csrfToken = process.env.LC_CSRF_TOKEN;
const session = process.env.LC_SESSION;

export const LCQuestionFetcher = async () => {
	if (!csrfToken || !session) {
		throw new Error('LC API keys are not set in environment variables.');
	}
	const lc = new Leetcode({ csrfToken, session });

	try {
		const problem = await lc.getRandomQuestion();
		const { titleSlug, content } = problem;

		const $ = cheerio.load(content);
		const readableContent = $(content).text();

		return { titleSlug, readableContent };
	} catch (error) {
		console.error('Error fetching problem:', error);
	}
};

LCQuestionFetcher();
