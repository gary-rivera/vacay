type Edge = [number, number, number];

class MaxHeap {
    private heap: Edge[];
    private size: number;

    constructor() {
        this.heap = [];
        this.size = 0;
    }

    public insert(edge: Edge) {
        this.heap.push(edge);
        this.size++;
        this.bubbleUp();
    }

    public extractMax(): Edge {
        const max = this.heap[0];
        const end = this.heap.pop();
        this.size--;
        if (this.size > 0) {
            this.heap[0] = end!;
            this.sinkDown();
        }
        return max;
    }

    private bubbleUp() {
        let index = this.size - 1;
        while (index > 0) {
            const element = this.heap[index];
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.heap[parentIndex];
            if (parent[2] >= element[2]) break;
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex;
        }
    }

    private sinkDown() {
        let index = 0;
        const length = this.size;
        const element = this.heap[0];
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let swapIndex = null;
            let leftChild, rightChild;
            if (leftChildIndex < length) {
                leftChild = this.heap[leftChildIndex];
                if (leftChild[2] > element[2]) {
                    swapIndex = leftChildIndex;
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.heap[rightChildIndex];
                if (
                    (swapIndex === null && rightChild[2] > element[2]) ||
                    (swapIndex !== null && rightChild[2] > leftChild[2])
                ) {
                    swapIndex = rightChildIndex;
                }
            }
            if (swapIndex === null) break;
            this.heap[index] = this.heap[swapIndex];
            this.heap[swapIndex] = element;
            index = swapIndex;
        }
    }
}

function maxProbability(n: number, edges: number[][], succProb: number[], start: number, end: number): number {
    const graph: Map<number, Edge[]> = new Map();
    const maxHeap = new MaxHeap();
    const maxProb: number[] = Array(n).fill(0);
    maxProb[start] = 1;

    for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        const prob = succProb[i];
        if (!graph.has(a)) graph.set(a, []);
        if (!graph.has(b)) graph.set(b, []);
        graph.get(a)!.push([a, b, prob]);
        graph.get(b)!.push([b, a, prob]);
    }

    maxHeap.insert([start, start, 1]);

    while (maxHeap.size > 0) {
        const [prev, curr, prob] = maxHeap.extractMax();
        if (prob < maxProb[curr]) continue;
        for (const edge of graph.get(curr) || []) {
            const next = edge[1];
            const nextProb = maxProb[curr] * edge[2];
            if (nextProb > maxProb[next]) {
                maxProb[next] = nextProb;
                maxHeap.insert([curr, next, nextProb]);
            }
        }
    }

    return maxProb[end];
}

/*
question: You are given an undirected weighted graph of n nodes (0-indexed), represented by an edge list where edges[i] = [a, b] is an undirected edge connecting the nodes a and b with a probability of success of traversing that edge succProb[i].

Given two nodes start and end, find the path with the maximum probability of success to go from start to end and return its success probability.

If there is no path from start to end, return 0. Your answer will be accepted if it differs from the correct answer by at most 1e-5.

 
Example 1:



Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2
Output: 0.25000
Explanation: There are two paths from start to end, one having a probability of success = 0.2 and the other has 0.5 * 0.5 = 0.25.


Example 2:



Input: n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2
Output: 0.30000


Example 3:



Input: n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2
Output: 0.00000
Explanation: There is no path between 0 and 2.


 
Constraints:


	2 <= n <= 10^4
	0 <= start, end < n
	start != end
	0 <= a, b < n
	a != b
	0 <= succProb.length == edges.length <= 2*10^4
	0 <= succProb[i] <= 1
	There is at most one edge between every two nodes.

 */
