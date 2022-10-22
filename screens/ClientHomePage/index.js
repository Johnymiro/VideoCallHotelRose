import React from 'react';
import {View, Text, Button, Dimensions, Image} from 'react-native';
import ContactCard from '../../components/ContactCard';

const window = Dimensions.get('window');

const styles = {
  container: {
    vh: 100,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 7.5,
    paddingLeft: 7.5,
    backgroundColor: '#C85596',
  },
  content: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 20,
    paddingRight:0,
    paddingLeft: 0
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
    alignContent: "center",
    flexDirection: "row",
/*     borderWidth: 1, */
    flexWrap: "wrap",
  },
};

const contactsList = [
  {name: 'Corinna', category: 'Reception', avatar: ''},
  {name: 'Sole', category: 'Reception', avatar: ''},
  {name: 'Nico', category: 'Reception', avatar: ''},
  {name: 'Herbert', category: 'Reception', avatar: ''},
  {name: 'Kevin', category: 'Reception', avatar: ''},
];

export default function ClientHomePage({onPress}) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          style={styles.image}
          source={require('../../assets/HotelRoseTitle.jpeg')}
        />
        <View style={styles.contactsList}>
          {contactsList.map(contact => {
            return (
              <ContactCard
                key={contact.name}
                name={contact.name}
                category={contact.category}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}
