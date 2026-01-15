type Language = number;
type User = number;
type Friendship = [User, User];

function minimumTeach(n: number, languages: Language[][], friendships: Friendship[]): number {
    const userLanguages = new Map<User, Set<Language>>();
    const needToLearn = new Set<User>();
    const languageCount = new Array(n + 1).fill(0);

    for (let i = 0; i < languages.length; i++) {
        userLanguages.set(i + 1, new Set(languages[i]));
    }

    for (const [u, v] of friendships) {
        if (!intersect(userLanguages.get(u)!, userLanguages.get(v)!)) {
            needToLearn.add(u);
            needToLearn.add(v);
        }
    }

    for (const user of needToLearn) {
        for (const language of userLanguages.get(user)!) {
            languageCount[language]++;
        }
    }

    let maxLanguage = 0;
    for (const count of languageCount) {
        maxLanguage = Math.max(maxLanguage, count);
    }

    return needToLearn.size - maxLanguage;
}

function intersect(set1: Set<Language>, set2: Set<Language>): boolean {
    for (const item of set1) {
        if (set2.has(item)) {
            return true;
        }
    }
    return false;
}

/*
question: On a social network consisting of m users and some friendships between users, two users can communicate with each other if they know a common language.

You are given an integer n, an array languages, and an array friendships where:


	There are n languages numbered 1 through n,
	languages[i] is the set of languages the i​​​​​​th​​​​ user knows, and
	friendships[i] = [u​​​​​​i​​​, v​​​​​​i] denotes a friendship between the users u​​​​​​​​​​​i​​​​​ and vi.


You can choose one language and teach it to some users so that all friends can communicate with each other. Return the minimum number of users you need to teach.
Note that friendships are not transitive, meaning if x is a friend of y and y is a friend of z, this doesn't guarantee that x is a friend of z.
 
Example 1:

Input: n = 2, languages = [[1],[2],[1,2]], friendships = [[1,2],[1,3],[2,3]]
Output: 1
Explanation: You can either teach user 1 the second language or user 2 the first language.


Example 2:

Input: n = 3, languages = [[2],[1,3],[1,2],[3]], friendships = [[1,4],[1,2],[3,4],[2,3]]
Output: 2
Explanation: Teach the third language to users 1 and 3, yielding two users to teach.


 
Constraints:


	2 <= n <= 500
	languages.length == m
	1 <= m <= 500
	1 <= languages[i].length <= n
	1 <= languages[i][j] <= n
	1 <= u​​​​​​i < v​​​​​​i <= languages.length
	1 <= friendships.length <= 500
	All tuples (u​​​​​i, v​​​​​​i) are unique
	languages[i] contains only unique values

 */
