class Solution {
    private ones: string[] = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    private tens: string[] = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    private thousands: string[] = ['', 'Thousand', 'Million', 'Billion'];

    public numberToWords(num: number): string {
        if (num === 0) {
            return 'Zero';
        }

        let res = '';
        let i = 0;
        while (num > 0) {
            if (num % 1000 !== 0) {
                res = this.helper(num % 1000) + this.thousands[i] + ' ' + res;
            }
            num = Math.floor(num / 1000);
            i++;
        }
        return res.trim();
    }

    private helper(num: number): string {
        if (num === 0) {
            return '';
        } else if (num < 20) {
            return this.ones[num] + ' ';
        } else if (num < 100) {
            return this.tens[Math.floor(num / 10)] + ' ' + this.helper(num % 10);
        } else {
            return this.ones[Math.floor(num / 100)] + ' Hundred ' + this.helper(num % 100);
        }
    }
}

let solution = new Solution();
console.log(solution.numberToWords(123)); // "One Hundred Twenty Three"
console.log(solution.numberToWords(12345)); // "Twelve Thousand Three Hundred Forty Five"
console.log(solution.numberToWords(1234567)); // "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"

/*
question: Convert a non-negative integer num to its English words representation.

 
Example 1:

Input: num = 123
Output: "One Hundred Twenty Three"


Example 2:

Input: num = 12345
Output: "Twelve Thousand Three Hundred Forty Five"


Example 3:

Input: num = 1234567
Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"


 
Constraints:


	0 <= num <= 231 - 1

 */
