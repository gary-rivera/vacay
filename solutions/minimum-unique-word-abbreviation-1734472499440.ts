class Solution {
    private targetMask = 0;
    private targetLength = 0;
    private dp: number[] = [];
    private dictionaryMasks: number[] = [];
    private dictionaryLengths: number[] = [];

    public minAbbreviation(target: string, dictionary: string[]): string {
        this.targetLength = target.length;
        this.dp = new Array(1 << this.targetLength).fill(-1);
        this.targetMask = this.toMask(target);
        for (let word of dictionary) {
            if (word.length != this.targetLength) continue;
            let mask = this.toMask(word);
            this.dictionaryMasks.push(mask);
            this.dictionaryLengths.push(this.countBits(mask));
        }
        let answer = this.solve((1 << this.targetLength) - 1);
        return this.toAbbreviation(answer);
    }

    private toMask(word: string): number {
        let mask = 0;
        for (let i = 0; i < word.length; i++) {
            mask <<= 1;
            if (word[i] == this.targetMask[i]) mask |= 1;
        }
        return mask;
    }

    private countBits(mask: number): number {
        let count = 0;
        while (mask > 0) {
            if ((mask & 1) == 1) count++;
            mask >>= 1;
        }
        return count;
    }

    private solve(mask: number): number {
        if (this.dp[mask] != -1) return this.dp[mask];
        let length = this.targetLength - this.countBits(mask);
        let answer = (length << 10) | mask;
        for (let bit = 0; bit < this.targetLength; bit++) {
            if ((mask & (1 << bit)) == 0) continue;
            let nextMask = mask ^ (1 << bit);
            let next = this.solve(nextMask);
            if (this.isValid(next)) answer = Math.min(answer, next);
        }
        return this.dp[mask] = answer;
    }

    private isValid(mask: number): boolean {
        for (let i = 0; i < this.dictionaryMasks.length; i++) {
            if ((mask & this.dictionaryMasks[i]) == mask && this.countBits(mask) == this.dictionaryLengths[i]) return false;
        }
        return true;
    }

    private toAbbreviation(mask: number): string {
        let abbreviation = '';
        let count = 0;
        for (let bit = 0; bit < this.targetLength; bit++) {
            if ((mask & (1 << bit)) == 0) count++;
            else {
                if (count > 0) abbreviation += count.toString();
                abbreviation += this.targetMask[bit];
                count = 0;
            }
        }
        if (count > 0) abbreviation += count.toString();
        return abbreviation;
    }
}

/*
question: A string can be abbreviated by replacing any number of non-adjacent substrings with their lengths. For example, a string such as "substitution" could be abbreviated as (but not limited to):


	"s10n" ("s ubstitutio n")
	"sub4u4" ("sub stit u tion")
	"12" ("substitution")
	"su3i1u2on" ("su bst i t u ti on")
	"substitution" (no substrings replaced)


Note that "s55n" ("s ubsti tutio n") is not a valid abbreviation of "substitution" because the replaced substrings are adjacent.

The length of an abbreviation is the number of letters that were not replaced plus the number of substrings that were replaced. For example, the abbreviation "s10n" has a length of 3 (2 letters + 1 substring) and "su3i1u2on" has a length of 9 (6 letters + 3 substrings).

Given a target string target and an array of strings dictionary, return an abbreviation of target with the shortest possible length such that it is not an abbreviation of any string in dictionary. If there are multiple shortest abbreviations, return any of them.

 
Example 1:

Input: target = "apple", dictionary = ["blade"]
Output: "a4"
Explanation: The shortest abbreviation of "apple" is "5", but this is also an abbreviation of "blade".
The next shortest abbreviations are "a4" and "4e". "4e" is an abbreviation of blade while "a4" is not.
Hence, return "a4".


Example 2:

Input: target = "apple", dictionary = ["blade","plain","amber"]
Output: "1p3"
Explanation: "5" is an abbreviation of both "apple" but also every word in the dictionary.
"a4" is an abbreviation of "apple" but also "amber".
"4e" is an abbreviation of "apple" but also "blade".
"1p3", "2p2", and "3l1" are the next shortest abbreviations of "apple".
Since none of them are abbreviations of words in the dictionary, returning any of them is correct.


 
Constraints:


	m == target.length
	n == dictionary.length
	1 <= m <= 21
	0 <= n <= 1000
	1 <= dictionary[i].length <= 100
	log2(n) + m <= 21 if n > 0
	target and dictionary[i] consist of lowercase English letters.
	dictionary does not contain target.

 */
