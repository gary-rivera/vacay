function sortTransformedArray(nums: number[], a: number, b: number, c: number): number[] {
    let n = nums.length;
    let sorted = new Array(n);
    let i = 0, j = n - 1;
    let index = a >= 0 ? n - 1 : 0;
    while (i <= j) {
        if (a >= 0) {
            sorted[index--] = quad(nums[i], a, b, c) >= quad(nums[j], a, b, c) ? quad(nums[i++], a, b, c) : quad(nums[j--], a, b, c);
        } else {
            sorted[index++] = quad(nums[i], a, b, c) <= quad(nums[j], a, b, c) ? quad(nums[i++], a, b, c) : quad(nums[j--], a, b, c);
        }
    }
    return sorted;
}

function quad(x: number, a: number, b: number, c: number): number {
    return a * x * x + b * x + c;
}

/*
question: Given a sorted integer array nums and three integers a, b and c, apply a quadratic function of the form f(x) = ax2 + bx + c to each element nums[i] in the array, and return the array in a sorted order.

 
Example 1:
Input: nums = [-4,-2,2,4], a = 1, b = 3, c = 5
Output: [3,9,15,33]
Example 2:
Input: nums = [-4,-2,2,4], a = -1, b = 3, c = 5
Output: [-23,-5,1,7]

 
Constraints:


	1 <= nums.length <= 200
	-100 <= nums[i], a, b, c <= 100
	nums is sorted in ascending order.


 
Follow up: Could you solve it in O(n) time?
 */
