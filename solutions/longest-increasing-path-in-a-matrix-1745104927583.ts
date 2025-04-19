class Solution {
    private matrix: number[][];
    private m: number;
    private n: number;
    private cache: number[][];

    longestIncreasingPath(matrix: number[][]): number {
        this.matrix = matrix;
        this.m = matrix.length;
        this.n = matrix[0].length;
        this.cache = Array(this.m).fill(0).map(() => Array(this.n).fill(0));

        let max = 1;
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                max = Math.max(max, this.dfs(i, j));
            }
        }

        return max;
    }

    private dfs(i: number, j: number): number {
        if (this.cache[i][j] != 0) {
            return this.cache[i][j];
        }

        let max = 1;
        if (i > 0 && this.matrix[i][j] < this.matrix[i - 1][j]) {
            max = Math.max(max, 1 + this.dfs(i - 1, j));
        }
        if (j > 0 && this.matrix[i][j] < this.matrix[i][j - 1]) {
            max = Math.max(max, 1 + this.dfs(i, j - 1));
        }
        if (i < this.m - 1 && this.matrix[i][j] < this.matrix[i + 1][j]) {
            max = Math.max(max, 1 + this.dfs(i + 1, j));
        }
        if (j < this.n - 1 && this.matrix[i][j] < this.matrix[i][j + 1]) {
            max = Math.max(max, 1 + this.dfs(i, j + 1));
        }

        this.cache[i][j] = max;
        return max;
    }
}

/*
question: Given an m x n integers matrix, return the length of the longest increasing path in matrix.

From each cell, you can either move in four directions: left, right, up, or down. You may not move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

 
Example 1:

Input: matrix = [[9,9,4],[6,6,8],[2,1,1]]
Output: 4
Explanation: The longest increasing path is [1, 2, 6, 9].


Example 2:

Input: matrix = [[3,4,5],[3,2,6],[2,2,1]]
Output: 4
Explanation: The longest increasing path is [3, 4, 5, 6]. Moving diagonally is not allowed.


Example 3:

Input: matrix = [[1]]
Output: 1


 
Constraints:


	m == matrix.length
	n == matrix[i].length
	1 <= m, n <= 200
	0 <= matrix[i][j] <= 231 - 1

 */
