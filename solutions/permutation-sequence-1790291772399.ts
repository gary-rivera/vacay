function getPermutation(n: number, k: number): string {
    let numbers: number[] = [];
    let factorial: number[] = [1];
    let ans: string = "";

    // create an array of factorial lookup
    for(let i = 1; i <= n; i++) {
        factorial[i] = i * factorial[i - 1];
    }
    // factorial[] = {1, 1, 2, 6, 24, ... n!}

    // create a list of numbers to get indices
    for(let i = 1; i <= n; i++) {
        numbers.push(i);
    }
    // numbers = {1, 2, 3, 4}

    k--;

    for(let i = 1; i <= n; i++) {
        let index = Math.floor(k / factorial[n - i]);
        ans += numbers[index].toString();
        numbers.splice(index, 1);
        k -= index * factorial[n - i];
    }

    return ans;
}

/*
question: The set [1, 2, 3, ..., n] contains a total of n! unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for n = 3:


	"123"
	"132"
	"213"
	"231"
	"312"
	"321"


Given n and k, return the kth permutation sequence.

 
Example 1:
Input: n = 3, k = 3
Output: "213"
Example 2:
Input: n = 4, k = 9
Output: "2314"
Example 3:
Input: n = 3, k = 1
Output: "123"

 
Constraints:


	1 <= n <= 9
	1 <= k <= n!

 */
