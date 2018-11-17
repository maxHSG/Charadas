/** @format */
import { name as appName } from "./app.json";

import { AppRegistry } from "react-native";
import App from "./App";
import React from "react";
import { Provider } from "react-redux";

// import RNFetchBlob from "react-native-fetch-blob";
// const Blob = RNFetchBlob.polyfill.Blob;
// const fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;

import store from "./src/store";

const AppRootComponent = () => (
	<Provider store={store}>
		<App />
	</Provider>
);
AppRegistry.registerComponent(appName, () => AppRootComponent);
