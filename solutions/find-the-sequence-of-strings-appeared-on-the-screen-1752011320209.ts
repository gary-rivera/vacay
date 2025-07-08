function typing(target: string): string[] {
    let result: string[] = [];
    let currentString = '';
    for (let i = 0; i < target.length; i++) {
        while (currentString.length === 0 || currentString[currentString.length - 1] !== target[i]) {
            if (currentString.length > 0 && currentString[currentString.length - 1] === 'z') {
                currentString = currentString.substring(0, currentString.length - 1) + 'a';
                result.push(currentString);
                currentString += 'a';
            } else if (currentString.length > 0) {
                currentString = currentString.substring(0, currentString.length - 1) + String.fromCharCode(currentString.charCodeAt(currentString.length - 1) + 1);
            } else {
                currentString += 'a';
            }
            result.push(currentString);
        }
        if (i !== target.length - 1) {
            currentString += 'a';
            result.push(currentString);
        }
    }
    return result;
}

/*
question: You are given a string target.

Alice is going to type target on her computer using a special keyboard that has only two keys:


	Key 1 appends the character "a" to the string on the screen.
	Key 2 changes the last character of the string on the screen to its next character in the English alphabet. For example, "c" changes to "d" and "z" changes to "a".


Note that initially there is an empty string "" on the screen, so she can only press key 1.

Return a list of all strings that appear on the screen as Alice types target, in the order they appear, using the minimum key presses.

 
Example 1:


Input: target = "abc"

Output: ["a","aa","ab","aba","abb","abc"]

Explanation:

The sequence of key presses done by Alice are:


	Press key 1, and the string on the screen becomes "a".
	Press key 1, and the string on the screen becomes "aa".
	Press key 2, and the string on the screen becomes "ab".
	Press key 1, and the string on the screen becomes "aba".
	Press key 2, and the string on the screen becomes "abb".
	Press key 2, and the string on the screen becomes "abc".



Example 2:


Input: target = "he"

Output: ["a","b","c","d","e","f","g","h","ha","hb","hc","hd","he"]


 
Constraints:


	1 <= target.length <= 400
	target consists only of lowercase English letters.

 */
