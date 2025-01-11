function partition(s: string): string[][] {
    const result: string[][] = [];
    backtrack(s, [], result);
    return result;
}

function backtrack(s: string, path: string[], result: string[][]): void {
    if (!s) {
        result.push(path);
        return;
    }
    for (let i = 1; i <= s.length; i++) {
        const str = s.slice(0, i);
        if (isPalindrome(str)) {
            backtrack(s.slice(i), path.concat(str), result);
        }
    }
}

function isPalindrome(s: string): boolean {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
        if (s[left] !== s[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

/*
question: Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

 
Example 1:
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:
Input: s = "a"
Output: [["a"]]

 
Constraints:


	1 <= s.length <= 16
	s contains only lowercase English letters.

 */
