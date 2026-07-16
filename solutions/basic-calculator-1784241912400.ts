class Calculator {
    private index: number = 0;

    public calculate(s: string): number {
        let stack = [];
        let num = 0;
        let sign = 1;
        let result = 0;

        while (this.index < s.length) {
            let char = s[this.index];

            if (char >= '0' && char <= '9') {
                num = num * 10 + (char.charCodeAt(0) - '0'.charCodeAt(0));
            } else if (char === '+') {
                result += sign * num;
                num = 0;
                sign = 1;
            } else if (char === '-') {
                result += sign * num;
                num = 0;
                sign = -1;
            } else if (char === '(') {
                stack.push(result);
                stack.push(sign);
                sign = 1;
                result = 0;
            } else if (char === ')') {
                result += sign * num;
                num = 0;
                result *= stack.pop();
                result += stack.pop();
            }

            this.index++;
        }

        if (num !== 0) result += sign * num;
        return result;
    }
}

let calculator = new Calculator();
console.log(calculator.calculate("1 + 1")); // Output: 2
console.log(calculator.calculate(" 2-1 + 2 ")); // Output: 3
console.log(calculator.calculate("(1+(4+5+2)-3)+(6+8)")); // Output: 23

/*
question: Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result of the evaluation.

Note: You are not allowed to use any built-in function which evaluates strings as mathematical expressions, such as eval().

 
Example 1:

Input: s = "1 + 1"
Output: 2


Example 2:

Input: s = " 2-1 + 2 "
Output: 3


Example 3:

Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23


 
Constraints:


	1 <= s.length <= 3 * 105
	s consists of digits, '+', '-', '(', ')', and ' '.
	s represents a valid expression.
	'+' is not used as a unary operation (i.e., "+1" and "+(2 + 3)" is invalid).
	'-' could be used as a unary operation (i.e., "-1" and "-(2 + 3)" is valid).
	There will be no two consecutive operators in the input.
	Every number and running calculation will fit in a signed 32-bit integer.

 */
