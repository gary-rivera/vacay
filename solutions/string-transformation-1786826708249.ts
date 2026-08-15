const MOD = 1e9 + 7;

function countTransformations(s: string, t: string, k: number): number {
    let n = s.length;
    let dp = Array(k + 1).fill(0).map(() => Array(n).fill(0));
    let prefix = Array(n + 1).fill(0);
    let suffix = Array(n + 1).fill(0);
    let total = Array(k + 1).fill(0);
    let sum = Array(k + 1).fill(0);

    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + (s[i] === t[0] ? 1 : 0);
        suffix[i + 1] = suffix[i] + (s[n - i - 1] === t[0] ? 1 : 0);
    }

    for (let i = 0; i < n; i++) {
        dp[1][i] = prefix[i + 1];
    }

    total[1] = suffix[n];
    sum[1] = (sum[1 - 1] + total[1]) % MOD;

    for (let i = 2; i <= k; i++) {
        for (let j = 0; j < n; j++) {
            dp[i][j] = (dp[i][j] + sum[i - 1]) % MOD;
            if (s[j] === t[i - 1]) {
                dp[i][j] = (dp[i][j] - dp[i - 1][j] + MOD) % MOD;
            }
            total[i] = (total[i] + dp[i][j]) % MOD;
        }
        sum[i] = (sum[i - 1] + total[i]) % MOD;
    }

    let result = 0;
    for (let i = 0; i < n; i++) {
        if (s.slice(i) + s.slice(0, i) === t) {
            result = (result + dp[k][i]) % MOD;
        }
    }

    return result;
}

/*
question: You are given two strings s and t of equal length n. You can perform the following operation on the string s:


	Remove a suffix of s of length l where 0 < l < n and append it at the start of s.
	For example, let s = 'abcd' then in one operation you can remove the suffix 'cd' and append it in front of s making s = 'cdab'.


You are also given an integer k. Return the number of ways in which s can be transformed into t in exactly k operations.

Since the answer can be large, return it modulo 109 + 7.

 
Example 1:

Input: s = "abcd", t = "cdab", k = 2
Output: 2
Explanation: 
First way:
In first operation, choose suffix from index = 3, so resulting s = "dabc".
In second operation, choose suffix from index = 3, so resulting s = "cdab".

Second way:
In first operation, choose suffix from index = 1, so resulting s = "bcda".
In second operation, choose suffix from index = 1, so resulting s = "cdab".


Example 2:

Input: s = "ababab", t = "ababab", k = 1
Output: 2
Explanation: 
First way:
Choose suffix from index = 2, so resulting s = "ababab".

Second way:
Choose suffix from index = 4, so resulting s = "ababab".


 
Constraints:


	2 <= s.length <= 5 * 105
	1 <= k <= 1015
	s.length == t.length
	s and t consist of only lowercase English alphabets.

 */
