import React, { Component } from "react";

import { FlatList, ActivityIndicator, Text, View } from "react-native";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUsers } from "../store/modules/action/users";
import { MainHeader } from "../components";

export class Users extends Component {
	constructor(props) {
		super(props);

		this.renderItem = this.renderItem.bind(this);
	}

	componentDidMount() {
		this.props.getUsers();
	}

	// renderFooter() {
	// 	if (this.props.dominios.length === this.props.total) {
	// 		return (
	// 			<View
	// 				style={{ flex: 1, justifyContent: "center", flexDirection: "row" }}
	// 			>
	// 				<Text style={{ fontSize: 15, marginVertical: 10, color: "#9c9c9c" }}>
	// 					Não há domínios.
	// 				</Text>
	// 			</View>
	// 		);
	// 	}

	// 	return (
	// 		<View style={{ flex: 1 }}>
	// 			<ActivityIndicator style={{ marginVertical: 5 }} size="large" />
	// 		</View>
	// 	);
	// }

	renderItem({ item }) {
		return (
			<View>
				<View
					style={{
						flex: 1,
						flexDirection: "column",
						padding: 5,
						borderRadius: 4,
						margin: 5,
						backgroundColor: "white",
						elevation: 5
					}}
				>
					<View
						style={{
							paddingHorizontal: 10,
							paddingTop: 5,
							paddingBottom: 10,
							borderBottomWidth: 1,
							borderColor: "rgba(0,0,0,.2)"
						}}
					>
						<Text style={{ fontSize: 16, fontWeight: "bold" }}>
							{item.nome}
						</Text>
					</View>

					<View
						style={{
							flex: 2,
							flexDirection: "row"

							// paddingHorizontal: 20,
							// marginVertical: 10
						}}
					>
						<View
							style={{
								flexDirection: "column",
								flex: 2
							}}
						>
							<Text
								style={{
									// textAlign: "center",
									borderBottomWidth: 1,
									borderBottomColor: "rgba(0,0,0,.3)"
								}}
							>
								Charadas
							</Text>
							<Text
								style={{
									borderBottomWidth: 1,
									borderBottomColor: "rgba(0,0,0,.3)"
								}}
							>
								R.usuário
							</Text>
							<Text>R.correta</Text>
						</View>

						{item.respostas.map(resposta => {
							console.log("resposta", resposta);
							return (
								<View
									key={resposta.id_pergunta.toString()}
									style={{ flexDirection: "column", flex: 1 }}
								>
									<Text
										style={{
											// textAlign: "center",
											borderBottomWidth: 1,
											borderBottomColor: "rgba(0,0,0,.3)"
										}}
									>
										{resposta.id_pergunta}
									</Text>
									<Text
										style={{
											borderBottomWidth: 1,
											borderBottomColor: "rgba(0,0,0,.3)"
										}}
									>
										{resposta.resposta}
									</Text>
									<Text>{resposta.correto}</Text>
								</View>
							);
						})}
					</View>
				</View>
			</View>
		);
	}
	renderList() {
		if (this.props.loading) {
			return (
				<View style={{ flex: 1 }}>
					<ActivityIndicator style={{ marginTop: 10 }} size="large" />
				</View>
			);
		}

		return (
			<View style={{ flex: 2 }}>
				<FlatList
					// onEndReachedThreshold={0.5}
					// onEndReached={debounce(this.loadDominios.bind(this), 500)}
					// ListFooterComponent={this.renderFooter.bind(this)}
					keyExtractor={item => item.id.toString()}
					extraData={this.state}
					data={this.props.users}
					renderItem={this.renderItem}
				/>
			</View>
		);
	}
	render() {
		// const user = () => {
		// 	return <Icon name="user" size={25} onPress={() => this.props.navigation.navigate('user')}/>;
		// };

		return (
			<View style={{ flex: 1, flexDirection: "column" }}>
				<MainHeader title="Usuários" leftBack {...this.props} />
				{this.renderList()}
			</View>
		);
	}
}

const mapStateToProps = ({ user, users, loading }) => ({
	user,
	users,
	loading
});
const mapDispatchToProps = dispatch =>
	bindActionCreators({ getUsers }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Users);
