class Word {
    word: string;
    abbr: string;
    index: number;
    constructor(word: string, index: number) {
        this.word = word;
        this.abbr = this.getAbbr(word, 1);
        this.index = index;
    }

    getAbbr(word: string, i: number) {
        if (i >= word.length - 2) {
            return word;
        }
        return word.substring(0, i) + (word.length - 1 - i) + word[word.length - 1];
    }

    inc() {
        const i = this.abbr.match(/\d/)?.index || 0;
        this.abbr = this.getAbbr(this.word, i + 2);
    }
}

function wordsAbbreviation(words: string[]): string[] {
    const n = words.length;
    const ans = new Array(n);
    const groups: Map<string, Word[]> = new Map();

    for (let i = 0; i < n; ++i) {
        const word = new Word(words[i], i);
        const list = groups.get(word.abbr) || [];
        list.push(word);
        groups.set(word.abbr, list);
    }

    while (groups.size > 0) {
        const nextGroups: Map<string, Word[]> = new Map();

        for (const [abbr, list] of groups) {
            if (list.length === 1) {
                ans[list[0].index] = abbr;
            } else {
                for (const word of list) {
                    word.inc();
                    const nextList = nextGroups.get(word.abbr) || [];
                    nextList.push(word);
                    nextGroups.set(word.abbr, nextList);
                }
            }
        }

        groups = nextGroups;
    }

    return ans;
}

/*
question: Given an array of distinct strings words, return the minimal possible abbreviations for every word.

The following are the rules for a string abbreviation:


	The initial abbreviation for each word is: the first character, then the number of characters in between, followed by the last character.
	If more than one word shares the same abbreviation, then perform the following operation:
	
		Increase the prefix (characters in the first part) of each of their abbreviations by 1.
		
			For example, say you start with the words ["abcdef","abndef"] both initially abbreviated as "a4f". Then, a sequence of operations would be ["a4f","a4f"] -> ["ab3f","ab3f"] -> ["abc2f","abn2f"].
		
		
		This operation is repeated until every abbreviation is unique.
	
	
	At the end, if an abbreviation did not make a word shorter, then keep it as the original word.


 
Example 1:
Input: words = ["like","god","internal","me","internet","interval","intension","face","intrusion"]
Output: ["l2e","god","internal","me","i6t","interval","inte4n","f2e","intr4n"]
Example 2:
Input: words = ["aa","aaa"]
Output: ["aa","aaa"]

 
Constraints:


	1 <= words.length <= 400
	2 <= words[i].length <= 400
	words[i] consists of lowercase English letters.
	All the strings of words are unique.

 */
