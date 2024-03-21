import SpinnerImg from "../../assets/img/cargo.svg";
import s from "./spinner.module.scss";
type Props = {};

export default function Spinner({}: Props) {
	return (
		<div className={s.spinner}>
			<img className={s.spinnerImg} src={SpinnerImg} alt="" />
		</div>
	);
}
