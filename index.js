/**
 * @format
 */
import messaging from '@react-native-firebase/messaging';

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if(Platform.OS === 'android'){

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
}
AppRegistry.registerComponent(appName, () => App);
