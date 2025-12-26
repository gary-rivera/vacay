type Queue = {
    person_id: number;
    person_name: string;
    weight: number;
    turn: number;
}

function getLastPerson(queue: Queue[]): string {
    let totalWeight = 0;
    let lastPerson = "";

    // Sort the queue based on the turn
    queue.sort((a, b) => a.turn - b.turn);

    for (let i = 0; i < queue.length; i++) {
        if (totalWeight + queue[i].weight > 1000) {
            break;
        }
        totalWeight += queue[i].weight;
        lastPerson = queue[i].person_name;
    }

    return lastPerson;
}

let queue: Queue[] = [
    { person_id: 5, person_name: "Alice", weight: 250, turn: 1 },
    { person_id: 4, person_name: "Bob", weight: 175, turn: 5 },
    { person_id: 3, person_name: "Alex", weight: 350, turn: 2 },
    { person_id: 6, person_name: "John Cena", weight: 400, turn: 3 },
    { person_id: 1, person_name: "Winston", weight: 500, turn: 6 },
    { person_id: 2, person_name: "Marie", weight: 200, turn: 4 },
];

console.log(getLastPerson(queue)); // John Cena

/*
question: Table: Queue

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| person_id   | int     |
| person_name | varchar |
| weight      | int     |
| turn        | int     |
+-------------+---------+
person_id column contains unique values.
This table has the information about all people waiting for a bus.
The person_id and turn columns will contain all numbers from 1 to n, where n is the number of rows in the table.
turn determines the order of which the people will board the bus, where turn=1 denotes the first person to board and turn=n denotes the last person to board.
weight is the weight of the person in kilograms.


 

There is a queue of people waiting to board a bus. However, the bus has a weight limit of 1000 kilograms, so there may be some people who cannot board.

Write a solution to find the person_name of the last person that can fit on the bus without exceeding the weight limit. The test cases are generated such that the first person does not exceed the weight limit.

Note that only one person can board the bus at any given turn.

The result format is in the following example.

 
Example 1:

Input: 
Queue table:
+-----------+-------------+--------+------+
| person_id | person_name | weight | turn |
+-----------+-------------+--------+------+
| 5         | Alice       | 250    | 1    |
| 4         | Bob         | 175    | 5    |
| 3         | Alex        | 350    | 2    |
| 6         | John Cena   | 400    | 3    |
| 1         | Winston     | 500    | 6    |
| 2         | Marie       | 200    | 4    |
+-----------+-------------+--------+------+
Output: 
+-------------+
| person_name |
+-------------+
| John Cena   |
+-------------+
Explanation: The folowing table is ordered by the turn for simplicity.
+------+----+-----------+--------+--------------+
| Turn | ID | Name      | Weight | Total Weight |
+------+----+-----------+--------+--------------+
| 1    | 5  | Alice     | 250    | 250          |
| 2    | 3  | Alex      | 350    | 600          |
| 3    | 6  | John Cena | 400    | 1000         | (last person to board)
| 4    | 2  | Marie     | 200    | 1200         | (cannot board)
| 5    | 4  | Bob       | 175    | ___          |
| 6    | 1  | Winston   | 500    | ___          |
+------+----+-----------+--------+--------------+

 */
