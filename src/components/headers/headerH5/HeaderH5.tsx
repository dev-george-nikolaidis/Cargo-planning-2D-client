import { ReactNode } from "react";
import s from "./HeaderH5.module.scss";

s.title;
type Props = {
	children: ReactNode;
	className?: string;
};

export default function HeaderH5({ children, className }: Props) {
	return <h5 className={` ${s.title}  ${className}`}>{children}</h5>;
}
