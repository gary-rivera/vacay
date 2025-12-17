This problem seems to be a SQL problem, not a TypeScript problem. However, if we were to model this in TypeScript, we could create classes for Person and Address, and then create a function to join the data from the two tables. Here's how you might do it:

```typescript
class Person {
    personId: number;
    lastName: string;
    firstName: string;

    constructor(personId: number, lastName: string, firstName: string) {
        this.personId = personId;
        this.lastName = lastName;
        this.firstName = firstName;
    }
}

class Address {
    addressId: number;
    personId: number;
    city: string;
    state: string;

    constructor(addressId: number, personId: number, city: string, state: string) {
        this.addressId = addressId;
        this.personId = personId;
        this.city = city;
        this.state = state;
    }
}

function joinPersonAddress(persons: Person[], addresses: Address[]): any[] {
    return persons.map(person => {
        const address = addresses.find(address => address.personId === person.personId);
        return {
            firstName: person.firstName,
            lastName: person.lastName,
            city: address ? address.city : null,
            state: address ? address.state : null
        };
    });
}
```
This code first defines two classes, Person and Address, to model the data in the two tables. It then defines a function joinPersonAddress that takes two arrays of Person and Address objects, respectively. It maps over the array of persons, and for each person, it finds the corresponding address in the addresses array. If an address is found, it includes the city and state in the returned object; if not, it includes null for the city and state.

/*
question: Table: Person

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| personId    | int     |
| lastName    | varchar |
| firstName   | varchar |
+-------------+---------+
personId is the primary key (column with unique values) for this table.
This table contains information about the ID of some persons and their first and last names.


 

Table: Address

+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| addressId   | int     |
| personId    | int     |
| city        | varchar |
| state       | varchar |
+-------------+---------+
addressId is the primary key (column with unique values) for this table.
Each row of this table contains information about the city and state of one person with ID = PersonId.


 

Write a solution to report the first name, last name, city, and state of each person in the Person table. If the address of a personId is not present in the Address table, report null instead.

Return the result table in any order.

The result format is in the following example.

 
Example 1:

Input: 
Person table:
+----------+----------+-----------+
| personId | lastName | firstName |
+----------+----------+-----------+
| 1        | Wang     | Allen     |
| 2        | Alice    | Bob       |
+----------+----------+-----------+
Address table:
+-----------+----------+---------------+------------+
| addressId | personId | city          | state      |
+-----------+----------+---------------+------------+
| 1         | 2        | New York City | New York   |
| 2         | 3        | Leetcode      | California |
+-----------+----------+---------------+------------+
Output: 
+-----------+----------+---------------+----------+
| firstName | lastName | city          | state    |
+-----------+----------+---------------+----------+
| Allen     | Wang     | Null          | Null     |
| Bob       | Alice    | New York City | New York |
+-----------+----------+---------------+----------+
Explanation: 
There is no address in the address table for the personId = 1 so we return null in their city and state.
addressId = 1 contains information about the address of personId = 2.

 */
