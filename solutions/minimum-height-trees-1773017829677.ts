function findMinHeightTrees(n: number, edges: number[][]): number[] {
    if (n === 1) return [0];
    let adj = new Array(n).fill(0).map(() => new Array());
    let degree = new Array(n).fill(0);
    for (let edge of edges) {
        adj[edge[0]].push(edge[1]);
        adj[edge[1]].push(edge[0]);
        degree[edge[0]]++;
        degree[edge[1]]++;
    }
    let leaves = [];
    for (let i = 0; i < n; i++) {
        if (degree[i] === 1) leaves.push(i);
    }
    while (n > 2) {
        n -= leaves.length;
        let newLeaves = [];
        for (let leaf of leaves) {
            let j = adj[leaf].pop();
            degree[j]--;
            if (degree[j] === 1) newLeaves.push(j);
        }
        leaves = newLeaves;
    }
    return leaves;
}

/*
question: A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.

Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).

Return a list of all MHTs' root labels. You can return the answer in any order.

The height of a rooted tree is the number of edges on the longest downward path between the root and a leaf.

 
Example 1:

Input: n = 4, edges = [[1,0],[1,2],[1,3]]
Output: [1]
Explanation: As shown, the height of the tree is 1 when the root is the node with label 1 which is the only MHT.


Example 2:

Input: n = 6, edges = [[3,0],[3,1],[3,2],[3,4],[5,4]]
Output: [3,4]


 
Constraints:


	1 <= n <= 2 * 104
	edges.length == n - 1
	0 <= ai, bi < n
	ai != bi
	All the pairs (ai, bi) are distinct.
	The given input is guaranteed to be a tree and there will be no repeated edges.

 */
