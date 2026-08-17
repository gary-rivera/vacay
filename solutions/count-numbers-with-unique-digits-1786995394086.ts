function countNumbersWithUniqueDigits(n: number): number {
    if (n == 0) return 1;
    let count = 10, prev = 9;
    for (let i = 2; i <= Math.min(10, n); i++) {
        prev = prev * (11 - i);
        count += prev;
    }
    return count;
}

/*
question: Given an integer n, return the count of all numbers with unique digits, x, where 0 <= x < 10n.

 
Example 1:

Input: n = 2
Output: 91
Explanation: The answer should be the total numbers in the range of 0 ≤ x < 100, excluding 11,22,33,44,55,66,77,88,99


Example 2:

Input: n = 0
Output: 1


 
Constraints:


	0 <= n <= 8

 */
