import { useEffect, useRef, useState } from "react";
import getStats, { TypingInfo } from "../utils/get-stats";

let globalTypingInfo: TypingInfo = {
	typed: "",
	toType: "",
	finishedAt: Date.now(),
	startedAt: Date.now(),
};

export function useStats(typingInfo: TypingInfo) {
	globalTypingInfo = typingInfo;

	const [stats, setStats] = useState(getStats(globalTypingInfo));
	let intervalId = useRef<number | null>(null);

	const startInterval = () => {
		if (intervalId.current) return;

		intervalId.current = setInterval(() => {
			setStats(getStats(globalTypingInfo));
		}, 50);
	};

	const stopInterval = () => {
		if (intervalId.current) {
			clearInterval(intervalId.current);
			intervalId.current = null;
		}
	};

	useEffect(() => {
		if (typingInfo.typed.length) startInterval();
		else stopInterval();
	}, [typingInfo]);

	return stats;
}
