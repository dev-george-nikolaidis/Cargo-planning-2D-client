import { createContext, Dispatch, ReactNode, useContext, useReducer } from "react";

import { Action } from "./userActions";
import { reducer } from "./userReducer";
import { initialState, userContextState } from "./userState";

type ContextHook = () => {
	state: userContextState;
	dispatch: (action: Action) => any;
};

const userContext = createContext<{
	state: userContextState;
	dispatch: Dispatch<Action>;
}>({
	state: initialState,
	dispatch: () => {},
});

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <userContext.Provider value={{ state, dispatch }}>{children}</userContext.Provider>;
};

export const useUserContext: ContextHook = () => {
	const { state, dispatch } = useContext(userContext);
	return { state, dispatch };
};
