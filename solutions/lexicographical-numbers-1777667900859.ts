class Solution {
    private res: number[] = [];

    lexicalOrder(n: number): number[] {
        for (let i = 1; i < 10; ++i) {
            this.dfs(i, n);
        }
        return this.res;
    }

    private dfs(curr: number, n: number): void {
        if (curr > n) {
            return;
        }
        this.res.push(curr);
        for (let i = 0; i < 10; ++i) {
            if (10 * curr + i > n) {
                return;
            }
            this.dfs(10 * curr + i, n);
        }
    }
}

let solution = new Solution();
console.log(solution.lexicalOrder(13)); // [1,10,11,12,13,2,3,4,5,6,7,8,9]
console.log(solution.lexicalOrder(2)); // [1,2]

/*
question: Given an integer n, return all the numbers in the range [1, n] sorted in lexicographical order.

You must write an algorithm that runs in O(n) time and uses O(1) extra space. 

 
Example 1:
Input: n = 13
Output: [1,10,11,12,13,2,3,4,5,6,7,8,9]
Example 2:
Input: n = 2
Output: [1,2]

 
Constraints:


	1 <= n <= 5 * 104

 */
