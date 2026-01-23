class Solution {
    private grid: string[];
    private n: number;
    private visited: boolean[][];

    public regionsBySlashes(grid: string[]): number {
        this.grid = grid;
        this.n = grid.length;
        this.visited = Array.from({ length: this.n * 3 }, () => Array(this.n * 3).fill(false));

        let regions = 0;
        for (let i = 0; i < this.n * 3; i++) {
            for (let j = 0; j < this.n * 3; j++) {
                if (!this.visited[i][j]) {
                    this.dfs(i, j);
                    regions++;
                }
            }
        }

        return regions;
    }

    private dfs(i: number, j: number): void {
        if (i < 0 || j < 0 || i >= this.n * 3 || j >= this.n * 3 || this.visited[i][j]) {
            return;
        }

        this.visited[i][j] = true;
        const x = Math.floor(i / 3), y = Math.floor(j / 3);
        if (this.grid[x][y] === '/') {
            if ((i % 3 === 0 && j % 3 === 2) || (i % 3 === 1 && j % 3 === 1) || (i % 3 === 2 && j % 3 === 0)) {
                return;
            }
        } else if (this.grid[x][y] === '\\') {
            if ((i % 3 === 0 && j % 3 === 0) || (i % 3 === 1 && j % 3 === 1) || (i % 3 === 2 && j % 3 === 2)) {
                return;
            }
        }

        this.dfs(i - 1, j);
        this.dfs(i + 1, j);
        this.dfs(i, j - 1);
        this.dfs(i, j + 1);
    }
}

/*
question: An n x n grid is composed of 1 x 1 squares where each 1 x 1 square consists of a '/', '\', or blank space ' '. These characters divide the square into contiguous regions.

Given the grid grid represented as a string array, return the number of regions.

Note that backslash characters are escaped, so a '\' is represented as '\\'.

 
Example 1:

Input: grid = [" /","/ "]
Output: 2


Example 2:

Input: grid = [" /","  "]
Output: 1


Example 3:

Input: grid = ["/\\","\\/"]
Output: 5
Explanation: Recall that because \ characters are escaped, "\\/" refers to \/, and "/\\" refers to /\.


 
Constraints:


	n == grid.length == grid[i].length
	1 <= n <= 30
	grid[i][j] is either '/', '\', or ' '.

 */
