/* import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import RNCallKeep from 'react-native-callkeep';

const options = {
  ios: {
    appName: 'My app name',
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok',
    imageName: 'phone_account_icon',
    additionalPermissions: [PermissionsAndroid.PERMISSIONS.example],
    // Required to get audio in background when using Android 11
    foregroundService: {
      channelId: 'com.company.my',
      channelName: 'Foreground service for my app',
      notificationTitle: 'My app is running on background',
      notificationIcon: 'Path to the resource icon of the notification',
    },
  },
};

export default function CallTest() {
  useEffect(() => {
    RNCallKeep.setup(options).then(accepted => {
      console.log('acceptied', accepted);
    });
  });

  const call = () => {
      RNCallKeep.startCall("Random number", "92312312", "Johny Miro")
  }

  return (
    <View>
      <Text>Test Call</Text>
      <Button
        onPress={call}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
 */