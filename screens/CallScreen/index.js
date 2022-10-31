import React, {useEffect, useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Button} from 'react-native';

export default function CallScreen({handleEndCall, connection}) {
  const rtcCallbacks = {
    EndCall: handleEndCall,
  };

  useEffect(() => {
    console.log('CONNNEction Screeen', connection.data);
  }, []);

  return (
    <AgoraUIKit connectionData={connection.data} rtcCallbacks={rtcCallbacks} />
  );
}

