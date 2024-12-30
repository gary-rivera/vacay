const MOD = 1e9 + 7;

function countGoodStrings(low: number, high: number, zero: number, one: number): number {
    let dp = Array.from({ length: high + 1 }, () => Array.from({ length: zero + 1 }, () => Array(one + 1).fill(0)));
    dp[0][0][0] = 1;
    for (let i = 0; i < high; i++) {
        for (let j = 0; j <= zero; j++) {
            for (let k = 0; k <= one; k++) {
                if (j < zero) {
                    dp[i + 1][j + 1][Math.max(k - 1, 0)] += dp[i][j][k];
                    dp[i + 1][j + 1][Math.max(k - 1, 0)] %= MOD;
                }
                if (k < one) {
                    dp[i + 1][Math.max(j - 1, 0)][k + 1] += dp[i][j][k];
                    dp[i + 1][Math.max(j - 1, 0)][k + 1] %= MOD;
                }
            }
        }
    }
    let res = 0;
    for (let i = low; i <= high; i++) {
        for (let j = 0; j <= zero; j++) {
            for (let k = 0; k <= one; k++) {
                res += dp[i][j][k];
                res %= MOD;
            }
        }
    }
    return res;
}

/*
question: Given the integers zero, one, low, and high, we can construct a string by starting with an empty string, and then at each step perform either of the following:


	Append the character '0' zero times.
	Append the character '1' one times.


This can be performed any number of times.

A good string is a string constructed by the above process having a length between low and high (inclusive).

Return the number of different good strings that can be constructed satisfying these properties. Since the answer can be large, return it modulo 109 + 7.

 
Example 1:

Input: low = 3, high = 3, zero = 1, one = 1
Output: 8
Explanation: 
One possible valid good string is "011". 
It can be constructed as follows: "" -> "0" -> "01" -> "011". 
All binary strings from "000" to "111" are good strings in this example.


Example 2:

Input: low = 2, high = 3, zero = 1, one = 2
Output: 5
Explanation: The good strings are "00", "11", "000", "110", and "011".


 
Constraints:


	1 <= low <= high <= 105
	1 <= zero, one <= low

 */
