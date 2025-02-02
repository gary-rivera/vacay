function minCost(arr: number[], brr: number[], k: number): number {
    let cost = 0;
    let map = new Map<number, number>();
    for (let i = 0; i < arr.length; i++) {
        map.set(arr[i], (map.get(arr[i]) || 0) + 1);
        map.set(brr[i], (map.get(brr[i]) || 0) - 1);
    }
    let arr2: number[] = [];
    for (let [key, value] of map) {
        if (value != 0) {
            arr2.push(value);
        }
    }
    arr2.sort((a, b) => Math.abs(b) - Math.abs(a));
    while (arr2.length > 0) {
        let x = arr2[0];
        arr2.shift();
        if (x > 0) {
            if (arr2.length == 0 || x * k <= Math.abs(arr2[arr2.length - 1])) {
                cost += x * k;
            } else {
                let y = arr2[arr2.length - 1];
                arr2.pop();
                cost += Math.abs(y);
                x += y;
                let pos = arr2.findIndex((value) => Math.abs(value) < Math.abs(x));
                if (pos == -1) {
                    arr2.push(x);
                } else {
                    arr2.splice(pos, 0, x);
                }
            }
        } else {
            cost += Math.abs(x);
        }
    }
    return cost;
}

/*
question: You are given two integer arrays arr and brr of length n, and an integer k. You can perform the following operations on arr any number of times:


	Split arr into any number of contiguous subarrays and rearrange these subarrays in any order. This operation has a fixed cost of k.
	
	Choose any element in arr and add or subtract a positive integer x to it. The cost of this operation is x.
	


Return the minimum total cost to make arr equal to brr.

 
Example 1:


Input: arr = [-7,9,5], brr = [7,-2,-5], k = 2

Output: 13

Explanation:


	Split arr into two contiguous subarrays: [-7] and [9, 5] and rearrange them as [9, 5, -7], with a cost of 2.
	Subtract 2 from element arr[0]. The array becomes [7, 5, -7]. The cost of this operation is 2.
	Subtract 7 from element arr[1]. The array becomes [7, -2, -7]. The cost of this operation is 7.
	Add 2 to element arr[2]. The array becomes [7, -2, -5]. The cost of this operation is 2.


The total cost to make the arrays equal is 2 + 2 + 7 + 2 = 13.


Example 2:


Input: arr = [2,1], brr = [2,1], k = 0

Output: 0

Explanation:

Since the arrays are already equal, no operations are needed, and the total cost is 0.


 
Constraints:


	1 <= arr.length == brr.length <= 105
	0 <= k <= 2 * 1010
	-105 <= arr[i] <= 105
	-105 <= brr[i] <= 105

 */
