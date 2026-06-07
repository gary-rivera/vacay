type Fraction = [number, number];

class PriorityQueue {
    private heap: Fraction[] = [];
    private comparator: (a: Fraction, b: Fraction) => boolean;

    constructor(comparator = (a: Fraction, b: Fraction) => a[0] / a[1] > b[0] / b[1]) {
        this.comparator = comparator;
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.size() == 0;
    }

    peek() {
        return this.heap[0];
    }

    push(value: Fraction) {
        this.heap.push(value);
        this.siftUp();
        return this.size();
    }

    pop() {
        const poppedValue = this.peek();
        const bottom = this.size() - 1;
        if (bottom > 0) {
            this.swap(0, bottom);
        }
        this.heap.pop();
        this.siftDown();
        return poppedValue;
    }

    private parent(i: number) {
        return ((i + 1) >>> 1) - 1;
    }

    private left(i: number) {
        return (i << 1) + 1;
    }

    private right(i: number) {
        return (i + 1) << 1;
    }

    private greater(i: number, j: number) {
        return this.comparator(this.heap[i], this.heap[j]);
    }

    private swap(i: number, j: number) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    private siftUp() {
        let node = this.size() - 1;
        while (node > 0 && this.greater(node, this.parent(node))) {
            this.swap(node, this.parent(node));
            node = this.parent(node);
        }
    }

    private siftDown() {
        let node = 0;
        while (
            (this.left(node) < this.size() && this.greater(this.left(node), node)) ||
            (this.right(node) < this.size() && this.greater(this.right(node), node))
        ) {
            let maxChild = (this.right(node) < this.size() && this.greater(this.right(node), this.left(node))) ? this.right(node) : this.left(node);
            this.swap(node, maxChild);
            node = maxChild;
        }
    }
}

function kthSmallestPrimeFraction(arr: number[], k: number): Fraction {
    const pq = new PriorityQueue((a, b) => a[0] / a[1] < b[0] / b[1]);
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
        pq.push([arr[i], arr[n - 1], n - 1]);
    }

    for (let i = 0; i < k - 1; i++) {
        const [numerator, denominator, idx] = pq.pop() as Fraction & [number];
        if (denominator > arr[idx - 1]) {
            pq.push([numerator, arr[idx - 1], idx - 1]);
        }
    }

    return pq.pop() as Fraction;
}

/*
question: You are given a sorted integer array arr containing 1 and prime numbers, where all the integers of arr are unique. You are also given an integer k.

For every i and j where 0 <= i < j < arr.length, we consider the fraction arr[i] / arr[j].

Return the kth smallest fraction considered. Return your answer as an array of integers of size 2, where answer[0] == arr[i] and answer[1] == arr[j].

 
Example 1:

Input: arr = [1,2,3,5], k = 3
Output: [2,5]
Explanation: The fractions to be considered in sorted order are:
1/5, 1/3, 2/5, 1/2, 3/5, and 2/3.
The third fraction is 2/5.


Example 2:

Input: arr = [1,7], k = 1
Output: [1,7]


 
Constraints:


	2 <= arr.length <= 1000
	1 <= arr[i] <= 3 * 104
	arr[0] == 1
	arr[i] is a prime number for i > 0.
	All the numbers of arr are unique and sorted in strictly increasing order.
	1 <= k <= arr.length * (arr.length - 1) / 2


 
Follow up: Can you solve the problem with better than O(n2) complexity? */
