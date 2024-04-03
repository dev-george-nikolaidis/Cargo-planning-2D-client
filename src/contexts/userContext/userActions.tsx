export enum ActionTypes {
	TEST_USER = "TEST_USER",
}

export enum PayloadTypes {}

export interface Action {
	type: ActionTypes;
	payload?: any;
}
