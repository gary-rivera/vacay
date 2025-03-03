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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    let map = new Map();
    for(let i=0;i<inorder.length;i++) {
        map.set(inorder[i], i);
    }
    return helper(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1, map);
};

function helper(preorder: number[], pStart: number, pEnd: number, inorder: number[], iStart: number, iEnd: number, map: Map<number, number>): TreeNode | null {
    if(pStart > pEnd || iStart > iEnd) return null;
    let rootVal = preorder[pStart];
    let root = new TreeNode(rootVal);
    let iRootIndex = map.get(rootVal);
    let leftNum = iRootIndex - iStart;
    root.left = helper(preorder, pStart + 1, pStart + leftNum, inorder, iStart, iRootIndex - 1, map);
    root.right = helper(preorder, pStart + leftNum + 1, pEnd, inorder, iRootIndex + 1, iEnd, map);
    return root;
}

/*
question: Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.

 
Example 1:

Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]


Example 2:

Input: preorder = [-1], inorder = [-1]
Output: [-1]


 
Constraints:


	1 <= preorder.length <= 3000
	inorder.length == preorder.length
	-3000 <= preorder[i], inorder[i] <= 3000
	preorder and inorder consist of unique values.
	Each value of inorder also appears in preorder.
	preorder is guaranteed to be the preorder traversal of the tree.
	inorder is guaranteed to be the inorder traversal of the tree.

 */
