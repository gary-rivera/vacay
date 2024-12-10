function fib(n: number): number {
	if (n < 2) return n;
	let prev = 0;
	let curr = 1;
	for (let i = 2; i <= n; i++) {
		const next = prev + curr;
		prev = curr;
		curr = next;
	}
	return curr;
}

export default fib;
