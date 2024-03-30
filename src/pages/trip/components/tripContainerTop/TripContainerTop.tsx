import ProgressBar from "../../../../components/progressBar/ProgressBar";
import Seo from "../../../../components/Seo/Seo";
import TruckView from "../../../../components/truckViewLinks/TruckViewLinks";
import { trucksConfig } from "../../../../config/trucksConfig";
import { useTripContext } from "../../../../contexts/tripContext/tripContext";
import useTruckDesign from "../../../../hooks/useTruckDesign";
import useWindowSizeTracker from "../../../../hooks/useWindowSizeTracker";
import { calculateLDM } from "../../../../utils/helpers";
import s from "./tripContainerTop.module.scss";
import TripOrdersContainerTop from "./tripOrdersContainerTop/TripOrdersContainerTop";

export default function TripContainerTop() {
	const {
		state: { tripOrderColors, tripOrders, tripOrderTotalPallets, customerOrdersWithIds },
		dispatch,
	} = useTripContext();

	const {
		trailerStandard: {
			info: { maxEuroPalletsCapacity },
		},
	} = trucksConfig;

	const { width } = useWindowSizeTracker();
	const { heightDesignScale, truckWidth, truckHeight } = useTruckDesign(width, "top");

	const displayCustomerContainers = tripOrders.map((c, i) => {
		const dynamicScaledWidthOfEachOrder = calculateLDM(c.quantity_of_pallets) * heightDesignScale!;

		return (
			<TripOrdersContainerTop
				dynamicScaledWidthOfEachOrder={dynamicScaledWidthOfEachOrder}
				backgroundOrderColor={tripOrderColors[i]}
				key={c.customer_id}
				customer={c}
				customerOrdersWithIds={customerOrdersWithIds}
				dispatch={dispatch}
			/>
		);
	});

	return (
		<>
			<Seo pageTitle="Top" />
			<div className={s.truckViewWrapper}>
				<TruckView />
			</div>
			<div className={s.truckWrapper}>
				<div className={s.truckFront} style={{ width: `${truckWidth}px` }}>
					<p className={s.truckFrontText}>Front</p>
				</div>
				<ProgressBar currentPallets={tripOrderTotalPallets} maxPallets={maxEuroPalletsCapacity} />
				<div className={s.truckContainer} style={{ width: `${truckWidth}px`, height: `${truckHeight}px` }}>
					{displayCustomerContainers}
				</div>
			</div>
		</>
	);
}
