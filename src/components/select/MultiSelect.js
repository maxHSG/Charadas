import React, { Component } from "react";
import {
	ListItem,
	Item,
	View,
	Text,
	List,
	Right,
	Left,
	Body,
	Label
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import Select from "./index";
import { uniqBy } from "lodash";

export default class MultiSelect extends Component {
	constructor(props) {
		super(props);

		this.state = {
			...this.props,
			visible: false,
			multiple: true,
			showLabel: false,
			returnObject: true,
			onChangeValues: this.onChangeValues.bind(this),
			onSelected: this.onSelected.bind(this)
		};
	}
	onSelected(selected) {
		const sel = uniqBy(
			[...this.state.selected, selected].filter(e => e),
			"key"
		);

		this.setState({
			selected: sel
		});
		this.props.onSelected(sel.map(s => s.key));
	}
	onClear(key) {
		const index = this.state.selected.findIndex(val => val.key == key);

		let selected = [...this.state.selected];

		selected.splice(index, 1);

		this.setState({ selected });
	}
	onChangeValues(selected) {
		this.setState({ ...this.state, selected });
	}
	renderList() {
		return this.state.selected.length
			? this.state.selected.map(({ label, key }, index) => {
					return (
						<ListItem icon key={index}>
							<Left>{this.renderIcon()}</Left>
							<Body>
								<Text>{label}</Text>
							</Body>
							<Right>
								<Icon
									name="times"
									onPress={() => this.onClear(key)}
									size={25}
									style={{ paddingRight: 10, paddingTop: 5 }}
									color="#e03e32c9"
								/>
							</Right>
						</ListItem>
					);
			  })
			: null;
	}
	renderIcon() {
		if (!this.props.iconList) return <Text />;

		return (
			<Icon
				name={this.props.iconList}
				size={25}
				color="rgba(136, 135, 135, 1)"
			/>
		);
	}
	render() {
		return (
			<View style={{ flex: 1 }}>
				{/* <Item>
					<Label>{this.props.title || "Selecione"}: </Label> */}
				<Select {...this.state} />
				{/* </Item> */}

				<View style={{ flex: 2 }}>
					<List>{this.renderList()}</List>
				</View>
			</View>
		);
	}
}
