function validSelections(nums: number[]): number {
    let n = nums.length;
    let dp = Array.from({ length: n }, () => Array.from({ length: n }, () => Array(2).fill(0)));
    let prefix = new Array(n + 1).fill(0);
    let res = 0;
    let mod = 1e9 + 7;

    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    for (let i = 0; i < n; i++) {
        if (nums[i] === 0) {
            dp[i][i][0] = dp[i][i][1] = 1;
        }
    }

    for (let len = 2; len <= n; len++) {
        for (let l = 0; l + len - 1 < n; l++) {
            let r = l + len - 1;
            for (let d = 0; d < 2; d++) {
                let p = d === 0 ? l : r;
                if (nums[p] > prefix[r + 1] - prefix[l] - 1) {
                    continue;
                }
                if (d === 0 && l > 0) {
                    dp[l - 1][r][1 - d] = (dp[l - 1][r][1 - d] + dp[l][r][d]) % mod;
                }
                if (d === 1 && r + 1 < n) {
                    dp[l][r + 1][1 - d] = (dp[l][r + 1][1 - d] + dp[l][r][d]) % mod;
                }
            }
        }
    }

    for (let i = 0; i < n; i++) {
        for (let d = 0; d < 2; d++) {
            res = (res + dp[i][n - 1][d]) % mod;
        }
    }

    return res;
}

/*
question: You are given an integer array nums.

Start by selecting a starting position curr such that nums[curr] == 0, and choose a movement direction of either left or right.

After that, you repeat the following process:


	If curr is out of the range [0, n - 1], this process ends.
	If nums[curr] == 0, move in the current direction by incrementing curr if you are moving right, or decrementing curr if you are moving left.
	Else if nums[curr] > 0:
	
		Decrement nums[curr] by 1.
		Reverse your movement direction (left becomes right and vice versa).
		Take a step in your new direction.
	
	


A selection of the initial position curr and movement direction is considered valid if every element in nums becomes 0 by the end of the process.

Return the number of possible valid selections.

 
Example 1:


Input: nums = [1,0,2,0,3]

Output: 2

Explanation:

The only possible valid selections are the following:


	Choose curr = 3, and a movement direction to the left.

	
		[1,0,2,0,3] -> [1,0,2,0,3] -> [1,0,1,0,3] -> [1,0,1,0,3] -> [1,0,1,0,2] -> [1,0,1,0,2] -> [1,0,0,0,2] -> [1,0,0,0,2] -> [1,0,0,0,1] -> [1,0,0,0,1] -> [1,0,0,0,1] -> [1,0,0,0,1] -> [0,0,0,0,1] -> [0,0,0,0,1] -> [0,0,0,0,1] -> [0,0,0,0,1] -> [0,0,0,0,0].
	
	
	Choose curr = 3, and a movement direction to the right.
	
		[1,0,2,0,3] -> [1,0,2,0,3] -> [1,0,2,0,2] -> [1,0,2,0,2] -> [1,0,1,0,2] -> [1,0,1,0,2] -> [1,0,1,0,1] -> [1,0,1,0,1] -> [1,0,0,0,1] -> [1,0,0,0,1] -> [1,0,0,0,0] -> [1,0,0,0,0] -> [1,0,0,0,0] -> [1,0,0,0,0] -> [0,0,0,0,0].
	
	



Example 2:


Input: nums = [2,3,4,0,4,1,0]

Output: 0

Explanation:

There are no possible valid selections.


 
Constraints:


	1 <= nums.length <= 100
	0 <= nums[i] <= 100
	There is at least one element i where nums[i] == 0.

 */
