class Solution {
    private m: number;
    private n: number;
    private directions: number[][] = [[0, 1], [0, -1], [1, 0], [-1, 0], [0, 0]];

    minFlips(mat: number[][]): number {
        this.m = mat.length;
        this.n = mat[0].length;
        let start = 0;
        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                start |= mat[i][j] << (i * this.n + j);
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
                for (let r = 0; r < this.m; r++) {
                    for (let c = 0; c < this.n; c++) {
                        let next = this.flip(cur, r, c);
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

    private flip(cur: number, r: number, c: number): number {
        for (let d of this.directions) {
            let nr = r + d[0], nc = c + d[1];
            if (nr >= 0 && nr < this.m && nc >= 0 && nc < this.n) {
                cur ^= 1 << (nr * this.n + nc);
            }
        }
        return cur;
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
