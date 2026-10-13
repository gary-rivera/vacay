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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    if (!inorder.length || !postorder.length) {
        return null;
    }
    const rootVal = postorder[postorder.length - 1];
    const root = new TreeNode(rootVal);
    const index = inorder.indexOf(rootVal);
    root.left = buildTree(inorder.slice(0, index), postorder.slice(0, index));
    root.right = buildTree(inorder.slice(index + 1), postorder.slice(index, postorder.length - 1));
    return root;
}

/*
question: Given two integer arrays inorder and postorder where inorder is the inorder traversal of a binary tree and postorder is the postorder traversal of the same tree, construct and return the binary tree.

 
Example 1:

Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]


Example 2:

Input: inorder = [-1], postorder = [-1]
Output: [-1]


 
Constraints:


	1 <= inorder.length <= 3000
	postorder.length == inorder.length
	-3000 <= inorder[i], postorder[i] <= 3000
	inorder and postorder consist of unique values.
	Each value of postorder also appears in inorder.
	inorder is guaranteed to be the inorder traversal of the tree.
	postorder is guaranteed to be the postorder traversal of the tree.

 */
