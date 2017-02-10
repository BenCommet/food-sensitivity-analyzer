import React, { Component} from 'react';
import { StyleSheet, View, Text, Button, Alert, TextInput} from 'react-native';
import Dimensions from 'Dimensions'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;

export default class Login extends Component{
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.logoContainer}>
					<Text style={styles.title}>Food Sense</Text>
				</View>

				<View style = {styles.responsiveSpacing}>
					<TextInput
						placeholder ="username or email"
						placeholderTextColor = "#029c88"
						style={styles.input}
					/>
				</View>

				<View style = {styles.responsiveSpacing}>
					<Button
						onPress = {onLoginPress}
						title = "Login"
						color = "#029c88"
						accessibilityLabel="Login to the Application after entering password"
					/>
				</View>

				<View style = {styles.responsiveSpacing}>
					<Button
						onPress = {onLoginPress}
						title = "Sign Up"
						color = "#029c88"
						accessibilityLabel="Sign Up for the Application"
					/>
				</View>
			</View>
		);
	}
} 

const styles = StyleSheet.create({
	container: {
		flex:1,
		padding: 20
	},
	logoContainer: {
		alignItems: 'center',
	},
	title: {
		color: '#029c88',
		marginTop: height * .05,
		textAlign: 'center',
		fontSize: 30
	},
	input: {
		opacity: .5,
		color: '#029c88'
	},
	responsiveSpacing: {
		marginTop: height * .1
	}
});

{/* This handles login button presses*/}
const onLoginPress = () => {
	Alert.alert('You poked me!');
};

{/* This handles login button presses*/}
const onSignUpPress = () => {
	Alert.alert("Sign up!");
};

