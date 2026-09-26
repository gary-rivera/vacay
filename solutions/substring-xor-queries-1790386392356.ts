function shortestSubstring(s: string, queries: number[][]): number[][] {
    let n = s.length;
    let prefix = new Array(n + 1).fill(0);
    let ans: number[][] = [];

    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] * 2 + parseInt(s[i]);
        prefix[i + 1] %= Math.pow(10, 9) + 7;
    }

    for (let i = 0; i < queries.length; i++) {
        let [firsti, secondi] = queries[i];
        let l = -1, r = -1;
        for (let len = 1; len <= n; len++) {
            for (let j = 0; j <= n - len; j++) {
                let val = prefix[j + len] - prefix[j] * Math.pow(2, len);
                val %= Math.pow(10, 9) + 7;
                if (val < 0) val += Math.pow(10, 9) + 7;
                if ((val ^ firsti) === secondi) {
                    l = j;
                    r = j + len - 1;
                    break;
                }
            }
            if (l !== -1) break;
        }
        ans.push([l, r]);
    }

    return ans;
}

/*
question: You are given a binary string s, and a 2D integer array queries where queries[i] = [firsti, secondi].

For the ith query, find the shortest substring of s whose decimal value, val, yields secondi when bitwise XORed with firsti. In other words, val ^ firsti == secondi.

The answer to the ith query is the endpoints (0-indexed) of the substring [lefti, righti] or [-1, -1] if no such substring exists. If there are multiple answers, choose the one with the minimum lefti.

Return an array ans where ans[i] = [lefti, righti] is the answer to the ith query.

A substring is a contiguous non-empty sequence of characters within a string.

 
Example 1:

Input: s = "101101", queries = [[0,5],[1,2]]
Output: [[0,2],[2,3]]
Explanation: For the first query the substring in range [0,2] is "101" which has a decimal value of 5, and 5 ^ 0 = 5, hence the answer to the first query is [0,2]. In the second query, the substring in range [2,3] is "11", and has a decimal value of 3, and 3 ^ 1 = 2. So, [2,3] is returned for the second query. 



Example 2:

Input: s = "0101", queries = [[12,8]]
Output: [[-1,-1]]
Explanation: In this example there is no substring that answers the query, hence [-1,-1] is returned.


Example 3:

Input: s = "1", queries = [[4,5]]
Output: [[0,0]]
Explanation: For this example, the substring in range [0,0] has a decimal value of 1, and 1 ^ 4 = 5. So, the answer is [0,0].


 
Constraints:


	1 <= s.length <= 104
	s[i] is either '0' or '1'.
	1 <= queries.length <= 105
	0 <= firsti, secondi <= 109

 */
