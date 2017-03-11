import React, { Component} from 'react';
import { StyleSheet, View, StatusBar, ScrollView, Modal, TouchableHighlight, Picker} from 'react-native';
import {Container, Content, Header, Title, Button, Subtitle, Left,
	Right, Body, Card, CardItem, Text, Fab} from 'native-base';
const Item = Picker.Item;
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';


import DatePicker from 'react-native-datepicker';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;

currentDate = getFullDate();

var cardData = [{name: "Chicken Sandwich", isSymptom: false, onsetDate: "Wednesday", onsetTime: '4:00 pm'},
{name: "Headache", isSymptom: true, onsetDate: "Tuesday", onsetTime: '6:00 am'},
{name: "Tomato Soup", isSymptom: false, onsetDate: "Tuesday", onsetTime: '1:00 pm'},
{name: "McDouble", isSymptom: false, onsetDate: "Monday", onsetTime: '8:00 pm'},
{name: "Captain Crunch", isSymptom: false, onsetDate: "Sunday", onsetTime: '9:00 am'},
{name: "Headache", isSymptom: true, onsetDate: "Sunday", onsetTime: '10:00 pm'}];
var recentFoods = ["Chicken Sandwich", "Tomato Soup", "McDouble", "Captain Crunch"];
var recentFoodsPicker = [];
var recentSymptoms =["Headache", "Runny Nose"];
var recentSymptomsPicker =[];
var cards = [];
for(var i = 0; i < cardData.length; i++){
	var cardObject = cardData[i];
	if(cardObject.isSymptom){
		cards.push(makeSymptomCard(cardObject, i));
	}
	else{ cards.push(makeFoodCard(cardObject, i)); }
}
for(var i = 0; i < recentFoods.length; i++){
	recentFoodsPicker.push(<Item label={recentFoods[i]} key = {i}/>);
}
for(var i = 0; i < recentSymptoms.length; i++){
	recentSymptomsPicker.push(<Item label={recentSymptoms[i]} key = {i}/>);
}
export default class Journal extends Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
			active: false,
			symptomModalVisible: false,
			foodModalVisible: true,
			selectedItem: undefined,
			newName: 'recentFoods',
			date: "2016-05-15"
		};
	}

	setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
	onValueChange (value: string) {
        this.setState({
            newName : value
        });
    }

	render() {
		return (
			<View>
				<View >
	        <Modal
	          animationType={"slide"}
	          transparent={true}
	          visible={this.state.foodModalVisible}
	          onRequestClose={() => {alert("Modal has been closed.")}}
	          >
						<View style = {{height: height * .4}}>
							<Card>
								<CardItem header>
									<Left>
										<Icon
											active name ='apple'
											size = {height * .07}
											color = "#f44842"
										/>
									</Left>
									<Text style = {{fontSize: height * .04, textAlign: 'center'}}>New Food Item</Text>
									<Right>
									<Icon.Button
										backgroundColor = "transparent"
										active name ='times-circle'
										size = {height * .06}
										color = "#f44842"
										onPress={() => this.setState({ foodModalVisible: !this.state.foodModalVisible})}
									/>
									</Right>
								</CardItem>
									<Text style = {{textAlign:'center'}}>Choose from Recent Foods</Text>
									<Picker
										mode = "dropdown"
										iosHeader="Recent Foods"
										selectedValue={this.state.newName}
										onValueChange={this.onValueChange.bind(this)}>
										{recentFoodsPicker}
									</Picker>
									<DatePicker
						        style={{width: width * .5}}
						        date={this.state.date}
						        mode="datetime"
						        placeholder="select time"
						        confirmBtnText="Confirm"
						        cancelBtnText="Cancel"
						        customStyles={{
						          dateIcon: {
						            position: 'absolute',
						            left: 0,
						            top: 4,
						            marginLeft: 0
						          },
						          dateInput: {
						            marginLeft: 36
						          }
						          // ... You can check the source to find the other keys.
						        }}
						        onDateChange={(date) => {this.setState({date: date})}}
						      />
							</Card>
						</View>
	        </Modal>

					<Modal
	          animationType={"slide"}
	          transparent={true}
	          visible={this.state.symptomModalVisible}
	          onRequestClose={() => {alert("Modal has been closed.")}}
	          >
						<View style = {{height: height * .4}}>
							<Card>
								<CardItem header>
									<Left>
										<Icon
											active name ='heartbeat'
											size = {height * .07}
											color = "#f44842"
										/>
									</Left>
									<Text style = {{fontSize: height * .04, textAlign: 'center'}}>New Symptom</Text>
									<Right>
									<Icon.Button
										backgroundColor = "transparent"
										active name ='times-circle'
										size = {height * .06}
										color = "#f44842"
										onPress={() => this.setState({ symptomModalVisible: !this.state.symptomModalVisible})}
									/>
									</Right>
								</CardItem>
									<Text style = {{textAlign:'center'}}>Choose from Recent Foods</Text>
									<Picker
										mode = "dropdown"
										iosHeader="Recent Foods"
										selectedValue={this.state.newName}
										onValueChange={this.onValueChange.bind(this)}>
										{recentSymptomsPicker}
									</Picker>
							</Card>
						</View>
	        </Modal>
	      </View>

				<ScrollView>
					{cards}
				</ScrollView>
				<Fab
            active={this.state.active}
            direction="up"
            style={{ backgroundColor: '#26A69A' }}
            position="bottomRight"
            onPress={() => this.setState({ active: !this.state.active })}
        >
          <Icon name="plus" />

					<Button
					style={{ backgroundColor: '#26A69A' }}
					onPress={() => this.setState({ foodModalVisible: !this.state.foodModalVisible, active: !this.state.active})}>
            <Icon
						 	active name ='apple'
						 	size = {height * .04}
							color = "#FFFFFF"
						/>
          </Button>
					<Button
						style={{ backgroundColor: '#26A69A' }}
						onPress={() => this.setState({ symptomModalVisible: !this.state.symptomModalVisible, active: !this.state.active})}>
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

function toggleModal(toggle){
	toggle = !toggle
}
function closeModule(moduleVisible){
	moduleVisible = false;
}
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

function getFullDate(){
	var returnDate = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();

	if(dd<10) {
	    dd='0'+dd
	}

	if(mm<10) {
	    mm='0'+mm
	}

	return mm+'/'+dd+'/'+yyyy;
}
