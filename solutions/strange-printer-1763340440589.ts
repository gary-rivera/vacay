function minTurns(s: string): number {
    const n = s.length;
    const dp: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

    for (let len = 1; len <= n; len++) {
        for (let i = 0; i <= n - len; i++) {
            const j = i + len - 1;
            dp[i][j] = len === 1 ? 1 : len;
            for (let k = i; k < j; k++) {
                const total = dp[i][k] + dp[k + 1][j];
                if (s[k] === s[j]) {
                    dp[i][j] = Math.min(dp[i][j], total - 1);
                } else {
                    dp[i][j] = Math.min(dp[i][j], total);
                }
            }
        }
    }

    return dp[0][n - 1];
}

/*
question: There is a strange printer with the following two special properties:


	The printer can only print a sequence of the same character each time.
	At each turn, the printer can print new characters starting from and ending at any place and will cover the original existing characters.


Given a string s, return the minimum number of turns the printer needed to print it.

 
Example 1:

Input: s = "aaabbb"
Output: 2
Explanation: Print "aaa" first and then print "bbb".


Example 2:

Input: s = "aba"
Output: 2
Explanation: Print "aaa" first and then print "b" from the second place of the string, which will cover the existing character 'a'.


 
Constraints:


	1 <= s.length <= 100
	s consists of lowercase English letters.

 */
