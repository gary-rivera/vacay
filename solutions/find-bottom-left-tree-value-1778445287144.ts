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

function findBottomLeftValue(root: TreeNode | null): number {
    let queue: TreeNode[] = [root];
    let node: TreeNode = null;
    while(queue.length > 0) {
        node = queue.shift();
        if(node.right !== null) {
            queue.push(node.right);
        }
        if(node.left !== null) {
            queue.push(node.left);
        }
    }
    return node.val;
}

/*
question: Given the root of a binary tree, return the leftmost value in the last row of the tree.

 
Example 1:

Input: root = [2,1,3]
Output: 1


Example 2:

Input: root = [1,2,3,4,null,5,6,null,null,7]
Output: 7


 
Constraints:


	The number of nodes in the tree is in the range [1, 104].
	-231 <= Node.val <= 231 - 1

 */
