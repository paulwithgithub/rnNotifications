/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import RemoteNotification from '../RemoteNotifications';

function Noti(): React.JSX.Element {
  const LocalNotification = () => {
    const key = Date.now().toString(); // Key must be unique everytime
    PushNotification.createChannel(
      {
        channelId: key, // (required)
        channelName: 'Local messasge', // (required)
        channelDescription: 'Notification for Local message', // (optional) default: undefined.
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );
    PushNotification.localNotification({
      channelId: key, //this must be same with channelid in createchannel
      title: 'Local Message',
      message: 'Local message !!',
    });
  };

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
    }
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      checkToken();
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
      });

      return unsubscribe;
    }
  }, []);

  return (
    <SafeAreaView>
      <View style={{alignItems: 'center', paddingTop: 10}}>
        <Text>Notifications</Text>
        <TouchableOpacity
          onPress={LocalNotification}
          style={{
            backgroundColor: 'red',
            width: responsiveWidth(25),
            height: responsiveHeight(4),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', fontWeight: 600}}>Toggle</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Navigate to other</Text>
        </TouchableOpacity>
        <RemoteNotification />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Noti;
