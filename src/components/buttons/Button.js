/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

"use strict";

const Platform = require("Platform");
const React = require("React");
const StyleSheet = require("StyleSheet");
const Text = require("Text");
const TouchableNativeFeedback = require("TouchableNativeFeedback");
const TouchableOpacity = require("TouchableOpacity");
const View = require("View");
import { ActivityIndicator } from "react-native";

/**
 * A basic button component that should render nicely on any platform. Supports
 * a minimal level of customization.
 *
 * <center><img src="img/buttonExample.png"></img></center>
 *
 * If this button doesn't look right for your app, you can build your own
 * button using [TouchableOpacity](docs/touchableopacity.html)
 * or [TouchableNativeFeedback](docs/touchablenativefeedback.html).
 * For inspiration, look at the [source code for this button component](https://github.com/facebook/react-native/blob/master/Libraries/Components/Button.js).
 * Or, take a look at the [wide variety of button components built by the community](https://js.coach/react-native?search=button).
 *
 * Example usage:
 *
 * ```
 * import { Button } from 'react-native';
 * ...
 *
 * <Button
 *   onPress={onPressLearnMore}
 *   title="Learn More"
 *   color="#841584"
 *   accessibilityLabel="Learn more about this purple button"
 * />
 * ```
 *
 */

class Button extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			accessibilityLabel,
			color,
			onPress,
			style,
			title,
			hasTVPreferredFocus,
			disabled,
			loading,
			testID
		} = this.props;

		const buttonStyles = [styles.button, style];
		const textStyles = [styles.text];
		if (color) {
			if (Platform.OS === "ios") {
				textStyles.push({ color: color });
			} else {
				buttonStyles.push({ backgroundColor: color });
			}
		}
		const accessibilityStates = [];
		if (disabled) {
			buttonStyles.push(styles.buttonDisabled);
			textStyles.push(styles.textDisabled);
			accessibilityStates.push("disabled");
		}

		const Touchable =
			Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;
		const formattedTitle =
			Platform.OS === "android" ? title.toUpperCase() : title;
		return (
			<Touchable
				accessibilityLabel={accessibilityLabel}
				accessibilityRole="button"
				accessibilityStates={accessibilityStates}
				hasTVPreferredFocus={hasTVPreferredFocus}
				testID={testID}
				disabled={disabled || loading}
				onPress={onPress}
			>
				<View style={buttonStyles}>
					{loading ? (
						<ActivityIndicator size="large" />
					) : (
						<Text style={textStyles} disabled={disabled}>
							{formattedTitle}
						</Text>
					)}
				</View>
			</Touchable>
		);
	}
}

const styles = StyleSheet.create({
	button: Platform.select({
		ios: {},
		android: {
			elevation: 4,
			paddingVertical: 5,
			// Material design blue from https://material.google.com/style/color.html#color-color-palette
			backgroundColor: "#2196F3",
			borderRadius: 2
		}
	}),
	text: {
		textAlign: "center",
		padding: 8,
		...Platform.select({
			ios: {
				// iOS blue from https://developer.apple.com/ios/human-interface-guidelines/visual-design/color/
				color: "#007AFF",
				fontSize: 18
			},
			android: {
				color: "white",
				fontWeight: "500"
			}
		})
	},
	buttonDisabled: Platform.select({
		ios: {},
		android: {
			elevation: 0,
			backgroundColor: "#dfdfdf"
		}
	}),
	textDisabled: Platform.select({
		ios: {
			color: "#cdcdcd"
		},
		android: {
			color: "#a1a1a1"
		}
	})
});

module.exports = Button;
