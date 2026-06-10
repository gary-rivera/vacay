function totalArea(ax1: number, ay1: number, ax2: number, ay2: number, bx1: number, by1: number, bx2: number, by2: number): number {
    let area1 = (ax2 - ax1) * (ay2 - ay1);
    let area2 = (bx2 - bx1) * (by2 - by1);

    let overlapWidth = Math.min(ax2, bx2) - Math.max(ax1, bx1);
    let overlapHeight = Math.min(ay2, by2) - Math.max(ay1, by1);

    let overlapArea = Math.max(overlapWidth, 0) * Math.max(overlapHeight, 0);

    return area1 + area2 - overlapArea;
}

/*
question: Given the coordinates of two rectilinear rectangles in a 2D plane, return the total area covered by the two rectangles.

The first rectangle is defined by its bottom-left corner (ax1, ay1) and its top-right corner (ax2, ay2).

The second rectangle is defined by its bottom-left corner (bx1, by1) and its top-right corner (bx2, by2).

 
Example 1:

Input: ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2
Output: 45


Example 2:

Input: ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 = 2
Output: 16


 
Constraints:


	-104 <= ax1 <= ax2 <= 104
	-104 <= ay1 <= ay2 <= 104
	-104 <= bx1 <= bx2 <= 104
	-104 <= by1 <= by2 <= 104

 */
