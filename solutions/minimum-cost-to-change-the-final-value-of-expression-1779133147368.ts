class Solution {
    private expression: string;
    private index: number;
    private n: number;

    minOperationsToFlip(expression: string): number {
        this.expression = expression;
        this.index = 0;
        this.n = expression.length;
        const [_, cost] = this.parseExpression();
        return cost;
    }

    private parseExpression(): [number, number] {
        let [value, cost] = this.parseTerm();
        while (this.index < this.n && this.expression[this.index] === '|') {
            this.index++;
            const [termValue, termCost] = this.parseTerm();
            if (value === 0 && termValue === 0) {
                cost = Math.min(cost, termCost) + 1;
            } else if (value === 0 && termValue === 1) {
                value = 1;
                cost = Math.min(cost + 1, termCost);
            } else if (value === 1 && termValue === 0) {
                cost = Math.min(cost, termCost + 1);
            } else {
                cost = Math.min(cost, termCost) + 1;
            }
        }
        return [value, cost];
    }

    private parseTerm(): [number, number] {
        let [value, cost] = this.parseFactor();
        while (this.index < this.n && this.expression[this.index] === '&') {
            this.index++;
            const [factorValue, factorCost] = this.parseFactor();
            if (value === 0 && factorValue === 0) {
                cost = Math.min(cost, factorCost) + 1;
            } else if (value === 0 && factorValue === 1) {
                cost = Math.min(cost + 1, factorCost);
            } else if (value === 1 && factorValue === 0) {
                value = 0;
                cost = Math.min(cost, factorCost + 1);
            } else {
                cost = Math.min(cost, factorCost) + 1;
            }
        }
        return [value, cost];
    }

    private parseFactor(): [number, number] {
        if (this.expression[this.index] === '(') {
            this.index++;
            const [value, cost] = this.parseExpression();
            this.index++;
            return [value, cost];
        } else {
            const value = Number(this.expression[this.index++]);
            return [value, 1 - value];
        }
    }
}

/*
question: You are given a valid boolean expression as a string expression consisting of the characters '1','0','&' (bitwise AND operator),'|' (bitwise OR operator),'(', and ')'.


	For example, "()1|1" and "(1)&()" are not valid while "1", "(((1))|(0))", and "1|(0&(1))" are valid expressions.


Return the minimum cost to change the final value of the expression.


	For example, if expression = "1|1|(0&0)&1", its value is 1|1|(0&0)&1 = 1|1|0&1 = 1|0&1 = 1&1 = 1. We want to apply operations so that the new expression evaluates to 0.


The cost of changing the final value of an expression is the number of operations performed on the expression. The types of operations are described as follows:


	Turn a '1' into a '0'.
	Turn a '0' into a '1'.
	Turn a '&' into a '|'.
	Turn a '|' into a '&'.


Note: '&' does not take precedence over '|' in the order of calculation. Evaluate parentheses first, then in left-to-right order.

 
Example 1:

Input: expression = "1&(0|1)"
Output: 1
Explanation: We can turn "1&(0|1)" into "1&(0&1)" by changing the '|' to a '&' using 1 operation.
The new expression evaluates to 0. 


Example 2:

Input: expression = "(0&0)&(0&0&0)"
Output: 3
Explanation: We can turn "(0&0)&(0&0&0)" into "(0|1)|(0&0&0)" using 3 operations.
The new expression evaluates to 1.


Example 3:

Input: expression = "(0|(1|0&1))"
Output: 1
Explanation: We can turn "(0|(1|0&1))" into "(0|(0|0&1))" using 1 operation.
The new expression evaluates to 0.

 
Constraints:


	1 <= expression.length <= 105
	expression only contains '1','0','&','|','(', and ')'
	All parentheses are properly matched.
	There will be no empty parentheses (i.e: "()" is not a substring of expression).

 */
