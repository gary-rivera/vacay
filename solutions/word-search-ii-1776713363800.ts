class TrieNode {
    children: { [key: string]: TrieNode };
    word: string | null;

    constructor() {
        this.children = {};
        this.word = null;
    }
}

function findWords(board: string[][], words: string[]): string[] {
    const root = new TrieNode();
    for (let word of words) {
        let node = root;
        for (let c of word) {
            if (node.children[c] == null) {
                node.children[c] = new TrieNode();
            }
            node = node.children[c];
        }
        node.word = word;
    }

    const result: string[] = [];
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            dfs(board, i, j, root, result);
        }
    }
    return result;
}

function dfs(board: string[][], i: number, j: number, node: TrieNode, result: string[]) {
    const c = board[i][j];
    if (c === '#' || node.children[c] == null) return;
    node = node.children[c];
    if (node.word != null) {
        result.push(node.word);
        node.word = null;
    }

    board[i][j] = '#';
    if (i > 0) dfs(board, i - 1, j, node, result);
    if (j > 0) dfs(board, i, j - 1, node, result);
    if (i < board.length - 1) dfs(board, i + 1, j, node, result);
    if (j < board[0].length - 1) dfs(board, i, j + 1, node, result);
    board[i][j] = c;
}

/*
question: Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

 
Example 1:

Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]


Example 2:

Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []


 
Constraints:


	m == board.length
	n == board[i].length
	1 <= m, n <= 12
	board[i][j] is a lowercase English letter.
	1 <= words.length <= 3 * 104
	1 <= words[i].length <= 10
	words[i] consists of lowercase English letters.
	All the strings of words are unique.

 */
