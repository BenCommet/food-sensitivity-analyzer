import React, { Component} from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import {Container, Content, Header, Title, Button, Subtitle, Left, 
	Right, Body, Icon, Tabs} from 'native-base';
import Dimensions from 'Dimensions';

import JournalTab from './JournalTab';
import PredictorTab from './PredictorTab';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;

export default class Journal extends Component{
	render() {
		return (
			<Container theme = {{brandPrimary:'#029c88'}}>
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

				<Content>
					<View>
						<StatusBar
							backgroundColor='#029c88'
							barStyle="light-content"
						/>
					</View>
					<Tabs style = {styles.tabStyle}>
						<JournalTab tabLabel='Journal' />
						<PredictorTab tabLabel='Predictor' />
					</Tabs>
				</Content>
			</Container>
		);
	}
} 

const styles = StyleSheet.create({
	tabStyle:{
		backgroundColor: '#029c88'
	}

});