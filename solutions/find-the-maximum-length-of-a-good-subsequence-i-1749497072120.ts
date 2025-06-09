function maxSubsequence(nums: number[], k: number): number {
    let n = nums.length;
    let dp: number[][][] = Array.from({length: n + 1}, () => Array.from({length: n + 1}, () => Array(n + 1).fill(0)));
    let last: number[] = Array(n + 1).fill(0);
    let pos: number[] = Array(n + 1).fill(0);

    for (let i = 1; i <= n; i++) {
        for (let j = 0; j <= i; j++) {
            if (j < i) {
                dp[i][j][last[nums[i - 1]]] = Math.max(dp[i][j][last[nums[i - 1]]], dp[i - 1][j][last[nums[i - 1]]] + 1);
            }
            if (j > 0) {
                dp[i][j][i] = Math.max(dp[i][j][i], dp[pos[last[nums[i - 1]]]][j - 1][last[nums[i - 1]]] + 1);
            }
        }
        pos[last[nums[i - 1]]] = i;
        last[nums[i - 1]] = i;
    }

    let res = 0;
    for (let i = 0; i <= n; i++) {
        for (let j = 0; j <= k; j++) {
            res = Math.max(res, dp[n][i][j]);
        }
    }
    return res;
}

/*
question: You are given an integer array nums and a non-negative integer k. A sequence of integers seq is called good if there are at most k indices i in the range [0, seq.length - 2] such that seq[i] != seq[i + 1].

Return the maximum possible length of a good subsequence of nums.

 
Example 1:


Input: nums = [1,2,1,1,3], k = 2

Output: 4

Explanation:

The maximum length subsequence is [1,2,1,1,3].


Example 2:


Input: nums = [1,2,3,4,5,1], k = 0

Output: 2

Explanation:

The maximum length subsequence is [1,2,3,4,5,1].


 
Constraints:


	1 <= nums.length <= 500
	1 <= nums[i] <= 109
	0 <= k <= min(nums.length, 25)

 */
