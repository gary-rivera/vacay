This problem seems to be related to SQL rather than TypeScript. However, I can provide a TypeScript solution using arrays of objects to represent the tables and performing operations on them to get the desired result.

Here is the TypeScript solution:

```typescript
type Employee = {
    id: number;
    name: string;
    salary: number;
    departmentId: number;
};

type Department = {
    id: number;
    name: string;
};

let employees: Employee[] = [
    { id: 1, name: 'Joe', salary: 70000, departmentId: 1 },
    { id: 2, name: 'Jim', salary: 90000, departmentId: 1 },
    { id: 3, name: 'Henry', salary: 80000, departmentId: 2 },
    { id: 4, name: 'Sam', salary: 60000, departmentId: 2 },
    { id: 5, name: 'Max', salary: 90000, departmentId: 1 },
];

let departments: Department[] = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'Sales' },
];

let result = departments.map(department => {
    let departmentEmployees = employees.filter(employee => employee.departmentId === department.id);
    let maxSalary = Math.max(...departmentEmployees.map(employee => employee.salary));
    let highestPaidEmployees = departmentEmployees.filter(employee => employee.salary === maxSalary);
    return highestPaidEmployees.map(employee => ({
        Department: department.name,
        Employee: employee.name,
        Salary: employee.salary,
    }));
}).flat();

console.log(result);
```

This code first maps over the departments, then filters the employees of each department. It finds the maximum salary in each department, then filters the employees who have this maximum salary. The result is an array of objects, each containing the department name, employee name, and salary. The `flat()` method is used to flatten the array of arrays into a single array.

/*
question: Table: Employee

+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| id           | int     |
| name         | varchar |
| salary       | int     |
| departmentId | int     |
+--------------+---------+
id is the primary key (column with unique values) for this table.
departmentId is a foreign key (reference columns) of the ID from the Department table.
Each row of this table indicates the ID, name, and salary of an employee. It also contains the ID of their department.


 

Table: Department

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| id          | int     |
| name        | varchar |
+-------------+---------+
id is the primary key (column with unique values) for this table. It is guaranteed that department name is not NULL.
Each row of this table indicates the ID of a department and its name.


 

Write a solution to find employees who have the highest salary in each of the departments.

Return the result table in any order.

The result format is in the following example.

 
Example 1:

Input: 
Employee table:
+----+-------+--------+--------------+
| id | name  | salary | departmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 70000  | 1            |
| 2  | Jim   | 90000  | 1            |
| 3  | Henry | 80000  | 2            |
| 4  | Sam   | 60000  | 2            |
| 5  | Max   | 90000  | 1            |
+----+-------+--------+--------------+
Department table:
+----+-------+
| id | name  |
+----+-------+
| 1  | IT    |
| 2  | Sales |
+----+-------+
Output: 
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Jim      | 90000  |
| Sales      | Henry    | 80000  |
| IT         | Max      | 90000  |
+------------+----------+--------+
Explanation: Max and Jim both have the highest salary in the IT department and Henry has the highest salary in the Sales department.

 */
