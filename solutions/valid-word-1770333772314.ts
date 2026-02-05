function isValidWord(word: string): boolean {
    const vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    const consonants = 'bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ';
    const digits = '0123456789';

    if (word.length < 3) {
        return false;
    }

    let hasVowel = false;
    let hasConsonant = false;

    for (let i = 0; i < word.length; i++) {
        if (vowels.includes(word[i])) {
            hasVowel = true;
        } else if (consonants.includes(word[i])) {
            hasConsonant = true;
        } else if (!digits.includes(word[i])) {
            return false;
        }
    }

    return hasVowel && hasConsonant;
}

/*
question: A word is considered valid if:


	It contains a minimum of 3 characters.
	It contains only digits (0-9), and English letters (uppercase and lowercase).
	It includes at least one vowel.
	It includes at least one consonant.


You are given a string word.

Return true if word is valid, otherwise, return false.

Notes:


	'a', 'e', 'i', 'o', 'u', and their uppercases are vowels.
	A consonant is an English letter that is not a vowel.


 
Example 1:


Input: word = "234Adas"

Output: true

Explanation:

This word satisfies the conditions.


Example 2:


Input: word = "b3"

Output: false

Explanation:

The length of this word is fewer than 3, and does not have a vowel.


Example 3:


Input: word = "a3$e"

Output: false

Explanation:

This word contains a '$' character and does not have a consonant.


 
Constraints:


	1 <= word.length <= 20
	word consists of English uppercase and lowercase letters, digits, '@', '#', and '$'.

 */
