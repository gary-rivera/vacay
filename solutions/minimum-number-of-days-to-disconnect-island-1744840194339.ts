class Solution {
    private m: number;
    private n: number;
    private dx: number[] = [-1, 0, 1, 0];
    private dy: number[] = [0, 1, 0, -1];
    private vis: boolean[][] = [];

    private inGrid(x: number, y: number): boolean {
        return x >= 0 && x < this.m && y >= 0 && y < this.n;
    }

    private dfs(grid: number[][], x: number, y: number): void {
        this.vis[x][y] = true;
        for (let i = 0; i < 4; ++i) {
            let nx = x + this.dx[i], ny = y + this.dy[i];
            if (this.inGrid(nx, ny) && !this.vis[nx][ny] && grid[nx][ny] === 1) {
                this.dfs(grid, nx, ny);
            }
        }
    }

    private count(grid: number[][]): number {
        this.vis = Array.from({ length: this.m }, () => Array(this.n).fill(false));
        let cnt = 0;
        for (let i = 0; i < this.m; ++i) {
            for (let j = 0; j < this.n; ++j) {
                if (grid[i][j] === 1 && !this.vis[i][j]) {
                    ++cnt;
                    this.dfs(grid, i, j);
                }
            }
        }
        return cnt;
    }

    minDays(grid: number[][]): number {
        this.m = grid.length;
        this.n = grid[0].length;
        if (this.count(grid) !== 1) {
            return 0;
        }
        for (let i = 0; i < this.m; ++i) {
            for (let j = 0; j < this.n; ++j) {
                if (grid[i][j] === 1) {
                    grid[i][j] = 0;
                    if (this.count(grid) !== 1) {
                        return 1;
                    }
                    grid[i][j] = 1;
                }
            }
        }
        return 2;
    }
}

/*
question: You are given an m x n binary grid grid where 1 represents land and 0 represents water. An island is a maximal 4-directionally (horizontal or vertical) connected group of 1's.

The grid is said to be connected if we have exactly one island, otherwise is said disconnected.

In one day, we are allowed to change any single land cell (1) into a water cell (0).

Return the minimum number of days to disconnect the grid.

 
Example 1:

Input: grid = [[0,1,1,0],[0,1,1,0],[0,0,0,0]]

Output: 2
Explanation: We need at least 2 days to get a disconnected grid.
Change land grid[1][1] and grid[0][2] to water and get 2 disconnected island.


Example 2:

Input: grid = [[1,1]]
Output: 2
Explanation: Grid of full water is also disconnected ([[1,1]] -> [[0,0]]), 0 islands.


 
Constraints:


	m == grid.length
	n == grid[i].length
	1 <= m, n <= 30
	grid[i][j] is either 0 or 1.

 */
