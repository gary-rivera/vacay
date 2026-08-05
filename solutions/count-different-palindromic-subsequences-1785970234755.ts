const MOD = 1e9 + 7;
const N = 1005;
const M = 4;
let dp: number[][][] = Array.from({ length: N }, () => Array.from({ length: N }, () => Array(M).fill(0)));
let nxt: number[][] = Array.from({ length: N }, () => Array(M).fill(0));
let prv: number[][] = Array.from({ length: N }, () => Array(M).fill(0));
let S: number[] = Array(N).fill(0);

function countPalindromicSubsequences(s: string): number {
    let n = s.length;
    for (let i = 1; i <= n; i++) {
        S[i] = s.charCodeAt(i - 1) - 'a'.charCodeAt(0);
    }
    S[0] = S[n + 1] = -1;
    for (let i = 0; i < M; i++) {
        prv[0][i] = 0;
        for (let j = 1; j <= n; j++) {
            if (S[j] != i) {
                prv[j][i] = prv[j - 1][i];
            } else {
                prv[j][i] = j;
            }
        }
    }
    for (let i = 0; i < M; i++) {
        nxt[n + 1][i] = n + 1;
        for (let j = n; j >= 1; j--) {
            if (S[j] != i) {
                nxt[j][i] = nxt[j + 1][i];
            } else {
                nxt[j][i] = j;
            }
        }
    }
    for (let i = n; i >= 1; i--) {
        for (let j = i; j <= n; j++) {
            if (i == j) {
                for (let k = 0; k < M; k++) {
                    dp[i][j][k] = (S[i] == k ? 1 : 0);
                }
            } else {
                for (let k = 0; k < M; k++) {
                    dp[i][j][k] = dp[i][j - 1][k] + dp[i + 1][j][k] - dp[i + 1][j - 1][k];
                    if (S[i] == k) {
                        dp[i][j][k] += dp[nxt[i + 1][k]][prv[j - 1][k]][k] + 2;
                    }
                    dp[i][j][k] %= MOD;
                    if (dp[i][j][k] < 0) {
                        dp[i][j][k] += MOD;
                    }
                }
            }
        }
    }
    let ans = 0;
    for (let i = 0; i < M; i++) {
        ans = (ans + dp[1][n][i]) % MOD;
    }
    return ans;
}

/*
question: Given a string s, return the number of different non-empty palindromic subsequences in s. Since the answer may be very large, return it modulo 109 + 7.

A subsequence of a string is obtained by deleting zero or more characters from the string.

A sequence is palindromic if it is equal to the sequence reversed.

Two sequences a1, a2, ... and b1, b2, ... are different if there is some i for which ai != bi.

 
Example 1:

Input: s = "bccb"
Output: 6
Explanation: The 6 different non-empty palindromic subsequences are 'b', 'c', 'bb', 'cc', 'bcb', 'bccb'.
Note that 'bcb' is counted only once, even though it occurs twice.


Example 2:

Input: s = "abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba"
Output: 104860361
Explanation: There are 3104860382 different non-empty palindromic subsequences, which is 104860361 modulo 109 + 7.


 
Constraints:


	1 <= s.length <= 1000
	s[i] is either 'a', 'b', 'c', or 'd'.

 */
