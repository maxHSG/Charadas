import React, { Component } from "react";

import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getPuzzle } from "../store/modules/action/puzzle";
import { MainHeader } from "../components";
import { Text, ActivityIndicator, View, Image } from "react-native";
import { Button } from "react-native-elements";
import { RadioGroup } from "../components";
import http from "../http";
import { showMessage } from "../util";

export class Puzzle extends Component {
	constructor(props) {
		super(props);
		this.state = { answers: null, question: 1 };
	}

	async componentDidMount() {
		const respostas = await http.get(`/respostas/${this.props.user.id}`);

		const lastResposta = respostas[respostas.length - 1];

		if (lastResposta) {
			await this.setState({
				question: parseInt(lastResposta.id_pergunta) + 1
			});
		}
		await this.props.getPuzzle();
		await this.getAnswers();
	}
	async getAnswers() {
		const puzzle = this.props.puzzle.find(p => p.id == this.state.question);

		await this.setState({
			answers: [
				{
					leftLabel: "A) ",
					label: puzzle.resp_a,
					value: "A",
					selected: true
				},
				{ leftLabel: "B) ", label: puzzle.resp_b, value: "B" },
				{ leftLabel: "C) ", label: puzzle.resp_c, value: "C" }
			]
		});
	}

	async sendAnswer(id_pergunta) {
		try {
			const result = await http.post("/responder/", {
				id_usuario: this.props.user.id,
				id_pergunta,
				resposta: this.state.answers.find(a => a.selected).value
			});

			if (parseInt(result.id) >= 0) {
				showMessage(result.msg.replace("[OK]: ", ""));
				await this.setState({ question: parseInt(this.state.question) + 1 });
				await this.getAnswers();
			} else {
				showMessage(result.msg.replace("[ERRO]: ", ""), 1);
			}
		} catch (error) {}
	}

	renderQuestion(puzzle) {
		if (this.state.question > 4) {
			return (
				<View
					style={{
						backgroundColor: "white",
						margin: 5,
						elevation: 5,
						padding: 20
					}}
				>
					<Text style={{ fontSize: 18, marginBottom: 10 }}>
						Parabéns você completou todas as charadas
					</Text>
					<Button
						onPress={() => this.props.navigation.navigate("Ranking")}
						backgroundColor="#03A9F4"
						buttonStyle={{
							paddingVertical: 5,
							borderRadius: 0,
							marginLeft: 0,
							marginRight: 0,
							marginBottom: 10
						}}
						title="	Veja os Ranking"
					/>
				</View>
			);
		}

		if (this.props.loading || !puzzle || !this.state.answers) {
			return (
				<View style={{ flex: 1 }}>
					<ActivityIndicator style={{ marginVertical: 5 }} size="large" />
				</View>
			);
		}

		if (!puzzle || !this.state.answers) return null;

		return (
			<View style={{ flex: 1 }}>
				<View style={{ backgroundColor: "white", elevation: 5 }}>
					<Image
						source={{ uri: puzzle.link, width: "100%", height: 256 }}
						resizeMode={"stretch"}
					/>
					<View style={{ marginVertical: 10 }}>
						<RadioGroup
							styleRadio={{ alignItems: "flex-start" }}
							radioButtons={this.state.answers}
							onPress={answers => this.setState({ answers })}
						/>
					</View>
					<Button
						onPress={() => this.sendAnswer(puzzle.id)}
						icon={<Icon name="check" color="#ffffff" size={20} />}
						backgroundColor="#03A9F4"
						buttonStyle={{
							borderRadius: 0,
							padding: 5,
							marginVertical: 15,
							marginHorizontal: 10
						}}
						title="Enviar"
					/>
				</View>
			</View>
		);
	}
	render() {
		const puzzle = this.props.puzzle.find(p => p.id == this.state.question);

		return (
			<View style={{ flex: 1 }}>
				<MainHeader title="Charadas" {...this.props} leftBack />
				{this.renderQuestion(puzzle)}
			</View>
		);
	}
}

const mapStateToProps = ({ user, puzzle, util }) => ({
	user,
	puzzle,
	loading: util.loading
});
const mapDispatchToProps = dispatch =>
	bindActionCreators({ getPuzzle }, dispatch);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Puzzle);
