function countNonSpecialNumbers(l: number, r: number): number {
    function isSpecial(n: number): boolean {
        let count = 0;
        for (let i = 1; i * i <= n; i++) {
            if (n % i === 0) {
                if (n / i === i) {
                    count++;
                } else {
                    count += 2;
                }
            }
        }
        return count === 3;
    }

    let count = 0;
    for (let i = l; i <= r; i++) {
        if (!isSpecial(i)) {
            count++;
        }
    }
    return count;
}

/*
question: You are given 2 positive integers l and r. For any number x, all positive divisors of x except x are called the proper divisors of x.

A number is called special if it has exactly 2 proper divisors. For example:


	The number 4 is special because it has proper divisors 1 and 2.
	The number 6 is not special because it has proper divisors 1, 2, and 3.


Return the count of numbers in the range [l, r] that are not special.

 
Example 1:


Input: l = 5, r = 7

Output: 3

Explanation:

There are no special numbers in the range [5, 7].


Example 2:


Input: l = 4, r = 16

Output: 11

Explanation:

The special numbers in the range [4, 16] are 4 and 9.


 
Constraints:


	1 <= l <= r <= 109

 */
