function countLargestGroup(n: number): number {
    let count: number[] = new Array(37).fill(0);
    let max: number = 0;
    let res: number = 0;

    for (let i = 1; i <= n; i++) {
        let sum: number = 0;
        let j: number = i;
        while (j > 0) {
            sum += j % 10;
            j = Math.floor(j / 10);
        }
        count[sum]++;
        max = Math.max(max, count[sum]);
    }

    for (let i = 0; i < count.length; i++) {
        if (count[i] === max) {
            res++;
        }
    }

    return res;
}

/*
question: You are given an integer n.

Each number from 1 to n is grouped according to the sum of its digits.

Return the number of groups that have the largest size.

 
Example 1:

Input: n = 13
Output: 4
Explanation: There are 9 groups in total, they are grouped according sum of its digits of numbers from 1 to 13:
[1,10], [2,11], [3,12], [4,13], [5], [6], [7], [8], [9].
There are 4 groups with largest size.


Example 2:

Input: n = 2
Output: 2
Explanation: There are 2 groups [1], [2] of size 1.


 
Constraints:


	1 <= n <= 104

 */
