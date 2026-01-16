type Edge = [number, number, number];

class MaxHeap {
    private heap: Edge[];
    private size: number;

    constructor() {
        this.heap = [];
        this.size = 0;
    }

    public insert(edge: Edge): void {
        this.heap.push(edge);
        this.size++;
        this.bubbleUp();
    }

    public extractMax(): Edge | undefined {
        if (this.size === 0) return undefined;
        this.swap(0, this.size - 1);
        const max = this.heap.pop();
        this.size--;
        this.bubbleDown();
        return max;
    }

    private bubbleUp(): void {
        let current = this.size - 1;
        while (current > 0) {
            const parent = Math.floor((current - 1) / 2);
            if (this.heap[current][2] <= this.heap[parent][2]) break;
            this.swap(current, parent);
            current = parent;
        }
    }

    private bubbleDown(): void {
        let parent = 0;
        while (true) {
            const left = 2 * parent + 1;
            const right = 2 * parent + 2;
            let largest = parent;
            if (left < this.size && this.heap[left][2] > this.heap[largest][2]) largest = left;
            if (right < this.size && this.heap[right][2] > this.heap[largest][2]) largest = right;
            if (largest !== parent) {
                this.swap(parent, largest);
                parent = largest;
            } else {
                break;
            }
        }
    }

    private swap(i: number, j: number): void {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
}

function maxProbability(n: number, edges: number[][], succProb: number[], start: number, end: number): number {
    const graph: Map<number, Edge[]> = new Map();
    for (let i = 0; i < edges.length; i++) {
        const [a, b] = edges[i];
        if (!graph.has(a)) graph.set(a, []);
        if (!graph.has(b)) graph.set(b, []);
        graph.get(a)!.push([a, b, succProb[i]]);
        graph.get(b)!.push([b, a, succProb[i]]);
    }

    const maxHeap = new MaxHeap();
    const probabilities = new Array(n).fill(0);
    probabilities[start] = 1;
    maxHeap.insert([start, start, 1]);

    while (maxHeap.size > 0) {
        const [prev, current, prob] = maxHeap.extractMax()!;
        if (prob < probabilities[current]) continue;
        for (const edge of graph.get(current) || []) {
            const next = edge[1];
            const nextProb = probabilities[current] * edge[2];
            if (nextProb > probabilities[next]) {
                probabilities[next] = nextProb;
                maxHeap.insert([current, next, nextProb]);
            }
        }
    }

    return probabilities[end];
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
