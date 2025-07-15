type Event = [number, number, number];

function maxSumTwoEvents(events: Event[]): number {
    events.sort((a, b) => a[1] - b[1]);
    const dp: number[] = [];
    const binarySearch = (i: number) => {
        let left = 0, right = i - 1;
        while (left < right) {
            const mid = Math.floor((left + right + 1) / 2);
            if (events[mid][1] < events[i][0]) left = mid;
            else right = mid - 1;
        }
        return events[left][1] < events[i][0] ? left : -1;
    };
    for (let i = 0; i < events.length; i++) {
        let j = binarySearch(i);
        let prev = j != -1 ? dp[j] : 0;
        dp[i] = Math.max((i > 0 ? dp[i - 1] : 0), prev + events[i][2]);
    }
    return dp[events.length - 1];
}

/*
question: You are given a 0-indexed 2D integer array of events where events[i] = [startTimei, endTimei, valuei]. The ith event starts at startTimei and ends at endTimei, and if you attend this event, you will receive a value of valuei. You can choose at most two non-overlapping events to attend such that the sum of their values is maximized.

Return this maximum sum.

Note that the start time and end time is inclusive: that is, you cannot attend two events where one of them starts and the other ends at the same time. More specifically, if you attend an event with end time t, the next event must start at or after t + 1.

 
Example 1:

Input: events = [[1,3,2],[4,5,2],[2,4,3]]
Output: 4
Explanation: Choose the green events, 0 and 1 for a sum of 2 + 2 = 4.


Example 2:

Input: events = [[1,3,2],[4,5,2],[1,5,5]]
Output: 5
Explanation: Choose event 2 for a sum of 5.


Example 3:

Input: events = [[1,5,3],[1,5,1],[6,6,5]]
Output: 8
Explanation: Choose events 0 and 2 for a sum of 3 + 5 = 8.

 
Constraints:


	2 <= events.length <= 105
	events[i].length == 3
	1 <= startTimei <= endTimei <= 109
	1 <= valuei <= 106

 */
