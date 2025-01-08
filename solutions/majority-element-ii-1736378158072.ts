function findElements(nums: number[]): number[] {
    let n = nums.length;
    let countMap: { [key: number]: number } = {};
    let result: number[] = [];

    for (let num of nums) {
        if (countMap[num]) {
            countMap[num]++;
        } else {
            countMap[num] = 1;
        }
    }

    for (let num in countMap) {
        if (countMap[num] > Math.floor(n / 3)) {
            result.push(parseInt(num));
        }
    }

    return result;
}

/*
question: Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

 
Example 1:

Input: nums = [3,2,3]
Output: [3]


Example 2:

Input: nums = [1]
Output: [1]


Example 3:

Input: nums = [1,2]
Output: [1,2]


 
Constraints:


	1 <= nums.length <= 5 * 104
	-109 <= nums[i] <= 109


 
Follow up: Could you solve the problem in linear time and in O(1) space?
 */
