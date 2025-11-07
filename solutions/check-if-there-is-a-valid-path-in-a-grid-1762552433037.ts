type Grid = number[][];

const directions = [
  [0, -1], // left
  [0, 1], // right
  [-1, 0], // up
  [-1, 0], // down
];

const streetMap = [
  [false, false, true, true], // 1
  [true, true, false, false], // 2
  [false, true, true, false], // 3
  [true, false, true, false], // 4
  [false, true, false, true], // 5
  [true, false, false, true], // 6
];

function isValid(grid: Grid, x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length || grid[x][y] == 0) {
    return false;
  }
  return true;
}

function hasPath(grid: Grid, x: number, y: number, direction: number[]): boolean {
  const newX = x + direction[0];
  const newY = y + direction[1];
  if (!isValid(grid, newX, newY)) {
    return false;
  }
  const newStreet = grid[newX][newY] - 1;
  const newDirection = [-direction[0], -direction[1]];
  const newDirectionIndex = directions.findIndex(
    (dir) => dir[0] === newDirection[0] && dir[1] === newDirection[1]
  );
  return streetMap[newStreet][newDirectionIndex];
}

function hasValidPath(grid: Grid): boolean {
  const m = grid.length;
  const n = grid[0].length;
  const queue: number[][] = [[0, 0]];
  while (queue.length > 0) {
    const [x, y] = queue.shift() as number[];
    if (x === m - 1 && y === n - 1) {
      return true;
    }
    const street = grid[x][y] - 1;
    grid[x][y] = 0;
    for (let i = 0; i < 4; i++) {
      if (streetMap[street][i]) {
        const newX = x + directions[i][0];
        const newY = y + directions[i][1];
        if (isValid(grid, newX, newY) && hasPath(grid, newX, newY, directions[i])) {
          queue.push([newX, newY]);
        }
      }
    }
  }
  return false;
}

/*
question: You are given an m x n grid. Each cell of grid represents a street. The street of grid[i][j] can be:


	1 which means a street connecting the left cell and the right cell.
	2 which means a street connecting the upper cell and the lower cell.
	3 which means a street connecting the left cell and the lower cell.
	4 which means a street connecting the right cell and the lower cell.
	5 which means a street connecting the left cell and the upper cell.
	6 which means a street connecting the right cell and the upper cell.


You will initially start at the street of the upper-left cell (0, 0). A valid path in the grid is a path that starts from the upper left cell (0, 0) and ends at the bottom-right cell (m - 1, n - 1). The path should only follow the streets.

Notice that you are not allowed to change any street.

Return true if there is a valid path in the grid or false otherwise.

 
Example 1:

Input: grid = [[2,4,3],[6,5,2]]
Output: true
Explanation: As shown you can start at cell (0, 0) and visit all the cells of the grid to reach (m - 1, n - 1).


Example 2:

Input: grid = [[1,2,1],[1,2,1]]
Output: false
Explanation: As shown you the street at cell (0, 0) is not connected with any street of any other cell and you will get stuck at cell (0, 0)


Example 3:

Input: grid = [[1,1,2]]
Output: false
Explanation: You will get stuck at cell (0, 1) and you cannot reach cell (0, 2).


 
Constraints:


	m == grid.length
	n == grid[i].length
	1 <= m, n <= 300
	1 <= grid[i][j] <= 6

 */
