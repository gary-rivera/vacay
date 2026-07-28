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

function distanceK(root: TreeNode | null, target: number, K: number): number[] {
    const parents = new Map<TreeNode, TreeNode | null>();
    const queue = [root];
    while (queue.length) {
        const node = queue.shift()!;
        if (node.left) {
            parents.set(node.left, node);
            queue.push(node.left);
        }
        if (node.right) {
            parents.set(node.right, node);
            queue.push(node.right);
        }
    }
    const targetNode = [...parents.keys()].find(node => node.val === target)!;
    const result: number[] = [];
    const visited = new Set<TreeNode>();
    const dfs = (node: TreeNode | null, dist: number) => {
        if (!node || visited.has(node)) return;
        visited.add(node);
        if (dist === K) result.push(node.val);
        else {
            dfs(node.left, dist + 1);
            dfs(node.right, dist + 1);
            dfs(parents.get(node) || null, dist + 1);
        }
    };
    dfs(targetNode, 0);
    return result;
}

/*
question: Given the root of a binary tree, the value of a target node target, and an integer k, return an array of the values of all nodes that have a distance k from the target node.

You can return the answer in any order.

 
Example 1:

Input: root = [3,5,1,6,2,0,8,null,null,7,4], target = 5, k = 2
Output: [7,4,1]
Explanation: The nodes that are a distance 2 from the target node (with value 5) have values 7, 4, and 1.


Example 2:

Input: root = [1], target = 1, k = 3
Output: []


 
Constraints:


	The number of nodes in the tree is in the range [1, 500].
	0 <= Node.val <= 500
	All the values Node.val are unique.
	target is the value of one of the nodes in the tree.
	0 <= k <= 1000

 */
