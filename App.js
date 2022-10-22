/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';
import ClientHomePage from './screens/ClientHomePage';
import ManagersHomePage from './screens/ManagersHomePage';
import CallScreen from './screens/CallScreen';

const App = () => {
  const [videoCall, setVideoCall] = useState(false);
  const onPress = () => setVideoCall(true);

  const handleEndCall = () => setVideoCall(false);

  return videoCall ? (
    <CallScreen handleEndCall={handleEndCall} />
  ) : (
    <ClientHomePage onPress={onPress} />
  );
};

export default App;
/* 

007eJxTYNj2j2kj38Jfnv+O79Dh43ffZjLT1Yu3e/JKn8cn/vIW71RVYEi2NDBKsTA0t0g0SDNJSrK0SLNMTTayMElNMkk0NDc0TnoelNwQyMhwdMtkVkYGCATxWRhKUotLGBgAZJMgIQ==
*/
