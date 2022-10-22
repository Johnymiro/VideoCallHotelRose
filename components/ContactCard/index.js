import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const colors = {
  customBlue: '#CBDEEC',
  customGrey: '#E7E7E9',
  customBeige: '#F8F5EC',
  customPink: '#C85596',
};

const styles = {
  cardBackgroundCircle: {
    width: 150,
    height: 150,
    shapeOutside: 'ellipse(20% 50%)',
    clipPath: 'ellipse(20% 50%)',
    backgroundColor: colors.customBlue,
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 78,
    height: 78,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: colors.customPink,
    backgroundColor: 'transparent',
  },
  piktoGram: {
    width: 56,
    height: 56,
    borderRadius: 50,
    backgroundColor: colors.customGrey,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.customPink,
    width: '100%',
    paddingBottom: 1,
  },
  btnText: {
    color: '#fff',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    height: 170,
    width: 135,
    backgroundColor: 'orange',
    display: 'flex',
    /*     borderWidth: 1, */
    marginRight: 10,
    marginLeft: 10,
    marginTop: 30,
    borderRadius: 2,
  },
};

const onPress = name => {
  console.log(name);
};

export default function ContactCard({name, category}) {
  return (
    <View style={styles.cardContainer}>
      <ImageBackground
        source={require('../../assets/bgHotelRose.jpeg')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.avatar}>
          <View style={styles.piktoGram}></View>
        </View>
        <Text style={{fontWeight: 'bold', top: 3}}>{name}</Text>
        <Text>{category}</Text>
      </ImageBackground>

      <TouchableOpacity style={styles.button} onPress={() => onPress(name)}>
        <Text style={styles.btnText}>Call Now</Text>
      </TouchableOpacity>
    </View>
  );
}
