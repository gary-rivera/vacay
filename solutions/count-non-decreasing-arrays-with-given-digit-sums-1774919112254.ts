const MOD = 1e9 + 7;
const MAX = 5000;
const MAX_SUM = 50;
const MAX_DIGIT = 10;

function countValidArrays(digitSum: number[]): number {
    let dp = Array.from({ length: MAX_SUM + 1 }, () => Array(MAX + 1).fill(0));
    let prefix = Array.from({ length: MAX_SUM + 1 }, () => Array(MAX + 1).fill(0));
    let ways = Array.from({ length: MAX_DIGIT + 1 }, () => Array(MAX_SUM + 1).fill(0));

    for (let i = 0; i <= MAX_DIGIT; i++) {
        ways[i][0] = 1;
        for (let j = 1; j <= MAX_SUM; j++) {
            ways[i][j] = ways[i][j - 1];
            if (i <= j) {
                ways[i][j] = (ways[i][j] + ways[i][j - i]) % MOD;
            }
        }
    }

    dp[0][0] = 1;
    for (let i = 0; i <= MAX_SUM; i++) {
        prefix[i][0] = dp[i][0];
        for (let j = 1; j <= MAX; j++) {
            dp[i][j] = prefix[i][j - 1];
            if (j >= 10) {
                dp[i][j] = (dp[i][j] - prefix[i][j - 10] + MOD) % MOD;
            }
            dp[i][j] = (dp[i][j] + ways[9][i] * dp[i][j - 1]) % MOD;
            prefix[i][j] = (prefix[i][j - 1] + dp[i][j]) % MOD;
        }
    }

    let res = 0;
    let min = 0;
    for (let sum of digitSum) {
        for (let i = 0; i <= min; i++) {
            res = (res - dp[sum][i] + MOD) % MOD;
        }
        for (let i = 0; i <= MAX; i++) {
            res = (res + dp[sum][i]) % MOD;
        }
        min = sum;
    }
    return res;
}

/*
question: You are given an integer array digitSum of length n.

An array arr of length n is considered valid if:


	0 <= arr[i] <= 5000
	it is non-decreasing.
	the sum of the digits of arr[i] equals digitSum[i].


Return an integer denoting the number of distinct valid arrays. Since the answer may be large, return it modulo 109 + 7.

An array is said to be non-decreasing if each element is greater than or equal to the previous element, if it exists.

 
Example 1:


Input: digitSum = [25,1]

Output: 6

Explanation:

Numbers whose sum of digits is 25 are 799, 889, 898, 979, 988, and 997.

The only number whose sum of digits is 1 that can appear after these values while keeping the array non-decreasing is 1000.

Thus, the valid arrays are [799, 1000], [889, 1000], [898, 1000], [979, 1000], [988, 1000], and [997, 1000].

Hence, the answer is 6.


Example 2:


Input: digitSum = [1]

Output: 4

Explanation:

The valid arrays are [1], [10], [100], and [1000].

Thus, the answer is 4.


Example 3:


Input: digitSum = [2,49,23]

Output: 0

Explanation:

There is no integer in the range [0, 5000] whose sum of digits is 49. Thus, the answer is 0.


 
Constraints:


	1 <= digitSum.length <= 1000
	0 <= digitSum[i] <= 50

 */
