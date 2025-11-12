class WordFilter {
    private map: Map<string, number>;

    constructor(words: string[]) {
        this.map = new Map<string, number>();
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            for (let j = 0; j <= word.length; j++) {
                for (let k = 0; k <= word.length; k++) {
                    this.map.set(word.substring(0, j) + '#' + word.substring(word.length - k), i);
                }
            }
        }
    }

    f(pref: string, suff: string): number {
        return this.map.get(pref + '#' + suff) || -1;
    }
}

/*
question: Design a special dictionary that searches the words in it by a prefix and a suffix.

Implement the WordFilter class:


	WordFilter(string[] words) Initializes the object with the words in the dictionary.
	f(string pref, string suff) Returns the index of the word in the dictionary, which has the prefix pref and the suffix suff. If there is more than one valid index, return the largest of them. If there is no such word in the dictionary, return -1.


 
Example 1:

Input
["WordFilter", "f"]
[[["apple"]], ["a", "e"]]
Output
[null, 0]
Explanation
WordFilter wordFilter = new WordFilter(["apple"]);
wordFilter.f("a", "e"); // return 0, because the word at index 0 has prefix = "a" and suffix = "e".


 
Constraints:


	1 <= words.length <= 104
	1 <= words[i].length <= 7
	1 <= pref.length, suff.length <= 7
	words[i], pref and suff consist of lowercase English letters only.
	At most 104 calls will be made to the function f.

 */
