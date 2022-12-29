import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const baseSize = 1.4;

const colors = {
  customBlue: '#CBDEEC',
  customGrey: '#E7E7E9',
  customBeige: '#F8F5EC',
  customPink: '#C85596',
};

const styles = {
  cardBackgroundCircle: {
    width: 150 * baseSize,
    height: 150 * baseSize,
    shapeOutside: 'ellipse(20% 50%)',
    clipPath: 'ellipse(20% 50%)',
    backgroundColor: colors.customBlue,
  },
  avatar: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 78 * baseSize,
    height: 78 * baseSize,
    borderRadius: 60,
    borderWidth: 5,
    borderColor: colors.customPink,
    backgroundColor: 'transparent',
  },
  piktoGram: {
    width: 56 * baseSize,
    height: 56 * baseSize,
    borderRadius: 60,
    backgroundColor: colors.customGrey,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 1,
    height: 26
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
    height: 170 * baseSize,
    width: 135 * baseSize,
    backgroundColor: 'orange',
    display: 'flex',
    /*     borderWidth: 1, */
    marginRight: 10,
    marginLeft: 10,
    marginTop: 30,
  },
};

export default function ContactCard({
  name,
  category,
  onCall,
  hideOnCallBtn,
  isAvailable,
}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: 'transparent',
      }}
      disabled={!isAvailable}
      onPress={() => {
        onCall();
      }}>
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

        {!hideOnCallBtn && (
          <TouchableOpacity
            style={{
              ...styles.button,
              backgroundColor: isAvailable ? '#007E33' : 'lightgrey',
            }}
            disabled={!isAvailable}
            onPress={() => onCall()}>
            <Text style={styles.btnText}>Call Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}
