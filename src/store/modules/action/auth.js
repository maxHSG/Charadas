import { actionCreator } from "./index";

import {
	APP_LOADING,
	LOGIN_SUCCESS,
	LOGGOUT,
	SET_CURRENT_USER,
	APP_LOADED,
	LOADING,
	LOADED
} from "./../../types";

import http from "../../../http";
import { showMessage } from "../../../util";
import { AsyncStorage } from "react-native";

export const authSuccess = ({ login = "", senha = "" }) => async dispatch => {
	try {
		await dispatch(actionCreator(LOADING));

		const user = await http.post("/auth/", {
			login,
			senha
		});

		if (Array.isArray(user)) {
			await AsyncStorage.setItem("user", JSON.stringify(user[0]));
			await dispatch(actionCreator(SET_CURRENT_USER, { user: user[0] }));
			await dispatch(actionCreator(LOGIN_SUCCESS));
		} else {
			showMessage(user.nome.replace("[ERRO]: ", ""), 1);
		}
	} catch (error) {
		console.log("Error", error);
	} finally {
		await dispatch(actionCreator(LOADED));
	}
};

export const signOut = () => async dispatch => {
	await AsyncStorage.removeItem("user");
	await dispatch(actionCreator(LOGGOUT));

	await dispatch(
		actionCreator(SET_CURRENT_USER, {
			user: {}
		})
	);
};
export const checkLogin = () => async dispatch => {
	try {
		const userJson = await AsyncStorage.getItem("user");
		const user = JSON.parse(userJson);

		if (user) {
			await dispatch(actionCreator(SET_CURRENT_USER, user));
			await dispatch(actionCreator(LOGIN_SUCCESS));
		}
	} catch (error) {
		await dispatch(signOut());
	} finally {
		await dispatch(actionCreator(APP_LOADED));
	}
};
