import * as fs from 'fs';

function transposeFileContent(filePath: string): void {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    const matrix: string[][] = lines.map(line => line.split(' '));
    const transposedMatrix: string[][] = matrix[0].map((_, i) => matrix.map(row => row[i]));
    const transposedData: string = transposedMatrix.map(row => row.join(' ')).join('\n');
    fs.writeFileSync(filePath, transposedData);
}

transposeFileContent('file.txt');

/*
question: Given a text file file.txt, transpose its content.

You may assume that each row has the same number of columns, and each field is separated by the ' ' character.

Example:

If file.txt has the following content:

name age
alice 21
ryan 30


Output the following:

name alice ryan
age 21 30

 */
