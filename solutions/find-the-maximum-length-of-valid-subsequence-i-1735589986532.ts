function longestValidSubsequence(nums: number[]): number {
    let dp: number[] = new Array(nums.length).fill(1);
    let maxLen: number = 1;

    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if ((nums[i] + nums[j]) % 2 == 0 && dp[j] + 1 > dp[i]) {
                dp[i] = dp[j] + 1;
            }
        }
        maxLen = Math.max(maxLen, dp[i]);
    }

    return maxLen;
}

/*
question: You are given an integer array nums.
A subsequence sub of nums with length x is called valid if it satisfies:


	(sub[0] + sub[1]) % 2 == (sub[1] + sub[2]) % 2 == ... == (sub[x - 2] + sub[x - 1]) % 2.


Return the length of the longest valid subsequence of nums.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

 
Example 1:


Input: nums = [1,2,3,4]

Output: 4

Explanation:

The longest valid subsequence is [1, 2, 3, 4].


Example 2:


Input: nums = [1,2,1,1,2,1,2]

Output: 6

Explanation:

The longest valid subsequence is [1, 2, 1, 2, 1, 2].


Example 3:


Input: nums = [1,3]

Output: 2

Explanation:

The longest valid subsequence is [1, 3].


 
Constraints:


	2 <= nums.length <= 2 * 105
	1 <= nums[i] <= 107

 */
