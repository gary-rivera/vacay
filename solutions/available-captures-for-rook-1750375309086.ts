function numRookCaptures(board: string[][]): number {
    let rookPosition: [number, number] = [0, 0];
    let captures: number = 0;
    let directions: [number, number][] = [[-1, 0], [1, 0], [0, -1], [0, 1]];

    // Find the rook's position
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] === 'R') {
                rookPosition = [i, j];
                break;
            }
        }
    }

    // Check each direction from the rook's position
    for (let direction of directions) {
        for (let i = 1; i < 8; i++) {
            let x = rookPosition[0] + direction[0] * i;
            let y = rookPosition[1] + direction[1] * i;

            if (x < 0 || y < 0 || x >= 8 || y >= 8 || board[x][y] === 'B') break;

            if (board[x][y] === 'p') {
                captures++;
                break;
            }
        }
    }

    return captures;
}

/*
question: You are given an 8 x 8 matrix representing a chessboard. There is exactly one white rook represented by 'R', some number of white bishops 'B', and some number of black pawns 'p'. Empty squares are represented by '.'.

A rook can move any number of squares horizontally or vertically (up, down, left, right) until it reaches another piece or the edge of the board. A rook is attacking a pawn if it can move to the pawn's square in one move.

Note: A rook cannot move through other pieces, such as bishops or pawns. This means a rook cannot attack a pawn if there is another piece blocking the path.

Return the number of pawns the white rook is attacking.

 
Example 1:


Input: board = [[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","R",".",".",".","p"],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]

Output: 3

Explanation:

In this example, the rook is attacking all the pawns.


Example 2:


Input: board = [[".",".",".",".",".",".","."],[".","p","p","p","p","p",".","."],[".","p","p","B","p","p",".","."],[".","p","B","R","B","p",".","."],[".","p","p","B","p","p",".","."],[".","p","p","p","p","p",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]

Output: 0

Explanation:

The bishops are blocking the rook from attacking any of the pawns.


Example 3:


Input: board = [[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","p",".",".",".","."],["p","p",".","R",".","p","B","."],[".",".",".",".",".",".",".","."],[".",".",".","B",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."]]

Output: 3

Explanation:

The rook is attacking the pawns at positions b5, d6, and f5.


 
Constraints:


	board.length == 8
	board[i].length == 8
	board[i][j] is either 'R', '.', 'B', or 'p'
	There is exactly one cell with board[i][j] == 'R'

 */
