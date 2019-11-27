/**
 * @format
 */

import {AppRegistry} from 'react-native';
 import mainRedxSetup from './src/mainReduxSetup'
 //import App from './App';
import {name as appName} from './app.json';
console.disableYellowBox = true;
AppRegistry.registerComponent(appName, () => mainRedxSetup);


