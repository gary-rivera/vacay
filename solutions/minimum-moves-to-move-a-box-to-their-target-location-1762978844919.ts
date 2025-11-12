type Point = [number, number];

function minPushBox(grid: string[][]): number {
    const m = grid.length, n = grid[0].length;
    const box: Point = [-1, -1], target: Point = [-1, -1], player: Point = [-1, -1];
    const DIRS: Point[] = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const dp: number[][][] = Array.from({ length: m }, () => Array.from({ length: n }, () => Array(n).fill(-1)));

    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            if (grid[i][j] === 'S') player[0] = i, player[1] = j;
            if (grid[i][j] === 'B') box[0] = i, box[1] = j;
            if (grid[i][j] === 'T') target[0] = i, target[1] = j;
        }
    }

    const queue: Point[] = [];
    queue.push([player[0], player[1], box[0], box[1]]);
    dp[box[0]][box[1]][player[0]][player[1]] = 0;

    while (queue.length > 0) {
        const [i, j, bi, bj] = queue.shift() as Point;
        for (const [dx, dy] of DIRS) {
            const x = i + dx, y = j + dy, bx = bi + dx, by = bj + dy;
            if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === '#') continue;
            if (bi === x && bj === y) {
                if (bx < 0 || bx >= m || by < 0 || by >= n || grid[bx][by] === '#') continue;
                if (dp[bx][by][bi][bj] !== -1) continue;
                dp[bx][by][bi][bj] = dp[bi][bj][i][j] + 1;
                if (bx === target[0] && by === target[1]) return dp[bx][by][bi][bj];
                queue.push([bi, bj, bx, by]);
            } else {
                if (dp[bi][bj][x][y] !== -1) continue;
                dp[bi][bj][x][y] = dp[bi][bj][i][j];
                queue.push([x, y, bi, bj]);
            }
        }
    }

    return -1;
}

/*
question: A storekeeper is a game in which the player pushes boxes around in a warehouse trying to get them to target locations.

The game is represented by an m x n grid of characters grid where each element is a wall, floor, or box.

Your task is to move the box 'B' to the target position 'T' under the following rules:


	The character 'S' represents the player. The player can move up, down, left, right in grid if it is a floor (empty cell).
	The character '.' represents the floor which means a free cell to walk.
	The character '#' represents the wall which means an obstacle (impossible to walk there).
	There is only one box 'B' and one target cell 'T' in the grid.
	The box can be moved to an adjacent free cell by standing next to the box and then moving in the direction of the box. This is a push.
	The player cannot walk through the box.


Return the minimum number of pushes to move the box to the target. If there is no way to reach the target, return -1.

 
Example 1:

Input: grid = [["#","#","#","#","#","#"],
               ["#","T","#","#","#","#"],
               ["#",".",".","B",".","#"],
               ["#",".","#","#",".","#"],
               ["#",".",".",".","S","#"],
               ["#","#","#","#","#","#"]]
Output: 3
Explanation: We return only the number of times the box is pushed.

Example 2:

Input: grid = [["#","#","#","#","#","#"],
               ["#","T","#","#","#","#"],
               ["#",".",".","B",".","#"],
               ["#","#","#","#",".","#"],
               ["#",".",".",".","S","#"],
               ["#","#","#","#","#","#"]]
Output: -1


Example 3:

Input: grid = [["#","#","#","#","#","#"],
               ["#","T",".",".","#","#"],
               ["#",".","#","B",".","#"],
               ["#",".",".",".",".","#"],
               ["#",".",".",".","S","#"],
               ["#","#","#","#","#","#"]]
Output: 5
Explanation: push the box down, left, left, up and up.


 
Constraints:


	m == grid.length
	n == grid[i].length
	1 <= m, n <= 20
	grid contains only characters '.', '#', 'S', 'T', or 'B'.
	There is only one character 'S', 'B', and 'T' in the grid.

 */
