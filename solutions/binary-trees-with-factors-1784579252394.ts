const MOD = 1e9 + 7;

function numFactoredBinaryTrees(arr: number[]): number {
    arr.sort((a, b) => a - b);
    const dp: number[] = new Array(arr.length).fill(1);
    const index: { [key: number]: number } = {};
    for (let i = 0; i < arr.length; ++i) {
        index[arr[i]] = i;
    }
    for (let i = 0; i < arr.length; ++i) {
        for (let j = 0; j < i; ++j) {
            if (arr[i] % arr[j] === 0) {
                const right = arr[i] / arr[j];
                if (right in index) {
                    dp[i] = (dp[i] + dp[j] * dp[index[right]]) % MOD;
                }
            }
        }
    }
    return dp.reduce((a, b) => (a + b) % MOD, 0);
}

/*
question: Given an array of unique integers, arr, where each integer arr[i] is strictly greater than 1.

We make a binary tree using these integers, and each number may be used for any number of times. Each non-leaf node's value should be equal to the product of the values of its children.

Return the number of binary trees we can make. The answer may be too large so return the answer modulo 109 + 7.

 
Example 1:

Input: arr = [2,4]
Output: 3
Explanation: We can make these trees: [2], [4], [4, 2, 2]

Example 2:

Input: arr = [2,4,5,10]
Output: 7
Explanation: We can make these trees: [2], [4], [5], [10], [4, 2, 2], [10, 2, 5], [10, 5, 2].

 
Constraints:


	1 <= arr.length <= 1000
	2 <= arr[i] <= 109
	All the values of arr are unique.

 */
