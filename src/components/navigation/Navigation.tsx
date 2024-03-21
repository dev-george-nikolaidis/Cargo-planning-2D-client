import { MdAccountCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/cargo.svg";
import s from "./navigation.module.scss";

type Props = {};

export default function Navigation({}: Props) {
	return (
		<header className={s.header}>
			<nav className={s.nav}>
				<NavLink to="/trip/side/1" end className={s.navLogoWrapper}>
					<img src={Logo} alt="" className={s.logo} />
				</NavLink>

				<ul className={s.navList}>
					<li>
						<span>
							<MdAccountCircle className={s.accountIcon} />
						</span>
					</li>
				</ul>
			</nav>
		</header>
	);
}
