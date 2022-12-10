import {useReducer} from 'react';
import firestore from '@react-native-firebase/firestore';

const initState = {
    connectionData: {
      appId: 'c902d8178a0f4bb98f9ec284eb4a1713',
      channel: 'HotelRoseDev',
      tokenUrl: 'https://video-call-hotel-rose.herokuapp.com',
    },
    user: {
      isLogged: false,
      isClient: undefined,
      name: undefined,
    },
}



export function useVideCall() {
  const [state, dispatch] = useReducer(initState);

  const onClientCall = async id => {
    console.log('calling', id);
    if (id) {
      await firestore()
        .collection('Users')
        .doc(id)
        .update({isClientCalling: true});
    }

    setConnection(prev => ({...prev, videoCall: true}));
  };

  const onManagerCall = ({isAcceptingCall}) => {
    console.log('calling');
    if (!isAcceptingCall) {
      firestore()
        .collection('Users')
        .doc('client')
        .update({isToOpenCallScreen: true});
    }

    setConnection(prev => ({...prev, videoCall: true}));
  };

  const handleEndCall = async id => {
    await firestore()
      .collection('Users')
      .doc('client')
      .update({isToOpenCallScreen: false});

    if (user.name != 'client') {
      await firestore()
        .collection('Users')
        .doc(user.name.toLowerCase())
        .update({isClientCalling: false});
    }

    setConnection(prev => ({...prev, videoCall: false}));
  };

  const handleEndCall = async id => {
    await firestore()
      .collection('Users')
      .doc('client')
      .update({isToOpenCallScreen: false});

    if (user.name != 'client') {
      await firestore()
        .collection('Users')
        .doc(user.name.toLowerCase())
        .update({isClientCalling: false});
    }

    setConnection(prev => ({...prev, videoCall: false}));
  };

  return {};
}
