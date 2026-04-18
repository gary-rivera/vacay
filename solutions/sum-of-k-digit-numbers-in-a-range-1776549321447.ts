const MOD = 1e9 + 7;

function add(x: number, y: number): number {
    return (x + y) % MOD;
}

function mul(x: number, y: number): number {
    return (x * y) % MOD;
}

function power(x: number, y: number): number {
    let result = 1;
    while (y > 0) {
        if (y % 2 === 1) {
            result = mul(result, x);
        }
        x = mul(x, x);
        y = Math.floor(y / 2);
    }
    return result;
}

function solve(l: number, r: number, k: number): number {
    let dp: number[][] = Array.from({ length: k + 1 }, () => Array.from({ length: 10 }, () => 0));
    let prefix: number[][] = Array.from({ length: k + 1 }, () => Array.from({ length: 10 }, () => 0));
    let ten: number[] = Array.from({ length: k + 1 }, () => 0);

    ten[0] = 1;
    for (let i = 1; i <= k; i++) {
        ten[i] = mul(ten[i - 1], 10);
    }

    for (let i = l; i <= r; i++) {
        dp[1][i] = i;
    }

    for (let i = 1; i <= 9; i++) {
        prefix[1][i] = add(prefix[1][i - 1], dp[1][i]);
    }

    for (let i = 2; i <= k; i++) {
        for (let j = 0; j <= 9; j++) {
            dp[i][j] = add(mul(j, ten[i - 1]), mul(prefix[i - 1][9], ten[i - 2]));
            if (j > 0) {
                dp[i][j] = add(dp[i][j], prefix[i - 1][j - 1]);
            }
        }
        for (let j = 1; j <= 9; j++) {
            prefix[i][j] = add(prefix[i][j - 1], dp[i][j]);
        }
    }

    return prefix[k][r];
}

/*
question: You are given three integers l, r, and k.

Consider all possible integers consisting of exactly k digits, where each digit is chosen independently from the integer range [l, r] (inclusive). If 0 is included in the range, leading zeros are allowed.

Return an integer representing the sum of all such numbers.​​​​​​​ Since the answer may be very large, return it modulo 109 + 7.

 
Example 1:


Input: l = 1, r = 2, k = 2

Output: 66

Explanation:


	All numbers formed using k = 2 digits in the range [1, 2] are 11, 12, 21, 22.
	The total sum is 11 + 12 + 21 + 22 = 66.



Example 2:


Input: l = 0, r = 1, k = 3

Output: 444

Explanation:


	All numbers formed using k = 3 digits in the range [0, 1] are 000, 001, 010, 011, 100, 101, 110, 111​​​​​​​.
	These numbers without leading zeros are 0, 1, 10, 11, 100, 101, 110, 111.
	The total sum is 444.



Example 3:


Input: l = 5, r = 5, k = 10

Output: 555555520

Explanation:​​​​​​​


	5555555555 is the only valid number consisting of k = 10 digits in the range [5, 5].
	The total sum is 5555555555 % (109 + 7) = 555555520.



 
Constraints:


	0 <= l <= r <= 9
	1 <= k <= 109

 */
