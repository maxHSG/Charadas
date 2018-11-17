import React from "react";
import LoginScreen from "../screens/Login";
import HomeScreen from "../screens/Home";
import RankingScreen from "../screens/Ranking";
import PuzzleScreen from "../screens/Puzzle";
import UsersScreen from "../screens/Users";
// import ProfileScreen fr../screens/tarefaleScreen";

export default {
	Home: {
		screen: HomeScreen
	},
	Ranking: {
		screen: RankingScreen
	},
	Puzzle: {
		screen: PuzzleScreen
	},
	Users: {
		screen: UsersScreen
	},
	Login: {
		screen: LoginScreen
	}
};
