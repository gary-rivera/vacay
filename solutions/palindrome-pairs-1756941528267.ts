function palindromePairs(words: string[]): number[][] {
    const result: number[][] = [];
    const map: Map<string, number> = new Map();

    for (let i = 0; i < words.length; i++) {
        map.set(words[i].split('').reverse().join(''), i);
    }

    for (let i = 0; i < words.length; i++) {
        if (words[i] === '') {
            for (let j = 0; j < words.length; j++) {
                if (i !== j && isPalindrome(words[j])) {
                    result.push([i, j]);
                }
            }
            continue;
        }

        for (let j = 0; j <= words[i].length; j++) {
            const left = words[i].substring(0, j);
            const right = words[i].substring(j);

            if (isPalindrome(left)) {
                const rightRev = right.split('').reverse().join('');
                if (map.has(rightRev) && map.get(rightRev) !== i) {
                    result.push([map.get(rightRev)!, i]);
                }
            }

            if (isPalindrome(right)) {
                const leftRev = left.split('').reverse().join('');
                if (map.has(leftRev) && map.get(leftRev) !== i && right.length !== 0) {
                    result.push([i, map.get(leftRev)!]);
                }
            }
        }
    }

    return result;
}

function isPalindrome(word: string): boolean {
    let left = 0;
    let right = word.length - 1;

    while (left < right) {
        if (word[left++] !== word[right--]) {
            return false;
        }
    }

    return true;
}

/*
question: You are given a 0-indexed array of unique strings words.

A palindrome pair is a pair of integers (i, j) such that:


	0 <= i, j < words.length,
	i != j, and
	words[i] + words[j] (the concatenation of the two strings) is a palindrome.


Return an array of all the palindrome pairs of words.

You must write an algorithm with O(sum of words[i].length) runtime complexity.

 
Example 1:

Input: words = ["abcd","dcba","lls","s","sssll"]
Output: [[0,1],[1,0],[3,2],[2,4]]
Explanation: The palindromes are ["abcddcba","dcbaabcd","slls","llssssll"]


Example 2:

Input: words = ["bat","tab","cat"]
Output: [[0,1],[1,0]]
Explanation: The palindromes are ["battab","tabbat"]


Example 3:

Input: words = ["a",""]
Output: [[0,1],[1,0]]
Explanation: The palindromes are ["a","a"]


 
Constraints:


	1 <= words.length <= 5000
	0 <= words[i].length <= 300
	words[i] consists of lowercase English letters.

 */
