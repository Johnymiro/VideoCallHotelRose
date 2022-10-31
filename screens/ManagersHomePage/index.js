import React from 'react';
import {View, Text, Button} from 'react-native';

export default function ({user, call}) {
  return (
    <View>
      <Text>Welcome: {user.name}!</Text>
      <Button
        onPress={call}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
}
