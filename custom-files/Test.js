import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

export const YouTubePlayer = ({ videoId }) => {
  const htmlContent = `
    <html>
      <body style="margin:0; padding:0; background:transparent;">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/${videoId}?controls=1&modestbranding=1&rel=0"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
          style="background-color: transparent;"
        ></iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
        allowsInlineMediaPlayback
        scrollEnabled={false}
        originWhitelist={['*']}
        mediaPlaybackRequiresUserAction={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
