TypeScript does not natively support DataFrame as it is not a built-in data structure in JavaScript/TypeScript. However, we can use third-party libraries like Danfojs, which is a JavaScript equivalent of pandas in Python, to create and manipulate DataFrame. 

Here is how you can do it:

```typescript
import { DataFrame } from 'danfojs-node';

let student_data: [number, number][] = [
  [1, 15],
  [2, 11],
  [3, 11],
  [4, 20]
];

let df = new DataFrame(student_data, { columns: ["student_id", "age"] });

console.log(df.toString());
```

Please note that you need to install danfojs-node package before running this code. You can install it using npm:

```bash
npm install danfojs-node
```

Also, TypeScript code cannot be run directly. It needs to be transpiled to JavaScript first. You can use the TypeScript compiler (tsc) for this.

/*
question: Write a solution to create a DataFrame from a 2D list called student_data. This 2D list contains the IDs and ages of some students.

The DataFrame should have two columns, student_id and age, and be in the same order as the original 2D list.

The result format is in the following example.

 
Example 1:

Input:
student_data:
[
  [1, 15],
  [2, 11],
  [3, 11],
  [4, 20]
]
Output:
+------------+-----+
| student_id | age |
+------------+-----+
| 1          | 15  |
| 2          | 11  |
| 3          | 11  |
| 4          | 20  |
+------------+-----+
Explanation:
A DataFrame was created on top of student_data, with two columns named student_id and age.

 */
