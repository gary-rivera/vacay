import * as fs from 'fs';
import * as readline from 'readline';

// Solution 1: Using readline module
let rl = readline.createInterface({
    input: fs.createReadStream('file.txt'),
    output: process.stdout,
    terminal: false
});

let lineCount = 0;
rl.on('line', function (line) {
    lineCount++;
    if (lineCount === 10) {
        console.log(line);
        rl.close();
    }
});

// Solution 2: Using fs module
fs.readFile('file.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let lines = data.split('\n');
    if(lines.length >= 10) {
        console.log(lines[9]);
    } else {
        console.log('File has less than 10 lines');
    }
});

// Solution 3: Using fs and stream
let stream = fs.createReadStream('file.txt');
let lines = 0;
stream.on('data', function(chunk) {
    let index = -1;
    do {
        index = chunk.indexOf('\n', index+1);
        if(index !== -1) lines++;
    } while(index !== -1);
    if(lines >= 10) {
        stream.destroy();
        console.log('Line 10');
    }
});
stream.on('end', function() {
    if(lines < 10) {
        console.log('File has less than 10 lines');
    }
});

/*
question: Given a text file file.txt, print just the 10th line of the file.

Example:

Assume that file.txt has the following content:

Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10


Your script should output the tenth line, which is:

Line 10


Note:
1. If the file contains less than 10 lines, what should you output?
2. There's at least three different solutions. Try to explore all possibilities.
 */
