const MOD = 1e9 + 7;

function countIdealArrays(n: number, maxValue: number): number {
    let dp = new Array(n + 1).fill(0).map(() => new Array(maxValue + 1).fill(0));
    let sum = new Array(maxValue + 1).fill(0);
    dp[0][0] = 1;

    for (let i = 1; i <= n; i++) {
        sum[0] = dp[i - 1][0];
        for (let j = 1; j <= maxValue; j++) {
            sum[j] = (sum[j - 1] + dp[i - 1][j]) % MOD;
        }
        for (let j = 1; j <= maxValue; j++) {
            dp[i][j] = (sum[j] - dp[i - 1][j] + MOD) % MOD;
            for (let k = 2 * j; k <= maxValue; k += j) {
                dp[i][j] = (dp[i][j] - dp[i - 1][k] + MOD) % MOD;
            }
        }
    }

    let result = 0;
    for (let i = 1; i <= maxValue; i++) {
        result = (result + dp[n][i]) % MOD;
    }
    return result;
}

/*
question: You are given two integers n and maxValue, which are used to describe an ideal array.

A 0-indexed integer array arr of length n is considered ideal if the following conditions hold:


	Every arr[i] is a value from 1 to maxValue, for 0 <= i < n.
	Every arr[i] is divisible by arr[i - 1], for 0 < i < n.


Return the number of distinct ideal arrays of length n. Since the answer may be very large, return it modulo 109 + 7.

 
Example 1:

Input: n = 2, maxValue = 5
Output: 10
Explanation: The following are the possible ideal arrays:
- Arrays starting with the value 1 (5 arrays): [1,1], [1,2], [1,3], [1,4], [1,5]
- Arrays starting with the value 2 (2 arrays): [2,2], [2,4]
- Arrays starting with the value 3 (1 array): [3,3]
- Arrays starting with the value 4 (1 array): [4,4]
- Arrays starting with the value 5 (1 array): [5,5]
There are a total of 5 + 2 + 1 + 1 + 1 = 10 distinct ideal arrays.


Example 2:

Input: n = 5, maxValue = 3
Output: 11
Explanation: The following are the possible ideal arrays:
- Arrays starting with the value 1 (9 arrays): 
   - With no other distinct values (1 array): [1,1,1,1,1] 
   - With 2nd distinct value 2 (4 arrays): [1,1,1,1,2], [1,1,1,2,2], [1,1,2,2,2], [1,2,2,2,2]
   - With 2nd distinct value 3 (4 arrays): [1,1,1,1,3], [1,1,1,3,3], [1,1,3,3,3], [1,3,3,3,3]
- Arrays starting with the value 2 (1 array): [2,2,2,2,2]
- Arrays starting with the value 3 (1 array): [3,3,3,3,3]
There are a total of 9 + 1 + 1 = 11 distinct ideal arrays.


 
Constraints:


	2 <= n <= 104
	1 <= maxValue <= 104

 */
