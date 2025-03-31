class Solution {
    rearrangeString(s: string): string {
        let freqMap = new Map<string, number>();
        for (let char of s) {
            if (freqMap.has(char)) {
                freqMap.set(char, freqMap.get(char)! + 1);
            } else {
                freqMap.set(char, 1);
            }
        }

        let maxHeap: [string, number][] = Array.from(freqMap).sort((a, b) => b[1] - a[1]);

        let result = '';
        let previous: [string, number] | null = null;

        while (maxHeap.length > 0) {
            let [char, freq] = maxHeap.shift()!;
            result += char;

            if (previous && previous[1] > 0) {
                maxHeap.push(previous);
            }

            freq--;
            previous = freq > 0 ? [char, freq] : null;

            maxHeap.sort((a, b) => b[1] - a[1]);
        }

        if (s.length !== result.length) {
            return "";
        } else {
            return result;
        }
    }
}

/*
question: Given a string s, rearrange the characters of s so that any two adjacent characters are not the same.

Return any possible rearrangement of s or return "" if not possible.

 
Example 1:
Input: s = "aab"
Output: "aba"
Example 2:
Input: s = "aaab"
Output: ""

 
Constraints:


	1 <= s.length <= 500
	s consists of lowercase English letters.

 */
