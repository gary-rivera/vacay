function maxScore(receiver: number[], k: number): number {
    let n = receiver.length;
    let score = Array(n).fill(0);
    let next = Array(n).fill(0);
    let cycle = Array(n).fill(0);
    let visited = Array(n).fill(false);

    for (let i = 0; i < n; i++) {
        let j = i;
        let path = [j];

        while (!visited[j]) {
            visited[j] = true;
            j = receiver[j];
            path.push(j);
        }

        let cycleLen = path.length - path.indexOf(j);
        let cycleScore = path.slice(-cycleLen).reduce((a, b) => a + b, 0);

        for (let p = path.length - 1; p >= 0; p--) {
            if (path.length - 1 - p < cycleLen) {
                cycle[path[p]] = cycleLen;
                score[path[p]] = cycleScore;
            }
            next[path[p]] = path[p - 1] || path[path.length - 1];
        }
    }

    let maxScore = 0;

    for (let i = 0; i < n; i++) {
        let j = i;
        let currentScore = 0;

        for (let pass = 0; pass < k; pass++) {
            if (pass >= cycle[j]) {
                let remainingPasses = k - pass;
                let cycles = Math.floor(remainingPasses / cycle[j]);
                currentScore += cycles * score[j];
                pass += cycles * cycle[j] - 1;
            } else {
                currentScore += j;
            }
            j = next[j];
        }

        maxScore = Math.max(maxScore, currentScore);
    }

    return maxScore;
}

/*
question: You are given an integer array receiver of length n and an integer k. n players are playing a ball-passing game.

You choose the starting player, i. The game proceeds as follows: player i passes the ball to player receiver[i], who then passes it to receiver[receiver[i]], and so on, for k passes in total. The game's score is the sum of the indices of the players who touched the ball, including repetitions, i.e. i + receiver[i] + receiver[receiver[i]] + ... + receiver(k)[i].

Return the maximum possible score.

Notes:


	receiver may contain duplicates.
	receiver[i] may be equal to i.


 
Example 1:


Input: receiver = [2,0,1], k = 4

Output: 6

Explanation:

Starting with player i = 2 the initial score is 2:


	
		
			Pass
			Sender Index
			Receiver Index
			Score
		
		
			1
			2
			1
			3
		
		
			2
			1
			0
			3
		
		
			3
			0
			2
			5
		
		
			4
			2
			1
			6
		
	



Example 2:


Input: receiver = [1,1,1,2,3], k = 3

Output: 10

Explanation:

Starting with player i = 4 the initial score is 4:


	
		
			Pass
			Sender Index
			Receiver Index
			Score
		
		
			1
			4
			3
			7
		
		
			2
			3
			2
			9
		
		
			3
			2
			1
			10
		
	



 
Constraints:


	1 <= receiver.length == n <= 105
	0 <= receiver[i] <= n - 1
	1 <= k <= 1010

 */
