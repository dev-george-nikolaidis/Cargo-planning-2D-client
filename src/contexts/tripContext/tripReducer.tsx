import { v4 as uuidv4 } from "uuid";
import { generateBackgroundColor } from "../../utils/helpers";
import { Action, TripActionTypes } from "./tripActions";
import { CustomerOrdersWithIds, Trip, tripContextState, UpdatePositionOfCustomerOrdersPayload } from "./tripState";

type ReducerType = (state: tripContextState, action: Action) => tripContextState;

export const reducer: ReducerType = (state, action) => {
	switch (action.type) {
		case TripActionTypes.FETCH_TRIP:
			const p = action.payload.res as Trip;
			let totalPallets = 0;
			const customersColors: string[] = [];
			const customerOrdersWithIds: CustomerOrdersWithIds = {};

			p.orders.forEach((c) => {
				// Generate random background colors
				customersColors.push(generateBackgroundColor());
				// Build the array of pallets,we need unique IDs to sort the pallets.We don't have ids in database since is demo app
				customerOrdersWithIds[c.customer_id] = {
					orders: Array.from({ length: c.quantity_of_pallets }, (_, i) => {
						return [i + 1, uuidv4()];
					}),
				};
				totalPallets += c.quantity_of_pallets;
			});

			return {
				...state,
				// Here we can make the necessary changes depending how we want to display the offloadOrder array. line 22
				tripOrders: p.orders.slice(0).reverse(),
				tripOrderColors: customersColors,
				tripId: p.trip.id,
				loadDirection: p.trip.load_direction,
				userId: p.trip.user_id,
				tripOrderTotalPallets: totalPallets,
				customerOrdersWithIds: customerOrdersWithIds,
				currentTripId: action.payload.id,
			};

		case TripActionTypes.SET_CURRENT_VIEW:
			return {
				...state,
				currentView: action.payload,
			};

		case TripActionTypes.SIFTING_PALLET:
			return {
				...state,
				tripOrders: action.payload,
			};

		case TripActionTypes.FETCH_ALL_ORDERS:
			return {
				...state,
				userOrders: action.payload,
			};
		case TripActionTypes.SET_CURRENT_ORDER:
			return {
				...state,
				currentTripId: action.payload,
			};

		case TripActionTypes.SIFTING_CUSTOMER_ORDER:
			const { customerId, orders } = action.payload as UpdatePositionOfCustomerOrdersPayload;

			return {
				...state,
				customerOrdersWithIds: {
					...state.customerOrdersWithIds,
					[customerId]: {
						...state.customerOrdersWithIds[customerId],
						orders: orders,
					},
				},
			};

		default:
			return state;
	}
};
