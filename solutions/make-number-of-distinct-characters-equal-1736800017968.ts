function canMakeEqual(word1: string, word2: string): boolean {
    const count1: { [key: string]: number } = {};
    const count2: { [key: string]: number } = {};

    for (let i = 0; i < word1.length; i++) {
        count1[word1[i]] = (count1[word1[i]] || 0) + 1;
    }

    for (let i = 0; i < word2.length; i++) {
        count2[word2[i]] = (count2[word2[i]] || 0) + 1;
    }

    const distinct1 = Object.keys(count1).length;
    const distinct2 = Object.keys(count2).length;

    if (Math.abs(distinct1 - distinct2) > 1) {
        return false;
    }

    if (distinct1 === distinct2) {
        return true;
    }

    const largerSet = distinct1 > distinct2 ? count1 : count2;
    const smallerSet = distinct1 > distinct2 ? count2 : count1;

    for (let char in largerSet) {
        if (!(char in smallerSet)) {
            return true;
        }
    }

    return false;
}

/*
question: You are given two 0-indexed strings word1 and word2.

A move consists of choosing two indices i and j such that 0 <= i < word1.length and 0 <= j < word2.length and swapping word1[i] with word2[j].

Return true if it is possible to get the number of distinct characters in word1 and word2 to be equal with exactly one move. Return false otherwise.

 
Example 1:

Input: word1 = "ac", word2 = "b"
Output: false
Explanation: Any pair of swaps would yield two distinct characters in the first string, and one in the second string.


Example 2:

Input: word1 = "abcc", word2 = "aab"
Output: true
Explanation: We swap index 2 of the first string with index 0 of the second string. The resulting strings are word1 = "abac" and word2 = "cab", which both have 3 distinct characters.


Example 3:

Input: word1 = "abcde", word2 = "fghij"
Output: true
Explanation: Both resulting strings will have 5 distinct characters, regardless of which indices we swap.


 
Constraints:


	1 <= word1.length, word2.length <= 105
	word1 and word2 consist of only lowercase English letters.

 */
