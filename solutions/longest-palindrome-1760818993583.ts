function longestPalindrome(s: string): number {
    let count = new Map<string, number>();
    for (let i = 0; i < s.length; i++) {
        let char = s.charAt(i);
        count.set(char, (count.get(char) || 0) + 1);
    }

    let length = 0;
    let hasOdd = false;
    for (let [char, charCount] of count) {
        if (charCount % 2 === 0) {
            length += charCount;
        } else {
            length += charCount - 1;
            hasOdd = true;
        }
    }

    if (hasOdd) {
        length++;
    }

    return length;
}

/*
question: Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.

Letters are case sensitive, for example, "Aa" is not considered a palindrome.

 
Example 1:

Input: s = "abccccdd"
Output: 7
Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.


Example 2:

Input: s = "a"
Output: 1
Explanation: The longest palindrome that can be built is "a", whose length is 1.


 
Constraints:


	1 <= s.length <= 2000
	s consists of lowercase and/or uppercase English letters only.

 */
