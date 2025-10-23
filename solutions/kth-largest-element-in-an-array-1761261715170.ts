class Solution {
    findKthLargest(nums: number[], k: number): number {
        let minHeap: number[] = nums.slice(0, k);
        minHeap = this.buildHeap(minHeap);

        for (let i = k; i < nums.length; i++) {
            if (nums[i] > minHeap[0]) {
                minHeap[0] = nums[i];
                this.heapify(minHeap, 0);
            }
        }

        return minHeap[0];
    }

    buildHeap(nums: number[]): number[] {
        let i = Math.floor(nums.length / 2 - 1);
        while (i >= 0) {
            this.heapify(nums, i);
            i--;
        }
        return nums;
    }

    heapify(nums: number[], i: number): void {
        let smallest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < nums.length && nums[left] < nums[smallest]) {
            smallest = left;
        }

        if (right < nums.length && nums[right] < nums[smallest]) {
            smallest = right;
        }

        if (smallest !== i) {
            [nums[i], nums[smallest]] = [nums[smallest], nums[i]];
            this.heapify(nums, smallest);
        }
    }
}

let solution = new Solution();
console.log(solution.findKthLargest([3,2,1,5,6,4], 2)); // Output: 5
console.log(solution.findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // Output: 4

/*
question: Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

 
Example 1:
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

 
Constraints:


	1 <= k <= nums.length <= 105
	-104 <= nums[i] <= 104

 */
