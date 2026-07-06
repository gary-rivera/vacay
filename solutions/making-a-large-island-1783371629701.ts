type Grid = number[][];
type Point = [number, number];

function largestIsland(grid: Grid): number {
    const n = grid.length;
    const id: number[][] = Array.from({ length: n }, () => Array(n).fill(0));
    let index = 2;
    let area: { [key: number]: number } = { 0: 0 };

    function dfs(r: number, c: number, index: number): number {
        if (r < 0 || r >= n || c < 0 || c >= n || grid[r][c] === 0 || id[r][c] !== 0) return 0;
        id[r][c] = index;
        return (1 + dfs(r + 1, c, index) + dfs(r - 1, c, index) + dfs(r, c + 1, index) + dfs(r, c - 1, index));
    }

    for (let r = 0; r < n; ++r) {
        for (let c = 0; c < n; ++c) {
            if (grid[r][c] === 1 && id[r][c] === 0) {
                area[index] = dfs(r, c, index++);
            }
        }
    }

    let result = Math.max(...Object.values(area));
    const dir: Point[] = [[1, 0], [0, 1], [-1, 0], [0, -1]];

    for (let r = 0; r < n; ++r) {
        for (let c = 0; c < n; ++c) {
            if (grid[r][c] === 0) {
                const seen: { [key: number]: boolean } = {};
                for (let d = 0; d < 4; ++d) {
                    const nr = r + dir[d][0], nc = c + dir[d][1];
                    if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                        seen[id[nr][nc]] = true;
                    }
                }
                const totalArea = Array.from(Object.keys(seen), k => area[k]).reduce((a, b) => a + b, 0) + 1;
                result = Math.max(result, totalArea);
            }
        }
    }

    return result;
}

/*
question: You are given an n x n binary matrix grid. You are allowed to change at most one 0 to be 1.

Return the size of the largest island in grid after applying this operation.

An island is a 4-directionally connected group of 1s.

 
Example 1:

Input: grid = [[1,0],[0,1]]
Output: 3
Explanation: Change one 0 to 1 and connect two 1s, then we get an island with area = 3.


Example 2:

Input: grid = [[1,1],[1,0]]
Output: 4
Explanation: Change the 0 to 1 and make the island bigger, only one island with area = 4.

Example 3:

Input: grid = [[1,1],[1,1]]
Output: 4
Explanation: Can't change any 0 to 1, only one island with area = 4.


 
Constraints:


	n == grid.length
	n == grid[i].length
	1 <= n <= 500
	grid[i][j] is either 0 or 1.

 */
