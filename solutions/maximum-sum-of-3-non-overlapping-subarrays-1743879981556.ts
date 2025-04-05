function maxSumOfThreeSubarrays(nums: number[], k: number): number[] {
    let n = nums.length;
    let sum = Array(n + 1).fill(0);
    let left = Array(n).fill(0);
    let right = Array(n).fill(0);
    let ans = Array(3).fill(0);

    for (let i = 0; i < n; i++) {
        sum[i + 1] = sum[i] + nums[i];
    }

    for (let i = k, total = sum[k] - sum[0]; i < n; i++) {
        if (sum[i + 1] - sum[i + 1 - k] > total) {
            left[i] = i + 1 - k;
            total = sum[i + 1] - sum[i + 1 - k];
        } else {
            left[i] = left[i - 1];
        }
    }

    right[n - k] = n - k;
    for (let i = n - k - 1, total = sum[n] - sum[n - k]; i >= 0; i--) {
        if (sum[i + k] - sum[i] >= total) {
            right[i] = i;
            total = sum[i + k] - sum[i];
        } else {
            right[i] = right[i + 1];
        }
    }

    let maxSum = 0;
    for (let i = k; i <= n - 2 * k; i++) {
        let l = left[i - 1], r = right[i + k];
        let total = (sum[l + k] - sum[l]) + (sum[i + k] - sum[i]) + (sum[r + k] - sum[r]);
        if (total > maxSum) {
            maxSum = total;
            ans = [l, i, r];
        }
    }

    return ans;
}

/*
question: Given an integer array nums and an integer k, find three non-overlapping subarrays of length k with maximum sum and return them.

Return the result as a list of indices representing the starting position of each interval (0-indexed). If there are multiple answers, return the lexicographically smallest one.

 
Example 1:

Input: nums = [1,2,1,2,6,7,5,1], k = 2
Output: [0,3,5]
Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].
We could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically smaller.


Example 2:

Input: nums = [1,2,1,2,1,2,1,2,1], k = 2
Output: [0,2,4]


 
Constraints:


	1 <= nums.length <= 2 * 104
	1 <= nums[i] < 216
	1 <= k <= floor(nums.length / 3)

 */
