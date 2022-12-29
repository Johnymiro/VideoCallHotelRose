import React, {useEffect, useState} from 'react';
import {View, Text, Button, Dimensions, Image, ScrollView} from 'react-native';
import ContactCard from '../../components/ContactCard';
import firestore from '@react-native-firebase/firestore';

const window = Dimensions.get('window');
let ScreenHeight = window.height;


const styles = {
  container: {
    vh: 100,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 7.5,
    paddingLeft: 9.5,
    backgroundColor: '#C85596',
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    minHeight: ScreenHeight,
    backgroundColor: '#fff',
    padding: 20,
    paddingRight: 0,
    paddingLeft: 0,
  },
  image: {
    width: window.width * 0.77,
    height: window.width * 0.15,
  },
  contactsList: {
    margin: 0,
    marginTop: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    /*     borderWidth: 1, */
    flexWrap: 'wrap',
  },
};

export default function ClientHomePage({onCall, data, endCall}) {
  const [contactList, setContactList] = useState();

  const getUsers = async () => {
    const subscriber = await firestore()
      .collection('Users')
      .onSnapshot(
        usersSnapshot => {
          console.log('Users collection2:', usersData);
          const usersData = usersSnapshot.docs.map(doc => doc.data());
          setContactList(usersData);
        },
        er => console.log(er),
      );
    return subscriber;
  };

  const handleManagerCalling = async () => {
    const subscriber = await firestore()
      .collection('Users')
      .doc('client')
      .onSnapshot(
        client => {
          if (client.data().isToOpenCallScreen) {
            onCall();
          }
          if (!client.data().isToOpenCallScreen) {
            endCall();
          }
        },
        er => console.log(er),
      );
    return subscriber;
  };

  useEffect(() => {
    const subscriber = getUsers();
    const subscriber2 = handleManagerCalling();
    return () => {
      subscriber && typeof subscriber === 'function' && subscriber();
      subscriber2 && typeof subscriber2 === 'function' && subscriber2();
    };
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={require('../../assets/HotelRoseTitle.jpeg')}
          />
          <View style={styles.contactsList}>
            {contactList
              ?.filter(el => el.type != 'client')
              .map(contact => {
                return (
                  <ContactCard
                    key={contact.name}
                    name={contact.name}
                    isAvailable={contact.isAvailable}
                    category={contact.type}
                    onCall={() => onCall(contact?.name?.toLowerCase())}
                  />
                );
              })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
// Vibration.cancel()
