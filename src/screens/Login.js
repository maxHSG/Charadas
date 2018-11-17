import React, { Component } from "react";
// import PropTypes from "prop-types";
import {
	Button,
	StyleSheet,
	Image,
	View,
	TextInput,
	Text,
	AsyncStorage
} from "react-native";

// import axios from "axios";
// import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";
import { authSuccess, signOut } from "../store/modules/action/auth";
import { bindActionCreators } from "redux";
import { showMessage } from "../util";

const styles = StyleSheet.create({
	input: {
		width: "80%",
		padding: 5,
		// elevation: 2,
		borderColor: "black",
		borderBottomWidth: 0.5,
		marginBottom: 20
	},
	container: {
		width: "100%",
		flex: 1,
		alignItems: "center",
		backgroundColor: "#F5FCFF"
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	},
	formLogin: {
		marginTop: 180,
		marginBottom: 50,
		width: "100%",
		justifyContent: "center",
		alignItems: "center"
	}
});

class LoginScreen extends Component {
	constructor(props) {
		super(props);
		this.attemptLogin = this.attemptLogin.bind(this);
		this.state = {
			login: "",
			senha: ""
		};
	}
	// async componentDidMount() {
	// 	await this.props.signOut();
	// }
	async attemptLogin() {
		const { login, senha } = this.state;
		if (login && senha) {
			await this.props.authSuccess({ login, senha });
		} else {
			showMessage("Por favor preencha todos os campos", 1);
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{ width: "100%" }}>
					<Image
						source={{
							uri:
								"https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
						}}
						style={{
							height: 120,
							width: "100%",
							alignSelf: "stretch",
							position: "absolute"
						}}
					/>
					<Image
						square
						style={{
							height: 80,
							width: 210,
							paddingHorizontal: 50,
							position: "absolute",
							alignSelf: "center",
							top: 20
						}}
						source={{
							uri:
								"http://reitoria.ifpr.edu.br/wp-content/themes/ifet_1.2/images/ifpr_logo.png"
						}}
					/>
				</View>
				<View style={styles.formLogin}>
					<Text>Login</Text>
					<TextInput
						value={this.state.login}
						style={styles.input}
						onChangeText={login => this.setState({ login })}
					/>

					<Text>Senha</Text>
					<TextInput
						value={this.state.senha}
						style={styles.input}
						secureTextEntry={true}
						onChangeText={senha => this.setState({ senha })}
					/>
				</View>
				<View style={{ width: "80%" }}>
					<Button
						style={{ width: "100%", paddingVertical: 20 }}
						onPress={this.attemptLogin.bind(this)}
						title="Logar"
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = ({ user }) => ({ user });

const mapDispatchToProps = dispatch =>
	bindActionCreators({ authSuccess, signOut }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginScreen);

// export default LoginScreen;
