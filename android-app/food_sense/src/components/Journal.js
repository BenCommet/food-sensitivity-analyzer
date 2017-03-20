import React, { Component} from 'react';
import { StyleSheet, View, StatusBar, ScrollView, Modal, TouchableHighlight, Picker,
	TextInput, Button, Alert} from 'react-native';
import {Container, Content, Header, Title, Subtitle, Left,
	Right, Body, Card, CardItem, Text, Fab} from 'native-base';
const Item = Picker.Item;
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';
import DatePicker from 'react-native-datepicker';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;
theEmail = "test@test.com";
var currentDate = getFullDate();
var cont;

var recentFoods = ["Chicken Sandwich", "Tomato Soup", "McDouble", "Captain Crunch"];
var recentFoodsPicker = [];
var recentSymptoms =["Headache", "Runny Nose"];
var recentSymptomsPicker =[];
// for(var i = 0; i < cardData.length; i++){
// 	var cardData = cardData[i];
// 	if(cardObject.isSymptom){
// 		cards.push(makeSymptomCard(cardObject, i));
// 	}
// 	else{ cards.push(makeFoodCard(cardObject, i)); }
// }
for(var i = 0; i < recentFoods.length; i++){
	recentFoodsPicker.push(<Item label={recentFoods[i]} key = {i}/>);
}
// for(var i = 0; i < recentSymptoms.length; i++){
// 	recentSymptomsPicker.push(<Item label={recentSymptoms[i]} key = {i}/>);
// }
export default class Journal extends Component{
	constructor(props) {
		super(props);
		getData(theEmail, this)
		this.state = {
			username: '',
			active: false,
			symptomModalVisible: false,
			foodModalVisible: false,
			selectedItem: undefined,
			name: "",
			allCardData: [],
			date: currentDate,
			cards: [],
			recentFoodsPicker: [],
			recentSymptomsPicker: []
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
		cont = this;
		return (
			<View>
				<View>
			        <Modal
			          animationType={"slide"}
			          transparent={true}
			          visible={this.state.foodModalVisible}
			          onRequestClose={() => {alert("Modal has been closed.")}}
			         >
						<View style = {{height: height * .5}}>
							<Card>
								<ScrollView>
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
								<TextInput
					        style={{height: height * .1, padding: width * .02}}
					        onChangeText={(name) => this.setState({name})}
					        value={this.state.name}
									placeholder = "Enter your food's name"
					      />
									{/*}<Picker
										mode = "dropdown"
										iosHeader="Recent Foods"
										selectedValue={this.state.name}
										onValueChange={(foo)=> this.setState({name: foo})}
									>
										{this.state.recentFoodsPicker}
									</Picker>*/}
									<DatePicker
								        style={{width: width * .45}}
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
							  	<View style = {{marginTop: height * .05}}>
									<Button
										onPress = {()=>newJournalEntry(false, this.state.name, this.state.date, this)}
										title = "Create Entry"
										color = "#26A69A"
										accessibilityLabel="Login to the Application after entering password"
									/>
								</View>
									</ScrollView>
							</Card>
						</View>
			        </Modal>

					<Modal
			          animationType={"slide"}
			          transparent={true}
			          visible={this.state.symptomModalVisible}
			          onRequestClose={() => {alert("Modal has been closed.")}}
			          >
						<View style = {{height: height * .45}}>
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
									<TextInput
						        style={{height: height * .1, padding: width * .02}}
						        onChangeText={(name) => this.setState({name})}
						        value={this.state.name}
										placeholder = "Enter your food's name"
						      />
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
							  	<View style = {{marginTop: height * .05}}>
									<Button
										onPress = {()=>newJournalEntry(true, this.state.name, this.state.date, this)}
										title = "Create Entry"
										color = "#26A69A"
										accessibilityLabel="Add the new journal entry"
									/>
									</View>
							</Card>
						</View>
			        </Modal>
			      </View>

				<ScrollView>
					{this.state.cards}
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
						title = ""
						style={{ backgroundColor: '#26A69A' }}
						onPress={() => this.setState({ foodModalVisible: !this.state.foodModalVisible, active: !this.state.active})}>
				        <Icon
						 	active name ='apple'
						 	size = {height * .04}
							color = "#FFFFFF"
						/>
			      	</Button>
					<Button
					title = ""
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

/*******************************************************************************
*
*******************************************************************************/
function newJournalEntry(isSymptom, name, date, context){




	console.log(context.state.name);

	if(isSymptom){
		context.setState({symptomModalVisible: false});
		sendData(theEmail, name, "S", date, context);
	}
	else{
		context.setState({foodModalVisible: false});
		sendData(theEmail, name, "F", date, context);
	}
}
/*******************************************************************************
* This function creates a food card item
* @param{array[strings]} cardData - this array holds the string values necessary
* to create a card, [0] - type of entry, [1] name of entry, [2] date of entry
* @param{int} pos - position in the list of cards the returned card will take,
* this value is also used as a key by react
* @return{card} - A native-base card object
*******************************************************************************/

function makeSymptomCard(cardData, pos, context){
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
				<Text style = {{fontSize: height * .04}}>{cardData[1]}</Text>
				<Right>
					<Icon.Button
						backgroundColor = "transparent"
						active name ='trash'
						size = {height * .04}
						color = "#f44842"
						onPress={() => Alert.alert(
				            'Delete This Journal Entry?',
				            null,
				            [
				              {text: 'Cancel', onPress: () => console.log('Cancel')},
				              {text: 'Delete', onPress: ()=> deleteCard(pos, context)},
				            ]
			          )}
					/>
				</Right>
			</CardItem>
			<CardItem>
				<Left/>
				<Text style = {{fontSize: height * .03}}>{"Onset: " + cardData[2]}</Text>
			</CardItem>
		</Card>
	</View>
	return card
}

/*******************************************************************************
* This function creates a symptom card item
* @param{array[strings]} cardData - this array holds the string values necessary
* to create a card, [0] - type of entry, [1] name of entry, [2] date of entry
* @param{int} pos - position in the list of cards the returned card will take,
* this value is also used as a key by react
* @return{card} - A native-base card object
*******************************************************************************/
function makeFoodCard(cardData, pos, context){
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
				<Text style = {{fontSize: height * .04}}>{cardData[1]}</Text>
				<Right>
					<Icon.Button
						backgroundColor = "transparent"
						active name ='trash'
						size = {height * .04}
						color = "#f44842"
						onPress={() => Alert.alert(
				            'Delete This Journal Entry?',
				            null,
				            [
				              {text: 'Cancel', onPress: () => console.log('Cancel')},
				              {text: 'Delete', onPress: ()=> deleteCard(pos, context)},
				            ]
			          )}
					/>
				</Right>
			</CardItem>
			<CardItem>
				<Left/>
				<Text style = {{fontSize: height * .03}}>{"Onset: " + cardData[2]}</Text>
			</CardItem>
		</Card>
	</View>
	return card
}

function deleteCard(pos, context){
	var tempCards = context.state.cards;
	var tempAllCardData = context.state.allCardData;
	console.log(tempAllCardData[pos]);
	var delCardData = tempAllCardData[pos];
	tempCards.splice(pos -1, 1, null);
	context.setState({cards: tempCards});
	deleteFromDatabase(theEmail, delCardData[1], delCardData[2], context);
}


function deleteFromDatabase(email, name, time, context){
	console.log(name + ' : ' + time);


	//Data Request---------------------------------
	var request = new XMLHttpRequest();
	var response;
	request.responseType = "";
	request.onreadystatechange = (e) => {
		if (request.readyState !== 4) {
			return;
		}

		if (request.status === 200)
		{
			console.log('success', request.responseText);
			//Alert.alert(request.responseText);
		}
		else
		{
			console.warn('error');
			//TODO remove this debug line
			Alert.alert("Error communicating with server, try again later");
		}
	};


	var url = 'http://www.cis.gvsu.edu/~hickoxm/FSArequest.php';
	url = url + '?requestType=delete';

	url = url + '&email=';
	url = url + email;

	url = url + '&itemName=';
	url = url + name;

	url = url + '&time=';
	url = url + time;



	request.open('GET', url);
	request.send();
	//------------------------------------------------------

}
/*******************************************************************************
*
*******************************************************************************/
function getFullDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var h = today.getHours();
	var m = today.getMinutes();

	if(dd<10) {
	    dd='0'+dd
	}

	if(mm<10) {
	    mm='0'+mm
	}

	return yyyy + '-' + mm + '-' + dd + " " + h + ":" + m;
}

/*******************************************************************************
*
*******************************************************************************/
function getData(_email, context){

			/*validate email does not already belong to a user*/
			//Alert.alert("HERE");

			//Data Request---------------------------------
			var request = new XMLHttpRequest();
			var response;
			request.responseType = "";
			request.onreadystatechange = (e) => {
			  if (request.readyState !== 4) {
			    return;
			  }

			  if (request.status === 200)
				{
			    console.log('success', request.responseText);

					//TODO remove this debug line
				//   Alert.alert(request.responseText);
					//TODO BEN write stuff here, maybe, idk, this is bs
					response = request.responseText;
					var journalData = response.split('*');
					var tempCards = [];
					var tempFoodPicker = [];
					var tempSymptomPicker = [];
					var allCardData = [];
					//Iterate over each symptom and create a card from the data contained within
					for(var i = 0; i < journalData.length; i++){
						var cardData = journalData[i].split("+");
						allCardData.push(cardData);
						if(cardData[0] === 'S'){
							tempSymptomPicker.push(<Item label={cardData[1]} key = {i}/>)
							tempCards.push(makeSymptomCard(cardData, i, context));
						}
						else if(cardData[0] === 'F'){
							tempFoodPicker.push(<Item label={cardData[1]} key = {i}/>)
							tempCards.push(makeFoodCard(cardData, i, context));
						}
					}
					context.setState({allCardData: allCardData});
					context.setState({cards: tempCards});
					context.setState({recentFoodsPicker: tempFoodPicker});
					context.setState({recentSymptomsPicker: tempSymptomPicker})
			  }
				else
				{
			    console.warn('error');
					//TODO remove this debug line
				  Alert.alert("Journal Response NOT received!");
			  }
			};


			var url = 'http://www.cis.gvsu.edu/~hickoxm/FSArequest.php';
			url = url + '?requestType=query';
			url = url + '&query=';

			url = url + "SELECT type, fisName, time FROM fsa WHERE email='" + theEmail + "'  AND NOT type='' ORDER BY time DESC;";

			request.open('GET', url);
			request.send();
			//------------------------------------------------------



}
//New Entry Send Data---------------------------------------------------------
function sendData(_email, _itemName, _itemType, _time,  context){
			console.log(_itemType);
			//Data Request---------------------------------
			var request = new XMLHttpRequest();
			var response;
			request.responseType = "";
			request.onreadystatechange = (e) => {
			  if (request.readyState !== 4) {
			    return;
			  }

			  if (request.status === 200)
				{
			    console.log('success', request.responseText);
					var cardData = [_itemType, _itemName, _time];
					var tempAllCardData = context.state.allCardData;
					tempAllCardData.splice(0, 0, cardData);
					if( _itemType === 'S')
						var card = makeSymptomCard(cardData, context.state.cards.length + 1, context);
					else if(_itemType === 'F')
						var card = makeFoodCard(cardData, context.state.cards.length + 1, context);
					tempCards = context.state.cards;
					tempCards.splice(0, 0, card);
					context.setState({cards: tempCards, name:"", allCardData: tempAllCardData});
			  }
				else
				{
			    console.warn('error');
					//TODO remove this debug line
				  Alert.alert("Error communicating with server, try again later");
			  }
			};


			var url = 'http://www.cis.gvsu.edu/~hickoxm/FSArequest.php';
			url = url + '?requestType=insert';

			url = url + '&email=';
			url = url + _email;

			url = url + '&itemType=';
			url = url + _itemType;

			url = url + '&itemName=';
			url = url + _itemName;

			url = url + '&time=';
			url = url + _time;



			request.open('GET', url);
			request.send();
			//------------------------------------------------------



}
//---------------------------------------------------------------------------
