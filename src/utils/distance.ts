export function dateDistance(start: number, end: number) {
	const ms = end - start;
	const seconds = Math.round(ms / 1000);

	return { ms, seconds };
}
