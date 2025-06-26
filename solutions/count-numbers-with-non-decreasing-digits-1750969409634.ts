const MOD = 1e9 + 7;
const MAX = 105;

let dp: number[][][] = Array.from(Array(MAX), () => Array.from(Array(11), () => Array(2).fill(-1)));

function countNonDecreasingNumbers(n: string, b: number): number {
    let len = n.length;
    for (let i = 0; i < MAX; i++) {
        for (let j = 0; j < 11; j++) {
            for (let k = 0; k < 2; k++) {
                dp[i][j][k] = -1;
            }
        }
    }

    return count(len, 0, 1, n, b);
}

function count(pos: number, prev: number, tight: number, n: string, b: number): number {
    if (pos === 0) return 1;
    else if (dp[pos][prev][tight] !== -1) return dp[pos][prev][tight];
    else {
        let res = 0;
        let limit = tight ? parseInt(n[n.length - pos]) : b - 1;

        for (let i = prev; i <= limit; i++) {
            res = (res + count(pos - 1, i, tight & (i === limit ? 1 : 0), n, b)) % MOD;
        }

        dp[pos][prev][tight] = res;
        return res;
    }
}

function subtract(x: number, y: number): number {
    return (x - y + MOD) % MOD;
}

function solve(l: string, r: string, b: number): number {
    return subtract(countNonDecreasingNumbers(r, b), countNonDecreasingNumbers(l, b));
}

console.log(solve("23", "28", 8)); // Output: 3
console.log(solve("2", "7", 2)); // Output: 2

/*
question: You are given two integers, l and r, represented as strings, and an integer b. Return the count of integers in the inclusive range [l, r] whose digits are in non-decreasing order when represented in base b.

An integer is considered to have non-decreasing digits if, when read from left to right (from the most significant digit to the least significant digit), each digit is greater than or equal to the previous one.

Since the answer may be too large, return it modulo 109 + 7.

 
Example 1:


Input: l = "23", r = "28", b = 8

Output: 3

Explanation:


	The numbers from 23 to 28 in base 8 are: 27, 30, 31, 32, 33, and 34.
	Out of these, 27, 33, and 34 have non-decreasing digits. Hence, the output is 3.



Example 2:


Input: l = "2", r = "7", b = 2

Output: 2

Explanation:


	The numbers from 2 to 7 in base 2 are: 10, 11, 100, 101, 110, and 111.
	Out of these, 11 and 111 have non-decreasing digits. Hence, the output is 2.



 
Constraints:


	1 <= l.length <= r.length <= 100
	2 <= b <= 10
	l and r consist only of digits.
	The value represented by l is less than or equal to the value represented by r.
	l and r do not contain leading zeros.

 */
