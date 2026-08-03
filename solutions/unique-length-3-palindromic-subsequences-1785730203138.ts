function countPalindromicSubsequences(s: string): number {
    const mod = 1e9 + 7;
    const n = s.length;
    const dp: number[][][] = Array.from({ length: n }, () => Array.from({ length: n }, () => Array(26).fill(0)));
    const next: number[][] = Array.from({ length: n }, () => Array(26).fill(0));
    const prev: number[][] = Array.from({ length: n }, () => Array(26).fill(0));
    const last: number[] = Array(26).fill(-1);
    const first: number[] = Array(26).fill(-1);
    
    for (let i = 0; i < n; i++) {
        const ch = s.charCodeAt(i) - 97;
        if (first[ch] === -1) first[ch] = i;
        prev[i][ch] = last[ch];
        last[ch] = i;
    }
    
    last.fill(n);
    first.fill(n);
    
    for (let i = n - 1; i >= 0; i--) {
        const ch = s.charCodeAt(i) - 97;
        if (last[ch] === i) last[ch] = n;
        next[i][ch] = last[ch];
        first[ch] = i;
    }
    
    for (let len = 2; len <= n; len++) {
        for (let i = 0; i + len <= n; i++) {
            const j = i + len - 1;
            for (let k = 0; k < 26; k++) {
                if (next[i][k] < prev[j][k]) {
                    dp[i][j][k] = 2;
                    if (next[i][k] + 1 < prev[j][k]) {
                        for (let l = 0; l < 26; l++) {
                            dp[i][j][k] = (dp[i][j][k] + dp[next[i][k] + 1][prev[j][k] - 1][l]) % mod;
                        }
                    }
                } else if (next[i][k] <= j) {
                    dp[i][j][k] = 1;
                }
            }
        }
    }
    
    let res = 0;
    for (let k = 0; k < 26; k++) {
        res = (res + dp[0][n - 1][k]) % mod;
    }
    
    return res;
}

/*
question: Given a string s, return the number of unique palindromes of length three that are a subsequence of s.

Note that even if there are multiple ways to obtain the same subsequence, it is still only counted once.

A palindrome is a string that reads the same forwards and backwards.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.


	For example, "ace" is a subsequence of "abcde".


 
Example 1:

Input: s = "aabca"
Output: 3
Explanation: The 3 palindromic subsequences of length 3 are:
- "aba" (subsequence of "aabca")
- "aaa" (subsequence of "aabca")
- "aca" (subsequence of "aabca")


Example 2:

Input: s = "adc"
Output: 0
Explanation: There are no palindromic subsequences of length 3 in "adc".


Example 3:

Input: s = "bbcbaba"
Output: 4
Explanation: The 4 palindromic subsequences of length 3 are:
- "bbb" (subsequence of "bbcbaba")
- "bcb" (subsequence of "bbcbaba")
- "bab" (subsequence of "bbcbaba")
- "aba" (subsequence of "bbcbaba")


 
Constraints:


	3 <= s.length <= 105
	s consists of only lowercase English letters.

 */
