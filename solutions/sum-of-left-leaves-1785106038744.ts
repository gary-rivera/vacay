class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val===undefined ? 0 : val);
        this.left = (left===undefined ? null : left);
        this.right = (right===undefined ? null : right);
    }
}

function sumOfLeftLeaves(root: TreeNode | null): number {
    if (!root) return 0;
    let sum = 0;
    if (root.left) {
        if (!root.left.left && !root.left.right) {
            sum += root.left.val;
        } else {
            sum += sumOfLeftLeaves(root.left);
        }
    }
    if (root.right) {
        if (root.right.left || root.right.right) {
            sum += sumOfLeftLeaves(root.right);
        }
    }
    return sum;
}

/*
question: Given the root of a binary tree, return the sum of all left leaves.

A leaf is a node with no children. A left leaf is a leaf that is the left child of another node.

 
Example 1:

Input: root = [3,9,20,null,null,15,7]
Output: 24
Explanation: There are two left leaves in the binary tree, with values 9 and 15 respectively.


Example 2:

Input: root = [1]
Output: 0


 
Constraints:


	The number of nodes in the tree is in the range [1, 1000].
	-1000 <= Node.val <= 1000

 */
