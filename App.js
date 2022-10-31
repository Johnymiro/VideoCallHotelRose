/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useState} from 'react';
import ClientHomePage from './screens/ClientHomePage';
import ManagersHomePage from './screens/ManagersHomePage';
import CallScreen from './screens/CallScreen';
import Login from './screens/Login';

const usersData = [
  {name: 'client', uid: 1},
  {name: 'Corinna', uid: 2},
  {name: 'Sole', uid: 3},
  {name: 'Nico', uid: 5},
  {name: 'Herbert', uid: 5},
  {name: 'Kevin', uid: 6},
];

const App = () => {
  const [connection, setConnection] = useState({
    data: {
      appId: 'c902d8178a0f4bb98f9ec284eb4a1713',
      channel: 'HotelRose',
      uid: 1,
      tokenUrl: 'http://10.0.2.2:8080',
    },
    videoCall: false,
    isLogged: false,
    user: null,
  });

  const onCall = async name => {
    console.log('Calling:', name);
    setConnection(prev => ({...prev, videoCall: true}));
  };

  const handleEndCall = () =>
    setConnection(prev => ({...prev, videoCall: false}));

  const handleLogin = name => {
    const user =
      typeof name === 'string'
        ? usersData.find(e => e.name.toLowerCase() === name.toLowerCase())
        : undefined;

    if (user) {
      setConnection(prev => ({...prev, isLogged: true, user}));
      return;
    }
    alert('Wrong Username');
  };

  return connection.isLogged ? (
    connection.videoCall ? (
      <CallScreen connection={connection} handleEndCall={handleEndCall} />
    ) : (
      <ClientHomePage onCall={onCall} />
    )
  ) : (
    <Login handleLogin={handleLogin} />
  );
};

export default App;
