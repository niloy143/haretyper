export function timerString(value: number) {
	let string = `${value}`;

	if (string.length < 2) string = "0" + string;

	return string;
}
