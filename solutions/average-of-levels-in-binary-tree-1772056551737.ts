class TreeNode {
    val: number
    left: TreeNode | null
    right: TreeNode | null
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.left = (left===undefined ? null : left)
        this.right = (right===undefined ? null : right)
    }
}

function averageOfLevels(root: TreeNode | null): number[] {
    if (!root) return [];
    let result: number[] = [];
    let queue: TreeNode[] = [root];
    while (queue.length > 0) {
        let sum = 0;
        let count = 0;
        let tempQueue: TreeNode[] = [];
        while (queue.length > 0) {
            let node = queue.shift()!;
            sum += node.val;
            count++;
            if (node.left) tempQueue.push(node.left);
            if (node.right) tempQueue.push(node.right);
        }
        queue = tempQueue;
        result.push(sum / count);
    }
    return result;
}

/*
question: Given the root of a binary tree, return the average value of the nodes on each level in the form of an array. Answers within 10-5 of the actual answer will be accepted.
 
Example 1:

Input: root = [3,9,20,null,null,15,7]
Output: [3.00000,14.50000,11.00000]
Explanation: The average value of nodes on level 0 is 3, on level 1 is 14.5, and on level 2 is 11.
Hence return [3, 14.5, 11].


Example 2:

Input: root = [3,9,20,15,7]
Output: [3.00000,14.50000,11.00000]


 
Constraints:


	The number of nodes in the tree is in the range [1, 104].
	-231 <= Node.val <= 231 - 1

 */
