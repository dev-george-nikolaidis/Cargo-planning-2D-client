import { ReactNode } from "react";
import s from "./headerH2.module.scss";

type Props = {
	children: ReactNode;
	className?: string;
};

export default function HeaderH2({ children, className }: Props) {
	return <h1 className={` ${s.titleH2} ${className}`}>{children}</h1>;
}
