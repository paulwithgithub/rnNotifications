//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {LoginManager} from 'react-native-fbsdk-next';
// create a component

const clientId =
  '174979766213-r1ps6co5mso2e56vbobtbl97jodadtg6.apps.googleusercontent.com';

const SignIn = () => {
  const [state, setState] = useState<any>();

  const googleSignIn = async () => {
    GoogleSignin.configure({
      iosClientId: clientId,
    });
    try {
      await GoogleSignin.hasPlayServices();
      console.log('entered');
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setState({userInfo: response.data});
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;
          default:
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const facebookSignIn = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      function (result) {
        console.log('fb entered');
        if (result.isCancelled) {
          Alert.alert('Login Cancelled ' + JSON.stringify(result));
        } else {
          Alert.alert(
            'Login success with  permisssions: ' +
              result.grantedPermissions!.toString(),
          );
          Alert.alert('Login Success ' + result.toString());
        }
      },
      function (error) {
        Alert.alert('Login failed with error: ' + error);
      },
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        // onPress={facebookSignIn}
        style={{
          backgroundColor: '#5f7fe8',
          borderRadius: 4,
          padding: 10,
          marginBottom: 10,
        }}>
        <Text style={{color: 'white', fontWeight: 500}}>
          Sign in with Facebook
        </Text>
      </TouchableOpacity>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Light}
        onPress={googleSignIn}
        accessibilityLabel={'sign in'}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default SignIn;
