function movesToStamp(stamp: string, target: string): number[] {
    const stampLength = stamp.length;
    const targetLength = target.length;
    const result: number[] = [];
    const visited = new Array(targetLength).fill(false);
    const total = new Array(targetLength).fill(0);
    const queue: number[] = [];

    for (let i = 0; i <= targetLength - stampLength; i++) {
        let matched = 0;

        for (let j = 0; j < stampLength; j++) {
            if (target[i + j] === stamp[j]) matched++;
            else if (total[i + j] !== -1) total[i + j] = i;
        }

        if (matched === stampLength) {
            result.push(i);
            for (let j = 0; j < stampLength; j++) {
                if (!visited[i + j]) {
                    queue.push(i + j);
                    visited[i + j] = true;
                }
            }
        }
    }

    while (queue.length) {
        const i = queue.shift() as number;

        for (let start = Math.max(0, i - stampLength + 1); start <= Math.min(i, targetLength - stampLength); start++) {
            if (total[i] === start && !visited[start]) {
                let matched = 0;

                for (let j = 0; j < stampLength; j++) {
                    if (target[start + j] === stamp[j]) matched++;
                }

                if (matched * 2 >= stampLength) {
                    result.push(start);
                    for (let j = start; j < start + stampLength; j++) {
                        if (!visited[j]) {
                            queue.push(j);
                            visited[j] = true;
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < targetLength; i++) {
        if (!visited[i]) return [];
    }

    return result.reverse();
}

/*
question: You are given two strings stamp and target. Initially, there is a string s of length target.length with all s[i] == '?'.

In one turn, you can place stamp over s and replace every letter in the s with the corresponding letter from stamp.


	For example, if stamp = "abc" and target = "abcba", then s is "?????" initially. In one turn you can:

	
		place stamp at index 0 of s to obtain "abc??",
		place stamp at index 1 of s to obtain "?abc?", or
		place stamp at index 2 of s to obtain "??abc".
	
	Note that stamp must be fully contained in the boundaries of s in order to stamp (i.e., you cannot place stamp at index 3 of s).


We want to convert s to target using at most 10 * target.length turns.

Return an array of the index of the left-most letter being stamped at each turn. If we cannot obtain target from s within 10 * target.length turns, return an empty array.

 
Example 1:

Input: stamp = "abc", target = "ababc"
Output: [0,2]
Explanation: Initially s = "?????".
- Place stamp at index 0 to get "abc??".
- Place stamp at index 2 to get "ababc".
[1,0,2] would also be accepted as an answer, as well as some other answers.


Example 2:

Input: stamp = "abca", target = "aabcaca"
Output: [3,0,1]
Explanation: Initially s = "???????".
- Place stamp at index 3 to get "???abca".
- Place stamp at index 0 to get "abcabca".
- Place stamp at index 1 to get "aabcaca".


 
Constraints:


	1 <= stamp.length <= target.length <= 1000
	stamp and target consist of lowercase English letters.

 */
