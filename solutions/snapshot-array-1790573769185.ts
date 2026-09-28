class SnapshotArray {
    private snapArray: Map<number, number>[];
    private snapId: number;

    constructor(length: number) {
        this.snapArray = new Array(length).fill(null).map(() => new Map());
        this.snapId = 0;
    }

    set(index: number, val: number): void {
        this.snapArray[index].set(this.snapId, val);
    }

    snap(): number {
        return this.snapId++;
    }

    get(index: number, snap_id: number): number {
        if (!this.snapArray[index].has(snap_id)) {
            let keys = Array.from(this.snapArray[index].keys()).sort((a, b) => b - a);
            for (let key of keys) {
                if (key < snap_id) {
                    return this.snapArray[index].get(key) || 0;
                }
            }
            return 0;
        }
        return this.snapArray[index].get(snap_id) || 0;
    }
}

/*
question: Implement a SnapshotArray that supports the following interface:


	SnapshotArray(int length) initializes an array-like data structure with the given length. Initially, each element equals 0.
	void set(index, val) sets the element at the given index to be equal to val.
	int snap() takes a snapshot of the array and returns the snap_id: the total number of times we called snap() minus 1.
	int get(index, snap_id) returns the value at the given index, at the time we took the snapshot with the given snap_id


 
Example 1:

Input: ["SnapshotArray","set","snap","set","get"]
[[3],[0,5],[],[0,6],[0,0]]
Output: [null,null,0,null,5]
Explanation: 
SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
snapshotArr.set(0,5);  // Set array[0] = 5
snapshotArr.snap();  // Take a snapshot, return snap_id = 0
snapshotArr.set(0,6);
snapshotArr.get(0,0);  // Get the value of array[0] with snap_id = 0, return 5

 
Constraints:


	1 <= length <= 5 * 104
	0 <= index < length
	0 <= val <= 109
	0 <= snap_id < (the total number of times we call snap())
	At most 5 * 104 calls will be made to set, snap, and get.

 */
