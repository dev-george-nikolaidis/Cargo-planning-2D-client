import { ReactNode } from "react";
import s from "./tooltip.module.scss";

type Props = {
	children: ReactNode;
	index: number;
};

export default function Tooltip({ children, index }: Props) {
	return (
		<div className={s.tooltip}>
			{children}
			{index % 2 === 0 ? <div className={`${s.triangle} ${s.triangleTop}`}> </div> : <div className={`${s.triangle} ${s.triangleBottom}`}> </div>}
		</div>
	);
}
