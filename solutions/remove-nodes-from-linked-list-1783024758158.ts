class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function removeNodes(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) return head;

    let reversedHead = reverseList(head);
    let current = reversedHead;
    let maxNode = reversedHead;

    while (current !== null && current.next !== null) {
        if (current.next.val < maxNode.val) {
            current.next = current.next.next;
        } else {
            maxNode = current.next;
            current = current.next;
        }
    }

    return reverseList(reversedHead);
}

function reverseList(head: ListNode | null): ListNode | null {
    let prev = null;
    let current = head;

    while (current !== null) {
        let nextTemp = current.next;
        current.next = prev;
        prev = current;
        current = nextTemp;
    }

    return prev;
}

/*
question: You are given the head of a linked list.

Remove every node which has a node with a greater value anywhere to the right side of it.

Return the head of the modified linked list.

 
Example 1:

Input: head = [5,2,13,3,8]
Output: [13,8]
Explanation: The nodes that should be removed are 5, 2 and 3.
- Node 13 is to the right of node 5.
- Node 13 is to the right of node 2.
- Node 8 is to the right of node 3.


Example 2:

Input: head = [1,1,1,1]
Output: [1,1,1,1]
Explanation: Every node has value 1, so no nodes are removed.


 
Constraints:


	The number of the nodes in the given list is in the range [1, 105].
	1 <= Node.val <= 105

 */
