const CLASSES = {
	TYPED: "typed",
	MISTYPED: "mistyped",
};
const charMap = {
	Enter: "\n",
	Space: " ",
};

let typed = "";
const typingArea = document.querySelector("div#typing-area");
const typingField = document.querySelector("textarea#typing-field");

typingField.addEventListener("input", function (e) {
	typed = e.target.value;
	checkTypedInput();
});

function checkTypedInput() {
	let i = 0;
	for (const wordEl of [...typingArea.children]) {
		for (const charEl of [...wordEl.children]) {
			let char = charEl.textContent;
			if (char.match(/\s/g)) char = " ";

			charEl.classList.remove(CLASSES.MISTYPED);
			charEl.classList.remove(CLASSES.TYPED);

			if (i >= typed.length) continue;
			else if (typed[i++] === char) charEl.classList.add(CLASSES.TYPED);
			else charEl.classList.add(CLASSES.MISTYPED);
		}
	}

	// const correctlyTyped = [...typingArea.children].reduce((sum, word) => {
	// 	return sum + [...word.children].filter((charEl) => charEl.classList.contains(CLASSES.TYPED)).length;
	// }, 0);

	// if (correctlyTyped && correctlyTyped === typed.length) {
	// 	console.log(correctlyTyped, typed.length)
	// 	renderRandomAyah();
	// }
}

function randomAyah() {
	const surahIndex = Math.round(Math.random() * (quran.length - 1));
	const surah = quran[surahIndex];

	if (surah) {
		const ayahIndex = Math.round(Math.random() * (surah.ayahs?.length - 1));
		const ayah = surah.ayahs[ayahIndex];

		if (ayah) return ayah.text;
	}

	return "";
}

function renderRandomAyah() {
	const content = randomAyah();
	const words = content.split(" ");

	typingArea.innerHTML = words
		.map((word, i) => {
			const chars = word
				.split("")
				.map((char) => `<span>${char}</span>`)
				.join("");

			return `
			<span>
				${chars + (words[i + 1] ? "<span>&#xA0;</span>" : "")}
			</span>
		`;
		})
		.join("");

	typingField.value = "";
	typingField.focus();
}

renderRandomAyah();
