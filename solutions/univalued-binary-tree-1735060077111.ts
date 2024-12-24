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

function isUnivalTree(root: TreeNode | null): boolean {
    if(root === null) return true;
    if(root.left !== null && root.left.val !== root.val) return false;
    if(root.right !== null && root.right.val !== root.val) return false;
    return isUnivalTree(root.left) && isUnivalTree(root.right);
}

/*
question: A binary tree is uni-valued if every node in the tree has the same value.

Given the root of a binary tree, return true if the given tree is uni-valued, or false otherwise.

 
Example 1:

Input: root = [1,1,1,1,1,null,1]
Output: true


Example 2:

Input: root = [2,2,2,5,2]
Output: false


 
Constraints:


	The number of nodes in the tree is in the range [1, 100].
	0 <= Node.val < 100

 */
