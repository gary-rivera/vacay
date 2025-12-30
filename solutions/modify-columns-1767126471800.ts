type Employee = {
    name: string;
    salary: number;
};

let employees: Employee[] = [
    { name: 'Jack', salary: 19666 },
    { name: 'Piper', salary: 74754 },
    { name: 'Mia', salary: 62509 },
    { name: 'Ulysses', salary: 54866 }
];

employees = employees.map(employee => ({ ...employee, salary: employee.salary * 2 }));

/*
question: DataFrame employees
+-------------+--------+
| Column Name | Type   |
+-------------+--------+
| name        | object |
| salary      | int    |
+-------------+--------+


A company intends to give its employees a pay rise.

Write a solution to modify the salary column by multiplying each salary by 2.

The result format is in the following example.

 
Example 1:

Input:
DataFrame employees
+---------+--------+
| name    | salary |
+---------+--------+
| Jack    | 19666  |
| Piper   | 74754  |
| Mia     | 62509  |
| Ulysses | 54866  |
+---------+--------+
Output:
+---------+--------+
| name    | salary |
+---------+--------+
| Jack    | 39332  |
| Piper   | 149508 |
| Mia     | 125018 |
| Ulysses | 109732 |
+---------+--------+
Explanation:
Every salary has been doubled.
 */
