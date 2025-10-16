import React from 'react';
import {
  Button,
  LinearGradient,
  ScreenContainer,
  withTheme,
} from '@draftbit/ui';
import { ImageBackground, StatusBar, Text, View } from 'react-native';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const OnboardingEnterApp6Screen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isFocused) {
      return;
    }
    const entry = StatusBar.pushStackEntry?.({ barStyle: 'light-content' });
    return () => StatusBar.popStackEntry?.(entry);
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <ImageBackground
        resizeMode={'cover'}
        source={imageSource(Images['onboarding5coverimagecompleteedited2'])}
        style={StyleSheet.applyWidth(
          { height: '100%', justifyContent: 'flex-end', width: '100%' },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              bottom: 0,
              left: 0,
              position: 'absolute',
              right: 0,
            },
            dimensions.width
          )}
        >
          {/* Information Container View */}
          <LinearGradient
            startX={0}
            color1={palettes.App.Studily_Dark_UI}
            color2={'"rgba(0, 0, 0, 0)"'}
            endX={0}
            endY={0}
            startY={100}
            style={StyleSheet.applyWidth(
              { height: '100%', width: '100%' },
              dimensions.width
            )}
          >
            {/* Heading Text */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color_2'],
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 30,
                  marginBottom: 10,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {"Let's exercise together"}
            </Text>
            {/* Description Text */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color'],
                  fontSize: 15,
                  lineHeight: 22,
                  marginTop: 5,
                  opacity: 1,
                  paddingLeft: 40,
                  paddingRight: 40,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {
                'Why are we the best? We are the best because we are a community of like minded people who work hard but have a laugh!'
              }
            </Text>
            {/* Start Introduction Button */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                try {
                  navigation.navigate('UserInfo6Screen', {}, { pop: true });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderColor: palettes.App['Custom Color'],
                  borderRadius: 24,
                  borderWidth: 2,
                  color: palettes.App['Custom #ffffff'],
                  fontFamily: 'Inter_500Medium',
                  fontSize: 16,
                  height: 54,
                  marginBottom: 50,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 30,
                  textAlign: 'center',
                },
                dimensions.width
              )}
              title={'Start Introduction'}
            />
          </LinearGradient>
        </View>
      </ImageBackground>
    </ScreenContainer>
  );
};

export default withTheme(OnboardingEnterApp6Screen);
