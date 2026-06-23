function smallestString(s: string): string {
    let frequency: { [key: string]: number } = {};
    let stack: string[] = [];
    let visited: { [key: string]: boolean } = {};

    for (let i = 0; i < s.length; i++) {
        if (frequency[s[i]]) {
            frequency[s[i]]++;
        } else {
            frequency[s[i]] = 1;
        }
    }

    for (let i = 0; i < s.length; i++) {
        frequency[s[i]]--;
        if (visited[s[i]]) continue;
        while (
            stack.length > 0 &&
            stack[stack.length - 1] > s[i] &&
            frequency[stack[stack.length - 1]] > 0
        ) {
            visited[stack.pop() as string] = false;
        }
        stack.push(s[i]);
        visited[s[i]] = true;
    }

    return stack.join("");
}

/*
question: You are given a string s that consists of lowercase English letters.

You can perform the following operation any number of times (possibly zero times):


	Choose any letter that appears at least twice in the current string s and delete any one occurrence.


Return the lexicographically smallest resulting string that can be formed this way.

 
Example 1:


Input: s = "aaccb"

Output: "aacb"

Explanation:

We can form the strings "acb", "aacb", "accb", and "aaccb". "aacb" is the lexicographically smallest one.

For example, we can obtain "aacb" by choosing 'c' and deleting its first occurrence.


Example 2:


Input: s = "z"

Output: "z"

Explanation:

We cannot perform any operations. The only string we can form is "z".


 
Constraints:


	1 <= s.length <= 105
	s contains lowercase English letters only.

 */
