import React, {useState} from 'react';
import {
  Dimensions,
  Text,
  TextInput,
  View,
  Button,
  Image,
  ActivityIndicator,
} from 'react-native';
import {colors} from '../../constants';
import firestore from '@react-native-firebase/firestore';

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
    height: 65,
  },
  image: {
    width: window.width * 0.77,
    height: window.width * 0.15,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 15,
  },
};
const Login = ({setUser}) => {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (text && password) {
      const user = await firestore()
        .collection('Users')
        .doc(text.toLowerCase())
        .get();

      console.log(user.data());
      if (user.exists && user.data().password === password) {
        console.log('Correct credentials');
        setUser(user.data());
        return;
      }
    }
    alert('Wrong user credentials');
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          padding: 30,
          borderRadius: 3,
          backgroundColor: 'white',
          alignItems: 'center',
          marginBottom: 78,
        }}>
        <Image
          style={styles.image}
          source={require('../../assets/HotelRoseTitle.jpeg')}
        />
      </View>
      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter username.."
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter password.."
        onChangeText={passwordInput => setPassword(passwordInput)}
        defaultValue={password}
        password
      />
      {!loading ? (
        <Button
          onPress={() => handleLogin?.(text, password)}
          style={styles.button}
          title="Log in"
          color={colors.customPink}
          accessibilityLabel="Learn more about this purple button"
        />
      ) : (
        <ActivityIndicator size="large" color={colors.customPink} />
      )}
    </View>
  );
};

export default Login;
