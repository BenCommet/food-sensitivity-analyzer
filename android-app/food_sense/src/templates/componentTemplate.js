import React, { Component} from 'react';
import { StyleSheet, View } from 'react-native';
import Dimensions from 'Dimensions'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').height;

export default class CLASSNAME extends Component{
	render() {
		return (
			<View style={styles.container}>

			</View>
		);
	}
} 

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});