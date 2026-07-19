class Graph {
    private adjList: Map<number, number[]>;
    private colorCount: Map<string, number[]>;
    private visited: boolean[];
    private onStack: boolean[];
    private hasCycle: boolean;

    constructor(private nodes: string[], private edges: number[][]) {
        this.adjList = new Map<number, number[]>();
        this.colorCount = new Map<string, number[]>();
        this.visited = new Array<boolean>(nodes.length).fill(false);
        this.onStack = new Array<boolean>(nodes.length).fill(false);
        this.hasCycle = false;

        for (let i = 0; i < nodes.length; i++) {
            this.adjList.set(i, []);
            this.colorCount.set(nodes[i], new Array<number>(nodes.length).fill(0));
        }

        for (let [from, to] of edges) {
            this.adjList.get(from)!.push(to);
        }
    }

    private dfs(v: number): void {
        if (this.hasCycle) return;

        this.visited[v] = true;
        this.onStack[v] = true;

        for (let w of this.adjList.get(v)!) {
            if (!this.visited[w]) {
                this.colorCount.get(this.nodes[w])![w] = this.colorCount.get(this.nodes[v])![v] + 1;
                this.dfs(w);
            } else if (this.onStack[w]) {
                this.hasCycle = true;
            } else {
                this.colorCount.get(this.nodes[w])![w] = Math.max(
                    this.colorCount.get(this.nodes[w])![w],
                    this.colorCount.get(this.nodes[v])![v] + 1
                );
            }
        }

        this.onStack[v] = false;
    }

    public findLargestColorValue(): number {
        for (let i = 0; i < this.nodes.length; i++) {
            if (!this.visited[i]) {
                this.dfs(i);
            }
        }

        if (this.hasCycle) return -1;

        let maxColorValue = 0;
        for (let counts of this.colorCount.values()) {
            maxColorValue = Math.max(maxColorValue, ...counts);
        }

        return maxColorValue;
    }
}

function largestColorValue(colors: string, edges: number[][]): number {
    const graph = new Graph(colors.split(''), edges);
    return graph.findLargestColorValue();
}

/*
question: There is a directed graph of n colored nodes and m edges. The nodes are numbered from 0 to n - 1.

You are given a string colors where colors[i] is a lowercase English letter representing the color of the ith node in this graph (0-indexed). You are also given a 2D array edges where edges[j] = [aj, bj] indicates that there is a directed edge from node aj to node bj.

A valid path in the graph is a sequence of nodes x1 -> x2 -> x3 -> ... -> xk such that there is a directed edge from xi to xi+1 for every 1 <= i < k. The color value of the path is the number of nodes that are colored the most frequently occurring color along that path.

Return the largest color value of any valid path in the given graph, or -1 if the graph contains a cycle.

 
Example 1:



Input: colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]
Output: 3
Explanation: The path 0 -> 2 -> 3 -> 4 contains 3 nodes that are colored "a" (red in the above image).


Example 2:



Input: colors = "a", edges = [[0,0]]
Output: -1
Explanation: There is a cycle from 0 to 0.


 
Constraints:


	n == colors.length
	m == edges.length
	1 <= n <= 105
	0 <= m <= 105
	colors consists of lowercase English letters.
	0 <= aj, bj < n

 */
