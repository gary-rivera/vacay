function largestDivisibleSubset(nums: number[]): number[] {
    nums.sort((a, b) => a - b);
    let len = nums.length;
    let dp = new Array(len).fill(1);
    let prev = new Array(len).fill(-1);
    let max = 1;
    let index = 0;

    for (let i = 1; i < len; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] % nums[j] === 0 && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
                prev[i] = j;
            }
        }

        if (dp[i] > max) {
            max = dp[i];
            index = i;
        }
    }

    let result: number[] = [];
    while (index >= 0) {
        result.unshift(nums[index]);
        index = prev[index];
    }

    return result;
}

/*
question: Given a set of distinct positive integers nums, return the largest subset answer such that every pair (answer[i], answer[j]) of elements in this subset satisfies:


	answer[i] % answer[j] == 0, or
	answer[j] % answer[i] == 0


If there are multiple solutions, return any of them.

 
Example 1:

Input: nums = [1,2,3]
Output: [1,2]
Explanation: [1,3] is also accepted.


Example 2:

Input: nums = [1,2,4,8]
Output: [1,2,4,8]


 
Constraints:


	1 <= nums.length <= 1000
	1 <= nums[i] <= 2 * 109
	All the integers in nums are unique.

 */
