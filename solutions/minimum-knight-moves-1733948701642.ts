function minKnightMoves(x: number, y: number): number {
    let dp: number[][] = Array(601).fill(0).map(() => Array(601).fill(0));
    let dx: number[] = [2, 2, 1, 1, -1, -1, -2, -2];
    let dy: number[] = [1, -1, 2, -2, 2, -2, 1, -1];
    let queue: number[][] = [[0, 0]];
    dp[300][300] = 1;

    while (queue.length) {
        let [cx, cy] = queue.shift() as number[];
        if (cx === x && cy === y) {
            return dp[cx + 300][cy + 300] - 1;
        }

        for (let i = 0; i < 8; i++) {
            let nx = cx + dx[i];
            let ny = cy + dy[i];
            if (nx < -300 || ny < -300 || nx > 300 || ny > 300 || dp[nx + 300][ny + 300]) {
                continue;
            }
            dp[nx + 300][ny + 300] = dp[cx + 300][cy + 300] + 1;
            queue.push([nx, ny]);
        }
    }
    return -1;
}

/*
question: In an infinite chess board with coordinates from -infinity to +infinity, you have a knight at square [0, 0].

A knight has 8 possible moves it can make, as illustrated below. Each move is two squares in a cardinal direction, then one square in an orthogonal direction.

Return the minimum number of steps needed to move the knight to the square [x, y]. It is guaranteed the answer exists.

 
Example 1:

Input: x = 2, y = 1
Output: 1
Explanation: [0, 0] → [2, 1]


Example 2:

Input: x = 5, y = 5
Output: 4
Explanation: [0, 0] → [2, 1] → [4, 2] → [3, 4] → [5, 5]


 
Constraints:


	-300 <= x, y <= 300
	0 <= |x| + |y| <= 300

 */
