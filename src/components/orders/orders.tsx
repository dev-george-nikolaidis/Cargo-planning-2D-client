import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TripActionTypes } from "../../contexts/tripContext/tripActions";
import { useTripContext } from "../../contexts/tripContext/tripContext";
import { TruckViews, UserOrders } from "../../contexts/tripContext/tripState";
import { useUserContext } from "../../contexts/userContext/userContext";
import useFetchAxios from "../../hooks/useFetchAxios";
import HeaderH6 from "../headers/headerH6/HeaderH6";
import s from "./orders.module.scss";

export default function Orders() {
	const {
		state: { userOrders, currentTripId },
		dispatch,
	} = useTripContext();

	const {
		state: { userId },
	} = useUserContext();
	const navigate = useNavigate();
	const view = useLocation().pathname.split("/")[2] as TruckViews;

	const requestData = useMemo(() => ({ userId }), [userId]);
	const { response, error } = useFetchAxios<UserOrders>("https://cargo-server.onrender.com/v1/trip", "POST", requestData);

	useEffect(() => {
		if (response) {
			dispatch({ type: TripActionTypes.FETCH_ALL_ORDERS, payload: response });
		}
	}, [response]);

	useEffect(() => {
		if (error) {
			navigate("/404");
		}
	}, [error]);

	const handlerOrderClick = (id: number) => {
		navigate(`/trip/${view}/${id}`);
		dispatch({ type: TripActionTypes.SET_CURRENT_ORDER, payload: id });
	};

	const displayDropDownMenu = userOrders.trip?.map((order, i) => {
		return (
			<span className={s.orderLink} key={i} onClick={() => handlerOrderClick(order.id)}>
				<span className={currentTripId == order.id ? `${s.order} ${s.orderActive}` : s.order}>{order.id}</span>
			</span>
		);
	});

	return (
		<div className={s.orders}>
			<HeaderH6 className={s.title}>Orders</HeaderH6>
			{displayDropDownMenu}
		</div>
	);
}
