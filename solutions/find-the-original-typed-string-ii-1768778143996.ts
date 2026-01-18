const MOD = 1e9 + 7;

function numWays(word: string, k: number): number {
    const n = word.length;
    const freq = new Array(26).fill(0);
    const dp = new Array(n + 1).fill(0);
    const sum = new Array(n + 1).fill(0);
    dp[0] = sum[0] = 1;
    let ans = 0;
    for (let i = 0; i < n; ++i) {
        const ch = word.charCodeAt(i) - 97;
        const l = Math.max(0, i - k + 1);
        dp[i + 1] = sum[i];
        if (freq[ch] - 1 >= 0) {
            dp[i + 1] = (dp[i + 1] - sum[freq[ch] - 1] + MOD) % MOD;
        }
        sum[i + 1] = (sum[i] + dp[i + 1]) % MOD;
        freq[ch] = i + 1;
        ans = (ans + dp[i + 1]) % MOD;
    }
    return ans;
}

/*
question: Alice is attempting to type a specific string on her computer. However, she tends to be clumsy and may press a key for too long, resulting in a character being typed multiple times.

You are given a string word, which represents the final output displayed on Alice's screen. You are also given a positive integer k.

Return the total number of possible original strings that Alice might have intended to type, if she was trying to type a string of size at least k.

Since the answer may be very large, return it modulo 109 + 7.

 
Example 1:


Input: word = "aabbccdd", k = 7

Output: 5

Explanation:

The possible strings are: "aabbccdd", "aabbccd", "aabbcdd", "aabccdd", and "abbccdd".


Example 2:


Input: word = "aabbccdd", k = 8

Output: 1

Explanation:

The only possible string is "aabbccdd".


Example 3:


Input: word = "aaabbb", k = 3

Output: 8


 
Constraints:


	1 <= word.length <= 5 * 105
	word consists only of lowercase English letters.
	1 <= k <= 2000

 */
