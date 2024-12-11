```typescript
class TreeNode {
    val: string;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: string, left?: TreeNode | null, right?: TreeNode | null) {
        this.val = (val === undefined ? "0" : val);
        this.left = (left === undefined ? null : left);
        this.right = (right === undefined ? null : right);
    }
}

function str2tree(s: string): TreeNode | null {
    let i = 0, n = s.length;
    const stack: TreeNode[] = [];
    while (i < n) {
        if (s[i] === '(') {
            i++;
            continue;
        }
        if (s[i] === ')') {
            const node = stack.pop()!;
            if (stack.length && (stack[stack.length - 1].val === '+' || stack[stack.length - 1].val === '-' || stack[stack.length - 1].val === '*' || stack[stack.length - 1].val === '/')) {
                const op = stack.pop()!;
                op.right = node;
                stack[stack.length - 1].right = op;
            } else {
                stack[stack.length - 1].right = node;
            }
            i++;
            continue;
        }
        let j = i;
        while (j < n && s[j] !== '(' && s[j] !== ')') j++;
        const node = new TreeNode(s.slice(i, j));
        if (stack.length && (stack[stack.length - 1].val === '+' || stack[stack.length - 1].val === '-' || stack[stack.length - 1].val === '*' || stack[stack.length - 1].val === '/')) {
            const op = stack.pop()!;
            op.left = stack.pop()!;
            op.right = node;
            stack.push(op);
        } else {
            stack.push(node);
        }
        i = j;
    }
    return stack[0];
}
```

/*
question: A binary expression tree is a kind of binary tree used to represent arithmetic expressions. Each node of a binary expression tree has either zero or two children. Leaf nodes (nodes with 0 children) correspond to operands (numbers), and internal nodes (nodes with 2 children) correspond to the operators '+' (addition), '-' (subtraction), '*' (multiplication), and '/' (division).

For each internal node with operator o, the infix expression it represents is (A o B), where A is the expression the left subtree represents and B is the expression the right subtree represents.

You are given a string s, an infix expression containing operands, the operators described above, and parentheses '(' and ')'.

Return any valid binary expression tree, whose in-order traversal reproduces s after omitting the parenthesis from it.

Please note that order of operations applies in s. That is, expressions in parentheses are evaluated first, and multiplication and division happen before addition and subtraction.

Operands must also appear in the same order in both s and the in-order traversal of the tree.

 
Example 1:

Input: s = "3*4-2*5"
Output: [-,*,*,3,4,2,5]
Explanation: The tree above is the only valid tree whose inorder traversal produces s.


Example 2:

Input: s = "2-3/(5*2)+1"
Output: [+,-,1,2,/,null,null,null,null,3,*,null,null,5,2]
Explanation: The inorder traversal of the tree above is 2-3/5*2+1 which is the same as s without the parenthesis. The tree also produces the correct result and its operands are in the same order as they appear in s.
The tree below is also a valid binary expression tree with the same inorder traversal as s, but it not a valid answer because it does not evaluate to the same value.

The third tree below is also not valid. Although it produces the same result and is equivalent to the above trees, its inorder traversal does not produce s and its operands are not in the same order as s.



Example 3:

Input: s = "1+2+3+4+5"
Output: [+,+,5,+,4,null,null,+,3,null,null,1,2]
Explanation: The tree [+,+,5,+,+,null,null,1,2,3,4] is also one of many other valid trees.


 
Constraints:


	1 <= s.length <= 100
	s consists of digits and the characters '(', ')', '+', '-', '*', and '/'.
	Operands in s are exactly 1 digit.
	It is guaranteed that s is a valid expression.

 */
