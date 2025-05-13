function solveNQueens(n: number): string[][] {
    let results: string[][] = [];
    placeQueens(n, 0, [], results);
    return results;
}

function placeQueens(n: number, row: number, colPlacement: number[], results: string[][]) {
    if (row === n) {
        results.push(generateBoard(n, colPlacement));
        return;
    }

    for (let col = 0; col < n; col++) {
        colPlacement.push(col);
        if (isValid(colPlacement)) {
            placeQueens(n, row + 1, colPlacement, results);
        }
        colPlacement.pop();
    }
}

function isValid(colPlacement: number[]): boolean {
    let rowId = colPlacement.length - 1;
    for (let i = 0; i < rowId; i++) {
        let diff = Math.abs(colPlacement[i] - colPlacement[rowId]);
        if (diff === 0 || diff === rowId - i) {
            return false;
        }
    }
    return true;
}

function generateBoard(n: number, colPlacement: number[]): string[] {
    let board: string[] = [];
    for (let row = 0; row < n; row++) {
        let rowString = '';
        for (let col = 0; col < n; col++) {
            if (col === colPlacement[row]) {
                rowString += 'Q';
            } else {
                rowString += '.';
            }
        }
        board.push(rowString);
    }
    return board;
}

/*
question: The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.

 
Example 1:

Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above


Example 2:

Input: n = 1
Output: [["Q"]]


 
Constraints:


	1 <= n <= 9

 */
