function canTransform(start: string, result: string): boolean {
    if (start.replace(/X/g, '') !== result.replace(/X/g, '')) {
        return false;
    }

    let p1 = 0, p2 = 0;
    const n = start.length;

    while (p1 < n && p2 < n) {
        // Skip all 'X' in start
        while (p1 < n && start[p1] === 'X') {
            p1++;
        }

        // Skip all 'X' in result
        while (p2 < n && result[p2] === 'X') {
            p2++;
        }

        // If both pointers have reached the end
        if (p1 === n && p2 === n) {
            return true;
        }

        // If only one pointer has reached the end
        if (p1 === n || p2 === n) {
            return false;
        }

        if (start[p1] !== result[p2]) {
            return false;
        }

        if (start[p1] === 'L' && p2 > p1) {
            return false;
        }

        if (start[p1] === 'R' && p1 > p2) {
            return false;
        }

        p1++;
        p2++;
    }

    return true;
}

/*
question: In a string composed of 'L', 'R', and 'X' characters, like "RXXLRXRXL", a move consists of either replacing one occurrence of "XL" with "LX", or replacing one occurrence of "RX" with "XR". Given the starting string start and the ending string result, return True if and only if there exists a sequence of moves to transform start to result.

 
Example 1:

Input: start = "RXXLRXRXL", result = "XRLXXRRLX"
Output: true
Explanation: We can transform start to result following these steps:
RXXLRXRXL ->
XRXLRXRXL ->
XRLXRXRXL ->
XRLXXRRXL ->
XRLXXRRLX


Example 2:

Input: start = "X", result = "L"
Output: false


 
Constraints:


	1 <= start.length <= 104
	start.length == result.length
	Both start and result will only consist of characters in 'L', 'R', and 'X'.

 */
