function countSubmatrices(grid: string[][]): number {
    let count = 0;
    let rows = grid.length;
    let cols = grid[0].length;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            for (let k = i; k < rows; k++) {
                for (let l = j; l < cols; l++) {
                    let subMatrix = grid.slice(i, k + 1).map(row => row.slice(j, l + 1));
                    if (isValidSubMatrix(subMatrix)) {
                        count++;
                    }
                }
            }
        }
    }

    return count;
}

function isValidSubMatrix(matrix: string[][]): boolean {
    let xCount = 0;
    let yCount = 0;
    let hasX = false;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 'X') {
                xCount++;
                hasX = true;
            } else if (matrix[i][j] === 'Y') {
                yCount++;
            }
        }
    }

    return hasX && xCount === yCount;
}

/*
question: Given a 2D character matrix grid, where grid[i][j] is either 'X', 'Y', or '.', return the number of submatrices that contain:


	grid[0][0]
	an equal frequency of 'X' and 'Y'.
	at least one 'X'.


 
Example 1:


Input: grid = [["X","Y","."],["Y",".","."]]

Output: 3

Explanation:




Example 2:


Input: grid = [["X","X"],["X","Y"]]

Output: 0

Explanation:

No submatrix has an equal frequency of 'X' and 'Y'.


Example 3:


Input: grid = [[".","."],[".","."]]

Output: 0

Explanation:

No submatrix has at least one 'X'.


 
Constraints:


	1 <= grid.length, grid[i].length <= 1000
	grid[i][j] is either 'X', 'Y', or '.'.

 */
