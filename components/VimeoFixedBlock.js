import React from 'react';
import { WebView, withTheme } from '@draftbit/ui';
import { Dimensions, Platform, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as CustomWebview from '../custom-files/CustomWebview';
import * as Test from '../custom-files/Test';
import * as VimeoVideo from '../custom-files/VimeoVideo';
import * as VimeoVideoForTablets from '../custom-files/VimeoVideoForTablets';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  height: 200,
  quality: '2k',
  videoId: 1042795331,
  width: null,
};

const VimeoFixedBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [height, setHeight] = React.useState(
    props.height ?? defaultProps.height
  );
  const [isLandscape, setIsLandscape] = React.useState(false);
  const [quality, setQuality] = React.useState(
    props.quality ?? defaultProps.quality
  );
  const [tabletHeight, setTabletHeight] = React.useState(
    dimensions.height > dimensions.width ? 420 : 600
  );
  const [videoId, setVideoId] = React.useState(
    props.videoId ?? defaultProps.videoId
  );
  const [width, setWidth] = React.useState(props.width ?? defaultProps.width);
  const generateVideoUrl = (videoId, quality) => {
    return `https://player.vimeo.com/video/${videoId}?title=0&amp;quality=${
      quality || '2k'
    }&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0`;

    // return `https://player.vimeo.com/video/${videoId}?title=0&amp;quality=${quality || '2k'}&amp;byline=0&amp;portrait=0&amFF;badge=0&amp;autopause=0" allow="fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;"`

    // return `https://player.vimeo.com/external/${videoId}.m3u8?s=90ec94a4b3ac6d26b38a67acf4459e854a4d2e04&logging=false`
  };
  React.useEffect(() => {
    const handleOrientationChange = () => {
      const { width, height } = Dimensions.get('window');
      console.log({ width, height });
      setIsLandscape(width > height);
      if (width > height) {
        // console.log('in landscape mode', height)//dimensions.height)
        setHeight(height);
      } else {
        // console.log('in potrait mode')
        setHeight(props.height ?? defaultProps.height);
      }
    };

    // console.log('on use effect')

    const subscription = Dimensions.addEventListener(
      'change',
      handleOrientationChange
    );
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View
      onLayout={event => {
        try {
          setHeight(
            dimensions.width > dimensions.height ? dimensions.height : height
          );
          /* hidden 'Set Variable' action */
          /* hidden 'Set Variable' action */
          /* hidden 'Set Variable' action */
          /* hidden 'Set Variable' action */
        } catch (err) {
          console.error(err);
        }
      }}
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          flex: 1,
          justifyContent: 'center',
        },
        dimensions.width
      )}
    >
      <>
        {!(!(Platform.OS === 'web') && !Constants['IS_TABLET']) ? null : (
          <Utils.CustomCodeErrorBoundary>
            <VimeoVideo.Index
              height={height}
              videoId={videoId}
              quality={quality}
              width={width}
            />
          </Utils.CustomCodeErrorBoundary>
        )}
      </>
      {/* Custom Code TABLET ONLY */}
      <>
        {!(!(Platform.OS === 'web') && Constants['IS_TABLET']) ? null : (
          <Utils.CustomCodeErrorBoundary>
            <VimeoVideoForTablets.Index
              height={tabletHeight}
              videoId={videoId}
              quality={quality}
              width={width}
              isModal={height === 160}
            />
          </Utils.CustomCodeErrorBoundary>
        )}
      </>
    </View>
  );
};

export default withTheme(VimeoFixedBlock);
