import React, { Component} from 'react';
import { StyleSheet, View, Text, Alert, TextInput, StatusBar, Button, ScrollView} from 'react-native';
import Dimensions from 'Dimensions'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;


export default class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}


	render() {
		return (
			<View style={styles.container}>
				<ScrollView >
			        <StatusBar
			          backgroundColor='#009688'
			          barStyle="light-content"
			        />

					<View style={styles.logoContainer}>
						<Text style={styles.title}>Food Sense</Text>
					</View>

					<View style = {{marginTop:height * .15}}>
						<Text >Enter an Email</Text>
						<TextInput
							placeholder ="username or email"
							placeholderTextColor = "#26A69A"
							keyboardType = 'email-address'
							value ={this.state.username}
							onChangeText = {username => this.setState({username})}
							onSubmitEditing={(event) => {
								this.refs.password.focus();
							}}
						/>
					</View>

					<View style = {{marginTop:height * .02}}>
						<TextInput
							ref="password"
							placeholder ="password"
							placeholderTextColor = "#26A69A"
							style={styles.input}
						/>
					</View>

					<View style = {{marginTop: height * .1}}>
						<Button
							ref = "loginButton"
							onPress = {()=>onLoginPress(this.state.username, this.state.password, this.props.navigator)}
							title = "Login"
							color = "#26A69A"
							accessibilityLabel="Login to the Application after entering password"
						/>
					</View>

					<View style = {styles.responsiveSpacing}>
						<Button
							onPress = {()=>onSignUpPress(this.props.navigator)}
							title = "Sign Up"
							color = "#26A69A"
							accessibilityLabel="Sign Up for the Application"
						/>
					</View>
				</ScrollView>
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
		color: '#26A69A',
		marginTop: height * .05,
		textAlign: 'center',
		fontSize: 30
	},
	responsiveSpacing: {
		marginTop: height * .1
	}
});

{/* This handles login button presses*/}
const onLoginPress = (username, password, _navigator) => {
	if(!validateEmail(username)){
		Alert.alert("Please input a valid email address");
	}
	else{
		if(attemptLogin(username, password)){
			_navigator.push({
				id: 'SignUp'
			})
		}
	}
};

{/* This handles login button presses*/}
const onSignUpPress = (_navigator) => {
	_navigator.push({
		id: 'SignUp'
	})
};

{/*This tests to see if an email address is in a valid format*/}
function validateEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

{/*TODO Integrate with database to check for valid login*/}
const attemptLogin = (username, password) => {
	return true;
}
