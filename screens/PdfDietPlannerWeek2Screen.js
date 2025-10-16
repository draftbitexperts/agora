import React from 'react';
import {
  CircleImage,
  Icon,
  ScreenContainer,
  Touchable,
  WebView,
  withTheme,
} from '@draftbit/ui';
import { StatusBar, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import HeaderBlock from '../components/HeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const PdfDietPlannerWeek2Screen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isFocused) {
      return;
    }
    const entry = StatusBar.pushStackEntry?.({ barStyle: 'light-content' });
    return () => StatusBar.popStackEntry?.(entry);
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App.Studily_Dark_UI, opacity: 0.8 },
        dimensions.width
      )}
    >
      <HeaderBlock />
      <WebView
        allowFileAccessFromFileURLs={false}
        allowUniversalAccessFromFileURLs={false}
        cacheEnabled={true}
        incognito={false}
        javaScriptCanOpenWindowsAutomatically={false}
        javaScriptEnabled={true}
        mediaPlaybackRequiresUserAction={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        startInLoadingState={false}
        {...GlobalStyles.WebViewStyles(theme)['Web View'].props}
        source={imageSource(
          'https://xpal-ac6c-xw7a.n7c.xano.io/vault/CbiMXkLr/201RT3LVFTFymZQf8cFrsfZZnVY/UY5QGQ../Week+2+Diet+Planner.pdf'
        )}
        style={StyleSheet.applyWidth(
          GlobalStyles.WebViewStyles(theme)['Web View'].style,
          dimensions.width
        )}
      />
    </ScreenContainer>
  );
};

export default withTheme(PdfDietPlannerWeek2Screen);
