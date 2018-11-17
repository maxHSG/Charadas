import { showMessage as showMsg } from "react-native-flash-message";

import { Platform } from "react-native";

const getTypeMsg = type => {
	switch (parseInt(type)) {
		case 0:
		default:
			return "success";
		case 1:
			return "danger";
		case 2:
			return "warning";
		case 3:
			return "info";
	}
};
export const showMessage = (message, type = 0) => {
	if (!message) return false;

	showMsg({ message, type: getTypeMsg(type), duration: 40000 });
};

// export const formatDate = date => {
// 	let dateFinal = "";
// 	let year = (month = day = "");

// 	moment.locale("pt");

// 	const now = moment();

// 	const dateHandler = moment(date);

// 	const subTitle = moment().format("MMMM Do YYYY, h:mm:ss a"); // Julho 20º 2017, 11:42:53 pm
// };
