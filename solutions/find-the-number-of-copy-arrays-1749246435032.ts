function numArrays(original: number[], bounds: number[][]): number {
    const mod = 1e9 + 7;
    const n = original.length;
    let dp = Array(n).fill(0).map(() => Array(2).fill(0));
    let prefix = Array(n).fill(0).map(() => Array(2).fill(0));
    let diff = Array(n).fill(0);
    
    for (let i = 1; i < n; i++) {
        diff[i] = original[i] - original[i - 1];
    }
    
    dp[0][0] = dp[0][1] = 1;
    prefix[0][0] = prefix[0][1] = 1;
    
    for (let i = 1; i < n; i++) {
        for (let j = bounds[i][0]; j <= bounds[i][1]; j++) {
            let l = Math.max(bounds[i - 1][0], j - diff[i]);
            let r = Math.min(bounds[i - 1][1], j - diff[i]);
            if (l <= r) {
                dp[i][0] = (dp[i][0] + prefix[i - 1][1] - (l > 1 ? prefix[i - 1][0] : 0)) % mod;
            }
        }
        for (let j = bounds[i][1]; j >= bounds[i][0]; j--) {
            let l = Math.max(bounds[i - 1][0], j - diff[i]);
            let r = Math.min(bounds[i - 1][1], j - diff[i]);
            if (l <= r) {
                dp[i][1] = (dp[i][1] + prefix[i - 1][1] - (l > 1 ? prefix[i - 1][0] : 0)) % mod;
            }
        }
        prefix[i][0] = (prefix[i - 1][1] + dp[i][0]) % mod;
        prefix[i][1] = (prefix[i - 1][1] + dp[i][1]) % mod;
    }
    
    return (dp[n - 1][0] + dp[n - 1][1]) % mod;
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
