class Solution {
    private words: string[];
    private result: string;
    private map: Map<string, number>;
    private used: boolean[];

    constructor() {
        this.words = [];
        this.result = "";
        this.map = new Map();
        this.used = new Array(10).fill(false);
    }

    isSolvable(words: string[], result: string): boolean {
        this.words = words;
        this.result = result;
        return this.solve(0, 0, 0, 0, 0);
    }

    solve(index: number, pos: number, sum: number, start: number, end: number): boolean {
        if (index === this.words.length) {
            if (pos === this.result.length) {
                return sum === 0;
            }
            if (pos + 1 === this.result.length || this.map.has(this.result[pos + 1])) {
                let num = this.map.has(this.result[pos]) ? this.map.get(this.result[pos])! : 0;
                if (sum % 10 === num && this.solve(index, pos + 1, Math.floor(sum / 10), start, end)) {
                    return true;
                }
            }
            return false;
        }
        if (pos === this.words[index].length) {
            return this.solve(index + 1, 0, sum, start, end);
        }
        let ch = this.words[index][this.words[index].length - pos - 1];
        if (this.map.has(ch)) {
            return this.solve(index, pos + 1, sum + this.map.get(ch)! * Math.pow(10, pos), start, end);
        }
        for (let i = start; i <= end; i++) {
            if (!this.used[i]) {
                this.used[i] = true;
                this.map.set(ch, i);
                if (this.solve(index, pos + 1, sum + i * Math.pow(10, pos), i === 0 ? 1 : start, end)) {
                    return true;
                }
                this.map.delete(ch);
                this.used[i] = false;
            }
        }
        return false;
    }
}

let sol = new Solution();
console.log(sol.isSolvable(["SEND", "MORE"], "MONEY")); // true
console.log(sol.isSolvable(["SIX", "SEVEN", "SEVEN"], "TWENTY")); // true
console.log(sol.isSolvable(["LEET", "CODE"], "POINT")); // false

/*
question: Given an equation, represented by words on the left side and the result on the right side.

You need to check if the equation is solvable under the following rules:


	Each character is decoded as one digit (0 - 9).
	No two characters can map to the same digit.
	Each words[i] and result are decoded as one number without leading zeros.
	Sum of numbers on the left side (words) will equal to the number on the right side (result).


Return true if the equation is solvable, otherwise return false.

 
Example 1:

Input: words = ["SEND","MORE"], result = "MONEY"
Output: true
Explanation: Map 'S'-> 9, 'E'->5, 'N'->6, 'D'->7, 'M'->1, 'O'->0, 'R'->8, 'Y'->'2'
Such that: "SEND" + "MORE" = "MONEY" ,  9567 + 1085 = 10652

Example 2:

Input: words = ["SIX","SEVEN","SEVEN"], result = "TWENTY"
Output: true
Explanation: Map 'S'-> 6, 'I'->5, 'X'->0, 'E'->8, 'V'->7, 'N'->2, 'T'->1, 'W'->'3', 'Y'->4
Such that: "SIX" + "SEVEN" + "SEVEN" = "TWENTY" ,  650 + 68782 + 68782 = 138214

Example 3:

Input: words = ["LEET","CODE"], result = "POINT"
Output: false
Explanation: There is no possible mapping to satisfy the equation, so we return false.
Note that two different characters cannot map to the same digit.


 
Constraints:


	2 <= words.length <= 5
	1 <= words[i].length, result.length <= 7
	words[i], result contain only uppercase English letters.
	The number of different characters used in the expression is at most 10.

 */
