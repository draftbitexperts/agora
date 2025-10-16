// import React from 'react';
// import { StyleSheet, View, Dimensions } from 'react-native';
// //import { WebView } from 'react-native-webview';
// import { ScreenContainer, WebView, withTheme } from '@draftbit/ui';

// // URL builder function
// const getVimeoUrl = (videoId = 1042795331, quality) => {
//   const resolvedQuality = quality || '2k';
//   return `https://player.vimeo.com/video/${videoId}?title=0&quality=${resolvedQuality}&byline=0&portrait=0&badge=0&autopause=0`;
// };

// // export const MyWebComponent = ({ videoId, quality }) => {
// //   const url = getVimeoUrl(videoId, quality);

// //   return (
// //     <View style={styles.container}>
// //       <WebView source={{ uri: url }} style={styles.webview} />
// //     </View>
// //   );
// // };

// export const MyWebComponent = ({ videoId, quality, height, width }) => {
//   const windowWidth = Dimensions.get('window').width;
//   const windowHeight = Dimensions.get('window').height;
//   console.log('Video id', videoId,windowHeight,windowWidth);
//   const url = getVimeoUrl(videoId, quality);
//   // const resolvedWidth = width || windowWidth - 60;
//   // const resolvedHeight = height || 200;
//   const resolvedWidth = windowWidth > windowHeight? windowWidth -300: windowWidth -20;
//   const resolvedHeight = windowWidth > windowHeight? windowHeight-200: 200;

//   return (
//     <View
//       style={[
//         styles.container,
//         { width: resolvedWidth, height: resolvedHeight, paddingLeft: 20,paddingRight: 20 },
//       ]}
//     >
//       <WebView
//         source={{ uri: url }}
//         style={[
//           styles.webview,
//           { width: resolvedWidth, height: resolvedHeight },
//         ]}
//         cacheEnabled={true}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     //flex: 0,
//       backgroundColor: '111111FF',
//       marginLeft: 20,
//       marginRight: 20,
//     //height: 200,
//     //width: 340
//   },
//   webview: {

//     backgroundColor: '111111FF',

//   },
// });
import React, { useRef } from 'react';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
//import { WebView } from 'react-native-webview';
import { ScreenContainer, WebView, withTheme } from '@draftbit/ui';

// URL builder function
const getVimeoUrl = (videoId, quality) => {
  const resolvedQuality = quality || '2k';
  return `https://player.vimeo.com/video/${videoId}?title=0&quality=${resolvedQuality}&byline=0&portrait=0&badge=0&autopause=0`;
};

export const MyWebComponent = ({
  videoId = 1042795331,
  quality,
  height,
  width,
}) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  console.log('Video id', videoId, windowHeight, windowWidth);
  const url = getVimeoUrl(videoId, quality);
  // const resolvedWidth = width || windowWidth - 60;
  // const resolvedHeight = height || 200;
  const resolvedWidth =
    windowWidth > windowHeight ? windowWidth - 180 : windowWidth - 20;
  const resolvedHeight = windowWidth > windowHeight ? windowHeight : 200;
  const webViewRef = useRef(null);

  return (
    <View
      style={[
        styles.container,
        {
          width: resolvedWidth,
          height: resolvedHeight,
          paddingLeft: 20,
          paddingRight: 20,
        },
      ]}
    >
      <WebView
        source={{ uri: url }}
        style={[
          styles.webview,
          { width: resolvedWidth, height: resolvedHeight },
        ]}
        cacheEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 0,
    backgroundColor: '111111FF',
    marginLeft: 20,
    marginRight: 20,
    //height: 200,
    //width: 340
  },
  webview: {
    backgroundColor: '111111FF',
  },
});
// export function MyWebComponent() {

//   return (
//     <View style={{ flex: 1 }}>
//       <WebView
//         ref={webViewRef}
//         source={{ uri: 'https://google.com' }}
//       />
//       <Button title="Change to Yellow" onPress={() => changeColor('yellow')} />
//     </View>
//   );
// }
