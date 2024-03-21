import { calculateLDM } from "../../utils/helpers";
import s from "./progressBar.module.scss";

type Props = {
	currentPallets: number;
	maxPallets: number;
};

export default function ProgressBar({ currentPallets, maxPallets }: Props) {
	const widthPercentage = (currentPallets / maxPallets) * 100;

	const remainingPallets = Math.max(0, maxPallets - currentPallets);
	const getProgressColor = () => {
		switch (true) {
			case currentPallets < maxPallets * 0.33:
				return "linear-gradient(to top, #56ab2f, #a8e063)";
			case currentPallets < maxPallets * 0.66:
				return "linear-gradient(to top, #ffcc33, #ff6600)";
			default:
				return "linear-gradient(to top, #ff416c, #ff4b2b)";
		}
	};

	const progressBarStyle = {
		width: `${widthPercentage}%`,
		backgroundImage: getProgressColor(),
	};

	return (
		<div className={s.progressBarContainer}>
			<div className={s.label}>
				Free LDM: <span className={s.labelSpan}>{calculateLDM(remainingPallets)}</span>
			</div>
			<div className={s.progressBar} style={progressBarStyle}></div>
		</div>
	);
}
