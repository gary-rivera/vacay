function canPartitionKSubsets(nums: number[], k: number): boolean {
    let sum = nums.reduce((a, b) => a + b, 0);
    if (sum % k !== 0) return false;

    let target = sum / k;
    nums.sort((a, b) => b - a);

    let subsets = Array(k).fill(0);
    return search(nums, subsets, target, 0);
}

function search(nums: number[], subsets: number[], target: number, index: number): boolean {
    if (index === nums.length) {
        return subsets.every(val => val === target);
    }

    for (let i = 0; i < subsets.length; i++) {
        if (subsets[i] + nums[index] <= target) {
            subsets[i] += nums[index];
            if (search(nums, subsets, target, index + 1)) {
                return true;
            }
            subsets[i] -= nums[index];
        }
        if (subsets[i] === 0) break;
    }

    return false;
}

/*
question: Given an integer array nums and an integer k, return true if it is possible to divide this array into k non-empty subsets whose sums are all equal.

 
Example 1:

Input: nums = [4,3,2,3,5,2,1], k = 4
Output: true
Explanation: It is possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.


Example 2:

Input: nums = [1,2,3,4], k = 3
Output: false


 
Constraints:


	1 <= k <= nums.length <= 16
	1 <= nums[i] <= 104
	The frequency of each element is in the range [1, 4].

 */
