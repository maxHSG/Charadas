import axios from "axios";

import { AsyncStorage } from "react-native";

export const PROTOCOL = "http://";

export const HOME = "www.gileduardo.com.br";

export const API = "/react/api_charadas/rest.php/";

const http = axios.create({
	baseURL: `${PROTOCOL}${HOME}${API}`
});

// http.interceptors.request.use(
// 	config => {
// 		config.baseURL = ;
// 		console.log("config", config);
// 		return config;
// 	},
// 	err => {
// 		return Promise.reject(err);
// 	}
// );

http.interceptors.response.use(
	response => {
		return response.data;
	},

	error => {
		console.log("Error", error);
		if (error.response.status === 401) {
			// window.location = "/login/sair/";
		}

		return Promise.reject(error);
	}
);

export default http;
