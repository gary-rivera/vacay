function canPartition(grid: number[][]): boolean {
    let m = grid.length;
    let n = grid[0].length;

    let rowSum = Array(m).fill(0);
    let colSum = Array(n).fill(0);

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            rowSum[i] += grid[i][j];
            colSum[j] += grid[i][j];
        }
    }

    let totalSum = rowSum.reduce((a, b) => a + b, 0);

    let tempSum = 0;
    for (let i = 0; i < m - 1; i++) {
        tempSum += rowSum[i];
        if (tempSum === totalSum / 2) {
            return true;
        }
    }

    tempSum = 0;
    for (let j = 0; j < n - 1; j++) {
        tempSum += colSum[j];
        if (tempSum === totalSum / 2) {
            return true;
        }
    }

    return false;
}

/*
question: You are given an m x n matrix grid of positive integers. Your task is to determine if it is possible to make either one horizontal or one vertical cut on the grid such that:


	Each of the two resulting sections formed by the cut is non-empty.
	The sum of the elements in both sections is equal.


Return true if such a partition exists; otherwise return false.

 
Example 1:


Input: grid = [[1,4],[2,3]]

Output: true

Explanation:



A horizontal cut between row 0 and row 1 results in two non-empty sections, each with a sum of 5. Thus, the answer is true.


Example 2:


Input: grid = [[1,3],[2,4]]

Output: false

Explanation:

No horizontal or vertical cut results in two non-empty sections with equal sums. Thus, the answer is false.


 
Constraints:


	1 <= m == grid.length <= 105
	1 <= n == grid[i].length <= 105
	2 <= m * n <= 105
	1 <= grid[i][j] <= 105

 */
