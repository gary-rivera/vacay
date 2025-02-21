type Query = [number, number];

function maxGeneticDifference(parents: number[], queries: Query[]): number[] {
    const n = parents.length;
    const graph: number[][] = Array.from({ length: n }, () => []);
    const root: number = parents.indexOf(-1);
    const queryList: Query[][] = Array.from({ length: n }, () => []);
    const ans: number[] = Array(queries.length).fill(0);
    const trie = new Trie();

    for (let i = 0; i < n; i++) {
        if (parents[i] !== -1) {
            graph[parents[i]].push(i);
        }
    }

    for (let i = 0; i < queries.length; i++) {
        const [node, val] = queries[i];
        queryList[node].push([val, i]);
    }

    function dfs(node: number) {
        trie.insert(node);
        for (const [val, idx] of queryList[node]) {
            ans[idx] = trie.query(val);
        }
        for (const child of graph[node]) {
            dfs(child);
        }
        trie.remove(node);
    }

    dfs(root);
    return ans;
}

class Trie {
    static readonly L = 18;
    node: number[] = Array(2).fill(0);

    insert(val: number) {
        let p = this;
        for (let i = Trie.L; i >= 0; i--) {
            const u = (val >> i) & 1;
            if (!p.node[u]) {
                p.node[u] = new Trie();
            }
            p = p.node[u];
        }
    }

    remove(val: number) {
        let p = this;
        for (let i = Trie.L; i >= 0; i--) {
            const u = (val >> i) & 1;
            p = p.node[u];
        }
    }

    query(val: number): number {
        let ans = 0;
        let p = this;
        for (let i = Trie.L; i >= 0; i--) {
            const u = (val >> i) & 1;
            if (p.node[u ^ 1]) {
                ans |= (1 << i);
                p = p.node[u ^ 1];
            } else {
                p = p.node[u];
            }
        }
        return ans;
    }
}

/*
question: There is a rooted tree consisting of n nodes numbered 0 to n - 1. Each node's number denotes its unique genetic value (i.e. the genetic value of node x is x). The genetic difference between two genetic values is defined as the bitwise-XOR of their values. You are given the integer array parents, where parents[i] is the parent for node i. If node x is the root of the tree, then parents[x] == -1.

You are also given the array queries where queries[i] = [nodei, vali]. For each query i, find the maximum genetic difference between vali and pi, where pi is the genetic value of any node that is on the path between nodei and the root (including nodei and the root). More formally, you want to maximize vali XOR pi.

Return an array ans where ans[i] is the answer to the ith query.

 
Example 1:

Input: parents = [-1,0,1,1], queries = [[0,2],[3,2],[2,5]]
Output: [2,3,7]
Explanation: The queries are processed as follows:
- [0,2]: The node with the maximum genetic difference is 0, with a difference of 2 XOR 0 = 2.
- [3,2]: The node with the maximum genetic difference is 1, with a difference of 2 XOR 1 = 3.
- [2,5]: The node with the maximum genetic difference is 2, with a difference of 5 XOR 2 = 7.


Example 2:

Input: parents = [3,7,-1,2,0,7,0,2], queries = [[4,6],[1,15],[0,5]]
Output: [6,14,7]
Explanation: The queries are processed as follows:
- [4,6]: The node with the maximum genetic difference is 0, with a difference of 6 XOR 0 = 6.
- [1,15]: The node with the maximum genetic difference is 1, with a difference of 15 XOR 1 = 14.
- [0,5]: The node with the maximum genetic difference is 2, with a difference of 5 XOR 2 = 7.


 
Constraints:


	2 <= parents.length <= 105
	0 <= parents[i] <= parents.length - 1 for every node i that is not the root.
	parents[root] == -1
	1 <= queries.length <= 3 * 104
	0 <= nodei <= parents.length - 1
	0 <= vali <= 2 * 105

 */
