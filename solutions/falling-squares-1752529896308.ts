type Square = [number, number];

class SegmentTree {
    start: number;
    end: number;
    max: number;
    left?: SegmentTree;
    right?: SegmentTree;

    constructor(start: number, end: number) {
        this.start = start;
        this.end = end;
        this.max = 0;
    }

    update(i: number, j: number, val: number) {
        if (i > this.end || j < this.start) {
            return;
        }

        if (i <= this.start && j >= this.end) {
            this.max = val;
            return;
        }

        const mid = Math.floor((this.start + this.end) / 2);
        if (!this.left) {
            this.left = new SegmentTree(this.start, mid);
        }
        if (!this.right) {
            this.right = new SegmentTree(mid + 1, this.end);
        }

        this.left.update(i, j, val);
        this.right.update(i, j, val);

        this.max = Math.max(this.left.max, this.right.max);
    }

    query(i: number, j: number): number {
        if (i > this.end || j < this.start) {
            return 0;
        }

        if (i <= this.start && j >= this.end) {
            return this.max;
        }

        const mid = Math.floor((this.start + this.end) / 2);
        if (!this.left) {
            this.left = new SegmentTree(this.start, mid);
        }
        if (!this.right) {
            this.right = new SegmentTree(mid + 1, this.end);
        }

        return Math.max(this.left.query(i, j), this.right.query(i, j));
    }
}

function fallingSquares(positions: Square[]): number[] {
    const index: number[] = [];
    for (let pos of positions) {
        index.push(pos[0]);
        index.push(pos[0] + pos[1] - 1);
    }
    index.sort((a, b) => a - b);

    const rank: Map<number, number> = new Map();
    let idx = 0;
    for (let i of index) {
        if (!rank.has(i)) {
            rank.set(i, idx++);
        }
    }

    const tree = new SegmentTree(0, idx);
    let max = 0;
    const ans: number[] = [];

    for (let pos of positions) {
        const L = rank.get(pos[0])!;
        const R = rank.get(pos[0] + pos[1] - 1)!;
        const h = tree.query(L, R) + pos[1];
        tree.update(L, R, h);
        max = Math.max(max, h);
        ans.push(max);
    }

    return ans;
}

/*
question: There are several squares being dropped onto the X-axis of a 2D plane.

You are given a 2D integer array positions where positions[i] = [lefti, sideLengthi] represents the ith square with a side length of sideLengthi that is dropped with its left edge aligned with X-coordinate lefti.

Each square is dropped one at a time from a height above any landed squares. It then falls downward (negative Y direction) until it either lands on the top side of another square or on the X-axis. A square brushing the left/right side of another square does not count as landing on it. Once it lands, it freezes in place and cannot be moved.

After each square is dropped, you must record the height of the current tallest stack of squares.

Return an integer array ans where ans[i] represents the height described above after dropping the ith square.

 
Example 1:

Input: positions = [[1,2],[2,3],[6,1]]
Output: [2,5,5]
Explanation:
After the first drop, the tallest stack is square 1 with a height of 2.
After the second drop, the tallest stack is squares 1 and 2 with a height of 5.
After the third drop, the tallest stack is still squares 1 and 2 with a height of 5.
Thus, we return an answer of [2, 5, 5].


Example 2:

Input: positions = [[100,100],[200,100]]
Output: [100,100]
Explanation:
After the first drop, the tallest stack is square 1 with a height of 100.
After the second drop, the tallest stack is either square 1 or square 2, both with heights of 100.
Thus, we return an answer of [100, 100].
Note that square 2 only brushes the right side of square 1, which does not count as landing on it.


 
Constraints:


	1 <= positions.length <= 1000
	1 <= lefti <= 108
	1 <= sideLengthi <= 106

 */
