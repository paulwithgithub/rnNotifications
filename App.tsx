import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Digital from './src/components/screens/Digital';
const Stack = createNativeStackNavigator();

import {ActivityIndicator} from 'react-native';
import Noti from './src/components/screens/Noti';
import SignlePerson from './src/components/screens/SinglePerson';
import SignIn from './src/components/sign_in/SignIn';


const linking: any = {
  prefixes: ['peoplesapp://'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: {
        path: 'home',
      },
      SinglePerson: {
        path: 'single_person',
      },
    },
  },
};
const App = () => {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator color="blue" size="large" />}>
      <Stack.Navigator
        initialRouteName="SignIn"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Digital} />
        <Stack.Screen name="SinglePerson" component={SignlePerson} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
