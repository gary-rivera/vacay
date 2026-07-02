function maxNumberOfMoves(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const dp: number[][] = Array.from({length: m}, () => Array(n).fill(-1));

    function dfs(i: number, j: number): number {
        if (dp[i][j] != -1) return dp[i][j];
        let res = 0;
        for (let dx = -1; dx <= 1; dx++) {
            let x = i + dx, y = j + 1;
            if (x >= 0 && x < m && y < n && grid[x][y] > grid[i][j]) {
                res = Math.max(res, 1 + dfs(x, y));
            }
        }
        dp[i][j] = res;
        return res;
    }

    let maxMoves = 0;
    for (let i = 0; i < m; i++) {
        maxMoves = Math.max(maxMoves, dfs(i, 0));
    }
    return maxMoves;
}

/*
question: You are given a 0-indexed m x n matrix grid consisting of positive integers.

You can start at any cell in the first column of the matrix, and traverse the grid in the following way:


	From a cell (row, col), you can move to any of the cells: (row - 1, col + 1), (row, col + 1) and (row + 1, col + 1) such that the value of the cell you move to, should be strictly bigger than the value of the current cell.


Return the maximum number of moves that you can perform.

 
Example 1:

Input: grid = [[2,4,3,5],[5,4,9,3],[3,4,2,11],[10,9,13,15]]
Output: 3
Explanation: We can start at the cell (0, 0) and make the following moves:
- (0, 0) -> (0, 1).
- (0, 1) -> (1, 2).
- (1, 2) -> (2, 3).
It can be shown that it is the maximum number of moves that can be made.

Example 2:


Input: grid = [[3,2,4],[2,1,9],[1,1,7]]
Output: 0
Explanation: Starting from any cell in the first column we cannot perform any moves.


 
Constraints:


	m == grid.length
	n == grid[i].length
	2 <= m, n <= 1000
	4 <= m * n <= 105
	1 <= grid[i][j] <= 106

 */
