This problem seems to be related to SQL rather than TypeScript. However, if you want to simulate this in TypeScript, you can create an array of objects (representing the table) and then use array methods to filter and sort the data. Here is a possible solution:

```typescript
type Login = {
    user_id: number;
    time_stamp: Date;
};

const logins: Login[] = [
    { user_id: 6, time_stamp: new Date('2020-06-30T15:06:07') },
    { user_id: 6, time_stamp: new Date('2021-04-21T14:06:06') },
    { user_id: 6, time_stamp: new Date('2019-03-07T00:18:15') },
    { user_id: 8, time_stamp: new Date('2020-02-01T05:10:53') },
    { user_id: 8, time_stamp: new Date('2020-12-30T00:46:50') },
    { user_id: 2, time_stamp: new Date('2020-01-16T02:49:50') },
    { user_id: 2, time_stamp: new Date('2019-08-25T07:59:08') },
    { user_id: 14, time_stamp: new Date('2019-07-14T09:00:00') },
    { user_id: 14, time_stamp: new Date('2021-01-06T11:59:59') },
];

const result = logins
    .filter(login => login.time_stamp.getFullYear() === 2020)
    .sort((a, b) => b.time_stamp.getTime() - a.time_stamp.getTime())
    .reduce((acc: Login[], curr: Login) => {
        if (!acc.find(login => login.user_id === curr.user_id)) {
            acc.push(curr);
        }
        return acc;
    }, []);

console.log(result);
```

This script first filters out the logins that are not from 2020. Then it sorts the remaining logins in descending order by timestamp. Finally, it reduces the sorted array to only include the first occurrence of each user_id (which, due to the sorting, is the latest login).

/*
question: Table: Logins

+----------------+----------+
| Column Name    | Type     |
+----------------+----------+
| user_id        | int      |
| time_stamp     | datetime |
+----------------+----------+
(user_id, time_stamp) is the primary key (combination of columns with unique values) for this table.
Each row contains information about the login time for the user with ID user_id.


 

Write a solution to report the latest login for all users in the year 2020. Do not include the users who did not login in 2020.

Return the result table in any order.

The result format is in the following example.

 
Example 1:

Input: 
Logins table:
+---------+---------------------+
| user_id | time_stamp          |
+---------+---------------------+
| 6       | 2020-06-30 15:06:07 |
| 6       | 2021-04-21 14:06:06 |
| 6       | 2019-03-07 00:18:15 |
| 8       | 2020-02-01 05:10:53 |
| 8       | 2020-12-30 00:46:50 |
| 2       | 2020-01-16 02:49:50 |
| 2       | 2019-08-25 07:59:08 |
| 14      | 2019-07-14 09:00:00 |
| 14      | 2021-01-06 11:59:59 |
+---------+---------------------+
Output: 
+---------+---------------------+
| user_id | last_stamp          |
+---------+---------------------+
| 6       | 2020-06-30 15:06:07 |
| 8       | 2020-12-30 00:46:50 |
| 2       | 2020-01-16 02:49:50 |
+---------+---------------------+
Explanation: 
User 6 logged into their account 3 times but only once in 2020, so we include this login in the result table.
User 8 logged into their account 2 times in 2020, once in February and once in December. We include only the latest one (December) in the result table.
User 2 logged into their account 2 times but only once in 2020, so we include this login in the result table.
User 14 did not login in 2020, so we do not include them in the result table.

 */
