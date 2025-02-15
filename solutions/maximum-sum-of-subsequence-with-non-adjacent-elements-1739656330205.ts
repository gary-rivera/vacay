class Solution {
    private mod = 1e9 + 7;
    private nums: number[];
    private tree: number[];

    public maxSum(nums: number[], queries: number[][]): number {
        this.nums = nums;
        this.tree = new Array(nums.length * 4).fill(0);
        this.build(0, nums.length - 1, 0);
        let res = 0;
        for (let [pos, val] of queries) {
            this.update(pos, val, 0, nums.length - 1, 0);
            res = (res + this.tree[0]) % this.mod;
        }
        return res;
    }

    private build(l: number, r: number, idx: number): void {
        if (l === r) {
            this.tree[idx] = this.nums[l];
            return;
        }
        let mid = l + ((r - l) >> 1);
        this.build(l, mid, idx * 2 + 1);
        this.build(mid + 1, r, idx * 2 + 2);
        this.tree[idx] = Math.max(this.tree[idx * 2 + 1], this.tree[idx * 2 + 2]);
    }

    private update(pos: number, val: number, l: number, r: number, idx: number): void {
        if (l === r) {
            this.tree[idx] = val;
            return;
        }
        let mid = l + ((r - l) >> 1);
        if (pos <= mid) {
            this.update(pos, val, l, mid, idx * 2 + 1);
        } else {
            this.update(pos, val, mid + 1, r, idx * 2 + 2);
        }
        this.tree[idx] = Math.max(this.tree[idx * 2 + 1], this.tree[idx * 2 + 2]);
    }
}

let solution = new Solution();
console.log(solution.maxSum([3,5,9], [[1,-2],[0,-3]])); // Output: 21
console.log(solution.maxSum([0,-1], [[0,-5]])); // Output: 0

/*
question: You are given an array nums consisting of integers. You are also given a 2D array queries, where queries[i] = [posi, xi].

For query i, we first set nums[posi] equal to xi, then we calculate the answer to query i which is the maximum sum of a subsequence of nums where no two adjacent elements are selected.

Return the sum of the answers to all queries.

Since the final answer may be very large, return it modulo 109 + 7.

A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

 
Example 1:


Input: nums = [3,5,9], queries = [[1,-2],[0,-3]]

Output: 21

Explanation:
After the 1st query, nums = [3,-2,9] and the maximum sum of a subsequence with non-adjacent elements is 3 + 9 = 12.
After the 2nd query, nums = [-3,-2,9] and the maximum sum of a subsequence with non-adjacent elements is 9.


Example 2:


Input: nums = [0,-1], queries = [[0,-5]]

Output: 0

Explanation:
After the 1st query, nums = [-5,-1] and the maximum sum of a subsequence with non-adjacent elements is 0 (choosing an empty subsequence).


 
Constraints:


	1 <= nums.length <= 5 * 104
	-105 <= nums[i] <= 105
	1 <= queries.length <= 5 * 104
	queries[i] == [posi, xi]
	0 <= posi <= nums.length - 1
	-105 <= xi <= 105

 */
