type Digit = {
    name: string,
    character: string,
    value: number
}

const digits: Digit[] = [
    { name: "zero", character: "z", value: 0 },
    { name: "one", character: "o", value: 1 },
    { name: "two", character: "w", value: 2 },
    { name: "three", character: "h", value: 3 },
    { name: "four", character: "u", value: 4 },
    { name: "five", character: "f", value: 5 },
    { name: "six", character: "x", value: 6 },
    { name: "seven", character: "s", value: 7 },
    { name: "eight", character: "g", value: 8 },
    { name: "nine", character: "i", value: 9 }
];

function originalDigits(s: string): string {
    let counts = new Array(10).fill(0);
    for (let c of s) {
        for (let digit of digits) {
            if (c === digit.character) {
                counts[digit.value]++;
                break;
            }
        }
    }

    counts[7] -= counts[6];
    counts[5] -= counts[4];
    counts[3] -= counts[8];
    counts[1] -= counts[0] + counts[2] + counts[4];
    counts[9] -= counts[5] + counts[6] + counts[8];

    let result = "";
    for (let i = 0; i < 10; i++) {
        result += String(i).repeat(counts[i]);
    }
    return result;
}

/*
question: Given a string s containing an out-of-order English representation of digits 0-9, return the digits in ascending order.

 
Example 1:
Input: s = "owoztneoer"
Output: "012"
Example 2:
Input: s = "fviefuro"
Output: "45"

 
Constraints:


	1 <= s.length <= 105
	s[i] is one of the characters ["e","g","f","i","h","o","n","s","r","u","t","w","v","x","z"].
	s is guaranteed to be valid.

 */
