class UnionFind {
    parent: number[];
    rank: number[];
    count: number;

    constructor(n: number) {
        this.parent = Array(n).fill(0).map((_, index) => index);
        this.rank = Array(n).fill(0);
        this.count = n;
    }

    find(x: number): number {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }

    union(x: number, y: number): void {
        let rootX = this.find(x);
        let rootY = this.find(y);
        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX] += 1;
            }
            this.count--;
        }
    }

    getCount(): number {
        return this.count;
    }
}

function numSimilarGroups(strs: string[]): number {
    let n = strs.length;
    let m = strs[0].length;
    let uf = new UnionFind(n);

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (uf.find(i) == uf.find(j)) {
                continue;
            }
            if (check(strs[i], strs[j], m)) {
                uf.union(i, j);
            }
        }
    }
    return uf.getCount();
}

function check(a: string, b: string, len: number): boolean {
    let num = 0;
    for (let i = 0; i < len; i++) {
        if (a[i] !== b[i]) {
            num++;
            if (num > 2) {
                return false;
            }
        }
    }
    return true;
}

/*
question: Two strings, X and Y, are considered similar if either they are identical or we can make them equivalent by swapping at most two letters (in distinct positions) within the string X.

For example, "tars" and "rats" are similar (swapping at positions 0 and 2), and "rats" and "arts" are similar, but "star" is not similar to "tars", "rats", or "arts".

Together, these form two connected groups by similarity: {"tars", "rats", "arts"} and {"star"}.  Notice that "tars" and "arts" are in the same group even though they are not similar.  Formally, each group is such that a word is in the group if and only if it is similar to at least one other word in the group.

We are given a list strs of strings where every string in strs is an anagram of every other string in strs. How many groups are there?

 
Example 1:

Input: strs = ["tars","rats","arts","star"]
Output: 2


Example 2:

Input: strs = ["omv","ovm"]
Output: 1


 
Constraints:


	1 <= strs.length <= 300
	1 <= strs[i].length <= 300
	strs[i] consists of lowercase letters only.
	All words in strs have the same length and are anagrams of each other.

 */
