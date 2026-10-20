function findAngle(hour: number, minutes: number): number {
    if (hour < 1 || hour > 12 || minutes < 0 || minutes > 59) {
        throw new Error('Invalid input');
    }

    let hourAngle = 0.5 * (hour * 60 + minutes);
    let minuteAngle = 6 * minutes;

    let angle = Math.abs(hourAngle - minuteAngle);

    angle = Math.min(360 - angle, angle);

    return angle;
}

console.log(findAngle(12, 30)); // 165
console.log(findAngle(3, 30)); // 75
console.log(findAngle(3, 15)); // 7.5

/*
question: Given two numbers, hour and minutes, return the smaller angle (in degrees) formed between the hour and the minute hand.

Answers within 10-5 of the actual value will be accepted as correct.

 
Example 1:

Input: hour = 12, minutes = 30
Output: 165


Example 2:

Input: hour = 3, minutes = 30
Output: 75


Example 3:

Input: hour = 3, minutes = 15
Output: 7.5


 
Constraints:


	1 <= hour <= 12
	0 <= minutes <= 59

 */
