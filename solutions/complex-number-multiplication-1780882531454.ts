class ComplexNumber {
    real: number;
    imaginary: number;

    constructor(real: number, imaginary: number) {
        this.real = real;
        this.imaginary = imaginary;
    }

    static parse(complexString: string): ComplexNumber {
        const parts = complexString.split('+');
        const real = parseInt(parts[0]);
        const imaginary = parseInt(parts[1].replace('i', ''));
        return new ComplexNumber(real, imaginary);
    }

    multiply(other: ComplexNumber): ComplexNumber {
        const real = this.real * other.real - this.imaginary * other.imaginary;
        const imaginary = this.real * other.imaginary + this.imaginary * other.real;
        return new ComplexNumber(real, imaginary);
    }

    toString(): string {
        return `${this.real}+${this.imaginary}i`;
    }
}

function multiplyComplexNumbers(num1: string, num2: string): string {
    const complex1 = ComplexNumber.parse(num1);
    const complex2 = ComplexNumber.parse(num2);
    const result = complex1.multiply(complex2);
    return result.toString();
}

/*
question: A complex number can be represented as a string on the form "real+imaginaryi" where:


	real is the real part and is an integer in the range [-100, 100].
	imaginary is the imaginary part and is an integer in the range [-100, 100].
	i2 == -1.


Given two complex numbers num1 and num2 as strings, return a string of the complex number that represents their multiplications.

 
Example 1:

Input: num1 = "1+1i", num2 = "1+1i"
Output: "0+2i"
Explanation: (1 + i) * (1 + i) = 1 + i2 + 2 * i = 2i, and you need convert it to the form of 0+2i.


Example 2:

Input: num1 = "1+-1i", num2 = "1+-1i"
Output: "0+-2i"
Explanation: (1 - i) * (1 - i) = 1 + i2 - 2 * i = -2i, and you need convert it to the form of 0+-2i.


 
Constraints:


	num1 and num2 are valid complex numbers.

 */
