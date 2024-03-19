import { Link } from "react-router-dom";
import HeaderH2 from "../../../components/headers/headerH2/HeaderH2";
import s from "./Error404.module.scss";

type Props = {};

export default function Error404({}: Props) {
	return (
		<div className={s.errorPage}>
			<div className={s.errorContainer}>
				<div className={s.errorContent}>
					<HeaderH2 className={s.errorTitle}>404</HeaderH2>
					<p className={s.errorMessage}>Oops! Page not found</p>
					<Link to={`/trip/side/1`} className={s.backLink}>
						<button className={s.btn}> Go back to home</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
