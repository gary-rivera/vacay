```typescript
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

function countUnivalSubtrees(root: TreeNode | null): number {
    let count = 0;
    function isUnival(node: TreeNode | null, val: number): boolean {
        if (node === null) {
            return true;
        }
        if (!isUnival(node.left, node.val) | !isUnival(node.right, node.val)) {
            return false;
        }
        count++;
        return node.val === val;
    }
    isUnival(root, 0);
    return count;
}
```

/*
question: Given the root of a binary tree, return the number of uni-value subtrees.

A uni-value subtree means all nodes of the subtree have the same value.

 
Example 1:

Input: root = [5,1,5,5,5,null,5]
Output: 4


Example 2:

Input: root = []
Output: 0


Example 3:

Input: root = [5,5,5,5,5,null,5]
Output: 6


 
Constraints:


	The number of the node in the tree will be in the range [0, 1000].
	-1000 <= Node.val <= 1000

 */
