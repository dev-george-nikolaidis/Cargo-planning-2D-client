export interface tripContextState {
	tripOrderColors: string[];
	tripOrders: TripOrders[];
	tripId: number;
	userId: number;
	loadDirection: string;
	maxPallets: number;
	tripOrderTotalPallets: number;
	currentView: TruckViews;
	customerOrdersWithIds: CustomerOrdersWithIds;
	currentTripId: number;
	userOrders: UserOrders;
}

export const initialState: tripContextState = {
	tripOrderColors: [],
	tripOrders: [],
	loadDirection: "",
	tripId: 0,
	userId: 0,
	maxPallets: 33,
	tripOrderTotalPallets: 0,
	currentView: "side",
	customerOrdersWithIds: {},
	currentTripId: 1,
	userOrders: {
		trip: [],
	},
};

export type TruckViews = "side" | "top";

export type Trip = {
	trip: {
		id: number;
		user_id: number;
		load_direction: string;
		created_at: string;
		updated_at: string;
	};
	orders: Array<{
		trip_id: number;
		load_order_number: number;
		offload_order_number: number;
		quantity_of_pallets: number;
		start_destination: string;
		final_destination: string;
		pallet: string;
		customer_id: number;
	}>;
};

export type TripOrders = {
	trip_id: number;
	load_order_number: number;
	offload_order_number: number;
	quantity_of_pallets: number;
	start_destination: string;
	final_destination: string;
	pallet: string;
	customer_id: number;
};

export type UpdatePositionOfCustomerOrdersPayload = {
	customerId: number;
	orders: number[];
};

type Order = [number, string];

interface CustomerOrders {
	orders: Order[];
}

export type CustomerOrdersWithIds = {
	[customerId: string]: CustomerOrders;
};

export type UserOrders = {
	trip: Array<{
		id: number;
		user_id: number;
		load_direction: string;
		created_at: string;
		updated_at: string;
	}>;
};
