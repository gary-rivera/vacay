function numSubarraysWithSum(nums: number[], goal: number): number {
    let sum = 0;
    let count = 0;
    let start = 0;
    let prefixSum = new Map<number, number>();
    prefixSum.set(0, 1);

    for (let end = 0; end < nums.length; end++) {
        sum += nums[end];
        if (prefixSum.has(sum - goal)) {
            count += prefixSum.get(sum - goal) as number;
        }
        prefixSum.set(sum, (prefixSum.get(sum) || 0) + 1);
    }

    return count;
}

/*
question: Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.

A subarray is a contiguous part of the array.

 
Example 1:

Input: nums = [1,0,1,0,1], goal = 2
Output: 4
Explanation: The 4 subarrays are bolded and underlined below:
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]
[1,0,1,0,1]


Example 2:

Input: nums = [0,0,0,0,0], goal = 0
Output: 15


 
Constraints:


	1 <= nums.length <= 3 * 104
	nums[i] is either 0 or 1.
	0 <= goal <= nums.length

 */
