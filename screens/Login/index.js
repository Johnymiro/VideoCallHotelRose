import React, {useState} from 'react';
import {Dimensions, Text, TextInput, View, Button, Image} from 'react-native';
import {colors} from '../../constants';

const window = Dimensions.get('window');

const styles = {
  textInput: {
    height: 45,
    borderWidth: 2,
    borderColor: colors.customPink,
    borderRadius: 5,
    marginBottom: 20,
  },
  container: {
    padding: 40,
    height: '100%',
  },
  button: {
    height: 55,
  },
  image: {
    width: window.width * 0.77,
    height: window.width * 0.15,
    marginBottom: 78,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  label: {
      fontWeight: 'bold',
      marginBottom: 5,
      fontSize: 15
  }
};
const Login = ({handleLogin}) => {
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/HotelRoseTitle.jpeg')}
      />
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Type here your username"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Button
        onPress={() => handleLogin?.(text)}
        style={styles.button}
        title="Enter"
        color={colors.customPink}
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default Login;
