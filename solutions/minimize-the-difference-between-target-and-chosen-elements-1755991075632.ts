function minimizeAbsoluteDifference(mat: number[][], target: number): number {
    const m = mat.length;
    const n = mat[0].length;
    const dp = Array.from(Array(m + 1), () => Array(80000).fill(Infinity));
    dp[0][0] = 0;
    for (let i = 0; i < m; i++) {
        const next = Array.from(Array(80000), () => Infinity);
        mat[i].sort((a, b) => a - b);
        for (let j = 0; j < 80000; j++) {
            if (dp[i][j] === Infinity) continue;
            for (let k = 0; k < n; k++) {
                const sum = j + mat[i][k];
                if (sum < 80000) {
                    next[sum] = Math.min(next[sum], dp[i][j] + Math.abs(sum - target));
                } else {
                    next[79999] = Math.min(next[79999], dp[i][j] + Math.abs(sum - target));
                }
            }
        }
        dp[i + 1] = next;
    }
    let res = Infinity;
    for (let i = 0; i < 80000; i++) {
        res = Math.min(res, dp[m][i]);
    }
    return res;
}

/*
question: You are given an m x n integer matrix mat and an integer target.

Choose one integer from each row in the matrix such that the absolute difference between target and the sum of the chosen elements is minimized.

Return the minimum absolute difference.

The absolute difference between two numbers a and b is the absolute value of a - b.

 
Example 1:

Input: mat = [[1,2,3],[4,5,6],[7,8,9]], target = 13
Output: 0
Explanation: One possible choice is to:
- Choose 1 from the first row.
- Choose 5 from the second row.
- Choose 7 from the third row.
The sum of the chosen elements is 13, which equals the target, so the absolute difference is 0.


Example 2:

Input: mat = [[1],[2],[3]], target = 100
Output: 94
Explanation: The best possible choice is to:
- Choose 1 from the first row.
- Choose 2 from the second row.
- Choose 3 from the third row.
The sum of the chosen elements is 6, and the absolute difference is 94.


Example 3:

Input: mat = [[1,2,9,8,7]], target = 6
Output: 1
Explanation: The best choice is to choose 7 from the first row.
The absolute difference is 1.


 
Constraints:


	m == mat.length
	n == mat[i].length
	1 <= m, n <= 70
	1 <= mat[i][j] <= 70
	1 <= target <= 800

 */
