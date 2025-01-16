function reverseVowels(s: string): string {
    let vowels = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    let strArr = s.split('');
    let i = 0;
    let j = s.length - 1;
    while(i < j) {
        if(vowels.includes(strArr[i]) && vowels.includes(strArr[j])) {
            [strArr[i], strArr[j]] = [strArr[j], strArr[i]];
            i++;
            j--;
        } else if(vowels.includes(strArr[i])) {
            j--;
        } else {
            i++;
        }
    }
    return strArr.join('');
}

/*
question: Given a string s, reverse only all the vowels in the string and return it.

The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

 
Example 1:


Input: s = "IceCreAm"

Output: "AceCreIm"

Explanation:

The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes "AceCreIm".


Example 2:


Input: s = "leetcode"

Output: "leotcede"


 
Constraints:


	1 <= s.length <= 3 * 105
	s consist of printable ASCII characters.

 */
