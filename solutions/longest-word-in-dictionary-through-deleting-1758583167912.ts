function findLongestWord(s: string, dictionary: string[]): string {
    dictionary.sort((a, b) => {
        if (a.length !== b.length) {
            return b.length - a.length;
        } else {
            return a < b ? -1 : 1;
        }
    });

    for (let word of dictionary) {
        let i = 0;
        for (let char of s) {
            if (char === word[i]) {
                i++;
            }
            if (i === word.length) {
                return word;
            }
        }
    }
    return "";
}

/*
question: Given a string s and a string array dictionary, return the longest string in the dictionary that can be formed by deleting some of the given string characters. If there is more than one possible result, return the longest word with the smallest lexicographical order. If there is no possible result, return the empty string.

 
Example 1:

Input: s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]
Output: "apple"


Example 2:

Input: s = "abpcplea", dictionary = ["a","b","c"]
Output: "a"


 
Constraints:


	1 <= s.length <= 1000
	1 <= dictionary.length <= 1000
	1 <= dictionary[i].length <= 1000
	s and dictionary[i] consist of lowercase English letters.

 */
