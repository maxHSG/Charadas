import React, { PureComponent } from "react";
import {
	View,
	Image,
	Text,
	StyleSheet,
	TouchableNativeFeedback
} from "react-native";
import { isEmpty } from "lodash";
export default class ListItem extends PureComponent {
	styles = StyleSheet.create({
		container: {
			//;position: "relative",
			borderRadius: 75,
			margin: 5,
			height: 80,
			//padding: 16,
			flexDirection: "row",
			alignItems: "center",
			backgroundColor: "white",
			backgroundColor: "#1b1464",
			justifyContent: "space-between",
			overflow: "hidden"
		},
		left: {
			flex: 0.3
		},
		center: {
			color: "white",
			padding: 16,
			flex: 0.6
		},
		right: {
			//marginRight: ,
			flex: 0.2
		}
	});

	constructor(props) {
		super(props);
	}

	renderLeft() {
		if (this.props.leftAvatar) {
			return (
				<Image
					resizeMode={"cover"}
					style={{ width: "100%", height: "100%", backgroundColor: "#8d8ab2" }}
					{...this.props.leftAvatar}
				/>
			);
		} else if (this.props.left) {
			return this.props.left;
		}

		return null;
	}
	render() {
		const { title = "", subtitle, details, icon, onPress } = this.props;

		return (
			<TouchableNativeFeedback onPress={onPress}>
				<View style={this.styles.container}>
					<View style={this.styles.left}>{this.renderLeft()}</View>

					<View style={this.styles.center}>
						<Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
							{title}
						</Text>
						<Text style={{ color: "white", fontSize: 14 }}>{subtitle}</Text>
						<Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
							{details}
						</Text>
					</View>

					<View
						style={StyleSheet.flatten([
							this.styles.right,
							this.props.styleRight || {}
						])}
					>
						{this.props.right}
					</View>
				</View>
			</TouchableNativeFeedback>
		);
	}
}
