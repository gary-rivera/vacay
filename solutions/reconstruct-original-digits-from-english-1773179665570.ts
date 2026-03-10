function sortDigits(s: string): string {
    const count: number[] = new Array(10).fill(0);
    for (let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        if (c === 'z') count[0]++;
        if (c === 'w') count[2]++;
        if (c === 'u') count[4]++;
        if (c === 'x') count[6]++;
        if (c === 'g') count[8]++;
        if (c === 'o') count[1]++; // 1 - 0 - 2 - 4
        if (c === 'h') count[3]++; // 3 - 8
        if (c === 'f') count[5]++; // 5 - 4
        if (c === 's') count[7]++; // 7 - 6
        if (c === 'i') count[9]++; // 9 - 8 - 5 - 6
    }
    count[1] -= count[0] + count[2] + count[4];
    count[3] -= count[8];
    count[5] -= count[4];
    count[7] -= count[6];
    count[9] -= count[8] + count[5] + count[6];

    let result = '';
    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j < count[i]; j++) {
            result += i;
        }
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
