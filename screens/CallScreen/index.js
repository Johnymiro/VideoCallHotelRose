import React from 'react';
import AgoraUIKit from 'agora-rn-uikit';


export default function CallScreen({handleEndCall}) {
  const connectionData = {
    appId: 'c902d8178a0f4bb98f9ec284eb4a1713',
    channel: 'test',
    token:
      '007eJxTYNj2j2kj38Jfnv+O79Dh43ffZjLT1Yu3e/JKn8cn/vIW71RVYEi2NDBKsTA0t0g0SDNJSrK0SLNMTTayMElNMkk0NDc0TnoelNwQyMhwdMtkVkYGCATxWRhKUotLGBgAZJMgIQ==',
  };
  const rtcCallbacks = {
    EndCall: handleEndCall,
  };

  return (
    <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
  );
}
