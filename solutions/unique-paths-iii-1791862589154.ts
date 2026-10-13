class Solution {
    private rows: number;
    private cols: number;
    private empty: number;
    private startX: number;
    private startY: number;
    private grid: number[][];

    public uniquePathsIII(grid: number[][]): number {
        this.rows = grid.length;
        this.cols = grid[0].length;
        this.empty = 1;
        this.grid = grid;

        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (grid[i][j] == 0) this.empty++;
                else if (grid[i][j] == 1) {
                    this.startX = i;
                    this.startY = j;
                }
            }
        }

        return this.dfs(this.startX, this.startY);
    }

    private dfs(x: number, y: number): number {
        if (x < 0 || y < 0 || x >= this.rows || y >= this.cols || this.grid[x][y] < 0) return 0;
        if (this.grid[x][y] == 2) return this.empty == 0 ? 1 : 0;

        this.grid[x][y] = -2;
        this.empty--;

        let totalPaths = this.dfs(x + 1, y) + this.dfs(x - 1, y) + this.dfs(x, y + 1) + this.dfs(x, y - 1);

        this.grid[x][y] = 0;
        this.empty++;

        return totalPaths;
    }
}

/*
question: You are given an m x n integer array grid where grid[i][j] could be:


	1 representing the starting square. There is exactly one starting square.
	2 representing the ending square. There is exactly one ending square.
	0 representing empty squares we can walk over.
	-1 representing obstacles that we cannot walk over.


Return the number of 4-directional walks from the starting square to the ending square, that walk over every non-obstacle square exactly once.

 
Example 1:

Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
Output: 2
Explanation: We have the following two paths: 
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)


Example 2:

Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,2]]
Output: 4
Explanation: We have the following four paths: 
1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)


Example 3:

Input: grid = [[0,1],[2,0]]
Output: 0
Explanation: There is no path that walks over every empty square exactly once.
Note that the starting and ending square can be anywhere in the grid.


 
Constraints:


	m == grid.length
	n == grid[i].length
	1 <= m, n <= 20
	1 <= m * n <= 20
	-1 <= grid[i][j] <= 2
	There is exactly one starting cell and one ending cell.

 */
