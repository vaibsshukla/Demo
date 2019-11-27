import React, { Component,EventHandler } from 'react';
import { View, AsyncStorage } from 'react-native';
import EventEmitter from 'EventEmitter';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer } from 'react-navigation';
import {log} from '../../utility/Utility';
 import Main from '../Main/Main';
export default class Navigator extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                shouldRender: false,
                // initialRouteName: 'Check',
            };
        this.eventEmitter = new EventEmitter();
    }

    render = () => this.state.AppContainer ? <this.state.AppContainer screenProps={this.eventEmitter} /> : <View />;

    componentDidMount() {
        log('render Navigator')
        this.instantiateNavigator();
    }
    async instantiateNavigator() {
        //  let shouldByPassTutorial = await Utility.sharedInstance.getSessionData(Constants.session.shouldByPassTutorial)
        // shouldByPassTutorial = (shouldByPassTutorial == '1')
        // let initialRouteName = (shouldByPassTutorial ? 'Login' : 'App')

        // let token = await AsyncStorage.getItem(AsyncStorageValues.token);
        // log('token', token)
        // let initialRouteName = token != null ? 'Main' : 'LoginScreen';
        let initialRouteName = 'Main';

        const Navigator = createStackNavigator({
             Main: { screen: Main },
        }, {
            headerMode: 'none',
            initialRouteName: initialRouteName,
            defaultNavigationOptions: { gesturesEnabled: false },   // to prevent back on swipe gesture on IOS.
        },
        );
        const AppContainer = createAppContainer(Navigator);
        this.setState({ AppContainer });
    }
}
