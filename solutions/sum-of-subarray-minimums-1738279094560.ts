function sumSubarrayMins(arr: number[]): number {
    let mod = Math.pow(10, 9) + 7;
    let stack: number[] = [];
    let prev: number[] = new Array(arr.length);
    let next: number[] = new Array(arr.length).fill(arr.length);

    for(let i = 0; i < arr.length; i++) {
        while(stack.length !== 0 && arr[i] < arr[stack[stack.length - 1]]) {
            next[stack.pop() as number] = i;
        }
        prev[i] = stack.length === 0 ? -1 : stack[stack.length - 1];
        stack.push(i);
    }

    let ans = 0;
    for(let i = 0; i < arr.length; i++) {
        ans = (ans + arr[i] * (i - prev[i]) * (next[i] - i)) % mod;
    }
    return ans;
}

/*
question: Given an array of integers arr, find the sum of min(b), where b ranges over every (contiguous) subarray of arr. Since the answer may be large, return the answer modulo 109 + 7.

 
Example 1:

Input: arr = [3,1,2,4]
Output: 17
Explanation: 
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
Sum is 17.


Example 2:

Input: arr = [11,81,94,43,3]
Output: 444


 
Constraints:


	1 <= arr.length <= 3 * 104
	1 <= arr[i] <= 3 * 104

 */
