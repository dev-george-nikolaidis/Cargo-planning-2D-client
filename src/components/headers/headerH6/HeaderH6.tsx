import { ReactNode } from "react";
import s from "./HeaderH6.module.scss";

s.title;
type Props = {
	children: ReactNode;
	className?: string;
};

export default function HeaderH6({ children, className }: Props) {
	return <h6 className={` ${s.title}  ${className}`}>{children}</h6>;
}
