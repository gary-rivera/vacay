class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
}

function plusOne(head: ListNode | null): ListNode | null {
    if (head === null) {
        return null;
    }

    let reversedHead = reverseList(head);
    let currentNode = reversedHead;
    let carry = 1;

    while (currentNode !== null && carry > 0) {
        currentNode.val += carry;
        carry = Math.floor(currentNode.val / 10);
        currentNode.val %= 10;
        if (carry > 0 && currentNode.next === null) {
            currentNode.next = new ListNode(carry);
            carry = 0;
        }
        currentNode = currentNode.next;
    }

    return reverseList(reversedHead);
}

function reverseList(head: ListNode | null): ListNode | null {
    let prevNode: ListNode | null = null;
    let currentNode = head;

    while (currentNode !== null) {
        let nextTemp = currentNode.next;
        currentNode.next = prevNode;
        prevNode = currentNode;
        currentNode = nextTemp;
    }

    return prevNode;
}

/*
question: Given a non-negative integer represented as a linked list of digits, plus one to the integer.

The digits are stored such that the most significant digit is at the head of the list.

 
Example 1:
Input: head = [1,2,3]
Output: [1,2,4]
Example 2:
Input: head = [0]
Output: [1]

 
Constraints:


	The number of nodes in the linked list is in the range [1, 100].
	0 <= Node.val <= 9
	The number represented by the linked list does not contain leading zeros except for the zero itself. 

 */
