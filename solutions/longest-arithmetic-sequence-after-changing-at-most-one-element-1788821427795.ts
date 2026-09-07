function maxLengthArithmeticSubarray(nums: number[]): number {
    let n = nums.length;
    let dp: number[][] = Array.from({ length: n }, () => Array(2).fill(0));
    let max = 0;
    for (let i = 1; i < n; i++) {
        if (nums[i] - nums[i - 1] === nums[i - 1] - nums[i - 2]) {
            dp[i][0] = dp[i - 1][0] + 1;
            dp[i][1] = dp[i - 1][1] + 1;
        } else {
            dp[i][0] = 2;
            if (i > 2 && nums[i] - nums[i - 2] === 2 * (nums[i - 1] - nums[i - 2])) {
                dp[i][1] = dp[i - 2][0] + 1;
            } else {
                dp[i][1] = 2;
            }
        }
        max = Math.max(max, dp[i][0], dp[i][1]);
    }
    return max;
}

/*
question: You are given an integer array nums.

A subarray is arithmetic if the difference between consecutive elements in the subarray is constant.

You can replace at most one element in nums with any integer. Then, you select an arithmetic subarray from nums.

Return an integer denoting the maximum length of the arithmetic subarray you can select.

 
Example 1:


Input: nums = [9,7,5,10,1]

Output: 5

Explanation:


	Replace nums[3] = 10 with 3. The array becomes [9, 7, 5, 3, 1].
	Select the subarray [9, 7, 5, 3, 1], which is arithmetic because consecutive elements have a common difference of -2.



Example 2:


Input: nums = [1,2,6,7]

Output: 3

Explanation:


	Replace nums[0] = 1 with -2. The array becomes [-2, 2, 6, 7].
	Select the subarray [-2, 2, 6, 7], which is arithmetic because consecutive elements have a common difference of 4.



 
Constraints:


	4 <= nums.length <= 105
	1 <= nums[i] <= 105

 */
