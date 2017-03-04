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
								this.refs.passwordText.focus();
							}}
						  />
						<Fumi
						  	style = {styles.input}
							label={'Email'}
							iconClass={FontAwesomeIcon}
							iconName={'envelope'}
							iconColor={'#26A69A'}
							value = {this.state.username}
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
  								this.refs.passwordText.focus();
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

function attemptCreateAccount(_username, _email, _password, _currentPassword, _navigator){
	if(!validateEmail(_email)){
		Alert.alert("Please input a valid email address");
	}
}
