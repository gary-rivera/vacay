function minAddToMakeValid(s: string): number {
    let balance = 0;
    let ans = 0;

    for (let i = 0; i < s.length; ++i) {
        balance += s[i] === '(' ? 1 : -1;
        if (balance === -1) {
            ans++;
            balance++;
        }
    }

    return balance + ans;
}

/*
question: A parentheses string is valid if and only if:


	It is the empty string,
	It can be written as AB (A concatenated with B), where A and B are valid strings, or
	It can be written as (A), where A is a valid string.


You are given a parentheses string s. In one move, you can insert a parenthesis at any position of the string.


	For example, if s = "()))", you can insert an opening parenthesis to be "(()))" or a closing parenthesis to be "())))".


Return the minimum number of moves required to make s valid.

 
Example 1:

Input: s = "())"
Output: 1


Example 2:

Input: s = "((("
Output: 3


 
Constraints:


	1 <= s.length <= 1000
	s[i] is either '(' or ')'.

 */
