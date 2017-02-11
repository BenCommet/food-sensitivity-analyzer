import React, { Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Header, Title, Button, Subtitle, Left, Right, Body, Icon, StyleProvider } from 'native-base';
import Dimensions from 'Dimensions';
import headerTheme from '../Themes/headerTheme'
import getTheme from '../native-base-theme';
import material from '../native-base-theme/material';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;
export default class SignUp extends Component{
	render() {
		return (
			<StyleProvider style={getTheme(material)}
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
			</StyleProvider>
		);
	}
} 


