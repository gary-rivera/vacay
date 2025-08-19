function rotateGrid(grid: number[][], k: number): number[][] {
    let m = grid.length, n = grid[0].length;
    let layers = Math.min(m, n) / 2;

    for (let l = 0; l < layers; l++) {
        let layer = [];
        for (let i = l; i < m - l; i++) {
            layer.push(grid[i][l]);
        }
        for (let j = l + 1; j < n - l; j++) {
            layer.push(grid[m - l - 1][j]);
        }
        for (let i = m - l - 2; i >= l; i--) {
            layer.push(grid[i][n - l - 1]);
        }
        for (let j = n - l - 2; j > l; j--) {
            layer.push(grid[l][j]);
        }

        let len = layer.length;
        let rotations = k % len;

        let rotatedLayer = layer.slice(rotations).concat(layer.slice(0, rotations));

        let index = 0;
        for (let i = l; i < m - l; i++) {
            grid[i][l] = rotatedLayer[index++];
        }
        for (let j = l + 1; j < n - l; j++) {
            grid[m - l - 1][j] = rotatedLayer[index++];
        }
        for (let i = m - l - 2; i >= l; i--) {
            grid[i][n - l - 1] = rotatedLayer[index++];
        }
        for (let j = n - l - 2; j > l; j--) {
            grid[l][j] = rotatedLayer[index++];
        }
    }

    return grid;
}

/*
question: You are given an m x n integer matrix grid​​​, where m and n are both even integers, and an integer k.

The matrix is composed of several layers, which is shown in the below image, where each color is its own layer:



A cyclic rotation of the matrix is done by cyclically rotating each layer in the matrix. To cyclically rotate a layer once, each element in the layer will take the place of the adjacent element in the counter-clockwise direction. An example rotation is shown below:

Return the matrix after applying k cyclic rotations to it.

 
Example 1:

Input: grid = [[40,10],[30,20]], k = 1
Output: [[10,20],[40,30]]
Explanation: The figures above represent the grid at every state.


Example 2:
  

Input: grid = [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]], k = 2
Output: [[3,4,8,12],[2,11,10,16],[1,7,6,15],[5,9,13,14]]
Explanation: The figures above represent the grid at every state.


 
Constraints:


	m == grid.length
	n == grid[i].length
	2 <= m, n <= 50
	Both m and n are even integers.
	1 <= grid[i][j] <= 5000
	1 <= k <= 109
 */
