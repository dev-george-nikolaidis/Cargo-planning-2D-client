import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TripOrders } from "../../../../../../contexts/tripContext/tripState";
import s from "./tripSortableItem.module.scss";

type Props = {
	id: string;
	customer: TripOrders;
};
function TripSortableItem({ id, customer }: Props) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} key={id} {...attributes} {...listeners} style={style} className={s.pallet}>
			<p>Order: {customer.customer_id} </p>
			<p className={s.palletIdText}>{id}</p>
		</div>
	);
}

export default TripSortableItem;
