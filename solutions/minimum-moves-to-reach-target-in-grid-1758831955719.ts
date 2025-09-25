function minMoves(sx: number, sy: number, tx: number, ty: number): number {
    let moves = 0;
    while (tx >= sx && ty >= sy) {
        if (tx === sx) {
            if ((ty - sy) % tx === 0) {
                return moves + (ty - sy) / tx;
            } else {
                return -1;
            }
        } else if (ty === sy) {
            if ((tx - sx) % ty === 0) {
                return moves + (tx - sx) / ty;
            } else {
                return -1;
            }
        } else if (tx > ty) {
            tx -= ty;
            moves++;
        } else {
            ty -= tx;
            moves++;
        }
    }
    return -1;
}

/*
question: You are given four integers sx, sy, tx, and ty, representing two points (sx, sy) and (tx, ty) on an infinitely large 2D grid.

You start at (sx, sy).

At any point (x, y), define m = max(x, y). You can either:


	Move to (x + m, y), or
	Move to (x, y + m).


Return the minimum number of moves required to reach (tx, ty). If it is impossible to reach the target, return -1.

 
Example 1:


Input: sx = 1, sy = 2, tx = 5, ty = 4

Output: 2

Explanation:

The optimal path is:


	Move 1: max(1, 2) = 2. Increase the y-coordinate by 2, moving from (1, 2) to (1, 2 + 2) = (1, 4).
	Move 2: max(1, 4) = 4. Increase the x-coordinate by 4, moving from (1, 4) to (1 + 4, 4) = (5, 4).


Thus, the minimum number of moves to reach (5, 4) is 2.


Example 2:


Input: sx = 0, sy = 1, tx = 2, ty = 3

Output: 3

Explanation:

The optimal path is:


	Move 1: max(0, 1) = 1. Increase the x-coordinate by 1, moving from (0, 1) to (0 + 1, 1) = (1, 1).
	Move 2: max(1, 1) = 1. Increase the x-coordinate by 1, moving from (1, 1) to (1 + 1, 1) = (2, 1).
	Move 3: max(2, 1) = 2. Increase the y-coordinate by 2, moving from (2, 1) to (2, 1 + 2) = (2, 3).


Thus, the minimum number of moves to reach (2, 3) is 3.


Example 3:


Input: sx = 1, sy = 1, tx = 2, ty = 2

Output: -1

Explanation:


	It is impossible to reach (2, 2) from (1, 1) using the allowed moves. Thus, the answer is -1.



 
Constraints:


	0 <= sx <= tx <= 109
	0 <= sy <= ty <= 109

 */
