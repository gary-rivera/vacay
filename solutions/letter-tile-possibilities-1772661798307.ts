function numTilePossibilities(tiles: string): number {
    let count = new Array(26).fill(0);
    for (let i = 0; i < tiles.length; i++) {
        count[tiles.charCodeAt(i) - 65]++;
    }
    return dfs(count);
}

function dfs(count: number[]): number {
    let sum = 0;
    for (let i = 0; i < 26; i++) {
        if (count[i] == 0) continue;
        sum++;
        count[i]--;
        sum += dfs(count);
        count[i]++;
    }
    return sum;
}

/*
question: You have n  tiles, where each tile has one letter tiles[i] printed on it.

Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles.

 
Example 1:

Input: tiles = "AAB"
Output: 8
Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".


Example 2:

Input: tiles = "AAABBC"
Output: 188


Example 3:

Input: tiles = "V"
Output: 1


 
Constraints:


	1 <= tiles.length <= 7
	tiles consists of uppercase English letters.

 */
