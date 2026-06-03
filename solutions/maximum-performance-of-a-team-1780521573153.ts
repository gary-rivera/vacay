function maxPerformance(n: number, speed: number[], efficiency: number[], k: number): number {
    const MOD = 1e9 + 7;
    let res = 0, sum = 0;
    const engineers = Array.from({length: n}, (_, i) => [speed[i], efficiency[i]]);
    engineers.sort((a, b) => b[1] - a[1]);
    const heap = new MinHeap();
    for (let [s, e] of engineers) {
        if (heap.size() < k) {
            heap.push(s);
            sum += s;
        } else if (s > heap.peek()) {
            sum += s - heap.pop();
            heap.push(s);
        }
        res = Math.max(res, sum * e);
    }
    return res % MOD;
}

class MinHeap {
    private heap: number[];

    constructor() {
        this.heap = [];
    }

    public push(val: number): void {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }

    public pop(): number {
        const max = this.heap[0];
        const end = this.heap.pop()!;
        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.sinkDown(0);
        }
        return max;
    }

    public peek(): number {
        return this.heap[0];
    }

    public size(): number {
        return this.heap.length;
    }

    private bubbleUp(n: number): void {
        let idx = n, element = this.heap[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.heap[parentIdx];
            if (element >= parent) break;
            this.heap[idx] = parent;
            this.heap[parentIdx] = element;
            idx = parentIdx;
        }
    }

    private sinkDown(n: number): void {
        let idx = n, length = this.heap.length, element = this.heap[idx], childIdx, swap, leftChild, rightChild;

        while (true) {
            swap = null;
            childIdx = 2 * idx + 1;
            if (childIdx < length) {
                leftChild = this.heap[childIdx];
                if (leftChild < element) swap = childIdx;
            }
            if (childIdx + 1 < length) {
                rightChild = this.heap[childIdx + 1];
                if ((swap !== null && rightChild < leftChild) || (swap === null && rightChild < element)) swap = childIdx + 1;
            }
            if (swap === null) break;
            this.heap[idx] = this.heap[swap];
            this.heap[swap] = element;
            idx = swap;
        }
    }
}

/*
question: You are given two integers n and k and two integer arrays speed and efficiency both of length n. There are n engineers numbered from 1 to n. speed[i] and efficiency[i] represent the speed and efficiency of the ith engineer respectively.

Choose at most k different engineers out of the n engineers to form a team with the maximum performance.

The performance of a team is the sum of its engineers' speeds multiplied by the minimum efficiency among its engineers.

Return the maximum performance of this team. Since the answer can be a huge number, return it modulo 109 + 7.

 
Example 1:

Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 2
Output: 60
Explanation: 
We have the maximum performance of the team by selecting engineer 2 (with speed=10 and efficiency=4) and engineer 5 (with speed=5 and efficiency=7). That is, performance = (10 + 5) * min(4, 7) = 60.


Example 2:

Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 3
Output: 68
Explanation:
This is the same example as the first but k = 3. We can select engineer 1, engineer 2 and engineer 5 to get the maximum performance of the team. That is, performance = (2 + 10 + 5) * min(5, 4, 7) = 68.


Example 3:

Input: n = 6, speed = [2,10,3,1,5,8], efficiency = [5,4,3,9,7,2], k = 4
Output: 72


 
Constraints:


	1 <= k <= n <= 105
	speed.length == n
	efficiency.length == n
	1 <= speed[i] <= 105
	1 <= efficiency[i] <= 108

 */
