class Solution {
    findKthLargest(nums: number[], k: number): number {
        let minHeap: number[] = [-Infinity];
        for (let i = 0; i < nums.length; i++) {
            this.heapPush(minHeap, nums[i]);
            if (minHeap.length > k + 1) {
                this.heapPop(minHeap);
            }
        }
        return this.heapPop(minHeap);
    }

    private heapPush(heap: number[], val: number): void {
        heap.push(val);
        let i = heap.length - 1;
        while (i > 1 && heap[Math.floor(i / 2)] > heap[i]) {
            [heap[i], heap[Math.floor(i / 2)]] = [heap[Math.floor(i / 2)], heap[i]];
            i = Math.floor(i / 2);
        }
    }

    private heapPop(heap: number[]): number {
        const poppedValue = heap[1];
        heap[1] = heap[heap.length - 1];
        heap.pop();
        let i = 1;
        while (true) {
            let j = Infinity;
            if (2 * i < heap.length && heap[2 * i] < heap[i]) {
                j = 2 * i;
            }
            if (2 * i + 1 < heap.length && heap[2 * i + 1] < heap[j]) {
                j = 2 * i + 1;
            }
            if (j === Infinity) break;
            [heap[i], heap[j]] = [heap[j], heap[i]];
            i = j;
        }
        return poppedValue;
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
