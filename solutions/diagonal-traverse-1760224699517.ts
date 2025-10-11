function findDiagonalOrder(mat: number[][]): number[] {
    if (mat.length == 0) return [];
    let m = mat.length, n = mat[0].length;
    let result: number[] = new Array(m * n);
    let row = 0, col = 0, d = 0;
    let dirs: number[][] = [[-1, 1], [1, -1]];
    for (let i = 0; i < m * n; i++) {
        result[i] = mat[row][col];
        row += dirs[d][0];
        col += dirs[d][1];
        if (row >= m) { row = m - 1; col += 2; d = 1 - d;}
        if (col >= n) { col = n - 1; row += 2; d = 1 - d;}
        if (row < 0)  { row = 0; d = 1 - d;}
        if (col < 0)  { col = 0; d = 1 - d;}
    }
    return result;
}

/*
question: Given an m x n matrix mat, return an array of all the elements of the array in a diagonal order.

 
Example 1:

Input: mat = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,4,7,5,3,6,8,9]


Example 2:

Input: mat = [[1,2],[3,4]]
Output: [1,2,3,4]


 
Constraints:


	m == mat.length
	n == mat[i].length
	1 <= m, n <= 104
	1 <= m * n <= 104
	-105 <= mat[i][j] <= 105

 */
