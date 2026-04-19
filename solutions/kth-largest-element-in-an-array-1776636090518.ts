function findKthLargest(nums: number[], k: number): number {
    let minHeap: number[] = nums.slice(0, k);
    minHeapify(minHeap);

    for (let i = k; i < nums.length; i++) {
        if (nums[i] > minHeap[0]) {
            minHeap[0] = nums[i];
            siftDown(minHeap, 0, k);
        }
    }

    return minHeap[0];
}

function minHeapify(nums: number[]): void {
    let i = Math.floor(nums.length / 2 - 1);

    while (i >= 0) {
        siftDown(nums, i, nums.length);
        i--;
    }
}

function siftDown(heap: number[], i: number, heapSize: number): void {
    let left = 2 * i + 1, right = 2 * i + 2, smallest = i;

    if (left < heapSize && heap[left] < heap[smallest]) {
        smallest = left;
    }

    if (right < heapSize && heap[right] < heap[smallest]) {
        smallest = right;
    }

    if (smallest !== i) {
        [heap[i], heap[smallest]] = [heap[smallest], heap[i]];
        siftDown(heap, smallest, heapSize);
    }
}

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
