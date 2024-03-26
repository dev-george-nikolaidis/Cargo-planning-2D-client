import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Tooltip from "../../../../../components/tooltip/Tooltip";
import { TripOrders } from "../../../../../contexts/tripContext/tripState";
import s from "./tripOrdersContainerSide.module.scss";

type Props = {
	dynamicScaledWidthOfEachOrder: number;
	backgroundOrderColor: string;
	customer: TripOrders;
	uniqueId: number;
	index: number;
	width: number;
};

export default function TripOrdersContainerSide({ dynamicScaledWidthOfEachOrder, backgroundOrderColor, customer, uniqueId, index, width }: Props) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: uniqueId });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		width: `${dynamicScaledWidthOfEachOrder}px`,
		backgroundColor: backgroundOrderColor,
	};

	const value = width < 480 ? "-40%" : "-26%";
	const tooltipStyles = {
		bottom: index % 2 === 0 ? `${value}` : "",
		top: index % 2 != 0 ? `${value}` : "",
	};
	return (
		<div ref={setNodeRef} key={uniqueId} {...attributes} {...listeners} style={style} className={s.customerContainer}>
			<div className={s.tooltipWrapper} style={tooltipStyles}>
				<Tooltip index={index}>
					<p>Order: {customer.customer_id}</p>
					<p>Pallets: {customer.quantity_of_pallets} </p>
					<p>Offload: {customer.offload_order_number} </p>
				</Tooltip>
			</div>
		</div>
	);
}
