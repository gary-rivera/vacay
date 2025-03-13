function maxFish(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    const dx = [-1, 0, 1, 0];
    const dy = [0, 1, 0, -1];
    let maxFish = 0;

    function dfs(x: number, y: number, fish: number): void {
        maxFish = Math.max(maxFish, fish);
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] > 0) {
                const temp = grid[nx][ny];
                grid[nx][ny] = 0;
                dfs(nx, ny, fish + temp);
                grid[nx][ny] = temp;
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] > 0) {
                const temp = grid[i][j];
                grid[i][j] = 0;
                dfs(i, j, temp);
                grid[i][j] = temp;
            }
        }
    }

    return maxFish;
}

/*
question: You are given a 0-indexed 2D matrix grid of size m x n, where (r, c) represents:


	A land cell if grid[r][c] = 0, or
	A water cell containing grid[r][c] fish, if grid[r][c] > 0.


A fisher can start at any water cell (r, c) and can do the following operations any number of times:


	Catch all the fish at cell (r, c), or
	Move to any adjacent water cell.


Return the maximum number of fish the fisher can catch if he chooses his starting cell optimally, or 0 if no water cell exists.

An adjacent cell of the cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) or (r - 1, c) if it exists.

 
Example 1:

Input: grid = [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]
Output: 7
Explanation: The fisher can start at cell (1,3) and collect 3 fish, then move to cell (2,3) and collect 4 fish.


Example 2:

Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]]
Output: 1
Explanation: The fisher can start at cells (0,0) or (3,3) and collect a single fish. 


 
Constraints:


	m == grid.length
	n == grid[i].length
	1 <= m, n <= 10
	0 <= grid[i][j] <= 10

 */
