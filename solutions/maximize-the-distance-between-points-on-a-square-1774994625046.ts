function maxMinManhattanDistance(side: number, points: number[][], k: number): number {
    const n = points.length;
    const dist = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            dist[i][j] = dist[j][i] = Math.abs(points[i][0] - points[j][0]) + Math.abs(points[i][1] - points[j][1]);
        }
    }

    let left = 0, right = 2 * side;
    while (left < right) {
        const mid = Math.floor((left + right + 1) / 2);
        const dp = Array.from({ length: 1 << n }, () => Array(k + 1).fill(false));
        dp[0][0] = true;
        for (let mask = 0; mask < 1 << n; mask++) {
            for (let cnt = 0; cnt <= k; cnt++) {
                if (!dp[mask][cnt]) continue;
                for (let i = 0; i < n; i++) {
                    if ((mask >> i) & 1) continue;
                    let flag = true;
                    for (let j = 0; j < n; j++) {
                        if ((mask >> j) & 1 && dist[i][j] < mid) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) dp[mask | (1 << i)][cnt + 1] = true;
                }
            }
        }
        if (dp[(1 << n) - 1][k]) left = mid;
        else right = mid - 1;
    }
    return left;
}

/*
question: You are given an integer side, representing the edge length of a square with corners at (0, 0), (0, side), (side, 0), and (side, side) on a Cartesian plane.

You are also given a positive integer k and a 2D integer array points, where points[i] = [xi, yi] represents the coordinate of a point lying on the boundary of the square.

You need to select k elements among points such that the minimum Manhattan distance between any two points is maximized.

Return the maximum possible minimum Manhattan distance between the selected k points.

The Manhattan Distance between two cells (xi, yi) and (xj, yj) is |xi - xj| + |yi - yj|.

 
Example 1:


Input: side = 2, points = [[0,2],[2,0],[2,2],[0,0]], k = 4

Output: 2

Explanation:



Select all four points.


Example 2:


Input: side = 2, points = [[0,0],[1,2],[2,0],[2,2],[2,1]], k = 4

Output: 1

Explanation:



Select the points (0, 0), (2, 0), (2, 2), and (2, 1).


Example 3:


Input: side = 2, points = [[0,0],[0,1],[0,2],[1,2],[2,0],[2,2],[2,1]], k = 5

Output: 1

Explanation:



Select the points (0, 0), (0, 1), (0, 2), (1, 2), and (2, 2).


 
Constraints:


	1 <= side <= 109
	4 <= points.length <= min(4 * side, 15 * 103)
	points[i] == [xi, yi]
	The input is generated such that:
	
		points[i] lies on the boundary of the square.
		All points[i] are unique.
	
	
	4 <= k <= min(25, points.length)

 */
