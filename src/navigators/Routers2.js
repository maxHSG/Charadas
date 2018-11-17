import React from "react";
import LoginScreen from "./../screens/LoginScreen";
import HomeScreen from "./../screens/HomeScreen";
// import ProfileScreen fr../screens/tarefaleScreen";
import ListUsersScreen from "./../screens/users/ListScreen";
import FormUserScreen from "../screens/users/FormScreen";
import Icon from "react-native-vector-icons/FontAwesome";

import ListRoutesScreen from "../screens/routes/ListScreen";
import FormRouteScreen from "../screens/routes/FormScreen";

import ListParkingsScreen from "../screens/parkings/ListScreen";
import FormParkingscreen from "../screens/parkings/FormScreen";

import AreaScreen from "../screens/routes/AreaScreen";
import { createStackNavigator } from "react-navigation";

export default {
	Home: {
		screen: HomeScreen,
		navigationOptions: () => ({
			drawerIcon: <Icon name="home" size={20} />
		})
	},
	Parking: {
		screen: createStackNavigator(
			{
				ListParkings: { screen: ListParkingsScreen },
				FormParking: { screen: FormParkingscreen }
			},
			{ initialRouteName: "ListParkings", headerMode: "none" }
		),
		navigationOptions: () => ({
			drawerLabel: "Perto",
			drawerIcon: <Icon name="road" size={20} />
		})
	},
	Users: {
		screen: createStackNavigator(
			{
				ListUsers: { screen: ListUsersScreen },
				FormUser: { screen: FormUserScreen }
			},
			{ initialRouteName: "ListUsers", headerMode: "none" }
		),
		navigationOptions: () => ({
			drawerLabel: "Usuários",
			drawerIcon: <Icon name="users" size={20} />
		})
	},

	Routes: {
		screen: createStackNavigator(
			{
				ListRoutes: { screen: ListRoutesScreen },
				FormRoute: { screen: FormRouteScreen }
			},
			{ initialRouteName: "ListRoutes", headerMode: "none" }
		),
		navigationOptions: () => ({
			drawerLabel: "Rotas",
			drawerIcon: <Icon name="road" size={20} />
		})
	},

	Logout: {
		screen: LoginScreen,
		navigationOptions: () => ({
			drawerLockMode: "locked-closed",
			drawerIcon: <Icon name="sign-out" size={20} />
		})
	}
};
