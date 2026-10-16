function countSubsequences(nums: number[]): number {
    const MOD = 1e9 + 7;
    const MAX = 1e9;
    const MIN = -1e9;
    const N = nums.length;
    const cnt = new Array(2005).fill(0);
    const sum = new Array(2005).fill(0);
    const dp = new Array(2005).fill(0);
    let ans = 0;
    nums.sort((a, b) => a - b);
    for (let i = 0; i < N; ++i) {
        nums[i] += 1000;
    }
    for (let i = 0; i < N; ++i) {
        for (let j = 1000; j >= 0; --j) {
            if (cnt[j] > 0) {
                dp[nums[i]] = (dp[nums[i]] + cnt[j]) % MOD;
            }
        }
        for (let j = 2000; j > nums[i]; --j) {
            dp[nums[i]] = (dp[nums[i]] + dp[j]) % MOD;
        }
        ans = (ans + dp[nums[i]]) % MOD;
        ++cnt[nums[i]];
        dp[nums[i]] = (dp[nums[i]] + sum[nums[i] - 1] + 1) % MOD;
        for (let j = nums[i]; j <= 2000; ++j) {
            sum[j] = (sum[j] + dp[nums[i]]) % MOD;
        }
    }
    return ans;
}

/*
question: Given an integer array nums, find the number of subsequences of size 5 of nums with a unique middle mode.

Since the answer may be very large, return it modulo 109 + 7.

A mode of a sequence of numbers is defined as the element that appears the maximum number of times in the sequence.

A sequence of numbers contains a unique mode if it has only one mode.

A sequence of numbers seq of size 5 contains a unique middle mode if the middle element (seq[2]) is a unique mode.

 
Example 1:


Input: nums = [1,1,1,1,1,1]

Output: 6

Explanation:

[1, 1, 1, 1, 1] is the only subsequence of size 5 that can be formed, and it has a unique middle mode of 1. This subsequence can be formed in 6 different ways, so the output is 6. 


Example 2:


Input: nums = [1,2,2,3,3,4]

Output: 4

Explanation:

[1, 2, 2, 3, 4] and [1, 2, 3, 3, 4] each have a unique middle mode because the number at index 2 has the greatest frequency in the subsequence. [1, 2, 2, 3, 3] does not have a unique middle mode because 2 and 3 appear twice.


Example 3:


Input: nums = [0,1,2,3,4,5,6,7,8]

Output: 0

Explanation:

There is no subsequence of length 5 with a unique middle mode.


 
Constraints:


	5 <= nums.length <= 1000
	-109 <= nums[i] <= 109

 */
