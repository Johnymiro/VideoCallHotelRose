import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Switch,
  Image,
  Dimensions,
  Vibration,
  TouchableOpacity,
  Appearance,
} from 'react-native';
import {colors} from '../../constants';
import firestore from '@react-native-firebase/firestore';
import Popup from './Popup';

const window = Dimensions.get('window');
const ONE_SECOND_IN_MS = 1000;
const colorScheme = Appearance.getColorScheme();

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
    width: '70%',
    height: 100,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    /*     marginRight: 80,
    marginLeft: "20%", */
    justifyContent: 'space-around',
    gap: 5,
    alignItems: 'center',
    padding: 12,
    backgroundColor: colorScheme === 'dark' ? 'black' : colors.customBeige,
  },
  userStatusLabel: {
    fontWeight: 'bold',
    marginRight: 30,
    fontSize: 27,
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
          if (!client.exists) return;
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
      subs && typeof subs === 'function' && subs();
    };
  }, []);

  useEffect(() => {
    if (modalVisible) {
      Vibration.vibrate(10 * ONE_SECOND_IN_MS);
      return;
    }
    Vibration.cancel();
  }, [modalVisible]);

  return (
    <View style={styles.container}>
      {modalVisible && (
        <Popup
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          accept={acceptCall}
          decline={declineCall}
        />
      )}
      <View
        style={{
          width: '100%',
          padding: 30,
          borderRadius: 3,
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        <Image
          style={styles.image}
          source={require('../../assets/HotelRoseTitle.jpeg')}
        />
      </View>
      {/*       <Text style={styles.title}>Hi {user.name}</Text> */}

      <View>
        <Text style={{fontSize: 16}}>Status:</Text>
        <View style={styles.userStatus}>
          <Text style={styles.userStatusLabel}>
            {isEnabled ? 'Offline' : 'Available'}{' '}
          </Text>
          <Switch
            style={{transform: [{scaleX: 1.65}, {scaleY: 1.65}]}}
            trackColor={{false: 'grey', true: 'teal'}}
            thumbColor={isEnabled ? 'lightseagreen' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isEnabled}
            // style={{transform: [{scaleX: 1.4}, {scaleY: 1.4}]}}
          />
        </View>
      </View>

      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        {/*           <Button
            style=""
            onPress={call}
            title="Call Hotel"
            accessibilityLabel="Call Button"
          /> */}
        <CustomButton
          color="#228B22"
          width={170}
          height={70}
          onPress={call}
          text="Call Hotel"
        />
        <CustomButton
          color="#CC0000"
          width={160}
          height={70}
          onPress={() => {
            setUser?.(undefined);
          }}
          text="Logout"
        />
      </View>
    </View>
  );
}

function CustomButton({color, width, height, onPress, text}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        height: height,
        width: width,
        backgroundColor: color,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        marginLeft: 8,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 19,
          fontWeight: 'bold',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}
