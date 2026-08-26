function minOperations(nums1: number[], nums2: number[]): number {
    const n = nums1.length;
    const pos = new Array(n + 1).fill(0);
    for (let i = 0; i < n; ++i) {
        pos[nums1[i]] = i + 1;
    }
    nums2 = nums2.map(num => pos[num]);
    const dp = new Array(n + 1).fill(0);
    for (const num of nums2) {
        let idx = binarySearch(dp, num, 1, dp[0]);
        dp[idx] = num;
        if (idx > dp[0]) {
            dp[0] = idx;
        }
    }
    return n - dp[0];
}

function binarySearch(dp: number[], target: number, lo: number, hi: number): number {
    while (lo < hi) {
        const mid = lo + ((hi - lo) >> 1);
        if (dp[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
}

/*
question: You are given two integer arrays nums1 and nums2, each of length n. You may perform the following split-and-merge operation on nums1 any number of times:


	Choose a subarray nums1[L..R].
	Remove that subarray, leaving the prefix nums1[0..L-1] (empty if L = 0) and the suffix nums1[R+1..n-1] (empty if R = n - 1).
	Re-insert the removed subarray (in its original order) at any position in the remaining array (i.e., between any two elements, at the very start, or at the very end).


Return the minimum number of split-and-merge operations needed to transform nums1 into nums2.

 
Example 1:


Input: nums1 = [3,1,2], nums2 = [1,2,3]

Output: 1

Explanation:


	Split out the subarray [3] (L = 0, R = 0); the remaining array is [1,2].
	Insert [3] at the end; the array becomes [1,2,3].



Example 2:


Input: nums1 = [1,1,2,3,4,5], nums2 = [5,4,3,2,1,1]

Output: 3

Explanation:


	Remove [1,1,2] at indices 0 - 2; remaining is [3,4,5]; insert [1,1,2] at position 2, resulting in [3,4,1,1,2,5].
	Remove [4,1,1] at indices 1 - 3; remaining is [3,2,5]; insert [4,1,1] at position 3, resulting in [3,2,5,4,1,1].
	Remove [3,2] at indices 0 - 1; remaining is [5,4,1,1]; insert [3,2] at position 2, resulting in [5,4,3,2,1,1].



 
Constraints:


	2 <= n == nums1.length == nums2.length <= 6
	-105 <= nums1[i], nums2[i] <= 105
	nums2 is a permutation of nums1.

 */
