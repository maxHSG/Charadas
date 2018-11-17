import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";
import { Text, Container, List, ListItem, Content } from "native-base";
import Routers from "./../navigators/Routers";
import { DrawerItems, SafeAreaView, NavigationActions } from "react-navigation";

import { connect } from "react-redux";
export class SideBar extends Component {
	styles = { item: { marginTop: 150 } };

	constructor(props) {
		super(props);
		this.renderRow = this.renderRow.bind(this);
	}

	profile() {
		console.log("User", this.props);

		const action = NavigationActions.navigate({
			routeName: "FormUser",
			params: { user: this.props.user }
		});

		this.props.navigation.dispatch(action);
	}

	propsDrawerItem() {
		return { itemsContainerStyle: this.styles.item, ...this.props };
	}

	renderRow(data) {
		if (data !== "Dominios") {
			return (
				<ListItem button onPress={() => this.props.navigation.navigate(data)}>
					<Text>{data}</Text>
				</ListItem>
			);
		}

		return null;
	}
	render() {
		const { user, navigation } = this.props;

		return (
			<Container>
				<Content>
					<Image
						source={{
							uri:
								"https://raw.githubusercontent.com/GeekyAnts/NativeBase-KitchenSink/master/assets/drawer-cover.png"
						}}
						style={{
							height: 150,
							width: "100%",
							alignSelf: "stretch",
							position: "absolute"
						}}
					/>

					<View
						style={
							{
								//paddingHorizontal: 50,
								position: "absolute",
								top: 10,
								left: 10
							} //alignSelf: "center",
						}
					>
						<Image
							style={{
								flex: 1,
								borderRadius: 100,
								marginVertical: 5,
								marginBottom: 10
							}}
							source={{ uri: user.avatar, width: 60, height: 60 }}
						/>

						<TouchableOpacity
							onPress={e => {
								e.stopPropagation();
								this.profile();
							}}
						>
							<Text style={{ color: "white", fontWeight: "bold" }}>
								{user.name}
							</Text>
							<Text style={{ color: "white", fontSize: 12 }}>{user.email}</Text>
						</TouchableOpacity>
					</View>

					<DrawerItems {...this.propsDrawerItem()} />
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ user, util }) => ({
	user: user,
	loading: util.loading
});
export default connect(mapStateToProps)(SideBar);
