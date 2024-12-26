function maxSumDivThree(nums: number[]): number {
    let dp: number[] = [0, Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];
    for (let num of nums) {
        let dpNext: number[] = [...dp];
        for (let sum of dp) {
            dpNext[(sum + num) % 3] = Math.max(dpNext[(sum + num) % 3], sum + num);
        }
        dp = dpNext;
    }
    return dp[0];
}

/*
question: Given an integer array nums, return the maximum possible sum of elements of the array such that it is divisible by three.

 
Example 1:

Input: nums = [3,6,5,1,8]
Output: 18
Explanation: Pick numbers 3, 6, 1 and 8 their sum is 18 (maximum sum divisible by 3).

Example 2:

Input: nums = [4]
Output: 0
Explanation: Since 4 is not divisible by 3, do not pick any number.


Example 3:

Input: nums = [1,2,3,4,4]
Output: 12
Explanation: Pick numbers 1, 3, 4 and 4 their sum is 12 (maximum sum divisible by 3).


 
Constraints:


	1 <= nums.length <= 4 * 104
	1 <= nums[i] <= 104

 */
