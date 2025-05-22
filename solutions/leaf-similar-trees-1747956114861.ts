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

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
    const leaves1: number[] = [];
    const leaves2: number[] = [];
    
    const dfs = (node: TreeNode | null, leaves: number[]) => {
        if (node) {
            if (!node.left && !node.right) {
                leaves.push(node.val);
            } else {
                dfs(node.left, leaves);
                dfs(node.right, leaves);
            }
        }
    }
    
    dfs(root1, leaves1);
    dfs(root2, leaves2);
    
    return leaves1.toString() === leaves2.toString();
}

/*
question: Consider all the leaves of a binary tree, from left to right order, the values of those leaves form a leaf value sequence.



For example, in the given tree above, the leaf value sequence is (6, 7, 4, 9, 8).

Two binary trees are considered leaf-similar if their leaf value sequence is the same.

Return true if and only if the two given trees with head nodes root1 and root2 are leaf-similar.

 
Example 1:

Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
Output: true


Example 2:

Input: root1 = [1,2,3], root2 = [1,3,2]
Output: false


 
Constraints:


	The number of nodes in each tree will be in the range [1, 200].
	Both of the given trees will have values in the range [0, 200].

 */
