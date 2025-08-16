function minStabilityFactor(nums: number[], maxC: number): number {
    const n = nums.length;
    let minFactor = n;
    let maxFactor = 0;
    for (let i = 0; i < n; i++) {
        let count = 0;
        for (let j = i; j < n; j++) {
            if (nums[j] % nums[i] === 0) {
                count++;
            }
        }
        maxFactor = Math.max(maxFactor, count);
        if (count <= maxC) {
            minFactor = Math.min(minFactor, count);
        }
    }
    return maxFactor - minFactor;
}

/*
question: You are given an integer array nums and an integer maxC.

A subarray is called stable if the highest common factor (HCF) of all its elements is greater than or equal to 2.

The stability factor of an array is defined as the length of its longest stable subarray.

You may modify at most maxC elements of the array to any integer.

Return the minimum possible stability factor of the array after at most maxC modifications. If no stable subarray remains, return 0.

Note:


	The highest common factor (HCF) of an array is the largest integer that evenly divides all the array elements.
	A subarray of length 1 is stable if its only element is greater than or equal to 2, since HCF([x]) = x.


 

 
Example 1:


Input: nums = [3,5,10], maxC = 1

Output: 1

Explanation:


	The stable subarray [5, 10] has HCF = 5, which has a stability factor of 2.
	Since maxC = 1, one optimal strategy is to change nums[1] to 7, resulting in nums = [3, 7, 10].
	Now, no subarray of length greater than 1 has HCF >= 2. Thus, the minimum possible stability factor is 1.



Example 2:


Input: nums = [2,6,8], maxC = 2

Output: 1

Explanation:


	The subarray [2, 6, 8] has HCF = 2, which has a stability factor of 3.
	Since maxC = 2, one optimal strategy is to change nums[1] to 3 and nums[2] to 5, resulting in nums = [2, 3, 5].
	Now, no subarray of length greater than 1 has HCF >= 2. Thus, the minimum possible stability factor is 1.



Example 3:


Input: nums = [2,4,9,6], maxC = 1

Output: 2

Explanation:


	The stable subarrays are:
	
		[2, 4] with HCF = 2 and stability factor of 2.
		[9, 6] with HCF = 3 and stability factor of 2.
	
	
	Since maxC = 1, the stability factor of 2 cannot be reduced due to two separate stable subarrays. Thus, the minimum possible stability factor is 2.



 
Constraints:


	1 <= n == nums.length <= 105
	1 <= nums[i] <= 109
	0 <= maxC <= n

 */
