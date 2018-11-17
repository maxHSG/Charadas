import { actionCreator } from "./index";

import { SET_USERS, LOADING, LOADED } from "./../../types";

import { showMessage } from "../../../util/index";
import http from "../../../http";

export const getUsers = () => async dispatch => {
	try {
		await dispatch(actionCreator(LOADING));
		const respostas = await http.get("/respostas/");
		const charadas = await http.get("/charadas/");

		const users = Object.values(
			respostas.reduce((acc, resposta) => {
				const { nome, id_usuario: id } = resposta;

				resposta.correto = charadas.find(
					charada => charada.id == resposta.id_pergunta
				).correto;

				if (!acc[resposta.id_usuario]) {
					acc[resposta.id_usuario] = { respostas: [resposta], nome, id };
				} else {
					acc[resposta.id_usuario].respostas.push(resposta);
				}
				return acc;
			}, {})
		);
		await dispatch(actionCreator(SET_USERS, users));
	} catch (error) {
		console.log("Error", error);
	} finally {
		await dispatch(actionCreator(LOADED));
	}
};
