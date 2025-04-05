import { useEffect, useState } from "react";

const TYPING_HISTORY = "TYPING_HISTORY";

type HistoryObj = {
	readonly id?: number;
	typed: string;
	toType: string;
	startedAt: number;
	finishedAt: number;
};

export function generateId() {
	return Date.now();
}

const historyObj: HistoryObj = {
	id: -1,
	typed: "The quick brown fox jumps over the lazy dog.",
	toType: "The quick brown fox jumps over the lazy dog.",
	startedAt: Date.now(),
	finishedAt: Date.now(),
};

const ls = {
	typingHistory: [] as HistoryObj[],
	getTypingHistory() {
		try {
			this.typingHistory = JSON.parse(localStorage.getItem(TYPING_HISTORY) || "[]") || [];
		} catch {}

		return this.typingHistory;
	},
	saveTypingHistory(typingHistory: Array<typeof historyObj>) {
		this.typingHistory = typingHistory;
		localStorage.setItem(TYPING_HISTORY, JSON.stringify(this.typingHistory));
	},
};

export default function useTypingHistory() {
	let [typingHistory, setTypingHistory] = useState([historyObj]);

	function addToTypingHistory(data: typeof historyObj) {
		const newTypingHistory = [{ id: generateId(), ...data }, ...typingHistory];
		setTypingHistory(newTypingHistory);
		ls.saveTypingHistory(newTypingHistory);
	}

	useEffect(() => {
		setTypingHistory(ls.getTypingHistory());
	}, []);

	return {
		typingHistory: typingHistory.length ? typingHistory : [historyObj],
		addToTypingHistory,
	};
}
