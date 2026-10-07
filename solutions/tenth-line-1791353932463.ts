Solution 1: Using Node.js built-in 'fs' module

```typescript
import fs from 'fs';

fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const lines = data.split('\n');
    if (lines.length >= 10) {
        console.log(lines[9]);
    } else {
        console.log('The file contains less than 10 lines.');
    }
});
```

Solution 2: Using 'readline' module

```typescript
import readline from 'readline';
import fs from 'fs';

let lineNum = 0;
const rl = readline.createInterface({
    input: fs.createReadStream('file.txt'),
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    lineNum++;
    if (lineNum === 10) {
        console.log(line);
        rl.close();
    }
});

rl.on('close', () => {
    if (lineNum < 10) {
        console.log('The file contains less than 10 lines.');
    }
});
```

Solution 3: Using 'readline-sync' module for synchronous read

```typescript
import readlineSync from 'readline-sync';
import fs from 'fs';

const data = fs.readFileSync('file.txt', 'utf8');
const lines = data.split('\n');
if (lines.length >= 10) {
    console.log(lines[9]);
} else {
    console.log('The file contains less than 10 lines.');
}
```

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
