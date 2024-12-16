```typescript
type Edge = [number, number];

function countUnreachablePairs(n: number, edges: Edge[]): number {
    const graph = new Map<number, Set<number>>();
    for (let i = 0; i < n; i++) {
        graph.set(i, new Set<number>());
    }

    for (const [a, b] of edges) {
        graph.get(a)!.add(b);
        graph.get(b)!.add(a);
    }

    const visited = new Set<number>();
    const components = new Array<Set<number>>();
    for (let i = 0; i < n; i++) {
        if (!visited.has(i)) {
            const stack = [i];
            visited.add(i);
            const component = new Set<number>([i]);

            while (stack.length > 0) {
                const node = stack.pop()!;
                for (const neighbor of graph.get(node)!) {
                    if (!visited.has(neighbor)) {
                        stack.push(neighbor);
                        visited.add(neighbor);
                        component.add(neighbor);
                    }
                }
            }

            components.push(component);
        }
    }

    let unreachablePairs = 0;
    let totalNodes = n;
    for (const component of components) {
        const size = component.size;
        totalNodes -= size;
        unreachablePairs += size * totalNodes;
    }

    return unreachablePairs;
}
```

/*
question: You are given an integer n. There is an undirected graph with n nodes, numbered from 0 to n - 1. You are given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting nodes ai and bi.

Return the number of pairs of different nodes that are unreachable from each other.

 
Example 1:

Input: n = 3, edges = [[0,1],[0,2],[1,2]]
Output: 0
Explanation: There are no pairs of nodes that are unreachable from each other. Therefore, we return 0.


Example 2:

Input: n = 7, edges = [[0,2],[0,5],[2,4],[1,6],[5,4]]
Output: 14
Explanation: There are 14 pairs of nodes that are unreachable from each other:
[[0,1],[0,3],[0,6],[1,2],[1,3],[1,4],[1,5],[2,3],[2,6],[3,4],[3,5],[3,6],[4,6],[5,6]].
Therefore, we return 14.


 
Constraints:


	1 <= n <= 105
	0 <= edges.length <= 2 * 105
	edges[i].length == 2
	0 <= ai, bi < n
	ai != bi
	There are no repeated edges.

 */
