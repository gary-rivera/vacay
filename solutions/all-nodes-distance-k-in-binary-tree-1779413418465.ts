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
    const parent = new Map();
    const ans = [];

    const dfs = (node: TreeNode | null, par: TreeNode | null) => {
        if (node !== null) {
            parent.set(node.val, par);
            dfs(node.left, node);
            dfs(node.right, node);
        }
    }

    dfs(root, null);

    const bfs = (src: number, K: number, seen: Set<number>) => {
        const queue = [[src, 0]];

        while (queue.length > 0) {
            let [node, depth] = queue.shift();

            if (depth === K) {
                ans.push(node);
            }

            if (seen.has(node)) continue;
            seen.add(node);

            if (parent.get(node) !== null && !seen.has(parent.get(node).val)) {
                queue.push([parent.get(node).val, depth + 1]);
            }

            if (parent.get(node).left !== null && !seen.has(parent.get(node).left.val)) {
                queue.push([parent.get(node).left.val, depth + 1]);
            }

            if (parent.get(node).right !== null && !seen.has(parent.get(node).right.val)) {
                queue.push([parent.get(node).right.val, depth + 1]);
            }
        }
    }

    bfs(target, K, new Set());

    return ans;
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
