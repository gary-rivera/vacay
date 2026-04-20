function minCostToMakeBasketsEqual(basket1: number[], basket2: number[]): number {
    const n = basket1.length;
    let totalCost = 0;
    let minCost = Math.min(...basket1, ...basket2);
    let freq = new Map<number, number>();

    for (let i = 0; i < n; i++) {
        freq.set(basket1[i], (freq.get(basket1[i]) || 0) + 1);
        freq.set(basket2[i], (freq.get(basket2[i]) || 0) - 1);
    }

    let costs = Array.from(freq.keys()).sort((a, b) => a - b);
    for (let cost of costs) {
        let count = freq.get(cost) || 0;
        if (count > 0) {
            totalCost += cost * Math.min(count, Math.abs(freq.get(cost - 1) || 0));
            freq.set(cost - 1, (freq.get(cost - 1) || 0) + count);
        }
    }

    return totalCost === 0 ? -1 : totalCost;
}

/*
question: You have two fruit baskets containing n fruits each. You are given two 0-indexed integer arrays basket1 and basket2 representing the cost of fruit in each basket. You want to make both baskets equal. To do so, you can use the following operation as many times as you want:


	Choose two indices i and j, and swap the ith fruit of basket1 with the jth fruit of basket2.
	The cost of the swap is min(basket1[i], basket2[j]).


Two baskets are considered equal if sorting them according to the fruit cost makes them exactly the same baskets.

Return the minimum cost to make both the baskets equal or -1 if impossible.

 
Example 1:

Input: basket1 = [4,2,2,2], basket2 = [1,4,1,2]
Output: 1
Explanation: Swap index 1 of basket1 with index 0 of basket2, which has cost 1. Now basket1 = [4,1,2,2] and basket2 = [2,4,1,2]. Rearranging both the arrays makes them equal.


Example 2:

Input: basket1 = [2,3,4,1], basket2 = [3,2,5,1]
Output: -1
Explanation: It can be shown that it is impossible to make both the baskets equal.


 
Constraints:


	basket1.length == basket2.length
	1 <= basket1.length <= 105
	1 <= basket1[i], basket2[i] <= 109

 */
