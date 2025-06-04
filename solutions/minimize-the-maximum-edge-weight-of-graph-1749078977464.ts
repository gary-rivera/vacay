type Edge = [number, number, number];

class UnionFind {
    parent: number[];
    rank: number[];

    constructor(n: number) {
        this.parent = Array(n).fill(0).map((_, index) => index);
        this.rank = Array(n).fill(0);
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x: number, y: number): void {
        const rootX = this.find(x);
        const rootY = this.find(y);
        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
        }
    }
}

function minimumEdgeWeight(n: number, edges: Edge[], threshold: number): number {
    edges.sort((a, b) => a[2] - b[2]);
    const uf = new UnionFind(n);
    const graph: Edge[][] = Array(n).fill(0).map(() => []);
    for (const [u, v, w] of edges) {
        if (uf.find(u) !== uf.find(v)) {
            uf.union(u, v);
            graph[u].push([v, w]);
            graph[v].push([u, w]);
            if (graph[u].length > threshold || graph[v].length > threshold) {
                return -1;
            }
        }
    }
    for (let i = 1; i < n; i++) {
        if (uf.find(i) !== uf.find(0)) {
            return -1;
        }
    }
    return Math.max(...edges.map(edge => edge[2]));
}

/*
question: You are given two integers, n and threshold, as well as a directed weighted graph of n nodes numbered from 0 to n - 1. The graph is represented by a 2D integer array edges, where edges[i] = [Ai, Bi, Wi] indicates that there is an edge going from node Ai to node Bi with weight Wi.

You have to remove some edges from this graph (possibly none), so that it satisfies the following conditions:


	Node 0 must be reachable from all other nodes.
	The maximum edge weight in the resulting graph is minimized.
	Each node has at most threshold outgoing edges.


Return the minimum possible value of the maximum edge weight after removing the necessary edges. If it is impossible for all conditions to be satisfied, return -1.

 
Example 1:


Input: n = 5, edges = [[1,0,1],[2,0,2],[3,0,1],[4,3,1],[2,1,1]], threshold = 2

Output: 1

Explanation:



Remove the edge 2 -> 0. The maximum weight among the remaining edges is 1.


Example 2:


Input: n = 5, edges = [[0,1,1],[0,2,2],[0,3,1],[0,4,1],[1,2,1],[1,4,1]], threshold = 1

Output: -1

Explanation: 

It is impossible to reach node 0 from node 2.


Example 3:


Input: n = 5, edges = [[1,2,1],[1,3,3],[1,4,5],[2,3,2],[3,4,2],[4,0,1]], threshold = 1

Output: 2

Explanation: 



Remove the edges 1 -> 3 and 1 -> 4. The maximum weight among the remaining edges is 2.


Example 4:


Input: n = 5, edges = [[1,2,1],[1,3,3],[1,4,5],[2,3,2],[4,0,1]], threshold = 1

Output: -1


 
Constraints:


	2 <= n <= 105
	1 <= threshold <= n - 1
	1 <= edges.length <= min(105, n * (n - 1) / 2).
	edges[i].length == 3
	0 <= Ai, Bi < n
	Ai != Bi
	1 <= Wi <= 106
	There may be multiple edges between a pair of nodes, but they must have unique weights.

 */
