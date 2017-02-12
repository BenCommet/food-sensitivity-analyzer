import React, { Component} from 'react';
import { StyleSheet, View, Alert, TextInput, StatusBar, Button} from 'react-native';
import Dimensions from 'Dimensions'
import {Container, Content, Text } from 'native-base';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;

export default class JournalTab extends Component{
	render() {
		return (
			<Container >
				<Content>
					<Text>Journal</Text>
				</Content>
			</Container>
		);
	}
} 
