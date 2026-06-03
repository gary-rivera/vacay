function maxWidthRamp(nums: number[]): number {
    let n = nums.length;
    let ans = 0;
    let m = new Map<number, number>();
    m.set(nums[n - 1], n - 1);
    for (let i = n - 2; i >= 0; --i) {
        if (nums[i] > nums[m.values().next().value]) {
            m.set(nums[i], i);
        } else {
            let l = 0, r = m.size;
            while (l < r) {
                let mid = (l + r) >> 1;
                if (Array.from(m.keys())[mid] > nums[i]) {
                    l = mid + 1;
                } else {
                    r = mid;
                }
            }
            ans = Math.max(ans, Array.from(m.values())[l] - i);
        }
    }
    return ans;
}

/*
question: A ramp in an integer array nums is a pair (i, j) for which i < j and nums[i] <= nums[j]. The width of such a ramp is j - i.

Given an integer array nums, return the maximum width of a ramp in nums. If there is no ramp in nums, return 0.

 
Example 1:

Input: nums = [6,0,8,2,1,5]
Output: 4
Explanation: The maximum width ramp is achieved at (i, j) = (1, 5): nums[1] = 0 and nums[5] = 5.


Example 2:

Input: nums = [9,8,1,0,1,9,4,0,4,1]
Output: 7
Explanation: The maximum width ramp is achieved at (i, j) = (2, 9): nums[2] = 1 and nums[9] = 1.


 
Constraints:


	2 <= nums.length <= 5 * 104
	0 <= nums[i] <= 5 * 104

 */
