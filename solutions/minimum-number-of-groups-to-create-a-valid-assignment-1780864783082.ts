type Ball = number;

function minBoxes(balls: Ball[]): number {
    let ballCounts: { [key: number]: number } = {};
    for (let ball of balls) {
        if (ball in ballCounts) {
            ballCounts[ball]++;
        } else {
            ballCounts[ball] = 1;
        }
    }

    let boxCounts: { [key: number]: number } = {};
    for (let ball in ballCounts) {
        let count = ballCounts[ball];
        if (count in boxCounts) {
            boxCounts[count]++;
        } else {
            boxCounts[count] = 1;
        }
    }

    let boxes: number[] = [];
    for (let count in boxCounts) {
        boxes.push(Number(count));
    }

    boxes.sort((a, b) => a - b);

    let minBoxes = 0;
    while (boxes.length > 0) {
        let box = boxes.pop() as number;
        minBoxes++;
        if (boxCounts[box] > 1) {
            boxCounts[box]--;
            boxes.push(box);
        } else if (box > 1) {
            boxes.push(box - 1);
        }
    }

    return minBoxes;
}

/*
question: You are given a collection of numbered balls and instructed to sort them into boxes for a nearly balanced distribution. There are two rules you must follow:


	Balls with the same box must have the same value. But, if you have more than one ball with the same number, you can put them in different boxes.
	The biggest box can only have one more ball than the smallest box.


​Return the fewest number of boxes to sort these balls following these rules.

 
Example 1: 


Input:   balls = [3,2,3,2,3] 

Output:   2 

Explanation:

We can sort balls into boxes as follows:


	[3,3,3]
	[2,2]


The size difference between the two boxes doesn't exceed one.


Example 2: 


Input:   balls = [10,10,10,3,1,1] 

Output:   4 

Explanation:

We can sort balls into boxes as follows:





	[10]
	[10,10]
	[3]
	[1,1]


You can't use fewer than four boxes while still following the rules. For example, putting all three balls numbered 10 in one box would break the rule about the maximum size difference between boxes.


 
Constraints:


	1 <= nums.length <= 105
	1 <= nums[i] <= 109

 */
