function countSubstrings(s: string, k: number, queries: number[][]): number[] {
    const n = s.length;
    const prefixCount = Array.from({ length: n + 1 }, () => [0, 0]);
    const answer = [];

    for (let i = 0; i < n; i++) {
        prefixCount[i + 1][0] = prefixCount[i][0] + (s[i] === '0' ? 1 : 0);
        prefixCount[i + 1][1] = prefixCount[i][1] + (s[i] === '1' ? 1 : 0);
    }

    for (const [l, r] of queries) {
        let left = l, right = r + 1, mid;
        while (left < right) {
            mid = Math.floor((left + right) / 2);
            if (Math.max(prefixCount[mid + 1][0] - prefixCount[l][0], prefixCount[mid + 1][1] - prefixCount[l][1]) > k) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        answer.push((left - l) * (left - l + 1) / 2);
    }

    return answer;
}

/*
question: You are given a binary string s and an integer k.

You are also given a 2D integer array queries, where queries[i] = [li, ri].

A binary string satisfies the k-constraint if either of the following conditions holds:


	The number of 0's in the string is at most k.
	The number of 1's in the string is at most k.


Return an integer array answer, where answer[i] is the number of substrings of s[li..ri] that satisfy the k-constraint.

 
Example 1:


Input: s = "0001111", k = 2, queries = [[0,6]]

Output: [26]

Explanation:

For the query [0, 6], all substrings of s[0..6] = "0001111" satisfy the k-constraint except for the substrings s[0..5] = "000111" and s[0..6] = "0001111".


Example 2:


Input: s = "010101", k = 1, queries = [[0,5],[1,4],[2,3]]

Output: [15,9,3]

Explanation:

The substrings of s with a length greater than 3 do not satisfy the k-constraint.


 
Constraints:


	1 <= s.length <= 105
	s[i] is either '0' or '1'.
	1 <= k <= s.length
	1 <= queries.length <= 105
	queries[i] == [li, ri]
	0 <= li <= ri < s.length
	All queries are distinct.

 */
