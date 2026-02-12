function findUniqueSubstrings(arr: string[]): string[] {
    const n = arr.length;
    const answer: string[] = new Array(n).fill("");
    const allSubstrings: string[] = [];

    // Generate all substrings of all strings in arr and store them in allSubstrings
    for (let i = 0; i < n; i++) {
        const str = arr[i];
        for (let len = 1; len <= str.length; len++) {
            for (let j = 0; j <= str.length - len; j++) {
                allSubstrings.push(str.substr(j, len));
            }
        }
    }

    // For each string in arr, find the shortest substring that does not occur in any other string
    for (let i = 0; i < n; i++) {
        const str = arr[i];
        let shortestUniqueSubstring = str;
        for (let len = 1; len <= str.length; len++) {
            for (let j = 0; j <= str.length - len; j++) {
                const substring = str.substr(j, len);
                const count = allSubstrings.filter(s => s === substring).length;
                if (count === 1 && (substring.length < shortestUniqueSubstring.length || substring < shortestUniqueSubstring)) {
                    shortestUniqueSubstring = substring;
                }
            }
        }
        answer[i] = shortestUniqueSubstring === str ? "" : shortestUniqueSubstring;
    }

    return answer;
}

/*
question: You are given an array arr of size n consisting of non-empty strings.

Find a string array answer of size n such that:


	answer[i] is the shortest substring of arr[i] that does not occur as a substring in any other string in arr. If multiple such substrings exist, answer[i] should be the lexicographically smallest. And if no such substring exists, answer[i] should be an empty string.


Return the array answer.

 
Example 1:

Input: arr = ["cab","ad","bad","c"]
Output: ["ab","","ba",""]
Explanation: We have the following:
- For the string "cab", the shortest substring that does not occur in any other string is either "ca" or "ab", we choose the lexicographically smaller substring, which is "ab".
- For the string "ad", there is no substring that does not occur in any other string.
- For the string "bad", the shortest substring that does not occur in any other string is "ba".
- For the string "c", there is no substring that does not occur in any other string.


Example 2:

Input: arr = ["abc","bcd","abcd"]
Output: ["","","abcd"]
Explanation: We have the following:
- For the string "abc", there is no substring that does not occur in any other string.
- For the string "bcd", there is no substring that does not occur in any other string.
- For the string "abcd", the shortest substring that does not occur in any other string is "abcd".


 
Constraints:


	n == arr.length
	2 <= n <= 100
	1 <= arr[i].length <= 20
	arr[i] consists only of lowercase English letters.

 */
