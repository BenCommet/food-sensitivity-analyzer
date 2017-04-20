
import React, { Component} from 'react';
import { StyleSheet, View, StatusBar, ScrollView, Modal, TouchableHighlight, Picker,
	TextInput, Button, Alert} from 'react-native';
import {Container, Content, Header, Title, Subtitle, Left,
	Right, Body, Card, CardItem, Text, Fab} from 'native-base';
const Item = Picker.Item;
import Icon from 'react-native-vector-icons/FontAwesome';
import Dimensions from 'Dimensions';
import DatePicker from 'react-native-datepicker';
import Spinner from 'react-native-loading-spinner-overlay';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;
analyzedSymptomName = "";
var gotChartData = 0;
correlatedFoods = [];
theEmail = "a@a.com";
var currentDate = getFullDate();
var daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var startLength;
var recentFoods = [];
var recentFoodsPicker = [];
var recentSymptoms =["Headache", "Runny Nose"];
var recentSymptomsPicker =[];

for(var i = 0; i < recentFoods.length; i++){
	recentFoodsPicker.push(<Item label={recentFoods[i]} key = {i}/>);
}

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
			recentSymptomsPicker: [],
			isLoading: true
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
				<StatusBar
				  backgroundColor='#009688'
				  barStyle="light-content"
				/>
			 	<Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
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
											active name ='cutlery'
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
				<View style = {styles.fabStyle}>
					<Fab
			          active={this.state.active}
			          direction="up"
			          style={{ backgroundColor: '#26A69A' }}
			          position="bottomRight"
					  containerStyle={{bottom: 65}}
			        	onPress={() => this.setState({ active: !this.state.active })}
			        >
					    <Icon name="plus" />
						<Button
							title = ""
							style={{ backgroundColor: '#26A69A' }}
							onPress={() => this.setState({ foodModalVisible: !this.state.foodModalVisible, active: !this.state.active})}>
					        <Icon
							 	active name ='cutlery'
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
	},
	fabStyle:{
		position: 'absolute',
	    justifyContent: 'center',
	    alignItems: 'center',
	    top: height * 1,
	    marginLeft: width * .55
	}

});

/*******************************************************************************
*
*******************************************************************************/
function newJournalEntry(isSymptom, name, date, context){

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
			<CardItem>
				<Right>
				<Button
					title = "Analyze"
					style={{ backgroundColor: '#26A69A' }}
					onPress={() => analyzeSymptom(cardData, context.props.navigator, 8, context)}>
				</Button>
				</Right>
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
					 	active name ='cutlery'
					 	size = {height * .06}
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
*
*******************************************************************************/
function analyzeSymptom(cardData, _navigator, time_diff, context){

	//reset  this so we know when we got all of the chart data
	context.setState({isLoading: true});

	var gotChartData = 0;
	correlatedFoods = [];
	analyzedSymptomData = cardData;
	console.log(analyzedSymptomName);

	var chartFoodCount = 0;


	//Data Request---------------------------------
	var fish = new XMLHttpRequest();
	var response;
	fish.responseType = "";
	fish.onreadystatechange = (e) => {
	if (fish.readyState !== 4) {
		return;
	}

	  if (fish.status === 200)
		{
	    // console.log('success', fish.responseText);

			response = fish.responseText;
			//inner query in loop that iterates over the times received
			//SECOND QUERY (INNER QUERIES)=======================================
			response = response.substring(0, response.length -2);
			var splitResponse = response.split('+')
			innerQuery(splitResponse, 0, time_diff, _navigator, context)

	  }
		else
		{
	    console.warn('error');
			//TODO remove this debug line
		  Alert.alert("Symptom times Response NOT received!");
	  }
	};


	var url = 'http://www.cis.gvsu.edu/~hickoxm/FSArequest.php';
	url = url + '?requestType=query';
	url = url + '&query=';

	url = url + "SELECT time FROM fsa WHERE email='" + theEmail + "'  AND fisName='"+cardData[1]+"' ORDER BY time DESC;";

	fish.open('GET', url);
	fish.send();
	//------------------------------------------------------

}

/*******************************************************************************
* This query
*******************************************************************************/
function innerQuery(splitResponse, chartFoodCount, time_diff, _navigator, context){
	if(chartFoodCount < splitResponse.length){
		var request = new XMLHttpRequest();
		var response;
		request.responseType = "";
		request.onreadystatechange = (e) => {
			if (request.readyState !== 4) {
				return;
			}

			if (request.status === 200)
			{
				// console.log('success', request.responseText);

				response = request.responseText;
				addQueryElements(response);
				innerQuery(splitResponse, chartFoodCount ++, time_diff, _navigator, context)

				//Now we know that all of the data for the chart has been retrieved
				if(chartFoodCount == splitResponse.length - 1)
				{


					gotChartData = 1;
				}
			}
			else
			{
				console.warn('error');
				//TODO remove this debug line
				Alert.alert("Symptom times Response NOT received!");
			}
		};


		var url = 'http://www.cis.gvsu.edu/~hickoxm/FSArequest.php';
		url = url + '?requestType=query';
		url = url + '&query=';


		//TODO change so time is less than splitResponse[i]  - time difference

		var inScope = splitResponse[chartFoodCount]
		inScope = inScope.substring(1, inScope.length)
		// console.log("inscope: " + inScope + "\n")
		url = url + "SELECT fisName FROM fsa WHERE email='"+
		 theEmail + "'  AND type='F' AND time < STR_TO_DATE('"+ inScope +"', '%Y-%m-%d %H:%i:%s') AND  time >= DATE_SUB(STR_TO_DATE('"+ inScope +"', '%Y-%m-%d %H:%i:%s'), INTERVAL'"+time_diff+"' HOUR);";
		// console.log("email: " + theEmail + ", inScope: " + inScope + ", time_diff: " + time_diff);
		request.open('GET', url);
		request.send();
		//=============================================================
		chartFoodCount += 1;
	}
	else{
		context.setState({isLoading: false});

		if(correlatedFoods.length > 1){
			_navigator.push({
				id: 'AnalyzeSymptom'
			})
		}
		else{
			Alert.alert("Insufficient data to perform analysis, eat some more food");
			context.setState({isLoading: false})
		}
	}
}

/*******************************************************************************
*
*******************************************************************************/
function addQueryElements(rawResult){
	console.log("feesh: " + rawResult)
	//Split the returned string by the seperator value
	splitResult = rawResult.split('+');
	//Strip out the garbage characters the server returns
	for(var i = 0; i < splitResult.length; i++){
		splitResult[i] = splitResult[i].substring(1, splitResult[i].length);
	}
	//The split has an empty element at the end of the array, kill it
	splitResult.splice(splitResult.length - 1);
	//Now we can iterate over the array and add to our counts of food eaten
	for(var i = 0; i < splitResult.length; i++){
		for(var j = 0; j < correlatedFoods.length; j++){
			if(splitResult[i] === correlatedFoods[j].food){
				correlatedFoods[j].frequency ++;
			}
			else{
				correlatedFoods.push({frequency: 1, food: splitResult[i]});
			}

		}
		if(correlatedFoods.length === 0){
			correlatedFoods.push({frequency: 1, food: splitResult[i]});
		}
	}
	console.log("deesh: " + splitResult);
	console.log(correlatedFoods);
}

/*******************************************************************************
*
*******************************************************************************/
function deleteCard(pos, context){
	var arrPosition = pos;
	var currentLength = context.state.cards.length;
	if(pos >= startLength){
		arrPosition =  (currentLength - pos)
	}
	var tempCards = context.state.cards;
	var tempAllCardData = context.state.allCardData;
	console.log(tempAllCardData[arrPosition]);
	console.log(arrPosition)
	var delCardData = tempAllCardData[arrPosition];
	tempCards.splice(arrPosition, 1);
	tempAllCardData.splice(arrPosition, 1);
	context.setState({cards: tempCards});
	context.setState({allCardData: tempAllCardData});
	deleteFromDatabase(theEmail, delCardData[1], delCardData[2], context);
}

/*******************************************************************************
*
*******************************************************************************/
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
			// console.log('success', request.responseText);
			//Alert.alert(request.responseText);
			getData(email, context);
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
					journalData.splice(0, 1);
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
					startLength = tempCards.length;
					context.setState({allCardData: allCardData});
					context.setState({cards: tempCards});
					context.setState({recentFoodsPicker: tempFoodPicker});
					context.setState({recentSymptomsPicker: tempSymptomPicker})
					context.setState({isLoading: false})
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
					// context.setState({cards: tempCards, name:"", allCardData: tempAllCardData});
					getData(theEmail, context);
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
