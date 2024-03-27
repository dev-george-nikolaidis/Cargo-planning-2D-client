import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

import { Action } from "./tripActions";
import { reducer } from "./tripReducer";
import { initialState, tripContextState } from "./tripState";

type ContextHook = () => {
	state: tripContextState;
	dispatch: (action: Action) => any;
};

const tripContext = createContext<{
	state: tripContextState;
	dispatch: Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => {},
});

export const TripContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <tripContext.Provider value={{ state, dispatch }}>{children}</tripContext.Provider>;
};

export const useTripContext: ContextHook = () => {
	const { state, dispatch } = useContext(tripContext);
	return { state, dispatch };
};
