const MOD = 1e9 + 7;

function countSequences(s: string): number {
    let dp: number[][][] = new Array(1001).fill(0).map(() => new Array(2).fill(0).map(() => new Array(3).fill(0)));
    let cnt: number[] = new Array(3).fill(0);
    let n = s.length;
    dp[0][0][0] = 1;
    for (let i = 0; i < n; i++) {
        if (s[i] == 'F') cnt[0]++;
        else if (s[i] == 'W') cnt[1]++;
        else cnt[2]++;
        for (let j = 0; j <= i + 1; j++) {
            for (let k = 0; k < 3; k++) {
                if (k != 0) dp[i + 1][j][0] = (dp[i + 1][j][0] + dp[i][j][k]) % MOD;
                if (k != 1) dp[i + 1][j + (s[i] == 'F' ? 1 : 0)][1] = (dp[i + 1][j + (s[i] == 'F' ? 1 : 0)][1] + dp[i][j][k]) % MOD;
                if (k != 2) dp[i + 1][j + (s[i] == 'W' ? 1 : 0)][2] = (dp[i + 1][j + (s[i] == 'W' ? 1 : 0)][2] + dp[i][j][k]) % MOD;
            }
        }
    }
    let ans = 0;
    for (let i = cnt[0] + 1; i <= n; i++) {
        for (let j = 0; j < 3; j++) {
            ans = (ans + dp[n][i][j]) % MOD;
        }
    }
    for (let i = cnt[1] + 1; i <= n; i++) {
        for (let j = 0; j < 3; j++) {
            if (j == 1) continue;
            ans = (ans + dp[n][i][j]) % MOD;
        }
    }
    for (let i = cnt[2] + 1; i <= n; i++) {
        for (let j = 0; j < 3; j++) {
            if (j == 2) continue;
            ans = (ans + dp[n][i][j]) % MOD;
        }
    }
    return ans;
}

/*
question: Alice and Bob are playing a fantasy battle game consisting of n rounds where they summon one of three magical creatures each round: a Fire Dragon, a Water Serpent, or an Earth Golem. In each round, players simultaneously summon their creature and are awarded points as follows:


	If one player summons a Fire Dragon and the other summons an Earth Golem, the player who summoned the Fire Dragon is awarded a point.
	If one player summons a Water Serpent and the other summons a Fire Dragon, the player who summoned the Water Serpent is awarded a point.
	If one player summons an Earth Golem and the other summons a Water Serpent, the player who summoned the Earth Golem is awarded a point.
	If both players summon the same creature, no player is awarded a point.


You are given a string s consisting of n characters 'F', 'W', and 'E', representing the sequence of creatures Alice will summon in each round:


	If s[i] == 'F', Alice summons a Fire Dragon.
	If s[i] == 'W', Alice summons a Water Serpent.
	If s[i] == 'E', Alice summons an Earth Golem.


Bob’s sequence of moves is unknown, but it is guaranteed that Bob will never summon the same creature in two consecutive rounds. Bob beats Alice if the total number of points awarded to Bob after n rounds is strictly greater than the points awarded to Alice.

Return the number of distinct sequences Bob can use to beat Alice.

Since the answer may be very large, return it modulo 109 + 7.

 
Example 1:


Input: s = "FFF"

Output: 3

Explanation:

Bob can beat Alice by making one of the following sequences of moves: "WFW", "FWF", or "WEW". Note that other winning sequences like "WWE" or "EWW" are invalid since Bob cannot make the same move twice in a row.


Example 2:


Input: s = "FWEFW"

Output: 18

Explanation:

Bob can beat Alice by making one of the following sequences of moves: "FWFWF", "FWFWE", "FWEFE", "FWEWE", "FEFWF", "FEFWE", "FEFEW", "FEWFE", "WFEFE", "WFEWE", "WEFWF", "WEFWE", "WEFEF", "WEFEW", "WEWFW", "WEWFE", "EWFWE", or "EWEWE".


 
Constraints:


	1 <= s.length <= 1000
	s[i] is one of 'F', 'W', or 'E'.

 */
