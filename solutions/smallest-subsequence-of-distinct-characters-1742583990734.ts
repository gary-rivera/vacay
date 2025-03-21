function smallestSubsequence(s: string): string {
    let count: number[] = new Array(26).fill(0);
    let visited: boolean[] = new Array(26).fill(false);
    let result: string[] = [];
    
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
    }
    
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 'a'.charCodeAt(0)]--;
        
        if (visited[s.charCodeAt(i) - 'a'.charCodeAt(0)]) {
            continue;
        }
        
        while (result.length > 0 && result[result.length - 1] > s[i] && count[result[result.length - 1].charCodeAt(0) - 'a'.charCodeAt(0)] > 0) {
            visited[result[result.length - 1].charCodeAt(0) - 'a'.charCodeAt(0)] = false;
            result.pop();
        }
        
        result.push(s[i]);
        visited[s.charCodeAt(i) - 'a'.charCodeAt(0)] = true;
    }
    
    return result.join('');
}

/*
question: Given a string s, return the lexicographically smallest subsequence of s that contains all the distinct characters of s exactly once.

 
Example 1:

Input: s = "bcabc"
Output: "abc"


Example 2:

Input: s = "cbacdcbc"
Output: "acdb"


 
Constraints:


	1 <= s.length <= 1000
	s consists of lowercase English letters.


 
Note: This question is the same as 316: https://leetcode.com/problems/remove-duplicate-letters/ */
