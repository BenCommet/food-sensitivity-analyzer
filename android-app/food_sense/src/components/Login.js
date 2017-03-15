import React, { Component} from 'react';
import { StyleSheet, View, Text, Alert, TextInput, StatusBar, Button, ScrollView} from 'react-native';
import { Fumi } from 'react-native-textinput-effects';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;

theEmail = "";
export default class Login extends Component{
	constructor(props) {
		super(props);
		this.state = {
			email: '',
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
							<Fumi
							  	style = {styles.input}
								label={'Email'}
								iconClass={FontAwesomeIcon}
								iconName={'envelope'}
								iconColor={'#26A69A'}
								value = {this.state.email}
								onChangeText = {email => this.setState({email})}
								onSubmitEditing={(event) => {
									this.refs.passwordText.focus();
								}}
							  />
					</View>

					<View style = {{marginTop:height * .02}}>
						<Fumi
						  	style = {styles.input}
							ref="passwordText"
							label={'Enter Password'}
							iconClass={FontAwesomeIcon}
							iconName={'key'}
							iconColor={'#26A69A'}
							secureTextEntry = {true}
							value = {this.state.password}
							onChangeText = {password => this.setState({password})}
						/>
					</View>

					<View style = {{marginTop: height * .1}}>
						<Button
							ref = "loginButton"
							onPress = {()=>onLoginPress(this.state.email, this.state.password, this.props.navigator)}
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
		padding: width * .02
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
const onLoginPress = (email, password, _navigator) => {
	if(!validateEmail(email)){
		Alert.alert("Please input a valid email address");
	}
	else{

		attemptLogin(email, password, _navigator);

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
const attemptLogin = (email, password, _navigator) => {
	theEmail = email;
	/*validate user email/password */


	//Data Request---------------------------------
	var request = new XMLHttpRequest();
	var response;
	request.responseType = "";
	request.onreadystatechange = (e) => {
		if (request.readyState !== 4) {
			return;
		}

		if (request.status === 200) {
			console.log('success', request.responseText);



			/*Password is wrong*/
			if(request.responseText == 'Incorrect Password.')
			{
				Alert.alert("Incorrect password.");
			}
			/*Email is wrong*/
			else if (request.responseText == 'No such user.')
			{
				Alert.alert('There is no user with this email.');
			}
			/**/
			else if (request.responseText == 'Success.')
			{
				//Alert.alert('Success.');
				_navigator.push({
					id: 'Journal',
					userEmail: email
				})
			}
			/*An error occurred*/
			else
			{
				Alert.alert('There was an error attempting to log in. Response:' + request.responseText);
			}

		}
		else
		{
			console.warn('error');
			//TODO remove this debug line
			Alert.alert("Response NOT received!");
		}

	};


	var url = 'http://www.cis.gvsu.edu/~hickoxm/FSArequest.php';
	url = url + '?requestType=userLogin';
	url = url + '&password=';
	url = url + password;
	url = url + '&email=';
	url = url + email;
	//Alert.alert(_email);


	request.open('GET', url);
	request.send();
	//------------------------------------------------------

	return true;
}
