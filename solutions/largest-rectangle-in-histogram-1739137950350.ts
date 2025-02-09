function largestRectangleArea(heights: number[]): number {
    let maxArea = 0;
    let stack: number[] = [];
    heights.push(0);

    for(let i = 0; i < heights.length; i++) {
        while(stack.length !== 0 && heights[i] < heights[stack[stack.length - 1]]) {
            let height = heights[stack.pop() as number];
            let width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        stack.push(i);
    }

    return maxArea;
}

console.log(largestRectangleArea([2,1,5,6,2,3])); // Output: 10
console.log(largestRectangleArea([2,4])); // Output: 4

/*
question: Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

 
Example 1:

Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.


Example 2:

Input: heights = [2,4]
Output: 4


 
Constraints:


	1 <= heights.length <= 105
	0 <= heights[i] <= 104

 */
