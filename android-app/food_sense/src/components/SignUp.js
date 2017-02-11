import React, { Component} from 'react';
import { StyleSheet, View } from 'react-native';
import {Container, Header, Content, Footer, Title, Text, Button, Icon} from 'native-base';
import Dimensions from 'Dimensions';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;
export default class SignUp extends Component{
	render() {
		return (
			<Container theme={headerTheme}>
				<Header>
					<Button transparent>
						<Icon name="menu" />
					</Button>
					<Title>Food Sense</Title>
					<Button transparent>
						<Icon name="settings" />
					</Button>
				</Header>
			</Container>
		);
	}
} 



const headerTheme = {
	toolbarDefaultBg: '#fff'
}