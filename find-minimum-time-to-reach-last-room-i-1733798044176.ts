type MoveTime = number[][];

function minTimeToReachRoom(moveTime: MoveTime): number {
    const n = moveTime.length;
    const m = moveTime[0].length;
    const dp: MoveTime = Array.from({ length: n }, () => Array(m).fill(Number.MAX_SAFE_INTEGER));
    dp[0][0] = moveTime[0][0];

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (i > 0) {
                dp[i][j] = Math.min(dp[i][j], Math.max(dp[i - 1][j], moveTime[i][j]) + 1);
            }
            if (j > 0) {
                dp[i][j] = Math.min(dp[i][j], Math.max(dp[i][j - 1], moveTime[i][j]) + 1);
            }
        }
    }
    return dp[n - 1][m - 1];
}

/*
question: There is a dungeon with n x m rooms arranged as a grid.

You are given a 2D array moveTime of size n x m, where moveTime[i][j] represents the minimum time in seconds when you can start moving to that room. You start from the room (0, 0) at time t = 0 and can move to an adjacent room. Moving between adjacent rooms takes exactly one second.

Return the minimum time to reach the room (n - 1, m - 1).

Two rooms are adjacent if they share a common wall, either horizontally or vertically.

 
Example 1:


Input: moveTime = [[0,4],[4,4]]

Output: 6

Explanation:

The minimum time required is 6 seconds.


	At time t == 4, move from room (0, 0) to room (1, 0) in one second.
	At time t == 5, move from room (1, 0) to room (1, 1) in one second.



Example 2:


Input: moveTime = [[0,0,0],[0,0,0]]

Output: 3

Explanation:

The minimum time required is 3 seconds.


	At time t == 0, move from room (0, 0) to room (1, 0) in one second.
	At time t == 1, move from room (1, 0) to room (1, 1) in one second.
	At time t == 2, move from room (1, 1) to room (1, 2) in one second.



Example 3:


Input: moveTime = [[0,1],[1,2]]

Output: 3


 
Constraints:


	2 <= n == moveTime.length <= 50
	2 <= m == moveTime[i].length <= 50
	0 <= moveTime[i][j] <= 109

 */
