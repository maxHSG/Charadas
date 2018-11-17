import { actionCreator } from "./index";

import { LOADING, LOADED, SET_PUZZLE } from "../../types";

import { showMessage } from "../../../util/index";
import http from "../../../http";

export const getPuzzle = () => async dispatch => {
	try {
		await dispatch(actionCreator(LOADING));

		const charadas = await http.get("/charadas/");

		await dispatch(actionCreator(SET_PUZZLE, charadas));
	} catch (error) {
		console.log("Error", error);
	} finally {
		await dispatch(actionCreator(LOADED));
	}
};
