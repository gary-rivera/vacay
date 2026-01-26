class Rectangle {
    x1: number;
    y1: number;
    x2: number;
    y2: number;

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    getArea(): number {
        return (this.x2 - this.x1) * (this.y2 - this.y1);
    }
}

function rectangleArea(rectangles: number[][]): number {
    const MOD = 1e9 + 7;
    let totalArea = 0;
    let rectangleObjects: Rectangle[] = [];

    for (let rectangle of rectangles) {
        rectangleObjects.push(new Rectangle(rectangle[0], rectangle[1], rectangle[2], rectangle[3]));
    }

    for (let i = 0; i < rectangleObjects.length; i++) {
        totalArea = (totalArea + rectangleObjects[i].getArea()) % MOD;
        for (let j = 0; j < i; j++) {
            if (rectangleObjects[i].x1 < rectangleObjects[j].x2 &&
                rectangleObjects[i].x2 > rectangleObjects[j].x1 &&
                rectangleObjects[i].y1 < rectangleObjects[j].y2 &&
                rectangleObjects[i].y2 > rectangleObjects[j].y1) {
                let overlap = new Rectangle(
                    Math.max(rectangleObjects[i].x1, rectangleObjects[j].x1),
                    Math.max(rectangleObjects[i].y1, rectangleObjects[j].y1),
                    Math.min(rectangleObjects[i].x2, rectangleObjects[j].x2),
                    Math.min(rectangleObjects[i].y2, rectangleObjects[j].y2)
                );
                totalArea = (totalArea - overlap.getArea() + MOD) % MOD;
            }
        }
    }

    return totalArea;
}

/*
question: You are given a 2D array of axis-aligned rectangles. Each rectangle[i] = [xi1, yi1, xi2, yi2] denotes the ith rectangle where (xi1, yi1) are the coordinates of the bottom-left corner, and (xi2, yi2) are the coordinates of the top-right corner.

Calculate the total area covered by all rectangles in the plane. Any area covered by two or more rectangles should only be counted once.

Return the total area. Since the answer may be too large, return it modulo 109 + 7.

 
Example 1:

Input: rectangles = [[0,0,2,2],[1,0,2,3],[1,0,3,1]]
Output: 6
Explanation: A total area of 6 is covered by all three rectangles, as illustrated in the picture.
From (1,1) to (2,2), the green and red rectangles overlap.
From (1,0) to (2,3), all three rectangles overlap.


Example 2:

Input: rectangles = [[0,0,1000000000,1000000000]]
Output: 49
Explanation: The answer is 1018 modulo (109 + 7), which is 49.


 
Constraints:


	1 <= rectangles.length <= 200
	rectanges[i].length == 4
	0 <= xi1, yi1, xi2, yi2 <= 109
	xi1 <= xi2
	yi1 <= yi2
	All rectangles have non zero area.

 */
