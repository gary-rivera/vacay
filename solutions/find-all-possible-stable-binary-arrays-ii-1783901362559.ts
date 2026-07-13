const MOD = 1e9 + 7;

function stableArrays(zero: number, one: number, limit: number): number {
    let dp: number[][][] = Array.from({ length: zero + 1 }, () => Array.from({ length: one + 1 }, () => Array(limit + 1).fill(0)));
    let prefix: number[][] = Array.from({ length: zero + 1 }, () => Array(one + 1).fill(0));

    dp[0][0][0] = 1;

    for (let i = 0; i <= zero; i++) {
        for (let j = 0; j <= one; j++) {
            for (let k = 0; k <= limit; k++) {
                if (i + j + k === 0) continue;

                if (k > 0) {
                    dp[i][j][k] = dp[i][j][k - 1];
                }

                if (i > 0) {
                    dp[i][j][k] = (dp[i][j][k] + dp[i - 1][j][Math.min(i - 1, limit)]) % MOD;
                }

                if (j > 0) {
                    dp[i][j][k] = (dp[i][j][k] + prefix[i][j - 1]) % MOD;
                    if (j - limit - 1 >= 0) {
                        dp[i][j][k] = (dp[i][j][k] - prefix[i][j - limit - 1] + MOD) % MOD;
                    }
                }

                prefix[i][j] = (prefix[i][j] + dp[i][j][k]) % MOD;
            }
        }
    }

    let result = 0;
    for (let k = 0; k <= limit; k++) {
        result = (result + dp[zero][one][k]) % MOD;
    }

    return result;
}

/*
question: You are given 3 positive integers num_zeros, num_ones, and limit.

A binary array arr is called stable if:


	The number of occurrences of 0 in arr is exactly num_zeros.
	The number of occurrences of 1 in arr is exactly num_ones.
	Each subarray of arr with a size greater than limit must contain at least one occurrence of both 0 and 1.


Return an integer denoting the total number of stable binary arrays.

Since the answer may be very large, return it modulo 109 + 7.

 
Example 1:


Input: zero = 1, one = 1, limit = 2

Output: 2

Explanation:

The two possible stable binary arrays are [1,0] and [0,1].


Example 2:


Input: zero = 1, one = 2, limit = 1

Output: 1

Explanation:

The only possible stable binary array is [1,0,1].


Example 3:


Input: zero = 3, one = 3, limit = 2

Output: 14

Explanation:

All the possible stable binary arrays are [0,0,1,0,1,1], [0,0,1,1,0,1], [0,1,0,0,1,1], [0,1,0,1,0,1], [0,1,0,1,1,0], [0,1,1,0,0,1], [0,1,1,0,1,0], [1,0,0,1,0,1], [1,0,0,1,1,0], [1,0,1,0,0,1], [1,0,1,0,1,0], [1,0,1,1,0,0], [1,1,0,0,1,0], and [1,1,0,1,0,0].


 
Constraints:


	1 <= zero, one, limit <= 1000

 */
