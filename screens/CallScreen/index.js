import React, {useEffect, useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Button, View} from 'react-native';

export default function CallScreen({handleEndCall, connection}) {
  const rtcCallbacks = {
    EndCall: () => handleEndCall(),
  };

  return (
    <AgoraUIKit connectionData={connection.data} rtcCallbacks={rtcCallbacks} />
  );
}
