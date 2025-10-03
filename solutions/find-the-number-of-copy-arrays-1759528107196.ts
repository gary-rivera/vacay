function countPossibleArrays(original: number[], bounds: number[][]): number {
    let n = original.length;
    let mod = 1e9 + 7;
    let dp = Array(n).fill(0).map(() => Array(2).fill(0));
    dp[0][0] = dp[0][1] = 1;
    let diff = Array(n).fill(0);
    for (let i = 1; i < n; i++) {
        diff[i] = original[i] - original[i - 1];
    }
    for (let i = 1; i < n; i++) {
        let [l, r] = bounds[i];
        let [prevL, prevR] = bounds[i - 1];
        let same = (r - l + 1) % mod;
        let less = ((l - prevL) * dp[i - 1][0] % mod + (prevR - l + 1) * dp[i - 1][1] % mod) % mod;
        let more = ((r - prevL + 1) * dp[i - 1][0] % mod + (prevR - r) * dp[i - 1][1] % mod) % mod;
        if (diff[i] === 0) {
            dp[i][0] = same;
            dp[i][1] = (same + less + more) % mod;
        } else if (diff[i] > 0) {
            dp[i][0] = less;
            dp[i][1] = (less + same) % mod;
        } else {
            dp[i][0] = more;
            dp[i][1] = (more + same) % mod;
        }
    }
    return dp[n - 1][1];
}

/*
question: You are given an array original of length n and a 2D array bounds of length n x 2, where bounds[i] = [ui, vi].

You need to find the number of possible arrays copy of length n such that:


	(copy[i] - copy[i - 1]) == (original[i] - original[i - 1]) for 1 <= i <= n - 1.
	ui <= copy[i] <= vi for 0 <= i <= n - 1.


Return the number of such arrays.

 
Example 1:


Input: original = [1,2,3,4], bounds = [[1,2],[2,3],[3,4],[4,5]]

Output: 2

Explanation:

The possible arrays are:


	[1, 2, 3, 4]
	[2, 3, 4, 5]



Example 2:


Input: original = [1,2,3,4], bounds = [[1,10],[2,9],[3,8],[4,7]]

Output: 4

Explanation:

The possible arrays are:


	[1, 2, 3, 4]
	[2, 3, 4, 5]
	[3, 4, 5, 6]
	[4, 5, 6, 7]



Example 3:


Input: original = [1,2,1,2], bounds = [[1,1],[2,3],[3,3],[2,3]]

Output: 0

Explanation:

No array is possible.


 
Constraints:


	2 <= n == original.length <= 105
	1 <= original[i] <= 109
	bounds.length == n
	bounds[i].length == 2
	1 <= bounds[i][0] <= bounds[i][1] <= 109

 */
