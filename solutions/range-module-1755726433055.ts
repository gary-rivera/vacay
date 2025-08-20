class RangeModule {
    private intervals: number[][];

    constructor() {
        this.intervals = [];
    }

    addRange(left: number, right: number): void {
        let newIntervals = [];
        let index = 0;
        while (index < this.intervals.length && this.intervals[index][1] < left) {
            newIntervals.push(this.intervals[index++]);
        }
        while (index < this.intervals.length && this.intervals[index][0] <= right) {
            left = Math.min(left, this.intervals[index][0]);
            right = Math.max(right, this.intervals[index++][1]);
        }
        newIntervals.push([left, right]);
        while (index < this.intervals.length) {
            newIntervals.push(this.intervals[index++]);
        }
        this.intervals = newIntervals;
    }

    queryRange(left: number, right: number): boolean {
        let low = 0;
        let high = this.intervals.length - 1;
        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            if (this.intervals[mid][0] <= left && right <= this.intervals[mid][1]) {
                return true;
            } else if (this.intervals[mid][0] > left) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }
        return false;
    }

    removeRange(left: number, right: number): void {
        let newIntervals = [];
        let index = 0;
        while (index < this.intervals.length && this.intervals[index][1] <= left) {
            newIntervals.push(this.intervals[index++]);
        }
        while (index < this.intervals.length && this.intervals[index][0] < right) {
            if (this.intervals[index][0] < left) {
                newIntervals.push([this.intervals[index][0], left]);
            }
            if (right < this.intervals[index][1]) {
                newIntervals.push([right, this.intervals[index][1]]);
            }
            index++;
        }
        while (index < this.intervals.length) {
            newIntervals.push(this.intervals[index++]);
        }
        this.intervals = newIntervals;
    }
}

/*
question: A Range Module is a module that tracks ranges of numbers. Design a data structure to track the ranges represented as half-open intervals and query about them.

A half-open interval [left, right) denotes all the real numbers x where left <= x < right.

Implement the RangeModule class:


	RangeModule() Initializes the object of the data structure.
	void addRange(int left, int right) Adds the half-open interval [left, right), tracking every real number in that interval. Adding an interval that partially overlaps with currently tracked numbers should add any numbers in the interval [left, right) that are not already tracked.
	boolean queryRange(int left, int right) Returns true if every real number in the interval [left, right) is currently being tracked, and false otherwise.
	void removeRange(int left, int right) Stops tracking every real number currently being tracked in the half-open interval [left, right).


 
Example 1:

Input
["RangeModule", "addRange", "removeRange", "queryRange", "queryRange", "queryRange"]
[[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
Output
[null, null, null, true, false, true]

Explanation
RangeModule rangeModule = new RangeModule();
rangeModule.addRange(10, 20);
rangeModule.removeRange(14, 16);
rangeModule.queryRange(10, 14); // return True,(Every number in [10, 14) is being tracked)
rangeModule.queryRange(13, 15); // return False,(Numbers like 14, 14.03, 14.17 in [13, 15) are not being tracked)
rangeModule.queryRange(16, 17); // return True, (The number 16 in [16, 17) is still being tracked, despite the remove operation)


 
Constraints:


	1 <= left < right <= 109
	At most 104 calls will be made to addRange, queryRange, and removeRange.

 */
