import { ReactNode } from "react";
import s from "./HeaderH3.module.scss";
type Props = {
	children: ReactNode;
	className?: string;
};

export default function HeaderH3({ children, className }: Props) {
	return <h1 className={` ${s.titleH3} ${className}`}>{children}</h1>;
}
