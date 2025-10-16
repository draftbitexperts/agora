//ONLY FOR TABLETS
import React from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import useWindowDimensions from '../utils/useWindowDimensions';

export const Index = ({ videoId, isModal }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const isLandscape = screenWidth > screenHeight;

  const ASPECT_RATIO = 4 / 3;
  var calculatedWidth = isLandscape ? screenWidth - 60 : screenWidth - 60;
  var calculatedHeight = isLandscape
    ? calculatedWidth / ASPECT_RATIO - 160
    : calculatedWidth / ASPECT_RATIO - 120;
  var percentage = 100;

  if (isModal) {
    calculatedHeight -= 120;
    calculatedWidth -= 60;

    if (isLandscape) {
      calculatedWidth = Math.min(calculatedWidth, 300);
      calculatedHeight = Math.min(calculatedHeight, 500);
      percentage = 90;
    } else {
      calculatedWidth = Math.min(calculatedWidth, 600);
      calculatedHeight = Math.min(calculatedHeight, 800);
    }
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            background-color: transparent;
          }
          .video-container {
            position: absolute;
            top: 0;
            left: 0;
            width: ${percentage}%;
            height: 100%;
          }
          iframe {
            width: 100%;
            height: 100%;
            border: 0;
          }
        </style>
      </head>
      <body>
        <div class="video-container">
          <iframe
            src="https://player.vimeo.com/video/${
              videoId || '1009885282'
            }?autoplay=0&title=0&byline=0&portrait=0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></iframe>
        </div>
      </body>
    </html>
  `;

  console.log(percentage, 'aaa');

  return (
    <View
      style={{
        width: calculatedWidth,
        height: calculatedHeight,
        backgroundColor: 'transparent',
        overflow: 'hidden',
      }}
    >
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={{
          width: calculatedWidth,
          height: calculatedHeight,
          backgroundColor: 'transparent',
        }}
        allowsFullscreenVideo
        javaScriptEnabled
        domStorageEnabled
        scrollEnabled={false}
      />
    </View>
  );
};
