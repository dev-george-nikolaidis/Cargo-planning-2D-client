import { Action, ActionTypes } from "./userActions";
import { userContextState } from "./userState";

type ReducerType = (state: userContextState, action: Action) => userContextState;

export const reducer: ReducerType = (state, action) => {
	switch (action.type) {
		case ActionTypes.TEST_USER:
			return {
				...state,
			};

		default:
			return state;
	}
};
