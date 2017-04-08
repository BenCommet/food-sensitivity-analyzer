/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Navigator,
  BackAndroid
} from 'react-native';

import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import Journal from './src/components/Journal';
import AnalyzeSymptom from './src/components/AnalyzeSymptom';

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

export default class food_sense extends Component {
  render() {
    return (
      <Navigator
        initialRoute = {{id: 'AnalyzeSymptom'}}
        renderScene = {this.navigatorRenderScene}
        configureScene = {(route) =>{
            return Navigator.SceneConfigs.HorizontalSwipeJump;

        }}
        />
    );
  }

  navigatorRenderScene(route, navigator){
    _navigator = navigator;
    switch(route.id){
      case 'Login':
        return(<Login navigator={navigator} title = "Login"/>);
      case 'SignUp':
        return(<SignUp navigator={navigator} title = "SignUp"/>);
      case 'Journal':
        return(<Journal navigator={navigator} userEmail = {Journal.userEmail} title = "Journal"/>);
      case 'AnalyzeSymptom':
        return(<AnalyzeSymptom navigator={navigator} title = "AnalyzeSymptom"/>);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('food_sense', () => food_sense);
