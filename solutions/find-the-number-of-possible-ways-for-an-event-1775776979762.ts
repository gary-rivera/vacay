const MOD = 1e9 + 7;

function power(x: number, y: number): number {
    let res = 1;
    while (y > 0) {
        if (y & 1) res = (res * x) % MOD;
        y >>= 1;
        x = (x * x) % MOD;
    }
    return res;
}

function inverse(x: number): number {
    return power(x, MOD - 2);
}

function multiply(a: number, b: number): number {
    return (a % MOD * (b % MOD)) % MOD;
}

function add(a: number, b: number): number {
    return (a % MOD + b % MOD) % MOD;
}

function subtract(a: number, b: number): number {
    return ((a % MOD - b % MOD) + MOD) % MOD;
}

function calculateWays(n: number, x: number, y: number): number {
    let fact = new Array(n + 1).fill(1);
    for (let i = 2; i <= n; i++) {
        fact[i] = multiply(fact[i - 1], i);
    }

    let dp = new Array(x + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= x; i++) {
        for (let j = i; j <= n; j++) {
            dp[i] = add(dp[i], multiply(dp[i - 1], multiply(fact[j], power(inverse(fact[i]), j))));
        }
    }

    let ans = 0;
    for (let i = 1; i <= Math.min(x, y); i++) {
        ans = add(ans, multiply(dp[i], power(i, n)));
    }

    return ans;
}

/*
question: You are given three integers n, x, and y.

An event is being held for n performers. When a performer arrives, they are assigned to one of the x stages. All performers assigned to the same stage will perform together as a band, though some stages might remain empty.

After all performances are completed, the jury will award each band a score in the range [1, y].

Return the total number of possible ways the event can take place.

Since the answer may be very large, return it modulo 109 + 7.

Note that two events are considered to have been held differently if either of the following conditions is satisfied:


	Any performer is assigned a different stage.
	Any band is awarded a different score.


 
Example 1:


Input: n = 1, x = 2, y = 3

Output: 6

Explanation:


	There are 2 ways to assign a stage to the performer.
	The jury can award a score of either 1, 2, or 3 to the only band.



Example 2:


Input: n = 5, x = 2, y = 1

Output: 32

Explanation:


	Each performer will be assigned either stage 1 or stage 2.
	All bands will be awarded a score of 1.



Example 3:


Input: n = 3, x = 3, y = 4

Output: 684


 
Constraints:


	1 <= n, x, y <= 1000

 */
