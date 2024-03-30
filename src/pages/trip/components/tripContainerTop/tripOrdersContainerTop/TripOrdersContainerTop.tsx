import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import React, { useState } from "react";
import { TripActionTypes } from "../../../../../contexts/tripContext/tripActions";
import { CustomerOrdersWithIds, TripOrders } from "../../../../../contexts/tripContext/tripState";
import s from "./tripOrdersContainerTop.module.scss";
import TripSortableItem from "./tripSortableItem/TripSortableItem";

type Props = {
	dynamicScaledWidthOfEachOrder: number;
	backgroundOrderColor: string;
	customer: TripOrders;
	customerOrdersWithIds: CustomerOrdersWithIds;
	dispatch: React.Dispatch<any>;
};

function TripOrdersContainerTop({ dynamicScaledWidthOfEachOrder, backgroundOrderColor, customer, customerOrdersWithIds, dispatch }: Props) {
	const dynamicStyles = {
		height: `${dynamicScaledWidthOfEachOrder}px`,
		backgroundColor: backgroundOrderColor,
	};
	const [_, setActiveId] = useState<string | null>(null);

	const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor));
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const currentCustomerId = customer.customer_id;
			const currentCustomerOrders = customerOrdersWithIds[currentCustomerId].orders || [];
			// Find the index of the dragged item and the target based on unique IDs
			const oldIndex = currentCustomerOrders.findIndex((order) => order[1] === active.id);
			const newIndex = currentCustomerOrders.findIndex((order) => order[1] === over.id);
			// Reorder the array based on the new indices
			const reorderedOrders = arrayMove(currentCustomerOrders, oldIndex, newIndex);

			// Update the state and dispatch the action
			dispatch({
				type: TripActionTypes.SIFTING_CUSTOMER_ORDER,
				payload: {
					customerId: currentCustomerId,
					orders: reorderedOrders,
				},
			});
		}
		setActiveId(null);
	};

	const displayTripSortableItem = customerOrdersWithIds[customer.customer_id]?.orders?.map((order) => <TripSortableItem key={order[1]} id={order[1]} customer={customer} />);

	return (
		<DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
			<SortableContext items={customerOrdersWithIds[customer.customer_id]?.orders?.map((order) => order[1])} strategy={verticalListSortingStrategy}>
				<div className={s.customerContainer} style={dynamicStyles}>
					{displayTripSortableItem}
				</div>
			</SortableContext>
		</DndContext>
	);
}

export default TripOrdersContainerTop;
