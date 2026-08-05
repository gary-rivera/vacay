function minCost(n: number): number {
    let dp: number[] = new Array(n + 1).fill(0);
    for (let i = 2; i <= n; i++) {
        dp[i] = Number.MAX_VALUE;
        for (let j = 1; j * j <= i; j++) {
            if (i % j == 0) {
                dp[i] = Math.min(dp[i], dp[j] + i / j);
                dp[i] = Math.min(dp[i], dp[i / j] + j);
            }
        }
    }
    return dp[n];
}

/*
question: You are given an integer n.

In one operation, you may split an integer x into two positive integers a and b such that a + b = x.

The cost of this operation is a * b.

Return an integer denoting the minimum total cost required to split the integer n into n ones.

 
Example 1:


Input: n = 3

Output: 3

Explanation:

One optimal set of operations is:


	
		
			x
			a
			b
			a + b
			a * b
			Cost
		
		
			3
			1
			2
			3
			2
			2
		
		
			2
			1
			1
			2
			1
			1
		
	


Thus, the minimum total cost is 2 + 1 = 3.


Example 2:


Input: n = 4

Output: 6

Explanation:


One optimal set of operations is:


	
		
			x
			a
			b
			a + b
			a * b
			Cost
		
		
			4
			2
			2
			4
			4
			4
		
		
			2
			1
			1
			2
			1
			1
		
		
			2
			1
			1
			2
			1
			1
		
	


Thus, the minimum total cost is 4 + 1 + 1 = 6.



 
Constraints:


	1 <= n <= 500

 */
