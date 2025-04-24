function letterCasePermutation(s: string): string[] {
    let permutations: string[] = [''];
    for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (isNaN(Number(ch))) {
            const len = permutations.length;
            for (let j = 0; j < len; j++) {
                permutations.push(permutations[j] + ch.toUpperCase());
                permutations[j] += ch.toLowerCase();
            }
        } else {
            for (let j = 0; j < permutations.length; j++) {
                permutations[j] += ch;
            }
        }
    }
    return permutations;
}

/*
question: Given a string s, you can transform every letter individually to be lowercase or uppercase to create another string.

Return a list of all possible strings we could create. Return the output in any order.

 
Example 1:

Input: s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]


Example 2:

Input: s = "3z4"
Output: ["3z4","3Z4"]


 
Constraints:


	1 <= s.length <= 12
	s consists of lowercase English letters, uppercase English letters, and digits.

 */
