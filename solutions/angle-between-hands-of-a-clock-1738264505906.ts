function clockAngle(hour: number, minutes: number): number {
    // Each hour on the clock corresponds to 30 degrees
    let hourAngle = 30 * (hour % 12 + minutes / 60);
    // Each minute on the clock corresponds to 6 degrees
    let minuteAngle = 6 * minutes;
    // The difference between the two angles is the angle between the hour and the minute hand
    let angle = Math.abs(hourAngle - minuteAngle);
    // The angle should not be larger than 180 degrees
    return Math.min(angle, 360 - angle);
}

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
