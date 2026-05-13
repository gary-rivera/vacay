function minOperations(nums1: number[], nums2: number[], k: number): number {
    let diff = 0;
    for (let i = 0; i < nums1.length; i++) {
        diff += nums1[i] - nums2[i];
    }
    if (diff % k !== 0) {
        return -1;
    }
    diff = Math.abs(diff / k);
    let count = 0;
    let i = 0;
    let j = nums1.length - 1;
    nums1.sort((a, b) => a - b);
    nums2.sort((a, b) => a - b);
    while (diff > 0 && i < nums1.length && j >= 0) {
        if (nums1[i] < nums2[j]) {
            let temp = Math.min(diff, Math.floor((nums2[j] - nums1[i]) / k));
            nums1[i] += temp * k;
            diff -= temp;
            count += temp;
            if (nums1[i] >= nums2[j]) {
                j--;
            }
        } else {
            let temp = Math.min(diff, Math.floor((nums1[i] - nums2[j]) / k));
            nums1[i] -= temp * k;
            diff -= temp;
            count += temp;
            if (nums1[i] <= nums2[j]) {
                i++;
            }
        }
    }
    return diff === 0 ? count : -1;
}

/*
question: You are given two integer arrays nums1 and nums2 of equal length n and an integer k. You can perform the following operation on nums1:


	Choose two indexes i and j and increment nums1[i] by k and decrement nums1[j] by k. In other words, nums1[i] = nums1[i] + k and nums1[j] = nums1[j] - k.


nums1 is said to be equal to nums2 if for all indices i such that 0 <= i < n, nums1[i] == nums2[i].

Return the minimum number of operations required to make nums1 equal to nums2. If it is impossible to make them equal, return -1.

 
Example 1:

Input: nums1 = [4,3,1,4], nums2 = [1,3,7,1], k = 3
Output: 2
Explanation: In 2 operations, we can transform nums1 to nums2.
1st operation: i = 2, j = 0. After applying the operation, nums1 = [1,3,4,4].
2nd operation: i = 2, j = 3. After applying the operation, nums1 = [1,3,7,1].
One can prove that it is impossible to make arrays equal in fewer operations.

Example 2:

Input: nums1 = [3,8,5,2], nums2 = [2,4,1,6], k = 1
Output: -1
Explanation: It can be proved that it is impossible to make the two arrays equal.


 
Constraints:


	n == nums1.length == nums2.length
	2 <= n <= 105
	0 <= nums1[i], nums2[j] <= 109
	0 <= k <= 105

 */
