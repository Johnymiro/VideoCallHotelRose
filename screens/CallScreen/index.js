import React, {useEffect, useState} from 'react';
import AgoraUIKit from 'agora-rn-uikit';
import {Button, View} from 'react-native';

export default function CallScreen({handleEndCall, connection}) {
  const rtcCallbacks = {
    EndCall: handleEndCall,
  };

  const rtmCallbacks = {
    ConnectionStateChanged: () => {},
    ChannelMemberJoined: member => {
      console.log('ChannelMemme join: ', member);
    },
    LocalInvitationReceivedByPeer: () => {},
    MemberCountUpdated: count => {
      console.log('COUNTT: ', count);
    },
    ConnectionStateChanged: state => {
      console.log('STATEee', state);
    },
    uidMap: () => {},
  };

  useEffect(() => {
    console.log('CONNNEction Screeen', connection.data);
  }, []);

  return (
    <AgoraUIKit
      rtmCallbacks={rtmCallbacks}
      connectionData={connection.data}
      rtcCallbacks={rtcCallbacks}
    />
  );
}
