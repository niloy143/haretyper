import { dateDistance } from "./distance";
import { CHARS_PER_WORD } from "./enum";

export interface TypingInfo {
	startedAt: number;
	finishedAt: number;
	typed: string;
	toType: string;
}

export default function getStats({ startedAt, finishedAt, typed }: TypingInfo) {
	const words = typed.split(/\s/).length;
	let seconds: number;
	let estimatedWords: number;
	let wpm: number;

	seconds = dateDistance(startedAt, finishedAt).seconds;
	estimatedWords = Math.round(typed.length / CHARS_PER_WORD);
	wpm = Math.round(estimatedWords / (seconds / 60));

	if (isNaN(seconds) || seconds <= 0 || seconds >= Infinity) seconds = 0;
	if (isNaN(estimatedWords) || estimatedWords <= 0 || estimatedWords >= Infinity) estimatedWords = 0;
	if (isNaN(wpm) || wpm <= 0 || wpm >= Infinity) wpm = 0;

	return {
		seconds,
		wpm,
		words,
	};
}
