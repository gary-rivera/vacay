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

function postorderTraversal(root: TreeNode | null): number[] {
    let result: number[] = [];
    let stack: (TreeNode | null)[] = [];
    if(root) stack.push(root);
    while(stack.length !== 0) {
        let node = stack.pop();
        if(node !== null) {
            result.unshift(node.val);
            if(node.left) stack.push(node.left);
            if(node.right) stack.push(node.right);
        }
    }
    return result;
}

/*
question: Given the root of a binary tree, return the postorder traversal of its nodes' values.

 
Example 1:


Input: root = [1,null,2,3]

Output: [3,2,1]

Explanation:




Example 2:


Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]

Output: [4,6,7,5,2,9,8,3,1]

Explanation:




Example 3:


Input: root = []

Output: []


Example 4:


Input: root = [1]

Output: [1]


 
Constraints:


	The number of the nodes in the tree is in the range [0, 100].
	-100 <= Node.val <= 100


 
Follow up: Recursive solution is trivial, could you do it iteratively? */
