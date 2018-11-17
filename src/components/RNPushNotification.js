import { setUserFromToken } from "./../action/modules/userActions";
import { fetchTarefas } from "./../action/modules/tarefasActions";
import { bindActionCreators } from "redux";
import DeviceInfo from "react-native-device-info";
import React, { Component } from "react";
import PushNotification from "react-native-push-notification";
import { connect } from "react-redux";
import http from "./../http";
import NavigationService from "./../util/NavigationService";
// import { DeviceEventEmitter } from "react-native";
class RNPushNotification extends Component {
	notif = {};

	constructor(props) {
		super(props);

		PushNotification.configure({
			senderID: "513692778889",
			permissions: { alert: true, badge: true, sound: true },
			popInitialNotification: true,
			requestPermissions: true
		});

		this.onRegister = this.onRegister.bind(this);
		this.onNotification = this.onNotification.bind(this);
	}

	componentDidMount() {
		if (!this.props.user.id) return null;

		PushNotification.onRegister = this.onRegister;
		PushNotification.onNotification = this.onNotification;
	}

	async onRegister({ token }) {
		const tokensPush = this.props.user.token_push
			? JSON.parse(this.props.user.token_push)
			: [];

		const countTokens = tokensPush.length
			? tokensPush.filter(({ token: tokenUser }) => token === tokenUser).length
			: 0;
		if (countTokens === 0) {
			const { data } = await http.post("/push-notification/subscribe/", {
				token,
				userId: this.props.user.id,
				name: DeviceInfo.getDeviceId(),
				alias: DeviceInfo.getBrand()
			});

			if (data.token) this.props.setUserFromToken(data.token);
		}
	}
	async onNotification(notification) {
		if (notification.userInteraction) {
			const url = notification.data.url || notification.data.click_action;
			const urlArray = url
				.split(/(http[s]?:\/\/)?([^\/\s]+\/)(.*)/)
				.filter(e => e);

			if (urlArray.length) {
				const [protocol, hostname, pathname] = urlArray;
				const [painel, module, method, id] = pathname.split("/");

				if (
					module == "tarefas" &&
					method == "ficha" &&
					Number.isInteger(parseInt(id))
				) {
					await this.props.fetchTarefas({ f_id: id });

					const tarefa = this.props.tarefas.filter(
						({ id: tarefaId }) => id == tarefaId
					)[0];

					NavigationService.navigate("FichaTarefa", { tarefa });
				}
			}
		} else {
			PushNotification.localNotification({
				data: notification,
				ticker: notification.title,
				autoCancel: true,
				largeIcon: notification.icon || "ic_launcher",
				smallIcon: "ic_notification",
				soundName: "default",
				message: notification.body,
				vibration: 300,
				vibrate: true
			});
		}
	}

	render() {
		return null;
	}
}

const mapStateToProps = state => ({
	tarefas: state.tarefasState.tarefas,
	user: state.userState.user
});
const mapDispatchToProps = dispatch =>
	bindActionCreators({ setUserFromToken, fetchTarefas }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RNPushNotification);

// (function() {
// 	// Register all the valid actions for notifications here and add the action handler for each action
// 	PushNotification.registerNotificationActions([
// 		"Accept",
// 		"Reject",
// 		"Yes",
// 		"No"
// 	]);

// 	DeviceEventEmitter.addListener("notificationActionReceived", function(e) {
// 		console.log("notificationActionReceived event received: ", e);
// 		const info = JSON.parse(e.dataJSON);
// 		if (info.action == "Accept") {
// 			// Do work pertaining to Accept action here
// 		} else if (info.action == "Reject") {
// 			// Do work pertaining to Reject action here
// 		}
// 		// Add all the required actions handlers
// 	});
// })();
