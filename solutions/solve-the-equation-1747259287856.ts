function solveEquation(equation: string): string {
    let [left, right] = equation.split('=');
    let [leftSum, leftX] = evaluateExpression(left);
    let [rightSum, rightX] = evaluateExpression(right);
    
    if (leftX === rightX) {
        if (leftSum === rightSum) {
            return "Infinite solutions";
        } else {
            return "No solution";
        }
    } else {
        return `x=${(rightSum - leftSum) / (leftX - rightX)}`;
    }
}

function evaluateExpression(expression: string): [number, number] {
    let sum = 0;
    let xCount = 0;
    let sign = 1;
    let num = 0;
    let hasNum = false;

    for (let i = 0; i <= expression.length; i++) {
        let char = expression[i];
        if (char === 'x') {
            xCount += sign * (hasNum ? num : 1);
            num = 0;
            hasNum = false;
        } else if (char === '+' || char === '-' || char === undefined) {
            sum += sign * num;
            num = 0;
            hasNum = false;
            sign = char === '-' ? -1 : 1;
        } else {
            num = num * 10 + parseInt(char);
            hasNum = true;
        }
    }

    return [sum, xCount];
}

/*
question: Solve a given equation and return the value of 'x' in the form of a string "x=#value". The equation contains only '+', '-' operation, the variable 'x' and its coefficient. You should return "No solution" if there is no solution for the equation, or "Infinite solutions" if there are infinite solutions for the equation.

If there is exactly one solution for the equation, we ensure that the value of 'x' is an integer.

 
Example 1:

Input: equation = "x+5-3+x=6+x-2"
Output: "x=2"


Example 2:

Input: equation = "x=x"
Output: "Infinite solutions"


Example 3:

Input: equation = "2x=x"
Output: "x=0"


 
Constraints:


	3 <= equation.length <= 1000
	equation has exactly one '='.
	equation consists of integers with an absolute value in the range [0, 100] without any leading zeros, and the variable 'x'.
	The input is generated that if there is a single solution, it will be an integer.

 */
