import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  Switch,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import {colors} from '../../constants';
import ContactCard from '../../components/ContactCard';
import firestore from '@react-native-firebase/firestore';
import Popup from './Popup';
import {is} from '@babel/types';

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
export default function ({user, call, setUser, setVideoCall}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const setClientCalling = bool => {
    return firestore()
      .collection('Users')
      .doc(user.name.toLowerCase())
      .update({isClientCalling: bool});
  };

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
  const acceptCall = async () => {
    console.log('Accepting');
    await firestore().collection('Users').doc('client').update({
      'connection.isCallAccepted': true,
      'connection.isCallDeclined': false,
    });
    setClientCalling(false);
    setVideoCall(true);
    setModalVisible(false);
  };

  const declineCall = async () => {
    console.log('Declining');
    await firestore().collection('Users').doc('client').update({
      'connection.isCallDeclined': true,
      'connection.isCallAccepted': false,
    });

    setClientCalling(false);
    setVideoCall(false);
    setModalVisible(false);
  };

  const managerSnapshot = async () => {
    const subscriber = await firestore()
      .collection('Users')
      .doc(user.name.toLowerCase())
      .onSnapshot(
        client => {
          if(!client.exists) return;
          const isClientCalling = client.data()?.isClientCalling;
          setUser(client.data());
          if (isClientCalling) {
            setModalVisible(true);
          }
          if (!isClientCalling) {
            setModalVisible(false);
          }
        },
        er => console.log(er),
      );
    return subscriber;
  };

  useEffect(() => {
    const subs = managerSnapshot();
    return () => {
      firestore()
        .collection('Users')
        .doc(user.name.toLowerCase())
        .update({isAvailable: false});
      subs && subs();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Popup
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        accept={acceptCall}
        decline={declineCall}
      />
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
          onPress={() => {
            setUser?.(undefined);
          }}
          title="Logout"
          color="#CC0000"
          accessibilityLabel="Logout Button"
        />
      </View>
    </View>
  );
}
