const historyObj = {
	typed: "This is a test history. It will be cleared once there are other histories.",
	toType: "This is a test history. It will be cleared once there are other histories.",
	startedAt: Date.now(),
	finishedAt: Date.now(),
};

let typingHistory = [historyObj];

const TYPING_HISTORY = "TYPING_HISTORY";

try {
	typingHistory = JSON.parse(localStorage.getItem(TYPING_HISTORY) || "[]") || [];
} finally {
	if (!typingHistory.length) typingHistory.push(historyObj);
}

function addToTypingHistory(data) {
	typingHistory.unshift(data);
	localStorage.setItem(TYPING_HISTORY, JSON.stringify(typingHistory));
}
