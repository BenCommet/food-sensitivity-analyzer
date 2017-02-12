import React, { Component} from 'react';
import { StyleSheet, View, Text, Alert, TextInput, StatusBar, Button} from 'react-native';
import Dimensions from 'Dimensions'
import {Container, Content } from 'native-base';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;

export default class CLASSNAME extends Component{
	render() {
		return (
			<Container >
				<Header style = {{backgroundColor: '#029c88'}}>
					<Left>
						<Button transparent>
							<Icon name="menu" />
						</Button>
					</Left>
					<Body>
						<Title>Food Sense</Title>
					</Body>
					<Right>
						<Button transparent>
							<Icon name="settings" />
						</Button>
					</Right>
				</Header>
			</Container>
		);
	}
} 

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});