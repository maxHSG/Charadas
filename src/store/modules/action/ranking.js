import { actionCreator } from "./index";

import { LOADING, LOADED, SET_RANKING } from "./../../types";

import moment from "moment";
import { groupBy } from "lodash";
import { showMessage } from "../../../util/index";
import http from "../../../http";

export const getRanking = () => async dispatch => {
	try {
		await dispatch(actionCreator(LOADING));
		const respostasData = await http.get("/respostas/");

		const respostas = Object.values(groupBy(respostasData, "id_usuario"));

		const ranking = respostas.map(resposta => {
			const firstResposta = resposta.find(r => r.id_pergunta == 1);

			const lastResposta = resposta.find(
				r =>
					r.id_pergunta ==
					Math.max(...resposta.map(e => parseInt(e.id_pergunta)))
			);

			return {
				id: firstResposta.id_usuario,
				nome: firstResposta.nome,
				acertou: resposta.reduce((acc, r) => acc + parseInt(r.acertou), 0),
				tempo: moment(lastResposta.data + " " + lastResposta.hora).diff(
					firstResposta.data + " " + firstResposta.hora,
					"minutes"
				)
			};
		});

		// console.log("ranking", ranking);

		await dispatch(actionCreator(SET_RANKING, ranking));
	} catch (error) {
		console.log("Error", error);
	} finally {
		await dispatch(actionCreator(LOADED));
	}
};
