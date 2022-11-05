import React, {useEffect, useState} from 'react';
import {View, Text, Button, Switch, TouchableOpacity} from 'react-native';
import {colors} from '../../constants';
import ContactCard from '../../components/ContactCard';
import firestore from '@react-native-firebase/firestore';

const usersCollection = firestore().collection('Users');

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: '100%',
    padding: 20,
  },
  userStatus: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    margin: 30,
    justifyContent: 'space-around',
    gap: 5,
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.customBeige,
  },
  userStatusLabel: {
    fontWeight: 'bold',
    marginRight: 30,
    fontSize: 23,
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    /*     color: "#00695c" */
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  touchBtn: {
    backgroundColor: "lightblue",
    padding: 20,
  }
};
export default function ({user, call, setUser}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    console.log('hellooowow');
  };

  const getUsers = async () => {
    const users = await firestore()
      .collection('Users')
      .onSnapshot(
        users => {
          console.log(
            'Users collection:',
            users.docs.map(doc => doc.data()),
          );
        },
        er => console.log(er),
      );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi {user.name}</Text>

      <View style={styles.userStatus}>
        <Text style={styles.userStatusLabel}>
          Switch to {isEnabled ? 'Offline' : 'Available'}:{' '}
        </Text>
        <Switch
          trackColor={{false: 'grey', true: 'teal'}}
          thumbColor={isEnabled ? 'lightseagreen' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          // style={{transform: [{scaleX: 1.4}, {scaleY: 1.4}]}}
        />
      </View>

      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
{/*         <TouchableOpacity
          onPress={getUsers}
          title="Call Hotel"
            style={styles.touchBtn}
          accessibilityLabel="Call Button">
          <Text style={styles.buttonText}>Call Now</Text>
        </TouchableOpacity> */}
        <View style={{marginRight: 20}}>
          <Button
            onPress={getUsers}
            title="Call Hotel"
            accessibilityLabel="Call Button"
          />
        </View>
        <Button
          onPress={() => setUser?.(undefined)}
          title="Logout"
          color="#CC0000"
          accessibilityLabel="Logout Button"
        />
      </View>
    </View>
  );
}
