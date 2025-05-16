function largestPalindromicInteger(num: string): string {
    const count: number[] = Array(10).fill(0);
    let result: string = '';
    let mid: string = '';

    for (let i = 0; i < num.length; i++) {
        count[parseInt(num[i])]++;
    }

    for (let i = 9; i >= 0; i--) {
        if (count[i] % 2 == 1) {
            mid = i.toString();
            count[i]--;
            break;
        }
    }

    for (let i = 9; i >= 0; i--) {
        for (let j = 0; j < Math.floor(count[i] / 2); j++) {
            result = i.toString() + result + i.toString();
        }
    }

    return result.slice(0, result.length / 2) + mid + result.slice(result.length / 2);
}

/*
question: You are given a string num consisting of digits only.

Return the largest palindromic integer (in the form of a string) that can be formed using digits taken from num. It should not contain leading zeroes.

Notes:


	You do not need to use all the digits of num, but you must use at least one digit.
	The digits can be reordered.


 
Example 1:

Input: num = "444947137"
Output: "7449447"
Explanation: 
Use the digits "4449477" from "444947137" to form the palindromic integer "7449447".
It can be shown that "7449447" is the largest palindromic integer that can be formed.


Example 2:

Input: num = "00009"
Output: "9"
Explanation: 
It can be shown that "9" is the largest palindromic integer that can be formed.
Note that the integer returned should not contain leading zeroes.


 
Constraints:


	1 <= num.length <= 105
	num consists of digits.

 */
