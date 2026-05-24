function maxProduct(s: string): number {
    const n = s.length;
    const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    const maxLen: number[] = Array(n).fill(0);

    for (let len = 1; len <= n; len++) {
        for (let i = 0; i + len - 1 < n; i++) {
            const j = i + len - 1;
            if (len == 1) {
                dp[i][j] = 1;
            } else if (len == 2) {
                dp[i][j] = s[i] == s[j] ? 2 : 0;
            } else {
                dp[i][j] = s[i] == s[j] && dp[i + 1][j - 1] > 0 ? len : 0;
            }
            maxLen[j] = Math.max(maxLen[j], dp[i][j]);
        }
    }

    let maxProduct = 0;
    for (let j = 1; j < n; j++) {
        maxProduct = Math.max(maxProduct, maxLen[j - 1] * maxLen[j]);
    }

    return maxProduct;
}

/*
question: You are given a 0-indexed string s and are tasked with finding two non-intersecting palindromic substrings of odd length such that the product of their lengths is maximized.

More formally, you want to choose four integers i, j, k, l such that 0 <= i <= j < k <= l < s.length and both the substrings s[i...j] and s[k...l] are palindromes and have odd lengths. s[i...j] denotes a substring from index i to index j inclusive.

Return the maximum possible product of the lengths of the two non-intersecting palindromic substrings.

A palindrome is a string that is the same forward and backward. A substring is a contiguous sequence of characters in a string.

 
Example 1:

Input: s = "ababbb"
Output: 9
Explanation: Substrings "aba" and "bbb" are palindromes with odd length. product = 3 * 3 = 9.


Example 2:

Input: s = "zaaaxbbby"
Output: 9
Explanation: Substrings "aaa" and "bbb" are palindromes with odd length. product = 3 * 3 = 9.


 
Constraints:


	2 <= s.length <= 105
	s consists of lowercase English letters.

 */
