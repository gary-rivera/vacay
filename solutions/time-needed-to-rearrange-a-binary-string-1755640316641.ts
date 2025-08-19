function timeToTransform(s: string): number {
    let time = 0;
    let index = s.indexOf('01');
    while (index !== -1) {
        s = s.substring(0, index) + '10' + s.substring(index + 2);
        time++;
        index = s.indexOf('01');
    }
    return time;
}

/*
question: You are given a binary string s. In one second, all occurrences of "01" are simultaneously replaced with "10". This process repeats until no occurrences of "01" exist.

Return the number of seconds needed to complete this process.

 
Example 1:

Input: s = "0110101"
Output: 4
Explanation: 
After one second, s becomes "1011010".
After another second, s becomes "1101100".
After the third second, s becomes "1110100".
After the fourth second, s becomes "1111000".
No occurrence of "01" exists any longer, and the process needed 4 seconds to complete,
so we return 4.


Example 2:

Input: s = "11100"
Output: 0
Explanation:
No occurrence of "01" exists in s, and the processes needed 0 seconds to complete,
so we return 0.


 
Constraints:


	1 <= s.length <= 1000
	s[i] is either '0' or '1'.


 
Follow up:

Can you solve this problem in O(n) time complexity?
 */
