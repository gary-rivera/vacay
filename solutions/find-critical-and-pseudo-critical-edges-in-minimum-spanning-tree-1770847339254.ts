type Edge = [number, number, number, number];

function findCriticalAndPseudoCriticalEdges(n: number, edges: number[][]): number[][] {
    const m = edges.length;
    const sortedEdges: Edge[] = new Array(m);
    for (let i = 0; i < m; ++i) {
        sortedEdges[i] = [edges[i][0], edges[i][1], edges[i][2], i];
    }
    sortedEdges.sort((a, b) => a[2] - b[2]);

    // Calculate the MST value (the sum of weights in MST) of the original graph
    const MSTValue = MST(n, sortedEdges, m, -1, -1);

    const ans: number[][] = [[], []];
    for (let i = 0; i < m; ++i) {
        // Remove the i-th edge
        if (MST(n, sortedEdges, m, i, -1) > MSTValue) {
            ans[0].push(sortedEdges[i][3]);
            continue;
        }

        // Add the i-th edge
        if (MST(n, sortedEdges, m, -1, i) == MSTValue) {
            ans[1].push(sortedEdges[i][3]);
        }
    }
    return ans;
}

function MST(n: number, sortedEdges: Edge[], m: number, excludeEdge: number, includeEdge: number): number {
    const uf = new UnionFind(n);
    let value = 0;

    // If there is an edge to be included, add it to the MST
    if (includeEdge != -1) {
        uf.unite(sortedEdges[includeEdge][0], sortedEdges[includeEdge][1]);
        value += sortedEdges[includeEdge][2];
    }

    for (let i = 0; i < m; ++i) {
        if (i == excludeEdge) {
            continue;
        }
        const edge = sortedEdges[i];
        if (uf.unite(edge[0], edge[1])) {
            value += edge[2];
        }
    }

    // If the MST is not connected, return Infinity
    if (uf.setCount != 1) {
        return Infinity;
    }
    return value;
}

class UnionFind {
    parent: number[];
    size: number[];
    setCount: number;

    constructor(n: number) {
        this.parent = new Array(n).fill(0).map((element, index) => index);
        this.size = new Array(n).fill(1);
        this.setCount = n;
    }

    findset(x: number): number {
        if (this.parent[x] === x) {
            return x;
        }
        this.parent[x] = this.findset(this.parent[x]);
        return this.parent[x];
    }

    unite(a: number, b: number): boolean {
        let x = this.findset(a), y = this.findset(b);
        if (x === y) {
            return false;
        }
        if (this.size[x] < this.size[y]) {
            [x, y] = [y, x];
        }
        this.parent[y] = x;
        this.size[x] += this.size[y];
        --this.setCount;
        return true;
    }

    connected(a: number, b: number): boolean {
        const x = this.findset(a), y = this.findset(b);
        return x === y;
    }
}

/*
question: Given a weighted undirected connected graph with n vertices numbered from 0 to n - 1, and an array edges where edges[i] = [ai, bi, weighti] represents a bidirectional and weighted edge between nodes ai and bi. A minimum spanning tree (MST) is a subset of the graph's edges that connects all vertices without cycles and with the minimum possible total edge weight.

Find all the critical and pseudo-critical edges in the given graph's minimum spanning tree (MST). An MST edge whose deletion from the graph would cause the MST weight to increase is called a critical edge. On the other hand, a pseudo-critical edge is that which can appear in some MSTs but not all.

Note that you can return the indices of the edges in any order.

 
Example 1:



Input: n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]
Output: [[0,1],[2,3,4,5]]
Explanation: The figure above describes the graph.
The following figure shows all the possible MSTs:

Notice that the two edges 0 and 1 appear in all MSTs, therefore they are critical edges, so we return them in the first list of the output.
The edges 2, 3, 4, and 5 are only part of some MSTs, therefore they are considered pseudo-critical edges. We add them to the second list of the output.


Example 2:



Input: n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]
Output: [[],[0,1,2,3]]
Explanation: We can observe that since all 4 edges have equal weight, choosing any 3 edges from the given 4 will yield an MST. Therefore all 4 edges are pseudo-critical.


 
Constraints:


	2 <= n <= 100
	1 <= edges.length <= min(200, n * (n - 1) / 2)
	edges[i].length == 3
	0 <= ai < bi < n
	1 <= weighti <= 1000
	All pairs (ai, bi) are distinct.

 */
