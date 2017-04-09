
import React, { Component} from 'react';
import { ScrollView, Modal, TouchableHighlight, Picker,
	TextInput, Button, Alert} from 'react-native';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop
} from 'react-native-svg';


export default class AnalyzeSymptom extends Component{
	constructor(props) {
		super(props);
		this.state = {
			hours: 0,
			foodData: [["squirrel", 5], ["chicken", 4], ["popTarts", 15], ["snickers", 2]]
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
				<Svg
                height="100"
                width="100"
            >
                <Circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="blue"
                    strokeWidth="2.5"
                    fill="green"
                />
                <Rect
                    x="15"
                    y="15"
                    width="70"
                    height="70"
                    stroke="red"
                    strokeWidth="2"
                    fill="yellow"
                />
            </Svg>
			</ScrollView>
		)
	}
}
