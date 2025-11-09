type Pair = [number, number];

function countRootedTrees(pairs: Pair[]): number {
    const n = 500;
    const mod = 1e9 + 7;
    const g = Array.from({ length: n + 1 }, () => new Array<number>());
    const f = Array.from({ length: n + 1 }, () => new Array<number>());
    const deg = new Array(n + 1).fill(0);
    const size = new Array(n + 1).fill(0);
    const inv = new Array(n + 1).fill(0);
    const fac = new Array(n + 1).fill(0);
    const ifac = new Array(n + 1).fill(0);
    let flag = true;

    for (let i = 0; i < pairs.length; ++i) {
        const [x, y] = pairs[i];
        g[x].push(y);
        g[y].push(x);
        ++deg[x];
        ++deg[y];
    }

    inv[1] = fac[0] = ifac[0] = 1;
    for (let i = 2; i <= n; ++i) {
        inv[i] = mod - (mod / i) * inv[mod % i] % mod;
    }
    for (let i = 1; i <= n; ++i) {
        fac[i] = fac[i - 1] * i % mod;
        ifac[i] = ifac[i - 1] * inv[i] % mod;
    }

    function dfs(x: number, fa: number) {
        size[x] = 1;
        f[x][0] = 1;
        for (const y of g[x]) {
            if (y === fa) continue;
            dfs(y, x);
            for (let i = 0; i <= size[x]; ++i) {
                f[0][i] = f[x][i];
                f[x][i] = 0;
            }
            for (let i = 0; i <= size[x]; ++i) {
                for (let j = 0; j <= size[y]; ++j) {
                    f[x][i + j] = (f[x][i + j] + f[0][i] * f[y][j]) % mod;
                }
            }
            size[x] += size[y];
        }
        f[x][size[x]] = f[x][size[x] - 1];
    }

    for (let i = 1; i <= n; ++i) {
        if (deg[i] > 2) {
            dfs(i, 0);
            if (f[i][pairs.length] > 1) return 2;
            flag = false;
        }
    }

    if (flag) return 1;
    return 0;
}

/*
question: You are given an array pairs, where pairs[i] = [xi, yi], and:


	There are no duplicates.
	xi < yi


Let ways be the number of rooted trees that satisfy the following conditions:


	The tree consists of nodes whose values appeared in pairs.
	A pair [xi, yi] exists in pairs if and only if xi is an ancestor of yi or yi is an ancestor of xi.
	Note: the tree does not have to be a binary tree.


Two ways are considered to be different if there is at least one node that has different parents in both ways.

Return:


	0 if ways == 0
	1 if ways == 1
	2 if ways > 1


A rooted tree is a tree that has a single root node, and all edges are oriented to be outgoing from the root.

An ancestor of a node is any node on the path from the root to that node (excluding the node itself). The root has no ancestors.

 
Example 1:

Input: pairs = [[1,2],[2,3]]
Output: 1
Explanation: There is exactly one valid rooted tree, which is shown in the above figure.


Example 2:

Input: pairs = [[1,2],[2,3],[1,3]]
Output: 2
Explanation: There are multiple valid rooted trees. Three of them are shown in the above figures.


Example 3:

Input: pairs = [[1,2],[2,3],[2,4],[1,5]]
Output: 0
Explanation: There are no valid rooted trees.

 
Constraints:


	1 <= pairs.length <= 105
	1 <= xi < yi <= 500
	The elements in pairs are unique.

 */
