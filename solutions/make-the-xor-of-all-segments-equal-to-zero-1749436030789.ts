function minChanges(nums: number[], k: number): number {
    const maxNum = 1024; 
    const n = nums.length;
    const dp: number[][] = Array.from({ length: k + 1 }, () => Array(maxNum).fill(Number.MAX_SAFE_INTEGER));
    const count: number[][] = Array.from({ length: k + 1 }, () => Array(maxNum).fill(0));
    dp[0][0] = 0;
    for (let i = 0, sum = [0]; i < k; ++i) {
        const size = Math.floor((n - i + k - 1) / k);
        sum[i + 1] = sum[i] + size;
        const count2: number[] = Array(maxNum).fill(0);
        for (let j = i; j < n; j += k) {
            ++count2[nums[j]];
        }
        const minPrev = Math.min(...dp[i]);
        for (let j = 0; j < maxNum; ++j) {
            dp[i + 1][j] = minPrev + sum[i + 1];
            for (let l = 0; l <= i; ++l) {
                const p = j ^ nums[l];
                dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][p] + sum[i] - count[i][p]);
            }
            count[i + 1][j] = count2[j] + count[i][j ^ nums[i]];
        }
    }
    return dp[k][0];
}

/*
question: You are given an array nums​​​ and an integer k​​​​​. The XOR of a segment [left, right] where left <= right is the XOR of all the elements with indices between left and right, inclusive: nums[left] XOR nums[left+1] XOR ... XOR nums[right].

Return the minimum number of elements to change in the array such that the XOR of all segments of size k​​​​​​ is equal to zero.

 
Example 1:

Input: nums = [1,2,0,3,0], k = 1
Output: 3
Explanation: Modify the array from [1,2,0,3,0] to from [0,0,0,0,0].


Example 2:

Input: nums = [3,4,5,2,1,7,3,4,7], k = 3
Output: 3
Explanation: Modify the array from [3,4,5,2,1,7,3,4,7] to [3,4,7,3,4,7,3,4,7].


Example 3:

Input: nums = [1,2,4,1,2,5,1,2,6], k = 3
Output: 3
Explanation: Modify the array from [1,2,4,1,2,5,1,2,6] to [1,2,3,1,2,3,1,2,3].

 
Constraints:


	1 <= k <= nums.length <= 2000
	​​​​​​0 <= nums[i] < 210

 */
