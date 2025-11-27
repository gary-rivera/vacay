function findAllConcatenatedWords(words: string[]): string[] {
    let wordSet = new Set(words);
    let cache = new Map();
    let result = [];

    function canForm(word: string): boolean {
        if (cache.has(word)) {
            return cache.get(word);
        }
        for (let i = 1; i < word.length; i++) {
            let prefix = word.substring(0, i);
            let suffix = word.substring(i);
            if (wordSet.has(prefix) && (wordSet.has(suffix) || canForm(suffix))) {
                cache.set(word, true);
                return true;
            }
        }
        cache.set(word, false);
        return false;
    }

    for (let word of words) {
        if (canForm(word)) {
            result.push(word);
        }
    }
    return result;
}

/*
question: Given an array of strings words (without duplicates), return all the concatenated words in the given list of words.

A concatenated word is defined as a string that is comprised entirely of at least two shorter words (not necessarily distinct) in the given array.

 
Example 1:

Input: words = ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
Output: ["catsdogcats","dogcatsdog","ratcatdogcat"]
Explanation: "catsdogcats" can be concatenated by "cats", "dog" and "cats"; 
"dogcatsdog" can be concatenated by "dog", "cats" and "dog"; 
"ratcatdogcat" can be concatenated by "rat", "cat", "dog" and "cat".

Example 2:

Input: words = ["cat","dog","catdog"]
Output: ["catdog"]


 
Constraints:


	1 <= words.length <= 104
	1 <= words[i].length <= 30
	words[i] consists of only lowercase English letters.
	All the strings of words are unique.
	1 <= sum(words[i].length) <= 105

 */
