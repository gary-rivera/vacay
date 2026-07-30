function gcd(a: number, b: number): number {
    if (b === 0) return a;
    return gcd(b, a % b);
}

function minStabilityFactor(nums: number[], maxC: number): number {
    let n = nums.length;
    let dp = new Array(n + 1).fill(0).map(() => new Array(maxC + 1).fill(0));
    let prefixGcd = new Array(n + 1).fill(0);
    prefixGcd[0] = nums[0];

    for (let i = 1; i < n; i++) {
        prefixGcd[i] = gcd(nums[i], prefixGcd[i - 1]);
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= maxC; j++) {
            if (j < i) {
                dp[i + 1][j + 1] = Math.max(dp[i + 1][j + 1], dp[i][j] + 1);
            }
            let l = 0;
            let r = i;
            while (l < r) {
                let mid = Math.floor((l + r) / 2);
                if (prefixGcd[i] - (mid > 0 ? prefixGcd[mid - 1] : 0) >= 2) {
                    r = mid;
                } else {
                    l = mid + 1;
                }
            }
            if (l < i) {
                dp[i + 1][j] = Math.max(dp[i + 1][j], dp[l][j] + i - l + 1);
            }
        }
    }

    let res = n;
    for (let i = 0; i <= maxC; i++) {
        res = Math.min(res, n - dp[n][i]);
    }
    return res;
}

/*
question: You are given an integer array nums and an integer maxC.

A subarray is called stable if the highest common factor (HCF) of all its elements is greater than or equal to 2.

The stability factor of an array is defined as the length of its longest stable subarray.

You may modify at most maxC elements of the array to any integer.

Return the minimum possible stability factor of the array after at most maxC modifications. If no stable subarray remains, return 0.

Note:


	The highest common factor (HCF) of an array is the largest integer that evenly divides all the array elements.
	A subarray of length 1 is stable if its only element is greater than or equal to 2, since HCF([x]) = x.


 

 
Example 1:


Input: nums = [3,5,10], maxC = 1

Output: 1

Explanation:


	The stable subarray [5, 10] has HCF = 5, which has a stability factor of 2.
	Since maxC = 1, one optimal strategy is to change nums[1] to 7, resulting in nums = [3, 7, 10].
	Now, no subarray of length greater than 1 has HCF >= 2. Thus, the minimum possible stability factor is 1.



Example 2:


Input: nums = [2,6,8], maxC = 2

Output: 1

Explanation:


	The subarray [2, 6, 8] has HCF = 2, which has a stability factor of 3.
	Since maxC = 2, one optimal strategy is to change nums[1] to 3 and nums[2] to 5, resulting in nums = [2, 3, 5].
	Now, no subarray of length greater than 1 has HCF >= 2. Thus, the minimum possible stability factor is 1.



Example 3:


Input: nums = [2,4,9,6], maxC = 1

Output: 2

Explanation:


	The stable subarrays are:
	
		[2, 4] with HCF = 2 and stability factor of 2.
		[9, 6] with HCF = 3 and stability factor of 2.
	
	
	Since maxC = 1, the stability factor of 2 cannot be reduced due to two separate stable subarrays. Thus, the minimum possible stability factor is 2.



 
Constraints:


	1 <= n == nums.length <= 105
	1 <= nums[i] <= 109
	0 <= maxC <= n

 */
