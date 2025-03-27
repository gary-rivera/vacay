type Edge = [number, number, number];

interface Node {
    id: number;
    value: number;
    edges: Edge[];
}

class Tree {
    nodes: Node[];

    constructor(n: number, edges: Edge[], nums: number[]) {
        this.nodes = Array(n).fill(null).map((_, i) => ({
            id: i,
            value: nums[i],
            edges: [],
        }));

        for (const [u, v, length] of edges) {
            this.nodes[u].edges.push([v, length]);
            this.nodes[v].edges.push([u, length]);
        }
    }

    dfs(nodeId: number, parentValue: number, pathLength: number, visited: Set<number>): [number, number] {
        const node = this.nodes[nodeId];
        if (node.value === parentValue) {
            return [pathLength, 1];
        }

        visited.add(nodeId);
        let maxPathLength = pathLength;
        let minNodes = Infinity;

        for (const [nextNodeId, edgeLength] of node.edges) {
            if (visited.has(nextNodeId)) {
                continue;
            }

            const [nextPathLength, nextNodes] = this.dfs(nextNodeId, node.value, pathLength + edgeLength, visited);
            if (nextPathLength > maxPathLength) {
                maxPathLength = nextPathLength;
                minNodes = nextNodes;
            } else if (nextPathLength === maxPathLength) {
                minNodes = Math.min(minNodes, nextNodes);
            }
        }

        visited.delete(nodeId);
        return [maxPathLength, minNodes === Infinity ? 1 : minNodes];
    }

    longestSpecialPath(): [number, number] {
        let maxPathLength = 0;
        let minNodes = Infinity;

        for (const node of this.nodes) {
            const [pathLength, nodes] = this.dfs(node.id, -1, 0, new Set());
            if (pathLength > maxPathLength) {
                maxPathLength = pathLength;
                minNodes = nodes;
            } else if (pathLength === maxPathLength) {
                minNodes = Math.min(minNodes, nodes);
            }
        }

        return [maxPathLength, minNodes];
    }
}

function longestSpecialPath(n: number, edges: Edge[], nums: number[]): [number, number] {
    const tree = new Tree(n, edges, nums);
    return tree.longestSpecialPath();
}

/*
question: You are given an undirected tree rooted at node 0 with n nodes numbered from 0 to n - 1, represented by a 2D array edges of length n - 1, where edges[i] = [ui, vi, lengthi] indicates an edge between nodes ui and vi with length lengthi. You are also given an integer array nums, where nums[i] represents the value at node i.

A special path is defined as a downward path from an ancestor node to a descendant node such that all the values of the nodes in that path are unique.

Note that a path may start and end at the same node.

Return an array result of size 2, where result[0] is the length of the longest special path, and result[1] is the minimum number of nodes in all possible longest special paths.

 
Example 1:


Input: edges = [[0,1,2],[1,2,3],[1,3,5],[1,4,4],[2,5,6]], nums = [2,1,2,1,3,1]

Output: [6,2]

Explanation:

In the image below, nodes are colored by their corresponding values in nums



The longest special paths are 2 -> 5 and 0 -> 1 -> 4, both having a length of 6. The minimum number of nodes across all longest special paths is 2.


Example 2:


Input: edges = [[1,0,8]], nums = [2,2]

Output: [0,1]

Explanation:



The longest special paths are 0 and 1, both having a length of 0. The minimum number of nodes across all longest special paths is 1.


 
Constraints:


	2 <= n <= 5 * 104
	edges.length == n - 1
	edges[i].length == 3
	0 <= ui, vi < n
	1 <= lengthi <= 103
	nums.length == n
	0 <= nums[i] <= 5 * 104
	The input is generated such that edges represents a valid tree.

 */
