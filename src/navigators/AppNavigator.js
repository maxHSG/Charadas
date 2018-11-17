import React from "react";
import { createStackNavigator } from "react-navigation";

import Routers from "./Routers";

export default authenticated => {
	const initialRouteName = authenticated ? "Home" : "Login";

	return createStackNavigator(Routers, {
		initialRouteName,
		headerMode: "none"
	});
};
