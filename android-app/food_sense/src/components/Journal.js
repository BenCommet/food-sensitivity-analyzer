import React, { Component} from 'react';
import { StyleSheet, View, StatusBar, ScrollView } from 'react-native';
import {Container, Content, Header, Title, Button, Subtitle, Left,
	Right, Body, Card, CardItem, Text, Fab} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';

import JournalTab from './JournalTab';
import PredictorTab from './PredictorTab';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;

var cardData = [{name: "Chicken Sandwich", isSymptom: false, onsetDate: "Wednesday", onsetTime: '4:00 pm'},
{name: "Headache", isSymptom: true, onsetDate: "Tuesday", onsetTime: '6:00 am'},
{name: "Tomato Soup", isSymptom: false, onsetDate: "Tuesday", onsetTime: '1:00 pm'},
{name: "McDouble", isSymptom: false, onsetDate: "Monday", onsetTime: '8:00 pm'},
{name: "Captain Crunch", isSymptom: false, onsetDate: "Sunday", onsetTime: '9:00 am'},
{name: "Headache", isSymptom: true, onsetDate: "Sunday", onsetTime: '10:00 pm'}];
var cards = [];
for(var i = 0; i < cardData.length; i++){
	var cardObject = cardData[i];
	if(cardObject.isSymptom){
		cards.push(makeSymptomCard(cardObject, i));
	}
	else{ cards.push(makeFoodCard(cardObject, i)); }
}
export default class Journal extends Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			active: false
		};
	}

	render() {
		return (
			<View>
				<ScrollView>
					{cards}
				</ScrollView>
				<Fab
                    active={this.state.active}
                    direction="up"
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
					color="#26A69A"
                    onPress={() => this.setState({ active: !this.state.active })}
                >
                    <Icon name="plus" />
					<Button style={{ backgroundColor: '#26A69A' }}>
                            <Icon
							 	active name ='apple'
							 	size = {height * .04}
								color = "#FFFFFF"
							/>
                    </Button>
					<Button style={{ backgroundColor: '#26A69A' }}>
                            <Icon
							 	active name ='heartbeat'
							 	size = {height * .04}
								color = "#FFFFFF"
							/>
                    </Button>
                </Fab>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	tabStyle:{
		backgroundColor: '#029c88'
	},
	cardHeaderText:{
		fontSize: height * .05
	}

});

function makeSymptomCard(cardObject, pos){
	var card = <View key={pos}>
		<Card>
			<CardItem header>
				<Left>
					<Icon
						active name ='heartbeat'
						size = {height * .07}
						color = "#f44842"
					/>
				</Left>
				<Text style = {{fontSize: height * .04}}>{cardObject.name}</Text>
				<Right>
					<Icon.Button
						backgroundColor = "transparent"
						active name ='angle-down'
						size = {height * .04}
						color = "#f44842"
					/>
				</Right>
			</CardItem>
			<CardItem>
				<Left/>
				<Text style = {{fontSize: height * .03}}>{"Onset: " + cardObject.onsetDate + " " + cardObject.onsetTime}</Text>
			</CardItem>
		</Card>
	</View>
	return card
}

function makeFoodCard(cardObject, pos){
	var card = <View key={pos}>
		<Card>
			<CardItem header>
				<Left>
					<Icon
					 	active name ='apple'
					 	size = {height * .07}
						color = "#f44842"
					/>
				</Left>
				<Text style = {{fontSize: height * .04}}>{cardObject.name}</Text>
				<Right>
					<Icon
						active name ='angle-down'
						size = {height * .04}
						color = "#f44842"
					/>
				</Right>
			</CardItem>
			<CardItem>
				<Left/>
				<Text style = {{fontSize: height * .03}}>{"Onset: " + cardObject.onsetDate + " " + cardObject.onsetTime}</Text>
			</CardItem>
		</Card>
	</View>
	return card
}
