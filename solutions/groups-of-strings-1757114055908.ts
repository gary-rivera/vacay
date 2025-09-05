function maxNumOfGroups(words: string[]): number[] {
    const parent: number[] = [];
    for (let i = 0; i < 1 << 26; i++) {
        parent[i] = i;
    }

    const find = (x: number): number => {
        if (parent[x] === x) {
            return x;
        }
        parent[x] = find(parent[x]);
        return parent[x];
    };

    const union = (x: number, y: number) => {
        parent[find(x)] = find(y);
    };

    const freq: number[] = Array(1 << 26).fill(0);
    for (const word of words) {
        let mask = 0;
        for (const ch of word) {
            mask |= 1 << (ch.charCodeAt(0) - 97);
        }
        freq[mask]++;
        for (let i = 0; i < 26; i++) {
            union(mask, mask ^ (1 << i));
        }
    }

    const group: number[] = Array(1 << 26).fill(0);
    let maxGroup = 0;
    let numOfGroups = 0;
    for (let i = 0; i < 1 << 26; i++) {
        if (freq[i] > 0) {
            const root = find(i);
            group[root] += freq[i];
            maxGroup = Math.max(maxGroup, group[root]);
            if (root === i) {
                numOfGroups++;
            }
        }
    }

    return [numOfGroups, maxGroup];
}

/*
question: You are given a 0-indexed array of strings words. Each string consists of lowercase English letters only. No letter occurs more than once in any string of words.

Two strings s1 and s2 are said to be connected if the set of letters of s2 can be obtained from the set of letters of s1 by any one of the following operations:


	Adding exactly one letter to the set of the letters of s1.
	Deleting exactly one letter from the set of the letters of s1.
	Replacing exactly one letter from the set of the letters of s1 with any letter, including itself.


The array words can be divided into one or more non-intersecting groups. A string belongs to a group if any one of the following is true:


	It is connected to at least one other string of the group.
	It is the only string present in the group.


Note that the strings in words should be grouped in such a manner that a string belonging to a group cannot be connected to a string present in any other group. It can be proved that such an arrangement is always unique.

Return an array ans of size 2 where:


	ans[0] is the maximum number of groups words can be divided into, and
	ans[1] is the size of the largest group.


 
Example 1:

Input: words = ["a","b","ab","cde"]
Output: [2,3]
Explanation:
- words[0] can be used to obtain words[1] (by replacing 'a' with 'b'), and words[2] (by adding 'b'). So words[0] is connected to words[1] and words[2].
- words[1] can be used to obtain words[0] (by replacing 'b' with 'a'), and words[2] (by adding 'a'). So words[1] is connected to words[0] and words[2].
- words[2] can be used to obtain words[0] (by deleting 'b'), and words[1] (by deleting 'a'). So words[2] is connected to words[0] and words[1].
- words[3] is not connected to any string in words.
Thus, words can be divided into 2 groups ["a","b","ab"] and ["cde"]. The size of the largest group is 3.  


Example 2:

Input: words = ["a","ab","abc"]
Output: [1,3]
Explanation:
- words[0] is connected to words[1].
- words[1] is connected to words[0] and words[2].
- words[2] is connected to words[1].
Since all strings are connected to each other, they should be grouped together.
Thus, the size of the largest group is 3.


 
Constraints:


	1 <= words.length <= 2 * 104
	1 <= words[i].length <= 26
	words[i] consists of lowercase English letters only.
	No letter occurs more than once in words[i].

 */
