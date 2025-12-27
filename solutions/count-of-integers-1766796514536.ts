const MOD = 1e9 + 7;
const MAX = 1022;
const MAX_SUM = 400;
let dp: number[][][][] = Array.from({length: MAX}, () => Array.from({length: 2}, () => Array.from({length: 2}, () => Array.from({length: MAX_SUM + 1}, () => -1))));

function digitSum(num: string, idx: number, tight: number, sum: number, min_sum: number, max_sum: number): number {
    if (idx === num.length) {
        if (sum >= min_sum && sum <= max_sum) return 1;
        else return 0;
    }
    if (dp[idx][tight][sum][min_sum] !== -1 && !tight) return dp[idx][tight][sum][min_sum];
    let res = 0;
    let k = (tight !== 0) ? Number(num[idx]) : 9;
    for (let i = 0; i <= k; i++) {
        let newTight = (i === Number(num[idx])) ? tight : 0;
        res = (res + digitSum(num, idx + 1, newTight, sum + i, min_sum, max_sum)) % MOD;
    }
    if (!tight) dp[idx][tight][sum][min_sum] = res;
    return res;
}

function count(num: string, min_sum: number, max_sum: number): number {
    dp = Array.from({length: MAX}, () => Array.from({length: 2}, () => Array.from({length: 2}, () => Array.from({length: MAX_SUM + 1}, () => -1))));
    return digitSum(num, 0, 1, 0, min_sum, max_sum);
}

function goodNumbers(num1: string, num2: string, min_sum: number, max_sum: number): number {
    return (count(num2, min_sum, max_sum) - count(num1, min_sum, max_sum) + MOD) % MOD;
}

/*
question: You are given two numeric strings num1 and num2 and two integers max_sum and min_sum. We denote an integer x to be good if:


	num1 <= x <= num2
	min_sum <= digit_sum(x) <= max_sum.


Return the number of good integers. Since the answer may be large, return it modulo 109 + 7.

Note that digit_sum(x) denotes the sum of the digits of x.

 
Example 1:

Input: num1 = "1", num2 = "12", min_sum = 1, max_sum = 8
Output: 11
Explanation: There are 11 integers whose sum of digits lies between 1 and 8 are 1,2,3,4,5,6,7,8,10,11, and 12. Thus, we return 11.


Example 2:

Input: num1 = "1", num2 = "5", min_sum = 1, max_sum = 5
Output: 5
Explanation: The 5 integers whose sum of digits lies between 1 and 5 are 1,2,3,4, and 5. Thus, we return 5.


 
Constraints:


	1 <= num1 <= num2 <= 1022
	1 <= min_sum <= max_sum <= 400

 */
