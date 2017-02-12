import React, { Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Header, Title, Button, Subtitle, Left, Right, Body, Icon, StyleProvider } from 'native-base';
import Dimensions from 'Dimensions';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;
export default class SignUp extends Component{
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


