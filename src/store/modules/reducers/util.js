import { SET_LOADING, LOADED, LOADING } from "../../types";

const initialState = {
	loading: false
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_LOADING:
			return { ...state, loading: payload.loading };
		case LOADED:
			return { ...state, loading: false };
		case LOADING:
			return { ...state, loading: true };
		default:
			return state;
	}
};
