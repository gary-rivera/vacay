function maximumSum(arr: number[]): number {
    let n = arr.length;
    let maxEnding = new Array(n).fill(0);
    let maxStarting = new Array(n).fill(0);
    let maxSoFar = arr[0];
    maxEnding[0] = arr[0];
    maxStarting[n - 1] = arr[n - 1];

    for (let i = 1; i < n; i++) {
        maxEnding[i] = Math.max(arr[i], maxEnding[i - 1] + arr[i]);
        maxSoFar = Math.max(maxSoFar, maxEnding[i]);
    }

    for (let i = n - 2; i >= 0; i--) {
        maxStarting[i] = Math.max(arr[i], maxStarting[i + 1] + arr[i]);
    }

    for (let i = 1; i < n - 1; i++) {
        maxSoFar = Math.max(maxSoFar, maxEnding[i - 1] + maxStarting[i + 1]);
    }

    return maxSoFar;
}

/*
question: Given an array of integers, return the maximum sum for a non-empty subarray (contiguous elements) with at most one element deletion. In other words, you want to choose a subarray and optionally delete one element from it so that there is still at least one element left and the sum of the remaining elements is maximum possible.

Note that the subarray needs to be non-empty after deleting one element.

 
Example 1:

Input: arr = [1,-2,0,3]
Output: 4
Explanation: Because we can choose [1, -2, 0, 3] and drop -2, thus the subarray [1, 0, 3] becomes the maximum value.

Example 2:

Input: arr = [1,-2,-2,3]
Output: 3
Explanation: We just choose [3] and it's the maximum sum.


Example 3:

Input: arr = [-1,-1,-1,-1]
Output: -1
Explanation: The final subarray needs to be non-empty. You can't choose [-1] and delete -1 from it, then get an empty subarray to make the sum equals to 0.


 
Constraints:


	1 <= arr.length <= 105
	-104 <= arr[i] <= 104

 */
