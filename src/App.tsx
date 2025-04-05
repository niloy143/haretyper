import { useState } from "react";

import "./scss/style.scss";
import keyboardHandPositionImg from "./assets/images/keyboard-hand-position.png";
import { randomAyah } from "./utils/random";
import DisplayTyping from "./components/display-typing";
import { useStats } from "./hooks/use-stats";
import { timerString } from "./utils/timer-string";
import useTypingHistory from "./hooks/use-typing-history";
import getStats from "./utils/get-stats";

export default function App() {
	const [ayah, setAyah] = useState(randomAyah());
	const [typed, setTyped] = useState("");
	const [startedAt, setStartedAt] = useState(Date.now());
	const { seconds, wpm } = useStats({ startedAt, finishedAt: Date.now(), typed, toType: ayah });
	const { typingHistory, addToTypingHistory } = useTypingHistory();

	const changeAyah = () => {
		setTyped("");
		setStartedAt(Date.now());
		setAyah(randomAyah());
	};

	const onTypingCompleted = () => {
		addToTypingHistory({ typed, toType: ayah, startedAt, finishedAt: Date.now() });
		changeAyah();
	};

	const onType = (text: string) => {
		if (text.length <= ayah.length) {
			setTyped(text);
			if (text.length <= 1) setStartedAt(Date.now());
			if (text === ayah) onTypingCompleted();
		}
	};

	return (
		<div id="main-container">
			<div id="sidebar">
				<div id="typing-history">
					{typingHistory.map(({ id, startedAt, finishedAt, toType, typed }) => {
						const { wpm, seconds, words } = getStats({ startedAt, finishedAt, typed, toType });

						return (
							<div key={id}>
								<h3> {toType} </h3>
								<div>
									<span>{words} words</span>
									<span>{wpm} WPM</span>
									<span>{seconds}s</span>
								</div>
								<div style={{ justifyContent: "end" }}>
									<small>{new Date(startedAt).toLocaleString()}</small>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<div id="typing-container">
				<div id="actions">
					<button className="btn" id="change-ayah" onClick={changeAyah}>
						Change Ayah
					</button>
				</div>
				<div id="typing-area">
					<DisplayTyping toType={ayah} typed={typed} />
				</div>
				<textarea id="typing-field" placeholder="Type here..." value={typed} onChange={(e) => onType(e.target.value)} />
				<div id="display-stats">
					<div id="wpm">
						<h1>{wpm}</h1>
						<p>WPM</p>
					</div>
					<div id="timer">
						<h1>{timerString(seconds)}</h1>
						<p>Seconds</p>
					</div>
				</div>
				<div id="keyboard-hand-position">
					<img src={keyboardHandPositionImg}></img>
				</div>
			</div>
		</div>
	);
}
