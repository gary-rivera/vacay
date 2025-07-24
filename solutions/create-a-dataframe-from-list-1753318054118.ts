TypeScript does not natively support DataFrame operations like Python. However, we can use the Danfojs library, which is a JavaScript equivalent of Python's pandas library, to create a DataFrame. 

First, you need to install the library by running `npm install danfojs-node` in your terminal.

Here is the TypeScript code:

```typescript
import { DataFrame } from 'danfojs-node';

function createDataFrame(student_data: number[][]): DataFrame {
    let df = new DataFrame(student_data, { columns: ['student_id', 'age'] });
    return df;
}

let student_data: number[][] = [
    [1, 15],
    [2, 11],
    [3, 11],
    [4, 20]
];

let df = createDataFrame(student_data);
df.print();
```

This code first imports the DataFrame class from the danfojs-node package. It then defines a function, createDataFrame, which takes a 2D array of numbers as input and returns a DataFrame. The DataFrame is created with the input data and column names 'student_id' and 'age'. Finally, it creates a DataFrame from the student_data array and prints it.

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
