function secondLargestDigit(s: string): number {
    let digits = new Set<number>();
    for (let i = 0; i < s.length; i++) {
        if (!isNaN(parseInt(s[i]))) {
            digits.add(parseInt(s[i]));
        }
    }
    if (digits.size < 2) {
        return -1;
    }
    let sortedDigits = Array.from(digits).sort((a, b) => b - a);
    return sortedDigits[1];
}

/*
question: Given an alphanumeric string s, return the second largest numerical digit that appears in s, or -1 if it does not exist.

An alphanumeric string is a string consisting of lowercase English letters and digits.

 
Example 1:

Input: s = "dfa12321afd"
Output: 2
Explanation: The digits that appear in s are [1, 2, 3]. The second largest digit is 2.


Example 2:

Input: s = "abc1111"
Output: -1
Explanation: The digits that appear in s are [1]. There is no second largest digit. 


 
Constraints:


	1 <= s.length <= 500
	s consists of only lowercase English letters and digits.

 */
