This problem seems to be a SQL problem rather than a TypeScript problem. However, if you want to solve it using TypeScript, you can use an approach where you create an object to count the number of students per class and then filter out the classes that have less than 5 students. Here is a TypeScript solution:

```typescript
type Course = {
    student: string;
    class: string;
};

const courses: Course[] = [
    { student: 'A', class: 'Math' },
    { student: 'B', class: 'English' },
    { student: 'C', class: 'Math' },
    { student: 'D', class: 'Biology' },
    { student: 'E', class: 'Math' },
    { student: 'F', class: 'Computer' },
    { student: 'G', class: 'Math' },
    { student: 'H', class: 'Math' },
    { student: 'I', class: 'Math' },
];

const classCounts: { [key: string]: number } = {};

courses.forEach(course => {
    if (!classCounts[course.class]) {
        classCounts[course.class] = 0;
    }
    classCounts[course.class]++;
});

const classesWithAtLeastFiveStudents = Object.keys(classCounts).filter(className => classCounts[className] >= 5);

console.log(classesWithAtLeastFiveStudents);
```

This script will output `['Math']`, which is the only class with at least 5 students.

/*
question: Table: Courses

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| student     | varchar |
| class       | varchar |
+-------------+---------+
(student, class) is the primary key (combination of columns with unique values) for this table.
Each row of this table indicates the name of a student and the class in which they are enrolled.


 

Write a solution to find all the classes that have at least five students.

Return the result table in any order.

The result format is in the following example.

 
Example 1:

Input: 
Courses table:
+---------+----------+
| student | class    |
+---------+----------+
| A       | Math     |
| B       | English  |
| C       | Math     |
| D       | Biology  |
| E       | Math     |
| F       | Computer |
| G       | Math     |
| H       | Math     |
| I       | Math     |
+---------+----------+
Output: 
+---------+
| class   |
+---------+
| Math    |
+---------+
Explanation: 
- Math has 6 students, so we include it.
- English has 1 student, so we do not include it.
- Biology has 1 student, so we do not include it.
- Computer has 1 student, so we do not include it.

 */
