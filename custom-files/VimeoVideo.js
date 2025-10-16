import { Vimeo } from 'react-native-vimeo-iframe';
import { View } from 'react-native';
import useWindowDimensions from '../utils/useWindowDimensions';
export const Index = ({ videoId, height, width, quality }) => {
  const dimensions = useWindowDimensions();
  const videoCallbacks = {
    // play: (data) => console.log("play: ", data),
    // pause: (data) => console.log("pause: ", data),
    // fullscreenchange: (data) => console.log("fullscreenchange: ", data),
    // ended: (data) => console.log("ended: ", data),
    // controlschange: (data) => console.log("controlschange: ", data),
    // loadeddata: (data) => console.log("data loaded: ",data),
    // stalled: (data) => console.log("stall loaded: ",data)
  };
  console.log('using videoId', videoId);
  return (
    <View
      style={{
        height: height || 180,
        backgroundColor: 'transparent',
        width: width || '100%',
        overflow: 'hidden',
        borderRadius: 0,
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Vimeo
        videoId={videoId || '1009885282'}
        handlers={videoCallbacks}
        params={`api=1&t=1s&controls=1&quality=${quality || '1080p'}`}
        style={{
          backgroundColor: 'transparent',
          // borderRadius: 24,
          overflow: 'hidden',
          //height: 300,
          alignItems: 'stretch',
          flex: 1,
        }}
      />
    </View>
  );
};
