class Solution {
    private rows: number;
    private cols: number;
    private directions: number[][] = [[0, 1], [1, 0], [0, -1], [-1, 0], [0, 0]];

    minFlips(mat: number[][]): number {
        this.rows = mat.length;
        this.cols = mat[0].length;
        let start = 0;
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                start |= mat[i][j] << (i * this.cols + j);
            }
        }
        let queue: number[] = [start];
        let visited = new Set<number>([start]);
        let steps = 0;
        while (queue.length > 0) {
            let size = queue.length;
            for (let i = 0; i < size; i++) {
                let cur = queue.shift()!;
                if (cur === 0) return steps;
                for (let r = 0; r < this.rows; r++) {
                    for (let c = 0; c < this.cols; c++) {
                        let next = cur;
                        for (let d = 0; d < 5; d++) {
                            let nr = r + this.directions[d][0];
                            let nc = c + this.directions[d][1];
                            if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols) {
                                next ^= 1 << (nr * this.cols + nc);
                            }
                        }
                        if (!visited.has(next)) {
                            queue.push(next);
                            visited.add(next);
                        }
                    }
                }
            }
            steps++;
        }
        return -1;
    }
}

/*
question: Given a m x n binary matrix mat. In one step, you can choose one cell and flip it and all the four neighbors of it if they exist (Flip is changing 1 to 0 and 0 to 1). A pair of cells are called neighbors if they share one edge.

Return the minimum number of steps required to convert mat to a zero matrix or -1 if you cannot.

A binary matrix is a matrix with all cells equal to 0 or 1 only.

A zero matrix is a matrix with all cells equal to 0.

 
Example 1:

Input: mat = [[0,0],[0,1]]
Output: 3
Explanation: One possible solution is to flip (1, 0) then (0, 1) and finally (1, 1) as shown.


Example 2:

Input: mat = [[0]]
Output: 0
Explanation: Given matrix is a zero matrix. We do not need to change it.


Example 3:

Input: mat = [[1,0,0],[1,0,0]]
Output: -1
Explanation: Given matrix cannot be a zero matrix.


 
Constraints:


	m == mat.length
	n == mat[i].length
	1 <= m, n <= 3
	mat[i][j] is either 0 or 1.

 */
