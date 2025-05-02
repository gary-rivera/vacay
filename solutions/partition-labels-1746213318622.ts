function partitionLabels(s: string): number[] {
    let lastIndices = new Array(26).fill(-1);
    for (let i = 0; i < s.length; i++) {
        lastIndices[s.charCodeAt(i) - 'a'.charCodeAt(0)] = i;
    }

    let j = 0, anchor = 0;
    let result: number[] = [];
    for (let i = 0; i < s.length; i++) {
        j = Math.max(j, lastIndices[s.charCodeAt(i) - 'a'.charCodeAt(0)]);
        if (i === j) {
            result.push(i - anchor + 1);
            anchor = i + 1;
        }
    }

    return result;
}

/*
question: You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part. For example, the string "ababcc" can be partitioned into ["abab", "cc"], but partitions such as ["aba", "bcc"] or ["ab", "ab", "cc"] are invalid.

Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.

Return a list of integers representing the size of these parts.

 
Example 1:

Input: s = "ababcbacadefegdehijhklij"
Output: [9,7,8]
Explanation:
The partition is "ababcbaca", "defegde", "hijhklij".
This is a partition so that each letter appears in at most one part.
A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.


Example 2:

Input: s = "eccbbbbdec"
Output: [10]


 
Constraints:


	1 <= s.length <= 500
	s consists of lowercase English letters.

 */
