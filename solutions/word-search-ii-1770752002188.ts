class TrieNode {
    children: { [key: string]: TrieNode } = {};
    word: string | null = null;
}

function findWords(board: string[][], words: string[]): string[] {
    const root = new TrieNode();
    for (let word of words) {
        let node = root;
        for (let char of word) {
            if (node.children[char] == null) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.word = word;
    }

    const result: string[] = [];
    const m = board.length;
    const n = board[0].length;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            dfs(board, i, j, root, result);
        }
    }
    return result;
}

function dfs(board: string[][], i: number, j: number, node: TrieNode, result: string[]) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) {
        return;
    }
    const char = board[i][j];
    if (char === '#' || node.children[char] == null) {
        return;
    }
    node = node.children[char];
    if (node.word != null) {
        result.push(node.word);
        node.word = null;
    }

    board[i][j] = '#';
    dfs(board, i - 1, j, node, result);
    dfs(board, i + 1, j, node, result);
    dfs(board, i, j - 1, node, result);
    dfs(board, i, j + 1, node, result);
    board[i][j] = char;
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
