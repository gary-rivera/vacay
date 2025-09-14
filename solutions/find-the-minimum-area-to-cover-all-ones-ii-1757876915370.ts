function minAreaRect(grid: number[][]): number {
    let ones: [number, number][] = [];
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                ones.push([i, j]);
            }
        }
    }

    let minArea = Infinity;
    for (let i = 0; i < ones.length; i++) {
        for (let j = i + 1; j < ones.length; j++) {
            for (let k = j + 1; k < ones.length; k++) {
                let area1 = Math.abs(ones[i][0] - ones[j][0]) * Math.abs(ones[i][1] - ones[j][1]);
                let area2 = Math.abs(ones[i][0] - ones[k][0]) * Math.abs(ones[i][1] - ones[k][1]);
                let area3 = Math.abs(ones[j][0] - ones[k][0]) * Math.abs(ones[j][1] - ones[k][1]);
                minArea = Math.min(minArea, area1 + area2 + area3);
            }
        }
    }

    return minArea;
}

/*
question: You are given a 2D binary array grid. You need to find 3 non-overlapping rectangles having non-zero areas with horizontal and vertical sides such that all the 1's in grid lie inside these rectangles.

Return the minimum possible sum of the area of these rectangles.

Note that the rectangles are allowed to touch.

 
Example 1:


Input: grid = [[1,0,1],[1,1,1]]

Output: 5

Explanation:




	The 1's at (0, 0) and (1, 0) are covered by a rectangle of area 2.
	The 1's at (0, 2) and (1, 2) are covered by a rectangle of area 2.
	The 1 at (1, 1) is covered by a rectangle of area 1.



Example 2:


Input: grid = [[1,0,1,0],[0,1,0,1]]

Output: 5

Explanation:




	The 1's at (0, 0) and (0, 2) are covered by a rectangle of area 3.
	The 1 at (1, 1) is covered by a rectangle of area 1.
	The 1 at (1, 3) is covered by a rectangle of area 1.



 
Constraints:


	1 <= grid.length, grid[i].length <= 30
	grid[i][j] is either 0 or 1.
	The input is generated such that there are at least three 1's in grid.

 */
