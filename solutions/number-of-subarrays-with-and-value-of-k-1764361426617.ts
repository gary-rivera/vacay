function countSubarrays(nums: number[], k: number): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        let andValue = nums[i];
        if (andValue === k) {
            count++;
        }
        for (let j = i + 1; j < nums.length; j++) {
            andValue &= nums[j];
            if (andValue === k) {
                count++;
            }
            if (andValue === 0) {
                break;
            }
        }
    }
    return count;
}

/*
question: Given an array of integers nums and an integer k, return the number of subarrays of nums where the bitwise AND of the elements of the subarray equals k.

 
Example 1:


Input: nums = [1,1,1], k = 1

Output: 6

Explanation:

All subarrays contain only 1's.


Example 2:


Input: nums = [1,1,2], k = 1

Output: 3

Explanation:

Subarrays having an AND value of 1 are: [1,1,2], [1,1,2], [1,1,2].


Example 3:


Input: nums = [1,2,3], k = 2

Output: 2

Explanation:

Subarrays having an AND value of 2 are: [1,2,3], [1,2,3].


 
Constraints:


	1 <= nums.length <= 105
	0 <= nums[i], k <= 109

 */
