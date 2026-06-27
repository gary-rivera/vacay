function numSubmat(mat: number[][]): number {
    let m = mat.length;
    let n = mat[0].length;
    let result = 0;
    let height = Array(n).fill(0);
    let left = Array(n).fill(0);
    let right = Array(n).fill(n);

    for (let i = 0; i < m; i++) {
        let start = 0, end = n;
        for (let j = 0; j < n; j++) {
            if (mat[i][j] == 1) {
                height[j]++;
                left[j] = Math.max(left[j], start);
            } else {
                height[j] = 0;
                left[j] = 0;
                start = j + 1;
            }
        }
        for (let j = n - 1; j >= 0; j--) {
            if (mat[i][j] == 1) {
                right[j] = Math.min(right[j], end);
                result += right[j] - left[j];
            } else {
                right[j] = n;
                end = j;
            }
        }
    }
    return result;
}

/*
question: Given an m x n binary matrix mat, return the number of submatrices that have all ones.

 
Example 1:

Input: mat = [[1,0,1],[1,1,0],[1,1,0]]
Output: 13
Explanation: 
There are 6 rectangles of side 1x1.
There are 2 rectangles of side 1x2.
There are 3 rectangles of side 2x1.
There is 1 rectangle of side 2x2. 
There is 1 rectangle of side 3x1.
Total number of rectangles = 6 + 2 + 3 + 1 + 1 = 13.


Example 2:

Input: mat = [[0,1,1,0],[0,1,1,1],[1,1,1,0]]
Output: 24
Explanation: 
There are 8 rectangles of side 1x1.
There are 5 rectangles of side 1x2.
There are 2 rectangles of side 1x3. 
There are 4 rectangles of side 2x1.
There are 2 rectangles of side 2x2. 
There are 2 rectangles of side 3x1. 
There is 1 rectangle of side 3x2. 
Total number of rectangles = 8 + 5 + 2 + 4 + 2 + 2 + 1 = 24.


 
Constraints:


	1 <= m, n <= 150
	mat[i][j] is either 0 or 1.

 */
