class Solution {
    private matrix: number[][];
    private zeros: number[][];
    private m: number;
    private n: number;

    constructor(m: number, n: number) {
        this.m = m;
        this.n = n;
        this.matrix = Array(m).fill(0).map(() => Array(n).fill(0));
        this.zeros = [];
        for(let i = 0; i < m; i++) {
            for(let j = 0; j < n; j++) {
                this.zeros.push([i, j]);
            }
        }
    }

    flip(): number[] {
        const randIndex = Math.floor(Math.random() * this.zeros.length);
        const [i, j] = this.zeros[randIndex];
        this.matrix[i][j] = 1;
        this.zeros[randIndex] = this.zeros[this.zeros.length - 1];
        this.zeros.pop();
        return [i, j];
    }

    reset(): void {
        this.matrix = Array(this.m).fill(0).map(() => Array(this.n).fill(0));
        this.zeros = [];
        for(let i = 0; i < this.m; i++) {
            for(let j = 0; j < this.n; j++) {
                this.zeros.push([i, j]);
            }
        }
    }
}

/*
question: There is an m x n binary grid matrix with all the values set 0 initially. Design an algorithm to randomly pick an index (i, j) where matrix[i][j] == 0 and flips it to 1. All the indices (i, j) where matrix[i][j] == 0 should be equally likely to be returned.

Optimize your algorithm to minimize the number of calls made to the built-in random function of your language and optimize the time and space complexity.

Implement the Solution class:


	Solution(int m, int n) Initializes the object with the size of the binary matrix m and n.
	int[] flip() Returns a random index [i, j] of the matrix where matrix[i][j] == 0 and flips it to 1.
	void reset() Resets all the values of the matrix to be 0.


 
Example 1:

Input
["Solution", "flip", "flip", "flip", "reset", "flip"]
[[3, 1], [], [], [], [], []]
Output
[null, [1, 0], [2, 0], [0, 0], null, [2, 0]]

Explanation
Solution solution = new Solution(3, 1);
solution.flip();  // return [1, 0], [0,0], [1,0], and [2,0] should be equally likely to be returned.
solution.flip();  // return [2, 0], Since [1,0] was returned, [2,0] and [0,0]
solution.flip();  // return [0, 0], Based on the previously returned indices, only [0,0] can be returned.
solution.reset(); // All the values are reset to 0 and can be returned.
solution.flip();  // return [2, 0], [0,0], [1,0], and [2,0] should be equally likely to be returned.


 
Constraints:


	1 <= m, n <= 104
	There will be at least one free cell for each call to flip.
	At most 1000 calls will be made to flip and reset.

 */
