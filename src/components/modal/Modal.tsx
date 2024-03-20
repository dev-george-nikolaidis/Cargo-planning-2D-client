import { useEffect } from "react";
import s from "./modal.module.scss";
type Props = {
	children?: React.ReactNode;
	className?: string;
	isModalOpen?: boolean;
};

export default function Modal({ children, className, isModalOpen }: Props) {
	useEffect(() => {
		if (isModalOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
		};
	}, [isModalOpen]);

	return <div className={`${className} ${s.modal}`}>{children}</div>;
}
