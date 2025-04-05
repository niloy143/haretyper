import { useMemo } from "react";
import { CLASSES } from "../utils/enum";

interface Props {
	toType: string;
	typed: string;
}

export default function DisplayTyping({ toType, typed }: Props) {
	const elements = useMemo(() => {
		let chars: React.ReactElement[] = [];
		const words: React.ReactElement[] = [];

		toType.split("").map((char, i) => {
			let className = "";

			if (typed?.[i]) {
				if (typed[i] === char) className = CLASSES.typed;
				else className = CLASSES.mistyped;
			}

			chars.push(
				<span key={`char-${i}`} className={className}>
					{char}
				</span>
			);

			if (char.match(/\s/g) && chars.length) {
				words.push(<span key={`word-${words.length}`}>{chars}</span>);
				chars = [];
			}
		});

		if (chars.length) words.push(<span key={`word-${words.length}`}>{chars}</span>);

		return words;
	}, [toType, typed]);

	return <>{elements}</>;
}
