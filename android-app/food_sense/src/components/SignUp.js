import React, { Component} from 'react';
import { StyleSheet, View, Text, Alert, TextInput, StatusBar, ScrollView} from 'react-native';
import {Icon, Button} from 'native-base';
import Dimensions from 'Dimensions';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;

export default class SignUp extends Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
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
						<Text >Enter an Email</Text>
						<TextInput
							placeholder ="Email"
							placeholderTextColor = "#26A69A"
							keyboardType = 'email-address'
							value ={this.state.username}
							onChangeText = {username => this.setState({username})}
							onSubmitEditing={(event) => {
								this.refs.passwordText.focus();
							}}
						/>
						<TextInput
							ref="passwordText"
							placeholder ="Pick Password"
							placeholderTextColor = "#26A69A"
							secureTextEntry = {true}
							value ={this.state.password}
							onChangeText = {password => this.setState({password})}
							onSubmitEditing={(event) => {
								this.refs.confirmPasswordText.focus();
							}}
						/>
						<TextInput
							ref="confirmPasswordText"
							placeholder ="Confirm Password"
							placeholderTextColor = "#26A69A"
							secureTextEntry = {true}
							value ={this.state.confirmPassword}
							onChangeText = {confirmPassword => this.setState({confirmPassword})}
							onSubmitEditing={(event) => {
								this.refs.password.focus();
							}}
						/>
					</ScrollView>
				</View>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex:1,
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
	}


});

const onBack = (_navigator) => {
	_navigator.push({
		id: 'SignUp'
	})
};
