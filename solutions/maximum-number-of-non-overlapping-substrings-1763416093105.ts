function maxNumOfSubstrings(s: string): string[] {
    let first = new Array(26).fill(Number.MAX_SAFE_INTEGER);
    let last = new Array(26).fill(Number.MIN_SAFE_INTEGER);
    let res = [];
    let check = [];
    let len = s.length;
    for (let i = 0; i < len; i++) {
        first[s.charCodeAt(i) - 97] = Math.min(first[s.charCodeAt(i) - 97], i);
        last[s.charCodeAt(i) - 97] = Math.max(last[s.charCodeAt(i) - 97], i);
    }
    let right = -1;
    for (let i = 0; i < len; i++) {
        if (i != first[s.charCodeAt(i) - 97]) continue;
        let new_right = last[s.charCodeAt(i) - 97];
        for (let j = i; j <= new_right; j++) {
            if (first[s.charCodeAt(j) - 97] < i) break;
            new_right = Math.max(new_right, last[s.charCodeAt(j) - 97]);
            if (j == new_right) {
                check.push([i, j]);
                break;
            }
        }
    }
    check.sort((a, b) => a[1] - b[1]);
    for (let i = 0; i < check.length; i++) {
        if (i == 0 || check[i][0] > right) {
            res.push(s.substring(check[i][0], check[i][1] + 1));
            right = check[i][1];
        }
    }
    return res;
}

/*
question: Given a string s of lowercase letters, you need to find the maximum number of non-empty substrings of s that meet the following conditions:


	The substrings do not overlap, that is for any two substrings s[i..j] and s[x..y], either j < x or i > y is true.
	A substring that contains a certain character c must also contain all occurrences of c.


Find the maximum number of substrings that meet the above conditions. If there are multiple solutions with the same number of substrings, return the one with minimum total length. It can be shown that there exists a unique solution of minimum total length.

Notice that you can return the substrings in any order.

 
Example 1:

Input: s = "adefaddaccc"
Output: ["e","f","ccc"]
Explanation: The following are all the possible substrings that meet the conditions:
[
  "adefaddaccc"
  "adefadda",
  "ef",
  "e",
  "f",
  "ccc",
]
If we choose the first string, we cannot choose anything else and we'd get only 1. If we choose "adefadda", we are left with "ccc" which is the only one that doesn't overlap, thus obtaining 2 substrings. Notice also, that it's not optimal to choose "ef" since it can be split into two. Therefore, the optimal way is to choose ["e","f","ccc"] which gives us 3 substrings. No other solution of the same number of substrings exist.


Example 2:

Input: s = "abbaccd"
Output: ["d","bb","cc"]
Explanation: Notice that while the set of substrings ["d","abba","cc"] also has length 3, it's considered incorrect since it has larger total length.


 
Constraints:


	1 <= s.length <= 105
	s contains only lowercase English letters.

 */
