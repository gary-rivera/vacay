function findMaxXOR(nums: number[]): number {
    let max = 0, mask = 0;
    for (let i = 31; i >= 0; i--) {
        mask = mask | (1 << i);
        let set = new Set();
        for (let num of nums) {
            set.add(num & mask);
        }
        let temp = max | (1 << i);
        for (let prefix of set) {
            if (set.has(temp ^ prefix)) {
                max = temp;
                break;
            }
        }
    }
    return max;
}

/*
question: Given an integer array nums, return the maximum result of nums[i] XOR nums[j], where 0 <= i <= j < n.

 
Example 1:

Input: nums = [3,10,5,25,2,8]
Output: 28
Explanation: The maximum result is 5 XOR 25 = 28.


Example 2:

Input: nums = [14,70,53,83,49,91,36,80,92,51,66,70]
Output: 127


 
Constraints:


	1 <= nums.length <= 2 * 105
	0 <= nums[i] <= 231 - 1

 */
