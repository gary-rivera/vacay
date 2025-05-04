function kSimilarity(s1: string, s2: string): number {
    const memo: {[key: string]: number} = {};
    return helper(s1, s2, 0);

    function helper(s1: string, s2: string, i: number): number {
        if (i === s1.length) return 0;
        if (s1[i] === s2[i]) return helper(s1, s2, i + 1);
        let min = Infinity;
        for (let j = i + 1; j < s1.length; j++) {
            if (s1[j] === s2[i]) {
                let swapped = swap(s1, i, j);
                let key = swapped + ',' + i;
                if (!(key in memo)) {
                    memo[key] = 1 + helper(swapped, s2, i + 1);
                }
                min = Math.min(min, memo[key]);
            }
        }
        return min;
    }

    function swap(s: string, i: number, j: number): string {
        let arr = s.split('');
        [arr[i], arr[j]] = [arr[j], arr[i]];
        return arr.join('');
    }
}

/*
question: Strings s1 and s2 are k-similar (for some non-negative integer k) if we can swap the positions of two letters in s1 exactly k times so that the resulting string equals s2.

Given two anagrams s1 and s2, return the smallest k for which s1 and s2 are k-similar.

 
Example 1:

Input: s1 = "ab", s2 = "ba"
Output: 1
Explanation: The two string are 1-similar because we can use one swap to change s1 to s2: "ab" --> "ba".


Example 2:

Input: s1 = "abc", s2 = "bca"
Output: 2
Explanation: The two strings are 2-similar because we can use two swaps to change s1 to s2: "abc" --> "bac" --> "bca".


 
Constraints:


	1 <= s1.length <= 20
	s2.length == s1.length
	s1 and s2 contain only lowercase letters from the set {'a', 'b', 'c', 'd', 'e', 'f'}.
	s2 is an anagram of s1.

 */
