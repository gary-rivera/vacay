class Solution {
    private id: number = 0;
    private ids: number[] = [];
    private low: number[] = [];
    private graph: Map<number, Set<number>> = new Map();
    private bridges: number[][] = [];

    criticalConnections(n: number, connections: number[][]): number[][] {
        this.buildGraph(n, connections);
        this.ids = new Array(n).fill(0);
        this.low = new Array(n).fill(0);

        for (let i = 0; i < n; i++) {
            if (this.ids[i] == 0) {
                this.dfs(i, -1);
            }
        }

        return this.bridges;
    }

    private dfs(at: number, parent: number): void {
        this.id++;
        this.low[at] = this.id;
        this.ids[at] = this.id;

        for (let to of this.graph.get(at)!) {
            if (to == parent) continue;
            if (this.ids[to] == 0) {
                this.dfs(to, at);
                this.low[at] = Math.min(this.low[at], this.low[to]);
                if (this.ids[at] < this.low[to]) {
                    this.bridges.push([at, to]);
                }
            } else {
                this.low[at] = Math.min(this.low[at], this.ids[to]);
            }
        }
    }

    private buildGraph(n: number, connections: number[][]): void {
        for (let i = 0; i < n; i++) {
            this.graph.set(i, new Set());
        }

        for (let connection of connections) {
            this.graph.get(connection[0])!.add(connection[1]);
            this.graph.get(connection[1])!.add(connection[0]);
        }
    }
}

/*
question: There are n servers numbered from 0 to n - 1 connected by undirected server-to-server connections forming a network where connections[i] = [ai, bi] represents a connection between servers ai and bi. Any server can reach other servers directly or indirectly through the network.

A critical connection is a connection that, if removed, will make some servers unable to reach some other server.

Return all critical connections in the network in any order.

 
Example 1:

Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
Output: [[1,3]]
Explanation: [[3,1]] is also accepted.


Example 2:

Input: n = 2, connections = [[0,1]]
Output: [[0,1]]


 
Constraints:


	2 <= n <= 105
	n - 1 <= connections.length <= 105
	0 <= ai, bi <= n - 1
	ai != bi
	There are no repeated connections.

 */
