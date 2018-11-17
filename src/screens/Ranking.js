import React, { Component } from "react";

import { FlatList, ActivityIndicator, Text, View } from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRanking } from "../store/modules/action/ranking";
import { MainHeader } from "../components";

export class Ranking extends Component {
	constructor(props) {
		super(props);

		this.renderItem = this.renderItem.bind(this);
	}

	componentDidMount() {
		this.props.getRanking();
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
							flexDirection: "row",
							paddingHorizontal: 20,
							marginVertical: 10
						}}
					>
						<View
							style={{
								flexDirection: "row",
								flex: 1
							}}
						>
							<Icon size={20} name="thumbs-o-up" />
							<Text style={{ marginLeft: 5 }}>{item.acertou}</Text>
						</View>
						<View
							style={{
								flexDirection: "row",
								flex: 1
							}}
						>
							<Icon size={20} name="clock-o" />
							<Text style={{ marginLeft: 5 }}>{item.tempo} Min.</Text>
						</View>
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
					data={this.props.ranking}
					renderItem={this.renderItem}
				/>
			</View>
		);
	}
	render() {
		return (
			<View style={{ flex: 1, flexDirection: "column" }}>
				<MainHeader leftBack {...this.props} title="Ranking" />
				{this.renderList()}
			</View>
		);
	}
}

const mapStateToProps = ({ user, ranking, loading }) => ({
	user,
	ranking,
	loading
});
const mapDispatchToProps = dispatch =>
	bindActionCreators({ getRanking }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Ranking);
