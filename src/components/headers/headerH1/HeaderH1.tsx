import { ReactNode } from "react";
import s from "./headerH1.module.scss";

type Props = {
	children: ReactNode;
	className?: string;
};

export default function HeaderH1({ children, className }: Props) {
	return <h1 className={` ${className} ${s.title}`}>{children}</h1>;
}
