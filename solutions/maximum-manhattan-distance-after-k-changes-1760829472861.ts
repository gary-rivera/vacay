function maxManhattanDistance(s: string, k: number): number {
    let count = { 'N': 0, 'S': 0, 'E': 0, 'W': 0 };

    for (let i = 0; i < s.length; i++) {
        count[s[i]]++;
    }

    if (count['N'] < count['S']) {
        let diff = Math.min(count['S'] - count['N'], k);
        count['S'] -= diff;
        k -= diff;
    } else {
        let diff = Math.min(count['N'] - count['S'], k);
        count['N'] -= diff;
        k -= diff;
    }

    if (count['E'] < count['W']) {
        let diff = Math.min(count['W'] - count['E'], k);
        count['W'] -= diff;
        k -= diff;
    } else {
        let diff = Math.min(count['E'] - count['W'], k);
        count['E'] -= diff;
        k -= diff;
    }

    return count['N'] + count['S'] + Math.min(k, Math.abs(count['N'] - count['S']));
}

/*
question: You are given a string s consisting of the characters 'N', 'S', 'E', and 'W', where s[i] indicates movements in an infinite grid:


	'N' : Move north by 1 unit.
	'S' : Move south by 1 unit.
	'E' : Move east by 1 unit.
	'W' : Move west by 1 unit.


Initially, you are at the origin (0, 0). You can change at most k characters to any of the four directions.

Find the maximum Manhattan distance from the origin that can be achieved at any time while performing the movements in order.
The Manhattan Distance between two cells (xi, yi) and (xj, yj) is |xi - xj| + |yi - yj|.
 
Example 1:


Input: s = "NWSE", k = 1

Output: 3

Explanation:

Change s[2] from 'S' to 'N'. The string s becomes "NWNE".


	
		
			Movement
			Position (x, y)
			Manhattan Distance
			Maximum
		
	
	
		
			s[0] == 'N'
			(0, 1)
			0 + 1 = 1
			1
		
		
			s[1] == 'W'
			(-1, 1)
			1 + 1 = 2
			2
		
		
			s[2] == 'N'
			(-1, 2)
			1 + 2 = 3
			3
		
		
			s[3] == 'E'
			(0, 2)
			0 + 2 = 2
			3
		
	


The maximum Manhattan distance from the origin that can be achieved is 3. Hence, 3 is the output.


Example 2:


Input: s = "NSWWEW", k = 3

Output: 6

Explanation:

Change s[1] from 'S' to 'N', and s[4] from 'E' to 'W'. The string s becomes "NNWWWW".

The maximum Manhattan distance from the origin that can be achieved is 6. Hence, 6 is the output.


 
Constraints:


	1 <= s.length <= 105
	0 <= k <= s.length
	s consists of only 'N', 'S', 'E', and 'W'.

 */
