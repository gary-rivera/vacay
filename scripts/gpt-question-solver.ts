import dotenv from 'dotenv';
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
	throw new Error('OPENAI_API_KEY is not set in environment variables.');
}

export const solveViaGPT = async (question: string) => {
	try {
		if (!question) {
			throw new Error(
				'question is not provided. Please provide a question to solve.'
			);
		}

		const messages = [
			{
				role: 'system',
				content:
					'You are a programming assistant. Generate ONLY TypeScript code, nothing else, for a given problem. Do not include any markdown or text fluff.',
			},
			{
				role: 'user',
				content: `
					Write a TypeScript solution for the following problem:

					Description:
					${question}
				`,
			},
		];

		// Query OpenAI API
		const response = await fetch('https://api.openai.com/v1/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${OPENAI_API_KEY}`,
			},
			body: JSON.stringify({
				model: 'gpt-4',
				messages,
				max_tokens: 1500,
				temperature: 0.2,
			}),
		});

		if (!response.ok) {
			throw new Error(
				`OpenAI API error: ${response.status} ${response.statusText}`
			);
		}

		// fuck you, sue me.
		const data: any = await response.json();
		const solution = data.choices[0]?.message?.content?.trim();

		if (!solution) {
			throw new Error('Failed to generate solution from OpenAI.');
		}

		return solution;
	} catch (error) {
		console.error('Error:', error);
	}
};
