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
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [user, setUser] = useState();
  const [connection, setConnection] = useState({
    data: {
      appId: 'c902d8178a0f4bb98f9ec284eb4a1713',
      channel: 'HotelRose',
      //tokenUrl: 'https://video-call-hotel-rose.herokuapp.com',
      tokenUrl: 'https://agora-token-server-6efj.onrender.com',
    },
    videoCall: false,
    isLogged: false,
    user: null,
  });

  const setVideoCall = bool => {
    setConnection(prev => {
      return {...prev, videoCall: bool};
    });
  };

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
      <ManagersHomePage setVideoCall={setVideoCall} call={onManagerCall} user={user} setUser={setUser} />
    )
  ) : (
    <Login setUser={setUser} />
  );
};

export default App;
