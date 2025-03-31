class Triangle {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    canFormTriangle(): string {
        if (this.x + this.y > this.z && this.x + this.z > this.y && this.y + this.z > this.x) {
            return "Yes";
        } else {
            return "No";
        }
    }
}

let triangles: Triangle[] = [new Triangle(13, 15, 30), new Triangle(10, 20, 15)];

triangles.forEach(triangle => {
    console.log(`x: ${triangle.x}, y: ${triangle.y}, z: ${triangle.z}, triangle: ${triangle.canFormTriangle()}`);
});

/*
question: Table: Triangle

+-------------+------+
| Column Name | Type |
+-------------+------+
| x           | int  |
| y           | int  |
| z           | int  |
+-------------+------+
In SQL, (x, y, z) is the primary key column for this table.
Each row of this table contains the lengths of three line segments.


 

Report for every three line segments whether they can form a triangle.

Return the result table in any order.

The result format is in the following example.

 
Example 1:

Input: 
Triangle table:
+----+----+----+
| x  | y  | z  |
+----+----+----+
| 13 | 15 | 30 |
| 10 | 20 | 15 |
+----+----+----+
Output: 
+----+----+----+----------+
| x  | y  | z  | triangle |
+----+----+----+----------+
| 13 | 15 | 30 | No       |
| 10 | 20 | 15 | Yes      |
+----+----+----+----------+

 */
