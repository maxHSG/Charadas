import React, { Component } from "react";
import {
	Text,
	Modal,
	View,
	Dimensions,
	ScrollView,
	TouchableNativeFeedback,
	StyleSheet
} from "react-native";
//import { Header } from "react-native-elements";
import MainHeader from "../components/MainHeader";
import Icon from "react-native-vector-icons/FontAwesome";

import { Button, ListItem } from "../components";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { signOut } from "../store/modules/action/auth";
export class HomeScreen extends Component {
	styles = StyleSheet.create({
		box: {
			margin: 15,
			borderRadius: 5,
			flex: 0.5,
			height: 150,
			alignItems: "center",
			justifyContent: "center",
			backgroundColor: "white",
			elevation: 5
		}
	});

	render() {
		const { navigation } = this.props;
		return (
			<ScrollView style={{ flex: 1 }}>
				<MainHeader title="Home" />
				<View style={{ flex: 1, flexDirection: "row" }}>
					<TouchableNativeFeedback
						onPress={() => navigation.navigate("Puzzle")}
					>
						<View style={this.styles.box}>
							<Icon name="question" size={35} />
							<Text>Charadas</Text>
						</View>
					</TouchableNativeFeedback>

					<TouchableNativeFeedback
						onPress={() => navigation.navigate("Ranking")}
					>
						<View style={this.styles.box}>
							<Icon name="area-chart" size={35} />
							<Text>Ranking</Text>
						</View>
					</TouchableNativeFeedback>
				</View>

				<View style={{ flex: 1, flexDirection: "row" }}>
					<TouchableNativeFeedback onPress={() => navigation.navigate("Users")}>
						<View style={this.styles.box}>
							<Icon name="user" size={35} />
							<Text>Usuários</Text>
						</View>
					</TouchableNativeFeedback>
					<TouchableNativeFeedback
						onPress={() => this.props.navigation.navigate("Login")}
					>
						<View style={this.styles.box}>
							<Icon name="sign-out" size={35} />
							<Text>Sair</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
	bindActionCreators({ signOut }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);
