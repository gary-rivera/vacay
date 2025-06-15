function maxSubsequenceLength(nums: number[], k: number): number {
    let n = nums.length;
    let dp: number[][] = Array.from({ length: n + 1 }, () => Array(k + 2).fill(0));
    let count: number[] = Array(n + 1).fill(0);
    let lastOccurrence: number[] = Array(1001).fill(0);

    for (let i = 1; i <= n; i++) {
        let x = nums[i - 1];
        for (let j = 0; j <= k; j++) {
            dp[i][j + 1] = Math.max(dp[i - 1][j + 1], dp[lastOccurrence[x]][j] + count[i] - count[lastOccurrence[x]]);
        }
        lastOccurrence[x] = i;
    }

    let res = 0;
    for (let i = 0; i <= k + 1; i++) {
        res = Math.max(res, dp[n][i]);
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


	1 <= nums.length <= 5 * 103
	1 <= nums[i] <= 109
	0 <= k <= min(50, nums.length)

 */
