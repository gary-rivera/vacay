class Graph {
    nodes: number;
    edges: number[][];
    queries: number[];
    adjacencyList: Map<number, number[]>;

    constructor(nodes: number, edges: number[][], queries: number[]) {
        this.nodes = nodes;
        this.edges = edges;
        this.queries = queries;
        this.adjacencyList = new Map<number, number[]>();
    }

    createGraph() {
        for (let i = 1; i <= this.nodes; i++) {
            this.adjacencyList.set(i, []);
        }

        for (let edge of this.edges) {
            this.adjacencyList.get(edge[0])!.push(edge[1]);
            this.adjacencyList.get(edge[1])!.push(edge[0]);
        }
    }

    solveQueries() {
        let answers: number[] = [];
        let degree: number[] = Array(this.nodes + 1).fill(0);

        for (let edge of this.edges) {
            degree[edge[0]]++;
            degree[edge[1]]++;
        }

        for (let query of this.queries) {
            let count = 0;

            for (let i = 1; i <= this.nodes; i++) {
                for (let j = i + 1; j <= this.nodes; j++) {
                    if (degree[i] + degree[j] > query) {
                        count++;
                    }
                }
            }

            answers.push(count);
        }

        return answers;
    }
}

function solveGraphProblem(n: number, edges: number[][], queries: number[]): number[] {
    let graph = new Graph(n, edges, queries);
    graph.createGraph();
    return graph.solveQueries();
}

console.log(solveGraphProblem(4, [[1,2],[2,4],[1,3],[2,3],[2,1]], [2,3])); // [6,5]
console.log(solveGraphProblem(5, [[1,5],[1,5],[3,4],[2,5],[1,3],[5,1],[2,3],[2,5]], [1,2,3,4,5])); // [10,10,9,8,6]

/*
question: You are given an undirected graph defined by an integer n, the number of nodes, and a 2D integer array edges, the edges in the graph, where edges[i] = [ui, vi] indicates that there is an undirected edge between ui and vi. You are also given an integer array queries.

Let incident(a, b) be defined as the number of edges that are connected to either node a or b.

The answer to the jth query is the number of pairs of nodes (a, b) that satisfy both of the following conditions:


	a < b
	incident(a, b) > queries[j]


Return an array answers such that answers.length == queries.length and answers[j] is the answer of the jth query.

Note that there can be multiple edges between the same two nodes.

 
Example 1:

Input: n = 4, edges = [[1,2],[2,4],[1,3],[2,3],[2,1]], queries = [2,3]
Output: [6,5]
Explanation: The calculations for incident(a, b) are shown in the table above.
The answers for each of the queries are as follows:
- answers[0] = 6. All the pairs have an incident(a, b) value greater than 2.
- answers[1] = 5. All the pairs except (3, 4) have an incident(a, b) value greater than 3.


Example 2:

Input: n = 5, edges = [[1,5],[1,5],[3,4],[2,5],[1,3],[5,1],[2,3],[2,5]], queries = [1,2,3,4,5]
Output: [10,10,9,8,6]


 
Constraints:


	2 <= n <= 2 * 104
	1 <= edges.length <= 105
	1 <= ui, vi <= n
	ui != vi
	1 <= queries.length <= 20
	0 <= queries[j] < edges.length

 */
