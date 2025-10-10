const MOD = 1e9 + 7;
const MAX_HAT = 40;

function numberWays(hats: number[][]): number {
    const n = hats.length;
    const dp = Array.from({ length: MAX_HAT + 1 }, () => new Array(1 << n).fill(0));
    dp[0][0] = 1;
    const hatToPeople = Array.from({ length: MAX_HAT + 1 }, () => new Array<number>());
    for (let i = 0; i < n; i++) {
        for (const hat of hats[i]) {
            hatToPeople[hat].push(i);
        }
    }
    for (let hat = 1; hat <= MAX_HAT; hat++) {
        const people = hatToPeople[hat];
        for (let mask = 0; mask < (1 << n); mask++) {
            dp[hat][mask] = dp[hat - 1][mask];
            for (const person of people) {
                if ((mask & (1 << person)) !== 0) {
                    dp[hat][mask] += dp[hat - 1][mask ^ (1 << person)];
                    dp[hat][mask] %= MOD;
                }
            }
        }
    }
    return dp[MAX_HAT][(1 << n) - 1];
}

/*
question: There are n people and 40 types of hats labeled from 1 to 40.

Given a 2D integer array hats, where hats[i] is a list of all hats preferred by the ith person.

Return the number of ways that n people can wear different hats from each other.

Since the answer may be too large, return it modulo 109 + 7.

 
Example 1:

Input: hats = [[3,4],[4,5],[5]]
Output: 1
Explanation: There is only one way to choose hats given the conditions. 
First person choose hat 3, Second person choose hat 4 and last one hat 5.


Example 2:

Input: hats = [[3,5,1],[3,5]]
Output: 4
Explanation: There are 4 ways to choose hats:
(3,5), (5,3), (1,3) and (1,5)


Example 3:

Input: hats = [[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4]]
Output: 24
Explanation: Each person can choose hats labeled from 1 to 4.
Number of Permutations of (1,2,3,4) = 24.


 
Constraints:


	n == hats.length
	1 <= n <= 10
	1 <= hats[i].length <= 40
	1 <= hats[i][j] <= 40
	hats[i] contains a list of unique integers.

 */
