class Solution {
    original: number[];
    array: number[];

    constructor(nums: number[]) {
        this.original = nums;
        this.array = nums.slice();
    }

    reset(): number[] {
        this.array = this.original;
        this.original = this.original.slice();
        return this.array;
    }

    shuffle(): number[] {
        for (let i = 0; i < this.array.length; i++) {
            let swapIdx = this.randomRange(i, this.array.length);
            this.swap(this.array, i, swapIdx);
        }
        return this.array;
    }

    randomRange(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    swap(array: number[], idx1: number, idx2: number) {
        let temp = array[idx1];
        array[idx1] = array[idx2];
        array[idx2] = temp;
    }
}

/*
question: Given an integer array nums, design an algorithm to randomly shuffle the array. All permutations of the array should be equally likely as a result of the shuffling.

Implement the Solution class:


	Solution(int[] nums) Initializes the object with the integer array nums.
	int[] reset() Resets the array to its original configuration and returns it.
	int[] shuffle() Returns a random shuffling of the array.


 
Example 1:

Input
["Solution", "shuffle", "reset", "shuffle"]
[[[1, 2, 3]], [], [], []]
Output
[null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]

Explanation
Solution solution = new Solution([1, 2, 3]);
solution.shuffle();    // Shuffle the array [1,2,3] and return its result.
                       // Any permutation of [1,2,3] must be equally likely to be returned.
                       // Example: return [3, 1, 2]
solution.reset();      // Resets the array back to its original configuration [1,2,3]. Return [1, 2, 3]
solution.shuffle();    // Returns the random shuffling of array [1,2,3]. Example: return [1, 3, 2]



 
Constraints:


	1 <= nums.length <= 50
	-106 <= nums[i] <= 106
	All the elements of nums are unique.
	At most 104 calls in total will be made to reset and shuffle.

 */
