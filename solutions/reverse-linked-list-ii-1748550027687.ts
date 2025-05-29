class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}

function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
    if (!head || left === right) return head;

    let dummyNode = new ListNode(0);
    dummyNode.next = head;

    let pre = dummyNode;
    for (let i = 0; i < left - 1; ++i) {
        pre = pre.next!;
    }

    let current = pre.next!;
    for (let i = 0; i < right - left; ++i) {
        let next = current.next!;
        current.next = next.next;
        next.next = pre.next;
        pre.next = next;
    }

    return dummyNode.next;
}

/*
question: Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.

 
Example 1:

Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]


Example 2:

Input: head = [5], left = 1, right = 1
Output: [5]


 
Constraints:


	The number of nodes in the list is n.
	1 <= n <= 500
	-500 <= Node.val <= 500
	1 <= left <= right <= n


 
Follow up: Could you do it in one pass? */
