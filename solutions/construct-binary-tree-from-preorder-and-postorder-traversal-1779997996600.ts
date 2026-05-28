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

function constructFromPrePost(pre: number[], post: number[]): TreeNode | null {
    let preIndex = 0, postIndex = 0;

    function helper(lower: number, upper: number): TreeNode | null {
        if (preIndex == pre.length || lower > upper) return null;
        let root = new TreeNode(pre[preIndex++]);
        if (root.val != post[postIndex])
            root.left = helper(lower, pre[preIndex]);
        if (root.val != post[postIndex])
            root.right = helper(pre[preIndex], upper);
        postIndex++;
        return root;
    }

    return helper(1, pre.length);
}

/*
question: Given two integer arrays, preorder and postorder where preorder is the preorder traversal of a binary tree of distinct values and postorder is the postorder traversal of the same tree, reconstruct and return the binary tree.

If there exist multiple answers, you can return any of them.

 
Example 1:

Input: preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
Output: [1,2,3,4,5,6,7]


Example 2:

Input: preorder = [1], postorder = [1]
Output: [1]


 
Constraints:


	1 <= preorder.length <= 30
	1 <= preorder[i] <= preorder.length
	All the values of preorder are unique.
	postorder.length == preorder.length
	1 <= postorder[i] <= postorder.length
	All the values of postorder are unique.
	It is guaranteed that preorder and postorder are the preorder traversal and postorder traversal of the same binary tree.

 */
