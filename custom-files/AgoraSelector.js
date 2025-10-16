import { Platform } from 'react-native';

const {
  RtcEngine,
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  VideoRemoteState,
  VideoRenderMode,
} = Platform.select({
  ios: () => require('./AgoraNative'),
  android: () => require('./AgoraNative'),
  web: () => require('./AgoraWeb'),
})();

export {
  RtcEngine,
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  VideoRemoteState,
  VideoRenderMode,
};
