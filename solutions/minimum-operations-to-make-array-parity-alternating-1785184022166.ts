function minOperations(nums: number[]): number[] {
    let n = nums.length;
    let dp: number[][] = Array.from({length: 2}, () => Array(n + 1).fill(0));
    let max: number[] = Array(n + 1).fill(Number.MIN_SAFE_INTEGER);
    let min: number[] = Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
    dp[0][0] = dp[1][0] = 0;
    max[0] = min[0] = nums[0];
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < 2; j++) {
            let parity = i % 2;
            let diff = Math.abs(nums[i] - nums[i - 1]);
            if (parity === j) {
                dp[j][i] = dp[j][i - 1] + diff;
                max[i] = Math.max(max[i - 1], nums[i] + dp[j][i]);
                min[i] = Math.min(min[i - 1], nums[i] - dp[j][i]);
            } else {
                dp[j][i] = dp[1 - j][i - 1];
                max[i] = Math.max(max[i - 1], nums[i] + dp[j][i]);
                min[i] = Math.min(min[i - 1], nums[i] - dp[j][i]);
            }
        }
    }
    let operations = Math.min(dp[0][n - 1], dp[1][n - 1]);
    let diff = max[n - 1] - min[n - 1];
    return [operations, diff];
}

/*
question: You are given an integer array nums.

An array is called parity alternating if for every index i where 0 <= i < n - 1, nums[i] and nums[i + 1] have different parity (one is even and the other is odd).

In one operation, you may choose any index i and either increase nums[i] by 1 or decrease nums[i] by 1.

Return an integer array answer of length 2 where:


	answer[0] is the minimum number of operations required to make the array parity alternating.
	answer[1] is the minimum possible value of max(nums) - min(nums) taken over all arrays that are parity alternating and can be obtained by performing exactly answer[0] operations.


An array of length 1 is considered parity alternating.

 
Example 1:


Input: nums = [-2,-3,1,4]

Output: [2,6]

Explanation:

Applying the following operations:


	Increase nums[2] by 1, resulting in nums = [-2, -3, 2, 4].
	Decrease nums[3] by 1, resulting in nums = [-2, -3, 2, 3].


The resulting array is parity alternating, and the value of max(nums) - min(nums) = 3 - (-3) = 6 is the minimum possible among all parity alternating arrays obtainable using exactly 2 operations.


Example 2:


Input: nums = [0,2,-2]

Output: [1,3]

Explanation:

Applying the following operation:


	Decrease nums[1] by 1, resulting in nums = [0, 1, -2].


The resulting array is parity alternating, and the value of max(nums) - min(nums) = 1 - (-2) = 3 is the minimum possible among all parity alternating arrays obtainable using exactly 1 operation.


Example 3:


Input: nums = [7]

Output: [0,0]

Explanation:

No operations are required. The array is already parity alternating, and the value of max(nums) - min(nums) = 7 - 7 = 0, which is the minimum possible.


 
Constraints:


	1 <= nums.length <= 105
	-109 <= nums[i] <= 109

 */
