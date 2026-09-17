function countLargestGroup(n: number): number {
    let count: number[] = new Array(37).fill(0);
    let max = 0, res = 0;

    for (let i = 1; i <= n; i++) {
        let sum = 0, j = i;
        while (j > 0) {
            sum += j % 10;
            j = Math.floor(j / 10);
        }
        count[sum]++;
        if (count[sum] > max) {
            max = count[sum];
            res = 1;
        } else if (count[sum] === max) {
            res++;
        }
    }
    return res;
}

/*
question: You are given an integer n.

We need to group the numbers from 1 to n according to the sum of its digits. For example, the numbers 14 and 5 belong to the same group, whereas 13 and 3 belong to different groups.

Return the number of groups that have the largest size, i.e. the maximum number of elements.

 
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
