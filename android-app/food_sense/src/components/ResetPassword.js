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
			oldPassword: '',
      newPassword1: '',
      newPassword2: ''
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
									this.refs.oldPasswordText.focus();
								}}
							  />
					</View>

					<View style = {{marginTop:height * .02}}>
						<Fumi
						  	style = {styles.input}
							ref="oldPasswordText"
							label={'Old Password'}
							iconClass={FontAwesomeIcon}
							iconName={'key'}
							iconColor={'#26A69A'}
							secureTextEntry = {true}
							value = {this.state.oldPassword}
							onChangeText = {oldPassword => this.setState({oldPassword})}
						/>
					</View>

          <View style = {{marginTop:height * .02}}>
						<Fumi
						  	style = {styles.input}
							ref="newPasswordText1"
							label={'New Password'}
							iconClass={FontAwesomeIcon}
							iconName={'key'}
							iconColor={'#26A69A'}
							secureTextEntry = {true}
							value = {this.state.newPassword1}
							onChangeText = {newPassword1 => this.setState({newPassword1})}
						/>
					</View>

          <View style = {{marginTop:height * .02}}>
						<Fumi
						  	style = {styles.input}
							ref="newPasswordText2"
							label={'Confirm New Password'}
							iconClass={FontAwesomeIcon}
							iconName={'key'}
							iconColor={'#26A69A'}
							secureTextEntry = {true}
							value = {this.state.newPassword2}
							onChangeText = {newPassword2 => this.setState({newPassword2})}
						/>
					</View>


					<View style = {styles.responsiveSpacing}>
						<Button
							onPress = {()=>onResetPress(this.state.email, this.state.oldPassword, this.state.newPassword1, this.state.newPassword2, this.props.navigator)}
							title = "Reset Password"
							color = "#26A69A"
							accessibilityLabel="Reset your password"
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
const onResetPress = (email, _oldPassword, _newPassword1, _newPassword2, _navigator) => {
	if(!validateEmail(email))
  {
		Alert.alert("Please input a valid email address");
	}
  else if(_newPassword1 != _newPassword2)
  {
    Alert.alert("You new password entries do not match.");
  }
  else if(_oldPassword == '' || _newPassword1 == '' || _newPassword2 == '')
  {
    Alert.alert("All boxes must be filled.");
  }
	else
  {


		//attemptResetPassword(email, _oldPassword, _newPassword1, _newPassword2, _navigator);

	}
};


{/*This tests to see if an email address is in a valid format*/}
function validateEmail(email)
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

{/*TODO Integrate with database to check for valid login*/}
const attemptResetPassword = (email, _oldPassword, _newPassword1, _newPassword2, _navigator) => {
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
				_navigator.replace({
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
