const MOD = 1e9 + 7;
const MAX = 1e5 + 5;

const fact: number[] = new Array(MAX);
const invFact: number[] = new Array(MAX);

function power(x: number, y: number): number {
    let res = 1;
    while (y > 0) {
        if (y & 1) {
            res = (res * x) % MOD;
        }
        x = (x * x) % MOD;
        y >>= 1;
    }
    return res;
}

function modInverse(x: number): number {
    return power(x, MOD - 2);
}

function precompute(): void {
    fact[0] = 1;
    for (let i = 1; i < MAX; i++) {
        fact[i] = (fact[i - 1] * i) % MOD;
    }
    invFact[MAX - 1] = modInverse(fact[MAX - 1]);
    for (let i = MAX - 2; i >= 0; i--) {
        invFact[i] = (invFact[i + 1] * (i + 1)) % MOD;
    }
}

function countPermutations(complexity: number[]): number {
    precompute();
    const n = complexity.length;
    const arr: [number, number][] = new Array(n);
    for (let i = 0; i < n; i++) {
        arr[i] = [complexity[i], i];
    }
    arr.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let res = 1;
    let maxIndex = 0;
    let count = 0;
    for (let i = 0; i < n; i++) {
        if (arr[i][1] > maxIndex) {
            maxIndex = arr[i][1];
            count++;
        }
        res = (res * count) % MOD;
        count--;
    }
    return res;
}

/*
question: You are given an array complexity of length n.

There are n locked computers in a room with labels from 0 to n - 1, each with its own unique password. The password of the computer i has a complexity complexity[i].

The password for the computer labeled 0 is already decrypted and serves as the root. All other computers must be unlocked using it or another previously unlocked computer, following this information:


	You can decrypt the password for the computer i using the password for computer j, where j is any integer less than i with a lower complexity. (i.e. j < i and complexity[j] < complexity[i])
	To decrypt the password for computer i, you must have already unlocked a computer j such that j < i and complexity[j] < complexity[i].


Find the number of permutations of [0, 1, 2, ..., (n - 1)] that represent a valid order in which the computers can be unlocked, starting from computer 0 as the only initially unlocked one.

Since the answer may be large, return it modulo 109 + 7.

Note that the password for the computer with label 0 is decrypted, and not the computer with the first position in the permutation.

 
Example 1:


Input: complexity = [1,2,3]

Output: 2

Explanation:

The valid permutations are:


	[0, 1, 2]
	
		Unlock computer 0 first with root password.
		Unlock computer 1 with password of computer 0 since complexity[0] < complexity[1].
		Unlock computer 2 with password of computer 1 since complexity[1] < complexity[2].
	
	
	[0, 2, 1]
	
		Unlock computer 0 first with root password.
		Unlock computer 2 with password of computer 0 since complexity[0] < complexity[2].
		Unlock computer 1 with password of computer 0 since complexity[0] < complexity[1].
	
	



Example 2:


Input: complexity = [3,3,3,4,4,4]

Output: 0

Explanation:

There are no possible permutations which can unlock all computers.


 
Constraints:


	2 <= complexity.length <= 105
	1 <= complexity[i] <= 109

 */
