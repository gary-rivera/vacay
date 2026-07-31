class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function nextLargerNodes(head: ListNode | null): number[] {
    let arr: number[] = [];
    while (head) {
        arr.push(head.val);
        head = head.next;
    }
    let stack: number[] = [];
    let res: number[] = new Array(arr.length).fill(0);
    for (let i = 0; i < arr.length; i++) {
        while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
            let j = stack.pop() as number;
            res[j] = arr[i];
        }
        stack.push(i);
    }
    return res;
}

/*
question: You are given the head of a linked list with n nodes.

For each node in the list, find the value of the next greater node. That is, for each node, find the value of the first node that is next to it and has a strictly larger value than it.

Return an integer array answer where answer[i] is the value of the next greater node of the ith node (1-indexed). If the ith node does not have a next greater node, set answer[i] = 0.

 
Example 1:

Input: head = [2,1,5]
Output: [5,5,0]


Example 2:

Input: head = [2,7,4,3,5]
Output: [7,0,5,5,0]


 
Constraints:


	The number of nodes in the list is n.
	1 <= n <= 104
	1 <= Node.val <= 109

 */
