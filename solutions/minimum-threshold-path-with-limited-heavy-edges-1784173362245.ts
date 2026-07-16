type Edge = [number, number, number];

class PriorityQueue {
    private queue: Edge[];

    constructor() {
        this.queue = [];
    }

    enqueue(edge: Edge) {
        this.queue.push(edge);
        this.queue.sort((a, b) => b[2] - a[2]);
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

function minimumThreshold(n: number, edges: Edge[], source: number, target: number, k: number): number {
    const adjList: Edge[][] = Array(n).fill(0).map(() => []);
    for (let [u, v, w] of edges) {
        adjList[u].push([v, u, w]);
        adjList[v].push([u, v, w]);
    }

    const dist: number[] = Array(n).fill(Infinity);
    const heavyEdges: number[] = Array(n).fill(Infinity);
    dist[source] = 0;
    heavyEdges[source] = 0;

    const pq = new PriorityQueue();
    pq.enqueue([source, -1, 0]);

    while (!pq.isEmpty()) {
        const [node, prev, weight] = pq.dequeue() as Edge;
        if (node === target) return weight;
        if (dist[node] < weight) continue;
        for (let edge of adjList[node]) {
            const [nextNode, _, nextWeight] = edge;
            const heavy = Math.max(weight, nextWeight);
            if (heavy < dist[nextNode] || (heavy === dist[nextNode] && heavyEdges[node] + 1 <= k)) {
                dist[nextNode] = heavy;
                heavyEdges[nextNode] = heavyEdges[node] + (nextWeight > weight ? 1 : 0);
                pq.enqueue([nextNode, node, heavy]);
            }
        }
    }

    return -1;
}

/*
question: There is an undirected weighted graph with n nodes labeled from 0 to n - 1.

The graph is represented by a 2D integer array edges, where each edge edges[i] = [ui, vi, w​​​​​​​i] indicates that there is an undirected edge between nodes ui and vi with weight w​​​​​​​i.

You are also given integers source, target and k.

A threshold value determines whether an edge is considered light or heavy:


	
	An edge is light if its weight is less than or equal to threshold.
	
	
	An edge is heavy if its weight is greater than threshold.
	


A path from source to target is valid if it contains at most k heavy edges.

Return the minimum integer threshold such that at least one valid path exists from source to target. If no such path exists, return -1.

 
Example 1:​​​​​​​​​​​​​​

​​​​​​​


Input: n = 6, edges = [[0,1,5],[1,2,3],[3,4,4],[4,5,1],[1,4,2]], source = 0, target = 3, k = 1

Output: 4

Explanation:

The minimum threshold such that a path from node 0 to node 3 uses at most 1 heavy edge is 4.


	
	Light edges: [1, 2, 3], [3, 4, 4], [4, 5, 1], [1, 4, 2]
	
	
	Heavy edges: [0, 1, 5]
	


A valid path is 0 → 1 → 4 → 3. It uses only 1 heavy edge ([0, 1, 5]), which satisfies the limit k = 1.

Any smaller threshold would make it impossible to reach node 3 without exceeding 1 heavy edge.


Example 2:




Input: n = 6, edges = [[0,1,3],[1,2,4],[3,4,5],[4,5,6]], source = 0, target = 4, k = 1

Output: -1

Explanation:

There is no path from node 0 to node 4. Since the target cannot be reached, the output is -1.


Example 3:




Input: n = 4, edges = [[0,1,2],[1,2,2],[2,3,2],[3,0,2]], source = 0, target = 0, k = 0

Output: 0

Explanation:

The source and target are the same node. No edges need to be traversed, so the minimum threshold is 0.


 
Constraints:


	1 <= n <= 103​​​​​​​
	0 <= edges.length <= 103​​​​​​​
	edges[i] = [ui, vi, wi]
	0 <= ui, vi​​​​​​​ <= n - 1
	1 <= wi​​​​​​​ <= 109
	0 <= source, target <= n - 1
	0 <= k <= edges.length

 */
