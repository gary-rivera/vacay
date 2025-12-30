function maxPartitionFactor(points: number[][]): number {
    points.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let min = Infinity, max = -Infinity, res = 0;
    for (let i = 1; i < points.length; ++i) {
        let d = Math.abs(points[i][0] - points[i - 1][0]) + Math.abs(points[i][1] - points[i - 1][1]);
        min = Math.min(min, d);
        max = Math.max(max, d);
        res = Math.max(res, Math.min(max, min));
    }
    return res;
}

/*
question: You are given a 2D integer array points, where points[i] = [xi, yi] represents the coordinates of the ith point on the Cartesian plane.

The Manhattan distance between two points points[i] = [xi, yi] and points[j] = [xj, yj] is |xi - xj| + |yi - yj|.

Split the n points into exactly two non-empty groups. The partition factor of a split is the minimum Manhattan distance among all unordered pairs of points that lie in the same group.

Return the maximum possible partition factor over all valid splits.

Note: A group of size 1 contributes no intra-group pairs. When n = 2 (both groups size 1), there are no intra-group pairs, so define the partition factor as 0.

 
Example 1:


Input: points = [[0,0],[0,2],[2,0],[2,2]]

Output: 4

Explanation:

We split the points into two groups: {[0, 0], [2, 2]} and {[0, 2], [2, 0]}.


	
	In the first group, the only pair has Manhattan distance |0 - 2| + |0 - 2| = 4.
	
	
	In the second group, the only pair also has Manhattan distance |0 - 2| + |2 - 0| = 4.
	


The partition factor of this split is min(4, 4) = 4, which is maximal.


Example 2:


Input: points = [[0,0],[0,1],[10,0]]

Output: 11

Explanation:​​​​​​​

We split the points into two groups: {[0, 1], [10, 0]} and {[0, 0]}.


	
	In the first group, the only pair has Manhattan distance |0 - 10| + |1 - 0| = 11.
	
	
	The second group is a singleton, so it contributes no pairs.
	


The partition factor of this split is 11, which is maximal.


 
Constraints:


	2 <= points.length <= 500
	points[i] = [xi, yi]
	-108 <= xi, yi <= 108

 */
