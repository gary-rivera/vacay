type Point = [number, number];

function maxDarts(darts: Point[], r: number): number {
    const n = darts.length;
    let res = 1;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            const midPoints = getMidPoints(darts[i], darts[j], r);
            for (const midPoint of midPoints) {
                let count = 0;
                for (const dart of darts) {
                    if (getDistance(midPoint, dart) <= r) {
                        count++;
                    }
                }
                res = Math.max(res, count);
            }
        }
    }
    return res;
}

function getMidPoints(p1: Point, p2: Point, r: number): Point[] {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const A = -2 * dx;
    const B = -2 * dy;
    const C = dx * dx + dy * dy + 2 * r * r;
    const D = Math.sqrt(B * B - 4 * A * C);
    const midX1 = (-B + D) / (2 * A);
    const midX2 = (-B - D) / (2 * A);
    const midY1 = (-B + D) / (2 * A);
    const midY2 = (-B - D) / (2 * A);
    return [[midX1, midY1], [midX2, midY2]];
}

function getDistance(p1: Point, p2: Point): number {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

/*
question: Alice is throwing n darts on a very large wall. You are given an array darts where darts[i] = [xi, yi] is the position of the ith dart that Alice threw on the wall.

Bob knows the positions of the n darts on the wall. He wants to place a dartboard of radius r on the wall so that the maximum number of darts that Alice throws lie on the dartboard.

Given the integer r, return the maximum number of darts that can lie on the dartboard.

 
Example 1:

Input: darts = [[-2,0],[2,0],[0,2],[0,-2]], r = 2
Output: 4
Explanation: Circle dartboard with center in (0,0) and radius = 2 contain all points.


Example 2:

Input: darts = [[-3,0],[3,0],[2,6],[5,4],[0,9],[7,8]], r = 5
Output: 5
Explanation: Circle dartboard with center in (0,4) and radius = 5 contain all points except the point (7,8).


 
Constraints:


	1 <= darts.length <= 100
	darts[i].length == 2
	-104 <= xi, yi <= 104
	All the darts are unique
	1 <= r <= 5000

 */
