const CHARS_PER_WORD = 6;

const CLASSES = {
	TYPED: "typed",
	MISTYPED: "mistyped",
};

const charToHtml = {
	" ": "&#xA0;",
};

let typed = "";
let toType = randomAyah();
let startedAt = Date.now();
let statsInterval;

const typingHistoryEl = document.querySelector("div#sidebar div#typing-history");
const typingAreaEl = document.querySelector("div#typing-area");
const typingFieldEl = document.querySelector("textarea#typing-field");
const wpmEl = document.querySelector("div#display-stats #wpm h1");
const timerEl = document.querySelector("div#display-stats #timer h1");
const changeAyahBtn = document.querySelector("div#actions button#change-ayah");

typingFieldEl.addEventListener("input", function () {
	typed = this.value;
	render();
});

changeAyahBtn.addEventListener("click", function () {
	typed = "";
	toType = randomAyah();
	startedAt = Date.now();
	typingFieldEl.value = "";
	render();
});

function random(max = 113, min = 0) {
	return Math.round(Math.random() * (max - min)) + min;
}

function randomAyah() {
	const surah = quran[random()];
	const ayah = surah?.ayahs?.[random(surah?.ayahs?.length || 0)];
	return ayah?.text || randomAyah();
}

function getStats(typed, startedAt, finishedAt = Date.now()) {
	let seconds = (finishedAt - startedAt) / 1000;
	const estimatedWords = typed.length / CHARS_PER_WORD;
	let wpm = estimatedWords / (seconds / 60);
	const words = typed.split(" ").length;

	seconds = Math.round(seconds);
	wpm = Math.round(wpm);

	if (isNaN(seconds) || seconds === Infinity) seconds = 0;
	if (isNaN(wpm) || wpm === Infinity) wpm = 0;

	return {
		seconds: Math.round(seconds) || 0,
		wpm: Math.round(wpm) || 0,
		words: words || 0,
	};
}

function displayingStats() {
	const { seconds, wpm } = getStats(typed, startedAt, Date.now());

	timerEl.innerHTML = seconds;
	wpmEl.innerHTML = wpm;
}

function startDisplayingStats() {
	if (!statsInterval) {
		statsInterval = setInterval(() => {
			if (!typed.length) startedAt = Date.now();
			displayingStats();
		}, 500);
	}
}

function stopDisplayingStats() {
	clearInterval(statsInterval);
	statsInterval = undefined;
}

function startTyping() {
	startedAt = Date.now();
	startDisplayingStats();
}

function completeTyping() {
	addToTypingHistory({
		typed,
		toType,
		startedAt,
		finishedAt: Date.now(),
	});

	typed = "";
	toType = randomAyah();
	startedAt = Date.now();
	typingFieldEl.value = "";

	stopDisplayingStats();
	render();
}

function renderTypingHistory() {
	typingHistoryEl.innerHTML = "";

	typingHistory.forEach(({ typed, toType, startedAt, finishedAt }, i) => {
		const total = typingHistory.length;
		if (total > 1 && total - 1 === i) return;

		const { wpm, seconds, words } = getStats(typed, startedAt, finishedAt);
		const div = document.createElement("div");
		div.innerHTML = `
			<h3> ${toType} </h3>
			<div>
				<span>${words} words</span>
				<span>${wpm} WPM</span>
				<span>${seconds}s</span>
			</div>
			<div style="justify-content: end;">
				<small>${new Date(startedAt).toLocaleString()}</small>
			</div>
		`;
		typingHistoryEl.appendChild(div);
	});
}

function render() {
	typingAreaEl.innerHTML = "";
	const wordSpans = [document.createElement("span")];

	for (let i = 0; i < toType.length; i++) {
		const char = toType[i];
		const charSpan = document.createElement("span");

		if (typed[i] === char) charSpan.classList.add(CLASSES.TYPED);
		else if (typeof typed[i] === "string") charSpan.classList.add(CLASSES.MISTYPED);

		charSpan.innerHTML = charToHtml[char] || char;
		wordSpans[wordSpans.length - 1].appendChild(charSpan);

		if (char.match(/\s/g)) wordSpans.push(document.createElement("span"));
	}

	wordSpans.forEach((wordSpan) => typingAreaEl.appendChild(wordSpan));

	if (typed && typed === toType) completeTyping();
	if (typed.length === 1) startTyping();
	typingFieldEl.focus();
	renderTypingHistory();
}

render();
