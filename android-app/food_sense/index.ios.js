<<<<<<< HEAD
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
  Navigator
} from 'react-native';

import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import Journal from './src/components/Journal';

export default class food_sense extends Component {
  render() {
    return (
      <Navigator
        initialRoute = {{id: 'Login'}}
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
=======
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
  Navigator
} from 'react-native';

import Login from './src/components/Login';
import SignUp from './src/components/SignUp';
import Journal from './src/components/Journal';

export default class food_sense extends Component {
  render() {
    return (
      <Navigator
        initialRoute = {{id: 'Journal'}}
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
>>>>>>> 21820b2e1567b55b84a8f0af4d5aa5d150ffad05
