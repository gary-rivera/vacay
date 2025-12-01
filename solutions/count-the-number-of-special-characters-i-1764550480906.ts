function specialLetters(word: string): number {
    let lowerCaseLetters = new Set<string>();
    let upperCaseLetters = new Set<string>();
    let specialLetters = 0;

    for (let i = 0; i < word.length; i++) {
        if (word[i] === word[i].toLowerCase()) {
            lowerCaseLetters.add(word[i]);
        } else {
            upperCaseLetters.add(word[i].toLowerCase());
        }
    }

    for (let letter of lowerCaseLetters) {
        if (upperCaseLetters.has(letter)) {
            specialLetters++;
        }
    }

    return specialLetters;
}

/*
question: You are given a string word. A letter is called special if it appears both in lowercase and uppercase in word.

Return the number of special letters in word.

 
Example 1:


Input: word = "aaAbcBC"

Output: 3

Explanation:

The special characters in word are 'a', 'b', and 'c'.


Example 2:


Input: word = "abc"

Output: 0

Explanation:

No character in word appears in uppercase.


Example 3:


Input: word = "abBCab"

Output: 1

Explanation:

The only special character in word is 'b'.


 
Constraints:


	1 <= word.length <= 50
	word consists of only lowercase and uppercase English letters.

 */
