function smallestZeroFreeNumber(num: string, t: number): string {
    let n = BigInt(num);
    const tBigInt = BigInt(t);
    while (true) {
        if (isZeroFree(n) && isDivisibleByT(n, tBigInt)) {
            return n.toString();
        }
        n++;
        if (n > BigInt('99999999999999')) {
            return "-1";
        }
    }
}

function isZeroFree(n: bigint): boolean {
    const str = n.toString();
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '0') {
            return false;
        }
    }
    return true;
}

function isDivisibleByT(n: bigint, t: bigint): boolean {
    const str = n.toString();
    let product = BigInt(1);
    for (let i = 0; i < str.length; i++) {
        product *= BigInt(str[i]);
    }
    return product % t === BigInt(0);
}

/*
question: You are given a string num which represents a positive integer, and an integer t.

A number is called zero-free if none of its digits are 0.

Return a string representing the smallest zero-free number greater than or equal to num such that the product of its digits is divisible by t. If no such number exists, return "-1".

 
Example 1:


Input: num = "1234", t = 256

Output: "1488"

Explanation:

The smallest zero-free number that is greater than 1234 and has the product of its digits divisible by 256 is 1488, with the product of its digits equal to 256.


Example 2:


Input: num = "12355", t = 50

Output: "12355"

Explanation:

12355 is already zero-free and has the product of its digits divisible by 50, with the product of its digits equal to 150.


Example 3:


Input: num = "11111", t = 26

Output: "-1"

Explanation:

No number greater than 11111 has the product of its digits divisible by 26.


 
Constraints:


	2 <= num.length <= 2 * 105
	num consists only of digits in the range ['0', '9'].
	num does not contain leading zeros.
	1 <= t <= 1014

 */
