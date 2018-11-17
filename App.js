import React, { Component } from "react";

import AppNavigator from "./src/navigators/AppNavigator";
import { connect } from "react-redux";
import { ActivityIndicator, View } from "react-native";
import { checkLogin } from "./src/store/modules/action/auth";
import { bindActionCreators } from "redux";
//import RNPushNotification from "./src/components/RNPushNotification";
import FlashMessage from "react-native-flash-message";

class App extends Component {
	navigator = {};

	constructor(props) {
		super(props);
	}
	componentDidMount() {
		this.props.checkLogin();
	}
	render() {
		const { app_started, authenticated } = this.props.authState;

		return app_started
			? this._renderAppRoot(authenticated)
			: this._renderSplash();
	}

	_renderAppRoot(authenticated) {
		const AppRoot = AppNavigator(authenticated);
		return (
			<View style={{ flex: 1 }}>
				<AppRoot />
				{/* <RNPushNotification /> */}
				<FlashMessage position="top" />
			</View>
		);
	}
	_renderSplash() {
		return (
			<View
				style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
			>
				<ActivityIndicator size="large" />
			</View>
		);
	}
}
const mapStateToProps = state => ({
	authState: state.auth
});
const mapDispatchToProps = dispatch =>
	bindActionCreators({ checkLogin }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
