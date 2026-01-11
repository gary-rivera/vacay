function maxDifference(s: string): number {
    let freqMap: { [key: string]: number } = {};
    for (let i = 0; i < s.length; i++) {
        if (freqMap[s[i]]) {
            freqMap[s[i]]++;
        } else {
            freqMap[s[i]] = 1;
        }
    }

    let oddFreq = Number.MIN_SAFE_INTEGER;
    let evenFreq = Number.MAX_SAFE_INTEGER;

    for (let key in freqMap) {
        if (freqMap[key] % 2 === 0) {
            evenFreq = Math.min(evenFreq, freqMap[key]);
        } else {
            oddFreq = Math.max(oddFreq, freqMap[key]);
        }
    }

    return oddFreq - evenFreq;
}

/*
question: You are given a string s consisting of lowercase English letters.

Your task is to find the maximum difference diff = freq(a1) - freq(a2) between the frequency of characters a1 and a2 in the string such that:


	a1 has an odd frequency in the string.
	a2 has an even frequency in the string.


Return this maximum difference.

 
Example 1:


Input: s = "aaaaabbc"

Output: 3

Explanation:


	The character 'a' has an odd frequency of 5, and 'b' has an even frequency of 2.
	The maximum difference is 5 - 2 = 3.



Example 2:


Input: s = "abcabcab"

Output: 1

Explanation:


	The character 'a' has an odd frequency of 3, and 'c' has an even frequency of 2.
	The maximum difference is 3 - 2 = 1.



 
Constraints:


	3 <= s.length <= 100
	s consists only of lowercase English letters.
	s contains at least one character with an odd frequency and one with an even frequency.

 */
