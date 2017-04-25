import React, { Component} from 'react';
import { StyleSheet, View, Text, Alert, TextInput, StatusBar, ScrollView, Button} from 'react-native';
import {Icon} from 'native-base';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Fumi } from 'react-native-textinput-effects';
import Dimensions from 'Dimensions';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;

export default class SignUp extends Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			confirmPassword:''
		};
	}
	render() {
		return (
			<View style={styles.container}>
				<View>
					<View style={styles.logoContainer}>
						<Text style={styles.title}>Food Sense</Text>
					</View>
					<ScrollView>
						<Fumi
							style = {{marginTop: height * .15}}
							label={'Username'}
							iconClass={FontAwesomeIcon}
							iconName={'envelope'}
							iconColor={'#26A69A'}
							value = {this.state.username}
							onChangeText = {username => this.setState({username})}
							onSubmitEditing={(event) => {
								this.refs.emailText.focus();
							}}
						  />
						<Fumi
						  	style = {styles.input}
							ref="emailText"
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
						<Fumi
						  	style = {styles.input}
							ref="passwordText"
							label={'Create a Password'}
							iconClass={FontAwesomeIcon}
							iconName={'key'}
							iconColor={'#26A69A'}
							secureTextEntry = {true}
							value = {this.state.password}
							onChangeText = {password => this.setState({password})}
							onSubmitEditing={(event) => {
								this.refs.confirmPasswordText.focus();
							}}
						  />
						  <Fumi
						  	style = {styles.input}
						  	ref="confirmPasswordText"
  							label={'Confirm Password'}
  							iconClass={FontAwesomeIcon}
  							iconName={'key'}
							secureTextEntry = {true}
  							iconColor={'#26A69A'}
  							value = {this.state.confirmPassword}
  							onChangeText = {confirmPassword => this.setState({confirmPassword})}
  							onSubmitEditing={(event) => {
  							}}
  						  />
						  <View style = {{marginTop: height * .05}}>
	  						<Button
	  							ref = "loginButton"
	  							onPress = {()=>attemptCreateAccount(this.state.username, this.state.email, this.state.password, this.state.confirmPassword, this.props.navigator)}
	  							title = "Create Account"
	  							color = "#26A69A"
	  							accessibilityLabel="Login to the Application after entering password"
	  						/>
	  					</View>
					</ScrollView>
				</View>

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
		marginTop: 0
	},
	header: {

	},
	headerRect:{
		width: width,
		height: height * .1,
		backgroundColor: '#26A69A',
		flexDirection: 'row'
	},
	headerText:{
		textAlign: 'center',
		width: width * .5,
		fontSize: height * .07,
		color: "#FFFFFF"
	},
	input:{
		marginTop: height * .01
	},
	buttonStyle:{
		marginTop:height * .02,
		width: width * .95
	}



});

{/*This tests to see if an email address is in a valid format*/}
function validateEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function attemptCreateAccount(_username, _email, _password, _confirmPassword, _navigator){

	/*Make sure email is valid*/
	if(!validateEmail(_email))
	{
		Alert.alert("Please input a valid email address");
	}
	/*Make sure passwords match*/
	else if ( _password != _confirmPassword)
	{
		Alert.alert("Passwords do not match");
	}
	else
	{

			/*validate email does not already belong to a user*/

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

					//TODO remove this debug line
				  //Alert.alert("Response received!" + request.responseText);

					response = request.responseText;

					/*Valid new email*/
					if(request.responseText == 'T')
					{
						//TODO move to journal page
						Alert.alert("Welcome, " + _username + "!");
					}
					/*There is already a user with this email*/
					else if (request.responseText == 'F')
					{
						Alert.alert('There is already a user with this email.');
					}
					/*An error occurred*/
					else
					{
						Alert.alert('There was an error validating the email. Response:' + request.responseText);
					}




			  } else {
			    console.warn('error');
					//TODO remove this debug line
				  Alert.alert("Response NOT received!");
			  }
			};


			var url = 'http://www.cis.gvsu.edu/~hickoxm/FSArequest.php';
			url = url + '?requestType=userSignUp';
			url = url + '&userName=';
			url = url + _username;
			url = url + '&password=';
			url = url + _password;
			url = url + '&email=';
			url = url + _email;
			//Alert.alert(_email);


			request.open('GET', url);
			request.send();
			//------------------------------------------------------


	}
}
