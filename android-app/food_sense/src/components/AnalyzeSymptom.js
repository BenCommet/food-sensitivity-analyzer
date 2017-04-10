import React, {Component} from 'react'
import {View, Dimensions, TouchableWithoutFeedback, ScrollView, Picker} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';

import Svg, {G, Line, Path, Rect, Text} from 'react-native-svg'

// d3 lib
import {scaleBand, scaleLinear} from 'd3-scale'
import {max, ticks} from 'd3-array'
import {line} from 'd3-shape'
import {path} from 'd3-path'

const colours = {black: 'black', blue: 'steelblue', brown: 'brown'}

var currentTimePeriod = 8;
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hours: 8,
			isLoading: false

		};
	}

    render() {
        console.log("cardData:" + analyzedSymptomData);
        return (
            <View>
			 <Spinner visible={this.state.isLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
                <View>
    				<Picker
    				  selectedValue={currentTimePeriod}
    				  onValueChange={(timeSelected) => analyzeSymptom(analyzedSymptomData, this.props.navigator, timeSelected, this)}>

    				  <Picker.Item label="8 Hours" value={8} />
    				  <Picker.Item label="1 Hour" value={1} />
    				  <Picker.Item label="3 Hours" value={3} />
    				  <Picker.Item label="24 Hours" value={24} />
    				</Picker>
                </View>
                <ScrollView>
                <BarChart />
                </ScrollView>
            </View>
        )
    }
}

class BarChart extends Component {
    state = {
        barColour: correlatedFoods.map(()=>colours.blue)
    }

    toggleHighlight(i) {
        this.setState({
            barColour: [
                ...this.state.barColour.slice(0, i),
                this.state.barColour[i] === colours.blue ? colours.brown : colours.blue,
                ...this.state.barColour.slice(i+1)
            ]
        })
    }

    render() {
        const screen = Dimensions.get('window')
        const margin = {top: 50, right: 25, bottom: 200, left: 25}
        const width = screen.width - margin.left - margin.right
        const height = screen.height - margin.top - margin.bottom
        const x = scaleBand()
            .rangeRound([0, width])
            .padding(0.1)
            .domain(correlatedFoods.map(d => d.food))
        const maxFrequency = max(correlatedFoods, d => d.frequency)
        const y = scaleLinear()
            .rangeRound([height, 0])
            .domain([0, maxFrequency])

        const firstLetterX = x(correlatedFoods[0].food)
        const secondLetterX = x(correlatedFoods[1].food)
        const lastLetterX = x(correlatedFoods[correlatedFoods.length - 1].food)
        const labelDx = (secondLetterX - firstLetterX) / 2

        const bottomAxis = [firstLetterX - labelDx, lastLetterX + labelDx]
        const bottomAxisD = line()
            .x(d => d + labelDx)
            .y(() => 0)
            (bottomAxis)

        const leftAxis = ticks(0, maxFrequency, 5)
        const leftAxisD = line()
            .x(() => bottomAxis[0] + labelDx)
            .y(d => y(d) - height)
            (leftAxis)

        const notch = 5
        const labelDistance = 9

        const svg = (
            <Svg width={screen.width} height={screen.height}>
                <G translate={margin.left + "," + margin.top}>
                    <G translate={"0," + height}>
                        <G key={-1}>
                            <Path stroke={colours.black} d={bottomAxisD} key="-1"/>
                            {
                                correlatedFoods.map((d, i) => (
                                    <G key={i + 1} translate={x(d.food) + labelDx + ",0"}>
                                        <Line stroke={colours.black} y2={notch}/>
                                        <Text fill={colours.black} y={labelDistance}>{d.food}</Text>
                                    </G>
                                ))
                            }
                        </G>
                        <G key={-2}>
                            <Path stroke={colours.black} d={leftAxisD} key="-1"/>
                            {
                                leftAxis.map((d, i) => (
                                    <G key={i + 1} translate={"0," + (y(d) - height)}>
                                        <Line stroke={colours.black} x1={notch} x2={labelDistance}/>
                                        <Text fill={colours.black} x={-labelDistance} y={-notch}>{d}</Text>
                                    </G>
                                ))
                            }
                        </G>
                        {
                            correlatedFoods.map((d, i) => (
                                <TouchableWithoutFeedback key={i} onPress={()=>this.toggleHighlight(i)}>
                                    <Rect x={x(d.food)}
                                          y={y(d.frequency) - height}
                                          width={x.bandwidth()}
                                          height={height - y(d.frequency)}
                                          fill={this.state.barColour[i]}>
                                    </Rect>
                                </TouchableWithoutFeedback>
                            ))
                        }
                    </G>
                </G>
            </Svg>
        )

        return svg;
    }
}

export default App

/*******************************************************************************
*
*******************************************************************************/
function analyzeSymptom(cardData, _navigator, time_diff, context){
    context.setState({isLoading: true});
    currentTimePeriod = time_diff;
	//reset  this so we know when we got all of the chart data
	var gotChartData = 0;
	analyzedSymptomData = cardData;
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
			response = fish.responseText;
			//inner query in loop that iterates over the times received
			//SECOND QUERY (INNER QUERIES)=======================================
			response = response.substring(0, response.length -2);
			var splitResponse = response.split('+')
            correlatedFoods=[];
			innerQuery(splitResponse, 0, time_diff, _navigator)

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
*
*******************************************************************************/
function innerQuery(splitResponse, chartFoodCount, time_diff, _navigator){
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
				innerQuery(splitResponse, chartFoodCount ++, time_diff, _navigator)

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
		// _navigator.push({
		// 	id: 'AnalyzeSymptom'
		// })
        _navigator.replace({id: 'AnalyzeSymptom'})

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
