function gcd(a: number, b: number): number {
    if (b === 0) {
        return a;
    } else {
        return gcd(b, a % b);
    }
}

function countSubarrays(nums: number[], k: number): number {
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        let currentGcd = nums[i];
        for (let j = i; j < nums.length; j++) {
            currentGcd = gcd(currentGcd, nums[j]);
            if (currentGcd === k) {
                count++;
            }
        }
    }
    return count;
}

/*
question: Given an integer array nums and an integer k, return the number of subarrays of nums where the greatest common divisor of the subarray's elements is k.

A subarray is a contiguous non-empty sequence of elements within an array.

The greatest common divisor of an array is the largest integer that evenly divides all the array elements.

 
Example 1:

Input: nums = [9,3,1,2,6,3], k = 3
Output: 4
Explanation: The subarrays of nums where 3 is the greatest common divisor of all the subarray's elements are:
- [9,3,1,2,6,3]
- [9,3,1,2,6,3]
- [9,3,1,2,6,3]
- [9,3,1,2,6,3]


Example 2:

Input: nums = [4], k = 7
Output: 0
Explanation: There are no subarrays of nums where 7 is the greatest common divisor of all the subarray's elements.


 
Constraints:


	1 <= nums.length <= 1000
	1 <= nums[i], k <= 109

 */
