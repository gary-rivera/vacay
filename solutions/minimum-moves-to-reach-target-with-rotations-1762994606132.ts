type Position = [number, number, number];

function minimumMoves(grid: number[][]): number {
    const n = grid.length;
    const visited = new Array(n).fill(0).map(() => new Array(n).fill(0).map(() => new Array(2).fill(false)));
    const queue: Position[] = [[0, 1, 0]];
    let moves = 0;

    visited[0][0][0] = true;
    visited[0][1][0] = true;

    while (queue.length) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const [x, y, state] = queue.shift() as Position;
            if (x === n - 1 && y === n - 1 && state === 0) return moves;

            if (state === 0) {
                if (y + 1 < n && !grid[x][y + 1] && !visited[x][y + 1][0]) {
                    visited[x][y + 1][0] = true;
                    queue.push([x, y + 1, 0]);
                }
                if (x + 1 < n && !grid[x + 1][y - 1] && !grid[x + 1][y] && !visited[x + 1][y][0]) {
                    visited[x + 1][y][0] = true;
                    queue.push([x + 1, y, 0]);
                }
                if (x + 1 < n && y + 1 < n && !grid[x + 1][y] && !grid[x + 1][y + 1] && !visited[x][y][1]) {
                    visited[x][y][1] = true;
                    queue.push([x, y, 1]);
                }
            } else {
                if (x + 1 < n && !grid[x + 1][y] && !visited[x + 1][y][1]) {
                    visited[x + 1][y][1] = true;
                    queue.push([x + 1, y, 1]);
                }
                if (y + 1 < n && !grid[x][y + 1] && !grid[x + 1][y + 1] && !visited[x][y + 1][1]) {
                    visited[x][y + 1][1] = true;
                    queue.push([x, y + 1, 1]);
                }
                if (y + 1 < n && !grid[x][y + 1] && !grid[x + 1][y + 1] && !visited[x][y][0]) {
                    visited[x][y][0] = true;
                    queue.push([x, y, 0]);
                }
            }
        }
        moves++;
    }

    return -1;
}

/*
question: In an n*n grid, there is a snake that spans 2 cells and starts moving from the top left corner at (0, 0) and (0, 1). The grid has empty cells represented by zeros and blocked cells represented by ones. The snake wants to reach the lower right corner at (n-1, n-2) and (n-1, n-1).

In one move the snake can:


	Move one cell to the right if there are no blocked cells there. This move keeps the horizontal/vertical position of the snake as it is.
	Move down one cell if there are no blocked cells there. This move keeps the horizontal/vertical position of the snake as it is.
	Rotate clockwise if it's in a horizontal position and the two cells under it are both empty. In that case the snake moves from (r, c) and (r, c+1) to (r, c) and (r+1, c).
	
	Rotate counterclockwise if it's in a vertical position and the two cells to its right are both empty. In that case the snake moves from (r, c) and (r+1, c) to (r, c) and (r, c+1).
	


Return the minimum number of moves to reach the target.

If there is no way to reach the target, return -1.

 
Example 1:



Input: grid = [[0,0,0,0,0,1],
               [1,1,0,0,1,0],
               [0,0,0,0,1,1],
               [0,0,1,0,1,0],
               [0,1,1,0,0,0],
               [0,1,1,0,0,0]]
Output: 11
Explanation:
One possible solution is [right, right, rotate clockwise, right, down, down, down, down, rotate counterclockwise, right, down].


Example 2:

Input: grid = [[0,0,1,1,1,1],
               [0,0,0,0,1,1],
               [1,1,0,0,0,1],
               [1,1,1,0,0,1],
               [1,1,1,0,0,1],
               [1,1,1,0,0,0]]
Output: 9


 
Constraints:


	2 <= n <= 100
	0 <= grid[i][j] <= 1
	It is guaranteed that the snake starts at empty cells.

 */
