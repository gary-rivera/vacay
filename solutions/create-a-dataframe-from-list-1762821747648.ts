TypeScript does not have built-in support for DataFrames like Python. However, we can use a library called Danfojs, which is a JavaScript equivalent of Python's pandas library. Here's how you can create a DataFrame from a 2D array in TypeScript using Danfojs.

First, you need to install Danfojs using npm:

```bash
npm install danfojs-node
```

Then, you can use the following TypeScript code:

```typescript
import { DataFrame } from 'danfojs-node';

let student_data: [number, number][] = [
  [1, 15],
  [2, 11],
  [3, 11],
  [4, 20]
];

let df = new DataFrame(student_data, { columns: ["student_id", "age"] });

df.print();
```

This code first imports the DataFrame class from the 'danfojs-node' module. Then, it defines a 2D array called student_data. After that, it creates a new DataFrame from student_data, specifying the column names as "student_id" and "age". Finally, it prints the DataFrame.

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
