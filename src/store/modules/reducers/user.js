import { SET_CURRENT_USER } from "./../../types";

const initialState = {};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_CURRENT_USER:
			return { ...state, ...payload };
		default:
			return state;
	}
};
