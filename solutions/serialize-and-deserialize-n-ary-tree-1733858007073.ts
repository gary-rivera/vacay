class Node {
    val: number;
    children: Node[];

    constructor(val?: number, children?: Node[]) {
        this.val = (val===undefined ? 0 : val);
        this.children = (children===undefined ? [] : children);
    }
}

class Codec {
    // Encodes a tree to a single string.
    serialize(root: Node | null): string {
        if (root === null) {
            return '';
        }

        let result = root.val + '';
        for (let child of root.children) {
            result += ' ' + this.serialize(child);
        }
        return '[' + result + ']';
    }

    // Decodes your encoded data to tree.
    deserialize(data: string): Node | null {
        if (data === '') {
            return null;
        }

        let list = data.slice(1, data.length - 1).split('[');
        return this.helper(list);
    }

    helper(list: string[]): Node | null {
        if (list[0] === '') {
            return null;
        }

        let root = new Node(parseInt(list[0]));
        list.shift();
        while (list[0] !== '') {
            root.children.push(this.helper(list));
        }
        list.shift();
        return root;
    }
}

// Your Codec object will be instantiated and called as such:
// let codec = new Codec();
// codec.deserialize(codec.serialize(root));

/*
question: Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize an N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that an N-ary tree can be serialized to a string and this string can be deserialized to the original tree structure.

For example, you may serialize the following 3-ary tree

 

as [1 [3[5 6] 2 4]]. Note that this is just an example, you do not necessarily need to follow this format.

Or you can follow LeetCode's level order traversal serialization format, where each group of children is separated by the null value.

 

For example, the above tree may be serialized as [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14].

You do not necessarily need to follow the above-suggested formats, there are many more different formats that work so please be creative and come up with different approaches yourself.

 
Example 1:

Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]


Example 2:

Input: root = [1,null,3,2,4,null,5,6]
Output: [1,null,3,2,4,null,5,6]


Example 3:

Input: root = []
Output: []


 
Constraints:


	The number of nodes in the tree is in the range [0, 104].
	0 <= Node.val <= 104
	The height of the n-ary tree is less than or equal to 1000
	Do not use class member/global/static variables to store states. Your encode and decode algorithms should be stateless.

 */
