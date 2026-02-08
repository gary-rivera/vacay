type Follower = {
    user_id: number,
    follower_id: number
}

type UserFollowersCount = {
    user_id: number,
    followers_count: number
}

function countFollowers(followers: Follower[]): UserFollowersCount[] {
    let followersCountMap: Map<number, number> = new Map();

    for (let follower of followers) {
        if (followersCountMap.has(follower.user_id)) {
            followersCountMap.set(follower.user_id, followersCountMap.get(follower.user_id) + 1);
        } else {
            followersCountMap.set(follower.user_id, 1);
        }
    }

    let result: UserFollowersCount[] = [];

    for (let [user_id, followers_count] of Array.from(followersCountMap.entries()).sort()) {
        result.push({ user_id, followers_count });
    }

    return result;
}

/*
question: Table: Followers

+-------------+------+
| Column Name | Type |
+-------------+------+
| user_id     | int  |
| follower_id | int  |
+-------------+------+
(user_id, follower_id) is the primary key (combination of columns with unique values) for this table.
This table contains the IDs of a user and a follower in a social media app where the follower follows the user.

 

Write a solution that will, for each user, return the number of followers.

Return the result table ordered by user_id in ascending order.

The result format is in the following example.

 
Example 1:

Input: 
Followers table:
+---------+-------------+
| user_id | follower_id |
+---------+-------------+
| 0       | 1           |
| 1       | 0           |
| 2       | 0           |
| 2       | 1           |
+---------+-------------+
Output: 
+---------+----------------+
| user_id | followers_count|
+---------+----------------+
| 0       | 1              |
| 1       | 1              |
| 2       | 2              |
+---------+----------------+
Explanation: 
The followers of 0 are {1}
The followers of 1 are {0}
The followers of 2 are {0,1}

 */
