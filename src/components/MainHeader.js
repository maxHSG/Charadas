import { StatusBar, View } from "react-native";
import React from "react";
import { Header, Title, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

export default class MainHeader extends React.Component {
	constructor(props) {
		super(props);
	}
	renderBackButton(arrowDirection = "right") {
		return (
			<Button transparent onPress={() => this.props.navigation.goBack()}>
				<Icon
					name={`arrow-${arrowDirection}`}
					style={{ color: "#fff" }}
					size={20}
				/>
			</Button>
		);
	}
	renderLeft() {
		if (this.props.leftBack) return this.renderBackButton("left");

		if (this.props.slotLeft) return this.props.slotLeft;

		return null;
		// if (this.props.navigation) {
		// 	return (
		// 		<Button transparent onPress={() => this.props.navigation.goBack()}>
		// 			<Icon name="bars" color="white" size={20} />
		// 		</Button>
		// 	);
		// }
	}
	renderCenter() {
		let text = "";

		if (this.props.title) {
			text = this.props.title;
		} else if (this.props.children) {
			text = this.props.children;
		}

		if (text) return <Title style={{ color: "#FFF" }}>{text}</Title>;

		return null;
	}
	renderRight() {
		if (this.props.rightBack) return this.renderBackButton();

		if (this.props.addOnPress) {
			return (
				<Button transparent onPress={() => this.props.addOnPress()}>
					<Icon name="plus" size={20} style={{ color: "#FFF" }} />
				</Button>
			);
		}

		if (this.props.slotRight) return this.props.slotRight;

		return null;
	}
	render() {
		return (
			<Header>
				<StatusBar barStyle="light-content" />
				<View
					style={{
						flex: 1,
						alignItems: "center",
						justifyContent: "space-between",
						flexDirection: "row"
					}}
				>
					<View>{this.renderLeft()}</View>
					<View>{this.renderCenter()}</View>
					<View>{this.renderRight()}</View>
				</View>
			</Header>
		);
	}
}
