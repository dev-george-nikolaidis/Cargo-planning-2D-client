import { useEffect, useMemo } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/modal/Modal";
import Navigation from "../../components/navigation/Navigation";
import Orders from "../../components/orders/orders";
import Spinner from "../../components/spinner/Spinner";
import { TripActionTypes } from "../../contexts/tripContext/tripActions";
import { useTripContext } from "../../contexts/tripContext/tripContext";
import { Trip, TruckViews } from "../../contexts/tripContext/tripState";
import { useUserContext } from "../../contexts/userContext/userContext";
import useFetchAxios from "../../hooks/useFetchAxios";
import TripContainerSide from "./components/tripContainerSide/TripContainerSide";
import TripContainerTop from "./components/tripContainerTop/TripContainerTop";
import s from "./trip.module.scss";

export default function Trip() {
	const {
		state: { tripId },
		dispatch,
	} = useTripContext();

	const {
		state: { userId },
	} = useUserContext();

	const navigate = useNavigate();
	const { currentTripId } = useParams();
	const view = useLocation().pathname.split("/")[2] as TruckViews;

	const requestData = useMemo(
		() => ({
			userId,
			tripId: currentTripId,
		}),
		[userId, currentTripId]
	);

	const { response, isLoading, error } = useFetchAxios<Trip>("https://cargo-server.onrender.com/v1/trip/show", "POST", requestData);

	useEffect(() => {
		if (response) {
			dispatchTripData(response);
		}
	}, [response, currentTripId]);

	useEffect(() => {
		if (error) {
			navigate("/404");
		}
	}, [error]);

	const dispatchTripData = (response: Trip) => {
		if (tripId !== Number(currentTripId)) {
			dispatch({ type: TripActionTypes.FETCH_TRIP, payload: { res: response, id: currentTripId } });
		}
		dispatch({ type: TripActionTypes.SET_CURRENT_VIEW, payload: view });
	};

	function SpinnerWithModal() {
		return (
			<>
				<Modal isModalOpen={isLoading} />
				<Spinner />
			</>
		);
	}

	function renderTripView(view: TruckViews) {
		return view === "side" ? <TripContainerSide /> : <TripContainerTop />;
	}

	return (
		<div className={s.trip}>
			{isLoading && <SpinnerWithModal />}
			<div className={s.ordersWrapper}>
				<Orders />
			</div>
			<Navigation />
			{renderTripView(view)}
		</div>
	);
}
