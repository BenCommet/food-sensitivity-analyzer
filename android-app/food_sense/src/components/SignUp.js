import React, { Component} from 'react';
import { StyleSheet } from 'react-native';
import {Container, Header, Content, Footer, Title, Text, Button, Icon, View} from 'native-base';
import Dimensions from 'Dimensions';
import headerTheme from '../Themes/headerTheme'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;
export default class SignUp extends Component{
	render() {
		return (
			<View theme={headerTheme}>
			<Container >
				<Header >
					<Button transparent>
						<Icon name="menu" />
					</Button>
					<Title>Food Sense</Title>
					<Button transparent>
						<Icon name="settings" />
					</Button>
				</Header>
			</Container>
			</View>
		);
	}
} 


