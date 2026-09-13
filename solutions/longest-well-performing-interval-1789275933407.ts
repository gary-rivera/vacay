function longestWPI(hours: number[]): number {
    let score = 0;
    let maxInterval = 0;
    const scoreMap = new Map<number, number>();

    for (let i = 0; i < hours.length; i++) {
        score += hours[i] > 8 ? 1 : -1;

        if (score > 0) {
            maxInterval = i + 1;
        } else {
            if (!scoreMap.has(score)) {
                scoreMap.set(score, i);
            }

            if (scoreMap.has(score - 1)) {
                maxInterval = Math.max(maxInterval, i - (scoreMap.get(score - 1) as number));
            }
        }
    }

    return maxInterval;
}

/*
question: We are given hours, a list of the number of hours worked per day for a given employee.

A day is considered to be a tiring day if and only if the number of hours worked is (strictly) greater than 8.

A well-performing interval is an interval of days for which the number of tiring days is strictly larger than the number of non-tiring days.

Return the length of the longest well-performing interval.

 
Example 1:

Input: hours = [9,9,6,0,6,6,9]
Output: 3
Explanation: The longest well-performing interval is [9,9,6].


Example 2:

Input: hours = [6,6,6]
Output: 0


 
Constraints:


	1 <= hours.length <= 104
	0 <= hours[i] <= 16

 */
