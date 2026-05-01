function countSimilarPairs(words: string[]): number {
    const n = words.length;
    const m = words[0].length;
    const parent = Array(n).fill(0).map((_, i) => i);
    const rank = Array(n).fill(0);

    const find = (x: number): number => {
        if (parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    };

    const union = (x: number, y: number) => {
        const rootX = find(x);
        const rootY = find(y);
        if (rootX !== rootY) {
            if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
        }
    };

    const getDiff = (s: string, t: string): string => {
        let diff = '';
        for (let i = 0; i < m; i++) {
            const d = (26 + t.charCodeAt(i) - s.charCodeAt(i)) % 26;
            diff += String.fromCharCode(d + 97);
        }
        return diff;
    };

    const map = new Map<string, number>();
    for (let i = 0; i < n; i++) {
        const word = words[i];
        if (map.has(word)) {
            union(map.get(word)!, i);
        } else {
            map.set(word, i);
        }
        for (let j = 0; j < i; j++) {
            const diff = getDiff(words[j], word);
            if (map.has(diff)) {
                union(map.get(diff)!, i);
            }
        }
    }

    const count = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        count[find(i)]++;
    }

    return count.reduce((acc, val) => acc + val * (val - 1) / 2, 0);
}

/*
question: You are given an array words of n strings. Each string has length m and contains only lowercase English letters.

Two strings s and t are similar if we can apply the following operation any number of times (possibly zero times) so that s and t become equal.


	Choose either s or t.
	Replace every letter in the chosen string with the next letter in the alphabet cyclically. The next letter after 'z' is 'a'.


Count the number of pairs of indices (i, j) such that:


	i < j
	words[i] and words[j] are similar.


Return an integer denoting the number of such pairs.

 
Example 1:


Input: words = ["fusion","layout"]

Output: 1

Explanation:

words[0] = "fusion" and words[1] = "layout" are similar because we can apply the operation to "fusion" 6 times. The string "fusion" changes as follows.


	"fusion"
	"gvtjpo"
	"hwukqp"
	"ixvlrq"
	"jywmsr"
	"kzxnts"
	"layout"



Example 2:


Input: words = ["ab","aa","za","aa"]

Output: 2

Explanation:

words[0] = "ab" and words[2] = "za" are similar. words[1] = "aa" and words[3] = "aa" are similar.


 
Constraints:


	1 <= n == words.length <= 105
	1 <= m == words[i].length <= 105
	1 <= n * m <= 105
	words[i] consists only of lowercase English letters.

 */
