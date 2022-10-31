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
  {name: 'client', password: 'jhd0221', uid: 1, type: 'client'},
  {name: 'Corinna', password: 'thk2310', uid: 2, type: 'reception'},
  {name: 'Sole', password: 'cio3294', uid: 3, type: 'reception'},
  {name: 'Nico', password: 'fji2938', uid: 5, type: 'reception'},
  {name: 'Herbert', password: 'sde3214', uid: 5, type: 'reception'},
  {name: 'Kevin', password: 'dfi4324', uid: 6, type: 'reception'},
];

const App = () => {
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

  const onCall = name => {
    console.log('calling');
    setConnection(prev => ({...prev, videoCall: true}));
  };

  const handleEndCall = () =>
    setConnection(prev => ({...prev, videoCall: false}));

  const handleLogin = (name, password) => {
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

  return connection.isLogged ? (
    connection.videoCall ? (
      <CallScreen connection={connection} handleEndCall={handleEndCall} />
    ) : connection.user.type === 'client' ? (
      <ClientHomePage onCall={onCall} />
    ) : (
      <ManagersHomePage call={onCall} user={connection.user} />
    )
  ) : (
    <Login handleLogin={handleLogin} />
  );
};

export default App;
