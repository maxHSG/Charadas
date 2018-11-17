import { SET_USERS } from "./../../types";

const initialState = [];

import { uniqBy } from "lodash";

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case SET_USERS:
			return uniqBy([...state, ...payload], "id");

		default:
			return state;
	}
};
