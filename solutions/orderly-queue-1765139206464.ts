function smallestString(s: string, k: number): string {
    let arr = s.split('');
    for(let i = 0; i < s.length; i++) {
        let index = i;
        for(let j = i + 1; j < Math.min(i + k, s.length); j++) {
            if(arr[j] < arr[index]) {
                index = j;
            }
        }
        let temp = arr[index];
        for(let j = index; j > i; j--) {
            arr[j] = arr[j - 1];
        }
        arr[i] = temp;
    }
    return arr.join('');
}

/*
question: You are given a string s and an integer k. You can choose one of the first k letters of s and append it at the end of the string.

Return the lexicographically smallest string you could have after applying the mentioned step any number of moves.

 
Example 1:

Input: s = "cba", k = 1
Output: "acb"
Explanation: 
In the first move, we move the 1st character 'c' to the end, obtaining the string "bac".
In the second move, we move the 1st character 'b' to the end, obtaining the final result "acb".


Example 2:

Input: s = "baaca", k = 3
Output: "aaabc"
Explanation: 
In the first move, we move the 1st character 'b' to the end, obtaining the string "aacab".
In the second move, we move the 3rd character 'c' to the end, obtaining the final result "aaabc".


 
Constraints:


	1 <= k <= s.length <= 1000
	s consist of lowercase English letters.

 */
