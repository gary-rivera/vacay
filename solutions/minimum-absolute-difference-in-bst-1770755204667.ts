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

function getMinimumDifference(root: TreeNode | null): number {
    let prev: number = -1;
    let min: number = Number.MAX_SAFE_INTEGER;
    
    function inOrder(node: TreeNode | null): void {
        if (node === null) {
            return;
        }
        
        inOrder(node.left);
        
        if (prev >= 0) {
            min = Math.min(min, node.val - prev);
        }
        prev = node.val;
        
        inOrder(node.right);
    }
    
    inOrder(root);
    
    return min;
}

/*
question: Given the root of a Binary Search Tree (BST), return the minimum absolute difference between the values of any two different nodes in the tree.

 
Example 1:

Input: root = [4,2,6,1,3]
Output: 1


Example 2:

Input: root = [1,0,48,null,null,12,49]
Output: 1


 
Constraints:


	The number of nodes in the tree is in the range [2, 104].
	0 <= Node.val <= 105


 
Note: This question is the same as 783: https://leetcode.com/problems/minimum-distance-between-bst-nodes/
 */
