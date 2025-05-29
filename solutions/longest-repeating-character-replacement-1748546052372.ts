function longestSubstring(s: string, k: number): number {
    let start = 0, maxLength = 0, maxCount = 0;
    const frequency = new Array(26).fill(0);

    for (let end = 0; end < s.length; end++) {
        maxCount = Math.max(maxCount, ++frequency[s.charCodeAt(end) - 65]);
        if ((end - start + 1) - maxCount > k) {
            frequency[s.charCodeAt(start) - 65]--;
            start++;
        }
        maxLength = Math.max(maxLength, end - start + 1);
    }

    return maxLength;
}

/*
question: You are given a string s and an integer k. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most k times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.

 
Example 1:

Input: s = "ABAB", k = 2
Output: 4
Explanation: Replace the two 'A's with two 'B's or vice versa.


Example 2:

Input: s = "AABABBA", k = 1
Output: 4
Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
The substring "BBBB" has the longest repeating letters, which is 4.
There may exists other ways to achieve this answer too.

 
Constraints:


	1 <= s.length <= 105
	s consists of only uppercase English letters.
	0 <= k <= s.length

 */
