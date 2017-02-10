import React, { Component} from 'react';
import { StyleSheet, View, Text, Button, Alert, TextInput} from 'react-native';
import Dimensions from 'Dimensions'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;

export default class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {
			username: ''
		};
	}	


	render() {
		return (
			<View style={styles.container}>
				<View style={styles.logoContainer}>
					<Text style={styles.title}>Food Sense</Text>
				</View>

				<View style = {{marginTop:height * .15}}>
					<TextInput
						autoFocus={true}
						placeholder ="username or email"
						placeholderTextColor = "#029c88"
						value ={this.state.username}
						onChangeText = {username => this.setState({username})}
					/>
				</View>

				<View style = {{marginTop:height * .02}}>
					<TextInput
						ref="password"
						placeholder ="password"
						placeholderTextColor = "#029c88"
						style={styles.input}
					/>
				</View>

				<View style = {{marginTop: height * .1}}>
					<Button
						onPress = {()=>onLoginPress(this.state.username)}
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
const onLoginPress = (username) => {
	Alert.alert(username);

};

{/* This handles login button presses*/}
const onSignUpPress = () => {
	Alert.alert("Sign up!");
};

