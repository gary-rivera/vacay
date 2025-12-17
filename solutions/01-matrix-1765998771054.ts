function updateMatrix(mat: number[][]): number[][] {
    let rows = mat.length;
    let cols = mat[0].length;
    let max = rows * cols;
    let dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    let queue: number[][] = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (mat[i][j] === 0) {
                queue.push([i, j]);
            } else {
                mat[i][j] = max;
            }
        }
    }

    while (queue.length) {
        let [x, y] = queue.shift() as number[];

        for (let dir of dirs) {
            let newX = x + dir[0];
            let newY = y + dir[1];

            if (newX >= 0 && newX < rows && newY >= 0 && newY < cols && mat[newX][newY] > mat[x][y] + 1) {
                queue.push([newX, newY]);
                mat[newX][newY] = mat[x][y] + 1;
            }
        }
    }

    return mat;
}

/*
question: Given an m x n binary matrix mat, return the distance of the nearest 0 for each cell.

The distance between two cells sharing a common edge is 1.

 
Example 1:

Input: mat = [[0,0,0],[0,1,0],[0,0,0]]
Output: [[0,0,0],[0,1,0],[0,0,0]]


Example 2:

Input: mat = [[0,0,0],[0,1,0],[1,1,1]]
Output: [[0,0,0],[0,1,0],[1,2,1]]


 
Constraints:


	m == mat.length
	n == mat[i].length
	1 <= m, n <= 104
	1 <= m * n <= 104
	mat[i][j] is either 0 or 1.
	There is at least one 0 in mat.


 
Note: This question is the same as 1765: https://leetcode.com/problems/map-of-highest-peak/
 */
