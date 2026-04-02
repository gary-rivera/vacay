function minStickers(stickers: string[], target: string): number {
    const m = stickers.length;
    const dp = new Array(1 << target.length).fill(-1);
    dp[0] = 0;
    const targetMask = new Array(target.length);
    const stickerCount = new Array(m).fill(0).map(() => new Array(target.length).fill(0));
    
    for (let i = 0; i < target.length; ++i) {
        targetMask[i] = 1 << i;
    }
    
    for (let i = 0; i < m; ++i) {
        for (let c of stickers[i]) {
            const pos = target.indexOf(c);
            if (pos >= 0) ++stickerCount[i][pos];
        }
        
        for (let mask = 0; mask < (1 << target.length); ++mask) {
            if (dp[mask] == -1) continue;
            let subset = mask;
            while (subset > 0) {
                let next = mask;
                for (let k = 0; k < target.length; ++k) {
                    if ((subset & targetMask[k]) > 0) {
                        for (let j = 0; j < stickerCount[i][k]; ++j) {
                            if ((next & targetMask[k]) > 0) {
                                next ^= targetMask[k];
                            } else {
                                break;
                            }
                        }
                    }
                }
                dp[next] = dp[next] > -1 ? Math.min(dp[next], dp[mask] + 1) : dp[mask] + 1;
                subset = (subset - 1) & mask;
            }
        }
    }
    
    return dp[(1 << target.length) - 1];
}

/*
question: We are given n different types of stickers. Each sticker has a lowercase English word on it.

You would like to spell out the given string target by cutting individual letters from your collection of stickers and rearranging them. You can use each sticker more than once if you want, and you have infinite quantities of each sticker.

Return the minimum number of stickers that you need to spell out target. If the task is impossible, return -1.

Note: In all test cases, all words were chosen randomly from the 1000 most common US English words, and target was chosen as a concatenation of two random words.

 
Example 1:

Input: stickers = ["with","example","science"], target = "thehat"
Output: 3
Explanation:
We can use 2 "with" stickers, and 1 "example" sticker.
After cutting and rearrange the letters of those stickers, we can form the target "thehat".
Also, this is the minimum number of stickers necessary to form the target string.


Example 2:

Input: stickers = ["notice","possible"], target = "basicbasic"
Output: -1
Explanation:
We cannot form the target "basicbasic" from cutting letters from the given stickers.


 
Constraints:


	n == stickers.length
	1 <= n <= 50
	1 <= stickers[i].length <= 10
	1 <= target.length <= 15
	stickers[i] and target consist of lowercase English letters.

 */
