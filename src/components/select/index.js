import React, { Component } from "react";
import { Label, Input, Item, Container, View, Text } from "native-base";
import ModalFilterPicker from "./../../components/modal-filter-picker/src";
import http from "./../../http/index";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Select extends Component {
	constructor(props) {
		super(props);

		this.state = {
			url: this.props.url || "",
			options: this.props.options || [],
			visible: false,
			activeLabel: "",
			multiple: this.props.multiple || false,
			selected: this.props.selected || "",
			allowClear: this.props.allowClear,
			showLabel:
				this.props.showLabel !== undefined ? this.props.showLabel : true,
			returnObject: this.props.returnObject
		};
	}
	formatOptions(options) {
		return options
			? options.map(option => ({
					label: option.text,
					key: option.id
			  }))
			: [];
	}
	async componentDidMount() {
		if (this.state.url) {
			try {
				const { data, status } = await http.get(this.state.url, {
					params: this.state.selected ? { selected: this.state.selected } : {}
				});

				const options = this.formatOptions(data.results);

				if (status === 200) {
					this.setState({
						...this.state,
						options
					});

					if (this.state.selected.length) {
						if (this.state.multiple) this.props.onChangeValues(options);
						else this.setState({ ...this.state, selected: selected.label });
					}
				}
			} catch (err) {
				console.log("Formtarefas", err);
			}
		}
	}

	onShow() {
		this.setState({
			...this.state,
			visible: true
		});
	}

	onSelect(selected) {
		const optionSelected = this.state.options.find(opt => opt.key == selected);

		this.setState({
			...this.state,
			selected: optionSelected.label,
			visible: false
		});

		this.props.onSelected(this.state.returnObject ? optionSelected : selected);
	}

	onCancel() {
		this.setState({
			...this.state,
			visible: false
		});
	}
	clear() {
		this.setState({
			...this.state,
			selected: ""
		});
	}
	async onFilterChange(text) {
		if (this.state.url) {
			try {
				const { data, status } = await http.get(this.state.url, {
					params: { term: text }
				});

				if (status == 200) {
					this.setState({
						...this.state,
						options: this.formatOptions(data.results)
					});
				}
			} catch (error) {}
		}
	}

	render() {
		const iconTimes = (
			<Icon
				name="times"
				size={25}
				style={{ paddingRight: 10, paddingTop: 10 }}
				color="#e03e32c9"
				onPress={this.clear.bind(this)}
			/>
		);
		return (
			<View style={{ flex: 1, flexDirection: "row" }}>
				<TouchableOpacity style={{ flex: 1 }} onPress={this.onShow.bind(this)}>
					<Input
						placeholderTextColor={this.props.placeholderTextColor || "#d3d3d3"}
						placeholder={this.props.placeholder || "clique para adicionar"}
						value={
							this.state.showLabel && !this.state.multiple
								? this.state.selected
								: ""
						}
						editable={false}
					/>
				</TouchableOpacity>

				{this.state.allowClear ? iconTimes : null}

				<ModalFilterPicker
					onFilterChange={this.onFilterChange.bind(this)}
					visible={this.state.visible}
					onSelect={this.onSelect.bind(this)}
					onCancel={this.onCancel.bind(this)}
					options={this.state.options || []}
				/>
			</View>
		);
	}
}
