function findBestValue(arr: number[], target: number): number {
    arr.sort((a, b) => a - b);
    let right = arr[arr.length - 1];
    let left = 0;
    while (left < right) {
        let mid = Math.floor((left + right + 1) / 2);
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i] > mid ? mid : arr[i];
        }
        if (sum > target) {
            right = mid - 1;
        } else {
            left = mid;
        }
    }
    let sum1 = 0;
    let sum2 = 0;
    for (let i = 0; i < arr.length; i++) {
        sum1 += arr[i] > left ? left : arr[i];
        sum2 += arr[i] > left + 1 ? left + 1 : arr[i];
    }
    return Math.abs(sum1 - target) <= Math.abs(sum2 - target) ? left : left + 1;
}

/*
question: Given an integer array arr and a target value target, return the integer value such that when we change all the integers larger than value in the given array to be equal to value, the sum of the array gets as close as possible (in absolute difference) to target.

In case of a tie, return the minimum such integer.

Notice that the answer is not neccesarilly a number from arr.

 
Example 1:

Input: arr = [4,9,3], target = 10
Output: 3
Explanation: When using 3 arr converts to [3, 3, 3] which sums 9 and that's the optimal answer.


Example 2:

Input: arr = [2,3,5], target = 10
Output: 5


Example 3:

Input: arr = [60864,25176,27249,21296,20204], target = 56803
Output: 11361


 
Constraints:


	1 <= arr.length <= 104
	1 <= arr[i], target <= 105

 */
