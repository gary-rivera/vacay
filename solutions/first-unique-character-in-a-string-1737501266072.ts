function firstUniqChar(s: string): number {
    let charCount: { [key: string]: number } = {};

    for (let i = 0; i < s.length; i++) {
        if (charCount[s[i]]) {
            charCount[s[i]]++;
        } else {
            charCount[s[i]] = 1;
        }
    }

    for (let i = 0; i < s.length; i++) {
        if (charCount[s[i]] === 1) {
            return i;
        }
    }

    return -1;
}

/*
question: Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.

 
Example 1:


Input: s = "leetcode"

Output: 0

Explanation:

The character 'l' at index 0 is the first character that does not occur at any other index.


Example 2:


Input: s = "loveleetcode"

Output: 2


Example 3:


Input: s = "aabb"

Output: -1


 
Constraints:


	1 <= s.length <= 105
	s consists of only lowercase English letters.

 */
