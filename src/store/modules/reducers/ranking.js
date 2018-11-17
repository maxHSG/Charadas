import { SET_RANKING } from "./../../types";

const initialState = [];

import { uniqBy } from "lodash";

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_RANKING:
			console.log("Payload", payload);
			return uniqBy([...state, ...payload], "id");

		default:
			return state;
	}
};
