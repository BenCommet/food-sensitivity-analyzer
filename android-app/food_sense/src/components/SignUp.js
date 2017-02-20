import React, { Component} from 'react';
import { StyleSheet, View, Text, Alert, TextInput, StatusBar, ScrollView} from 'react-native';
import {Icon, Button} from 'native-base';
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
				<View style = {styles.header}>
					<View style = {styles.headerRect} >
						<Button transparent>
							<Icon name='ios-arrow-back' style={{color: "#FFFFFF", fontSize: height * .08, marginTop: height * .02}} />
						</Button>
						<Text style = {styles.headerText}>Food Sense</Text>
					</View>
				</View>
				<View>
					<ScrollView>
						<Fumi
							style = {styles.input}
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
						  <Button block style = {{marginTop: height * .02, backgroundColor: '#26A69A'}}>
						  	<Text style={{color: '#FFFFFF', fontSize: height * .03}}>
							Create Account!
							</Text>
						  </Button>
					</ScrollView>
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
		backgroundColor: '#E0F2F1'
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

const onBack = (_navigator) => {
	_navigator.push({
		id: 'SignUp'
	})
};
