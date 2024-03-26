import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import ProgressBar from "../../../../components/progressBar/ProgressBar";
import Seo from "../../../../components/Seo/Seo";
import TruckView from "../../../../components/truckViewLinks/TruckViewLinks";
import { trucksConfig } from "../../../../config/trucksConfig";
import { TripActionTypes } from "../../../../contexts/tripContext/tripActions";
import { useTripContext } from "../../../../contexts/tripContext/tripContext";
import { TripOrders } from "../../../../contexts/tripContext/tripState";
import useTruckDesign from "../../../../hooks/useTruckDesign";
import useWindowSizeTracker from "../../../../hooks/useWindowSizeTracker";
import { calculateLDM } from "../../../../utils/helpers";
import s from "./tripContainerSide.module.scss";
import TripOrdersContainerSide from "./tripOrdersContainerSide/TripOrdersContainerSide";

export default function TripContainerSide() {
	// document.title = "Trip | Side";

	const {
		state: { tripOrders, tripOrderColors, tripOrderTotalPallets },
		dispatch,
	} = useTripContext();

	const [_, setActiveId] = useState<string | null>(null);
	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor));

	const {
		trailerStandard: {
			info: { maxEuroPalletsCapacity },
		},
	} = trucksConfig;

	const { width } = useWindowSizeTracker();
	const { widthDesignScale, truckWidth, truckHeight } = useTruckDesign(width, "side");

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over && active.id !== over.id) {
			const oldIndex = tripOrders.findIndex((order) => order.customer_id === active.id);
			const newIndex = tripOrders.findIndex((order) => order.customer_id === over.id);
			const newOrders = [...tripOrders];
			const [movedItem] = newOrders.splice(oldIndex, 1);
			newOrders.splice(newIndex, 0, movedItem);

			dispatch({
				type: TripActionTypes.SIFTING_PALLET,
				payload: newOrders,
			});
		}
		setActiveId(null);
	};

	const renderCustomerContainers = tripOrders.map((customer: TripOrders, index: number) => {
		const dynamicScaledWidthOfEachOrder = calculateLDM(customer.quantity_of_pallets) * widthDesignScale;
		return (
			<div className={s.customerContainer} key={customer.customer_id}>
				<TripOrdersContainerSide
					index={index}
					width={width}
					dynamicScaledWidthOfEachOrder={dynamicScaledWidthOfEachOrder}
					backgroundOrderColor={tripOrderColors[index]}
					customer={customer}
					uniqueId={customer.customer_id}
				/>
			</div>
		);
	});

	return (
		<>
			<Seo pageTitle="Side" />
			<div className={s.truckViewWrapper}>
				<TruckView />
			</div>
			<ProgressBar currentPallets={tripOrderTotalPallets} maxPallets={maxEuroPalletsCapacity} />
			<div className={s.truckWrapper}>
				<div className={s.truckFront} style={{ height: `${truckHeight}px` }}>
					<p className={s.truckFrontText}>Front</p>
				</div>
				<div className={s.truckContainer} style={{ width: `${truckWidth}px`, height: `${truckHeight}px` }}>
					<DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
						<SortableContext items={tripOrders.map((c) => c.customer_id)} strategy={verticalListSortingStrategy}>
							<div className={s.customerContainerWrapper}>{renderCustomerContainers}</div>
						</SortableContext>
					</DndContext>
				</div>
			</div>
		</>
	);
}
