function orangesRotting(grid: number[][]): number {
    let freshOranges = 0;
    let rottenOranges: [number, number][] = [];
    let minutes = 0;
    let directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                freshOranges++;
            } else if (grid[i][j] === 2) {
                rottenOranges.push([i, j]);
            }
        }
    }

    while (rottenOranges.length && freshOranges) {
        let newRottenOranges: [number, number][] = [];
        while (rottenOranges.length) {
            let [x, y] = rottenOranges.shift()!;
            for (let [dx, dy] of directions) {
                let nx = x + dx, ny = y + dy;
                if (nx < 0 || ny < 0 || nx >= grid.length || ny >= grid[0].length || grid[nx][ny] === 0 || grid[nx][ny] === 2) {
                    continue;
                }
                grid[nx][ny] = 2;
                freshOranges--;
                newRottenOranges.push([nx, ny]);
            }
        }
        rottenOranges = newRottenOranges;
        minutes++;
    }

    return freshOranges === 0 ? minutes : -1;
}

/*
question: You are given an m x n grid where each cell can have one of three values:


	0 representing an empty cell,
	1 representing a fresh orange, or
	2 representing a rotten orange.


Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

 
Example 1:

Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4


Example 2:

Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.


Example 3:

Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.


 
Constraints:


	m == grid.length
	n == grid[i].length
	1 <= m, n <= 10
	grid[i][j] is 0, 1, or 2.

 */
