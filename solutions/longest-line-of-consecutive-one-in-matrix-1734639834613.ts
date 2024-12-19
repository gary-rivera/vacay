function longestLine(mat: number[][]): number {
    let m = mat.length, n = mat[0].length;
    let dp: number[][][] = Array.from({ length: m }, () => Array.from({ length: n }, () => Array(4).fill(0)));
    let max = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (mat[i][j] === 1) {
                if (j > 0) dp[i][j][0] = dp[i][j - 1][0] + 1;
                else dp[i][j][0] = 1;
                if (i > 0) dp[i][j][1] = dp[i - 1][j][1] + 1;
                else dp[i][j][1] = 1;
                if (i > 0 && j > 0) dp[i][j][2] = dp[i - 1][j - 1][2] + 1;
                else dp[i][j][2] = 1;
                if (i > 0 && j < n - 1) dp[i][j][3] = dp[i - 1][j + 1][3] + 1;
                else dp[i][j][3] = 1;
                max = Math.max(max, dp[i][j][0], dp[i][j][1], dp[i][j][2], dp[i][j][3]);
            }
        }
    }
    return max;
}

/*
question: Given an m x n binary matrix mat, return the length of the longest line of consecutive one in the matrix.

The line could be horizontal, vertical, diagonal, or anti-diagonal.

 
Example 1:

Input: mat = [[0,1,1,0],[0,1,1,0],[0,0,0,1]]
Output: 3


Example 2:

Input: mat = [[1,1,1,1],[0,1,1,0],[0,0,0,1]]
Output: 4


 
Constraints:


	m == mat.length
	n == mat[i].length
	1 <= m, n <= 104
	1 <= m * n <= 104
	mat[i][j] is either 0 or 1.

 */
