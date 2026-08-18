type Point = { x: number, y: number, keys: number };

function shortestPathAllKeys(grid: string[]): number {
    const m = grid.length;
    const n = grid[0].length;
    const dir = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const keyCount = grid.reduce((count, row) => count + row.replace(/[^a-z]/g, '').length, 0);
    let start: Point;
    const queue: Point[] = [];
    const visited: boolean[][][] = Array(m).fill(0).map(() => Array(n).fill(0).map(() => Array(1 << keyCount).fill(false)));

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === '@') {
                start = { x: i, y: j, keys: 0 };
                queue.push(start);
                visited[i][j][0] = true;
            }
        }
    }

    let steps = 0;

    while (queue.length) {
        const size = queue.length;
        for (let i = 0; i < size; i++) {
            const { x, y, keys } = queue.shift()!;
            if (keys === (1 << keyCount) - 1) {
                return steps;
            }
            for (const [dx, dy] of dir) {
                const nx = x + dx;
                const ny = y + dy;
                let nkeys = keys;
                if (nx < 0 || nx >= m || ny < 0 || ny >= n || grid[nx][ny] === '#') {
                    continue;
                }
                if (grid[nx][ny] >= 'a' && grid[nx][ny] <= 'f') {
                    nkeys |= 1 << (grid[nx][ny].charCodeAt(0) - 97);
                }
                if (grid[nx][ny] >= 'A' && grid[nx][ny] <= 'F' && !(keys & (1 << (grid[nx][ny].charCodeAt(0) - 65)))) {
                    continue;
                }
                if (!visited[nx][ny][nkeys]) {
                    visited[nx][ny][nkeys] = true;
                    queue.push({ x: nx, y: ny, keys: nkeys });
                }
            }
        }
        steps++;
    }

    return -1;
}

/*
question: You are given an m x n grid grid where:


	'.' is an empty cell.
	'#' is a wall.
	'@' is the starting point.
	Lowercase letters represent keys.
	Uppercase letters represent locks.


You start at the starting point and one move consists of walking one space in one of the four cardinal directions. You cannot walk outside the grid, or walk into a wall.

If you walk over a key, you can pick it up and you cannot walk over a lock unless you have its corresponding key.

For some 1 <= k <= 6, there is exactly one lowercase and one uppercase letter of the first k letters of the English alphabet in the grid. This means that there is exactly one key for each lock, and one lock for each key; and also that the letters used to represent the keys and locks were chosen in the same order as the English alphabet.

Return the lowest number of moves to acquire all keys. If it is impossible, return -1.

 
Example 1:

Input: grid = ["@.a..","###.#","b.A.B"]
Output: 8
Explanation: Note that the goal is to obtain all the keys not to open all the locks.


Example 2:

Input: grid = ["@..aA","..B#.","....b"]
Output: 6


Example 3:

Input: grid = ["@Aa"]
Output: -1


 
Constraints:


	m == grid.length
	n == grid[i].length
	1 <= m, n <= 30
	grid[i][j] is either an English letter, '.', '#', or '@'. 
	There is exactly one '@' in the grid.
	The number of keys in the grid is in the range [1, 6].
	Each key in the grid is unique.
	Each key in the grid has a matching lock.

 */
