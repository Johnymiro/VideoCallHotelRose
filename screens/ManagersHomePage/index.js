import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Switch,
  TouchableOpacity,
  Image,
  Dimensions
} from 'react-native';
import {colors} from '../../constants';
import ContactCard from '../../components/ContactCard';
import firestore from '@react-native-firebase/firestore';

const window = Dimensions.get('window');

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
    backgroundColor: 'lightblue',
    padding: 20,
  },
  image: {
    width: window.width * 0.77,
    height: window.width * 0.15,
  },
};
export default function ({user, call, setUser}) {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async () => {
    if (!user?.name) {
      alert('Server maybe offline, no user found');
      return;
    }
    await firestore().collection('Users').doc(user.name.toLowerCase()).update({
      isAvailable: !isEnabled,
    });

    setIsEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/HotelRoseTitle.jpeg')}
      />
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
        <View style={{marginRight: 28}}>
          <Button
            onPress={call}
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
