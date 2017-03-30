
import React, { Component} from 'react';
import { ScrollView, Modal, TouchableHighlight, Picker,
	TextInput, Button, Alert} from 'react-native';
export default class AnalyzeSymptom extends Component{
	constructor(props) {
		super(props);
		this.state = {
			hours: 0
		};
	}
	render() {
		return (
			<ScrollView>
				<Picker
				  selectedValue={this.state.hours}
				  onValueChange={(timeSelected) => this.setState({hours: timeSelected})}>
				  <Picker.Item label="1 Hour" value={1} />
				  <Picker.Item label="3 Hours" value={3} />
				  <Picker.Item label="8 Hours" value={8} />
				  <Picker.Item label="24 Hours" value={24} />
				</Picker>
			</ScrollView>
		)
	}
}
