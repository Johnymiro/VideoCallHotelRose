/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect, useState} from 'react';
import ClientHomePage from './screens/ClientHomePage';
import ManagersHomePage from './screens/ManagersHomePage';
import CallScreen from './screens/CallScreen';
import Login from './screens/Login';
import RemotePushController from './components/RemotePushController';
import {View, Text, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import EndCall from 'agora-rn-uikit/src/Controls/Local/EndCall';

const App = () => {
  const [user, setUser] = useState();
  const [connection, setConnection] = useState({
    data: {
      appId: 'c902d8178a0f4bb98f9ec284eb4a1713',
      channel: 'HotelRose',
      tokenUrl: 'http://10.0.2.2:8080',
    },
    videoCall: false,
    isLogged: false,
    user: null,
  });

  const onClientCall = async id => {
    console.log('calling');
    if (id) {
      await firestore()
        .collection('Users')
        .doc(id)
        .update({isClientCalling: true});
    }

    setConnection(prev => ({...prev, videoCall: true}));
  };

  const onManagerCall = () => {
    console.log('calling');
    firestore()
      .collection('Users')
      .doc('client')
      .update({isToOpenCallScreen: true});

    setConnection(prev => ({...prev, videoCall: true}));
  };

  const handleEndCall = async id => {
    await firestore()
      .collection('Users')
      .doc('client')
      .update({isToOpenCallScreen: false});

    if (id) {
      await firestore()
        .collection('Users')
        .doc(id)
        .update({isClientCalling: false});
    }

    setConnection(prev => ({...prev, videoCall: false}));
  };

  useEffect(() => {
    if (user) {
      setConnection(prev => ({
        ...prev,
        isLogged: true,
        user,
        data: {...prev.data, uid: user.uid, username: user.name},
      }));
    }
  }, [user]);

  return user?.name ? (
    connection.videoCall ? (
      <CallScreen connection={connection} handleEndCall={handleEndCall} />
    ) : user?.type === 'client' ? (
      <ClientHomePage
        data={user}
        onCall={onClientCall}
        endCall={handleEndCall}
      />
    ) : (
      <ManagersHomePage call={onManagerCall} user={user} setUser={setUser} />
    )
  ) : (
    <Login setUser={setUser} />
  );
};

export default App;

/* import {
  requestUserPermission,
  notificationListener,
} from './src/utils/pushnotification_helper'; */
/*   return (
    <View>
      <ClientHomePage onCall={onCall} />
    </View>
  ); */

/* const usersData = [
  {name: 'client', password: 'jhd0221', uid: 1, type: 'client'},
  {name: 'Corinna', password: 'thk2310', uid: 2, type: 'reception'},
  {name: 'Sole', password: 'cio3294', uid: 3, type: 'reception'},
  {name: 'Nico', password: 'fji2938', uid: 5, type: 'reception'},
  {name: 'Herbert', password: 'sde3214', uid: 5, type: 'reception'},
  {name: 'Kevin', password: 'dfi4324', uid: 6, type: 'reception'},

  const handleLogin = async (name, password) => {
    const user =
      typeof name === 'string'
        ? usersData.find(
            e =>
              e.name.toLowerCase() === name.toLowerCase() &&
              e.password === password,
          )
        : undefined;

    if (user) {
      setConnection(prev => ({
        ...prev,
        isLogged: true,
        user,
        data: {...prev.data, uid: user.uid, username: user.name},
      }));
      return;
    }
    alert('Wrong username or password');
  };
]; */
