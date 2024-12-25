function numTriplets(nums1: number[], nums2: number[]): number {
    let count = 0;
    let map1 = new Map<number, number>();
    let map2 = new Map<number, number>();
    
    for(let num of nums1) {
        let square = num * num;
        map1.set(square, (map1.get(square) || 0) + 1);
    }
    
    for(let num of nums2) {
        let square = num * num;
        map2.set(square, (map2.get(square) || 0) + 1);
    }
    
    for(let i = 0; i < nums1.length; i++) {
        for(let j = i + 1; j < nums1.length; j++) {
            let product = nums1[i] * nums1[j];
            if(map2.has(product)) {
                count += map2.get(product);
            }
        }
    }
    
    for(let i = 0; i < nums2.length; i++) {
        for(let j = i + 1; j < nums2.length; j++) {
            let product = nums2[i] * nums2[j];
            if(map1.has(product)) {
                count += map1.get(product);
            }
        }
    }
    
    return count;
}

/*
question: Given two arrays of integers nums1 and nums2, return the number of triplets formed (type 1 and type 2) under the following rules:


	Type 1: Triplet (i, j, k) if nums1[i]2 == nums2[j] * nums2[k] where 0 <= i < nums1.length and 0 <= j < k < nums2.length.
	Type 2: Triplet (i, j, k) if nums2[i]2 == nums1[j] * nums1[k] where 0 <= i < nums2.length and 0 <= j < k < nums1.length.


 
Example 1:

Input: nums1 = [7,4], nums2 = [5,2,8,9]
Output: 1
Explanation: Type 1: (1, 1, 2), nums1[1]2 = nums2[1] * nums2[2]. (42 = 2 * 8). 


Example 2:

Input: nums1 = [1,1], nums2 = [1,1,1]
Output: 9
Explanation: All Triplets are valid, because 12 = 1 * 1.
Type 1: (0,0,1), (0,0,2), (0,1,2), (1,0,1), (1,0,2), (1,1,2).  nums1[i]2 = nums2[j] * nums2[k].
Type 2: (0,0,1), (1,0,1), (2,0,1). nums2[i]2 = nums1[j] * nums1[k].


Example 3:

Input: nums1 = [7,7,8,3], nums2 = [1,2,9,7]
Output: 2
Explanation: There are 2 valid triplets.
Type 1: (3,0,2).  nums1[3]2 = nums2[0] * nums2[2].
Type 2: (3,0,1).  nums2[3]2 = nums1[0] * nums1[1].


 
Constraints:


	1 <= nums1.length, nums2.length <= 1000
	1 <= nums1[i], nums2[i] <= 105

 */
