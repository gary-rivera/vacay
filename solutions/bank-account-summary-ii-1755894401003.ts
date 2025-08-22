This problem seems to be related to SQL database queries, but since you asked for TypeScript code, I'll create a simple simulation using TypeScript arrays and objects.

```typescript
type User = {
    account: number;
    name: string;
};

type Transaction = {
    trans_id: number;
    account: number;
    amount: number;
    transacted_on: Date;
};

let users: User[] = [
    { account: 900001, name: 'Alice' },
    { account: 900002, name: 'Bob' },
    { account: 900003, name: 'Charlie' }
];

let transactions: Transaction[] = [
    { trans_id: 1, account: 900001, amount: 7000, transacted_on: new Date('2020-08-01') },
    { trans_id: 2, account: 900001, amount: 7000, transacted_on: new Date('2020-09-01') },
    { trans_id: 3, account: 900001, amount: -3000, transacted_on: new Date('2020-09-02') },
    { trans_id: 4, account: 900002, amount: 1000, transacted_on: new Date('2020-09-12') },
    { trans_id: 5, account: 900003, amount: 6000, transacted_on: new Date('2020-08-07') },
    { trans_id: 6, account: 900003, amount: 6000, transacted_on: new Date('2020-09-07') },
    { trans_id: 7, account: 900003, amount: -4000, transacted_on: new Date('2020-09-11') }
];

let balances: { [key: number]: number } = {};

transactions.forEach(transaction => {
    if (!balances[transaction.account]) {
        balances[transaction.account] = 0;
    }
    balances[transaction.account] += transaction.amount;
});

let result: { name: string, balance: number }[] = [];

users.forEach(user => {
    if (balances[user.account] > 10000) {
        result.push({ name: user.name, balance: balances[user.account] });
    }
});

console.log(result);
```

This TypeScript code will output an array of users with a balance higher than 10000. The output will be in the format of `{ name: string, balance: number }[]`.

/*
question: Table: Users

+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| account      | int     |
| name         | varchar |
+--------------+---------+
account is the primary key (column with unique values) for this table.
Each row of this table contains the account number of each user in the bank.
There will be no two users having the same name in the table.


 

Table: Transactions

+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| trans_id      | int     |
| account       | int     |
| amount        | int     |
| transacted_on | date    |
+---------------+---------+
trans_id is the primary key (column with unique values) for this table.
Each row of this table contains all changes made to all accounts.
amount is positive if the user received money and negative if they transferred money.
All accounts start with a balance of 0.


 

Write a solution to report the name and balance of users with a balance higher than 10000. The balance of an account is equal to the sum of the amounts of all transactions involving that account.

Return the result table in any order.

The result format is in the following example.

 
Example 1:

Input: 
Users table:
+------------+--------------+
| account    | name         |
+------------+--------------+
| 900001     | Alice        |
| 900002     | Bob          |
| 900003     | Charlie      |
+------------+--------------+
Transactions table:
+------------+------------+------------+---------------+
| trans_id   | account    | amount     | transacted_on |
+------------+------------+------------+---------------+
| 1          | 900001     | 7000       |  2020-08-01   |
| 2          | 900001     | 7000       |  2020-09-01   |
| 3          | 900001     | -3000      |  2020-09-02   |
| 4          | 900002     | 1000       |  2020-09-12   |
| 5          | 900003     | 6000       |  2020-08-07   |
| 6          | 900003     | 6000       |  2020-09-07   |
| 7          | 900003     | -4000      |  2020-09-11   |
+------------+------------+------------+---------------+
Output: 
+------------+------------+
| name       | balance    |
+------------+------------+
| Alice      | 11000      |
+------------+------------+
Explanation: 
Alice's balance is (7000 + 7000 - 3000) = 11000.
Bob's balance is 1000.
Charlie's balance is (6000 + 6000 - 4000) = 8000.

 */
