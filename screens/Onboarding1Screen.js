import React from 'react';
import {
  Button,
  LinearGradient,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { ImageBackground, StatusBar, Text, View } from 'react-native';
import * as PerformApi from '../apis/PerformApi.js';
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

const Onboarding1Screen = props => {
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
      style={StyleSheet.applyWidth(
        { backgroundColor: '"rgb(2, 0, 0)"' },
        dimensions.width
      )}
    >
      <ImageBackground
        resizeMode={'cover'}
        source={imageSource(Images['appob1test'])}
        style={StyleSheet.applyWidth(
          { height: '100%', width: '100%' },
          dimensions.width
        )}
      >
        {/* Information Container View */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flex: 1, justifyContent: 'flex-end' },
            dimensions.width
          )}
        >
          <LinearGradient
            endY={100}
            startX={0}
            startY={0}
            color1={palettes.App.Studily_Dark_UI}
            color2={'"rgba(0, 0, 0, 0)"'}
            endX={0}
            style={StyleSheet.applyWidth(
              { position: 'absolute', top: 0, width: '100%' },
              dimensions.width
            )}
          />
          <LinearGradient
            startX={0}
            color1={palettes.App.Studily_Dark_UI}
            color2={'"rgba(0, 0, 0, 0)"'}
            endX={0}
            endY={0}
            startY={100}
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                justifyContent: 'space-around',
                minHeight: [
                  { minWidth: Breakpoints.Mobile, value: '50%' },
                  { minWidth: Breakpoints.BigScreen, value: '50%' },
                ],
                width: '100%',
              },
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
                  fontSize: [
                    { minWidth: Breakpoints.Mobile, value: 32 },
                    { minWidth: Breakpoints.Tablet, value: 32 },
                    {
                      minWidth: Breakpoints.Tablet,
                      value:
                        dimensions.width >= Breakpoints.Tablet ? 36 : undefined,
                    },
                    {
                      minWidth: Breakpoints.Laptop,
                      value:
                        dimensions.width >= Breakpoints.Laptop ? 42 : undefined,
                    },
                    {
                      minWidth: Breakpoints.Desktop,
                      value:
                        dimensions.width >= Breakpoints.Desktop
                          ? 48
                          : undefined,
                    },
                    {
                      minWidth: Breakpoints.BigScreen,
                      value:
                        dimensions.width >= Breakpoints.BigScreen
                          ? 56
                          : undefined,
                    },
                  ],
                  paddingLeft: '5%',
                  paddingRight: '5%',
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {
                'Ready to\nget fitter, stronger\nand have a healthier lifestyle!'
              }
            </Text>
            {/* Description Text */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color'],
                  fontFamily: 'Inter_400Regular',
                  fontSize: [
                    { minWidth: Breakpoints.Mobile, value: 16 },
                    {
                      minWidth: Breakpoints.Tablet,
                      value:
                        dimensions.width >= Breakpoints.Tablet ? 18 : undefined,
                    },
                    { minWidth: Breakpoints.Laptop, value: 20 },
                    {
                      minWidth: Breakpoints.Laptop,
                      value:
                        dimensions.width >= Breakpoints.Laptop ? 21 : undefined,
                    },
                    { minWidth: Breakpoints.Desktop, value: 26 },
                    {
                      minWidth: Breakpoints.Desktop,
                      value:
                        dimensions.width >= Breakpoints.Desktop
                          ? 24
                          : undefined,
                    },
                    { minWidth: Breakpoints.BigScreen, value: 30 },
                    {
                      minWidth: Breakpoints.BigScreen,
                      value:
                        dimensions.width >= Breakpoints.BigScreen
                          ? 28
                          : undefined,
                    },
                  ],
                  opacity: 1,
                  paddingLeft: '10%',
                  paddingRight: '10%',
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {
                'We are here to help \nyou with exercise, nutrition, mental wellbeing \nand accountability!'
              }
            </Text>
            {/* Get Started Button */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                try {
                  navigation.navigate('Onboarding2Screen', {}, { pop: true });
                  /* hidden 'API Request' action */
                } catch (err) {
                  console.error(err);
                }
              }}
              title={'Get Started'}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderColor: palettes.App['Custom Color'],
                  borderRadius: 24,
                  borderWidth: 2,
                  fontFamily: 'Inter_500Medium',
                  fontSize: [
                    { minWidth: Breakpoints.Mobile, value: 16 },
                    {
                      minWidth: Breakpoints.Tablet,
                      value:
                        dimensions.width >= Breakpoints.Tablet ? 18 : undefined,
                    },
                    {
                      minWidth: Breakpoints.Laptop,
                      value:
                        dimensions.width >= Breakpoints.Tablet ? 21 : undefined,
                    },
                    {
                      minWidth: Breakpoints.Desktop,
                      value:
                        dimensions.width >= Breakpoints.Desktop
                          ? 24
                          : undefined,
                    },
                    {
                      minWidth: Breakpoints.BigScreen,
                      value:
                        dimensions.width >= Breakpoints.BigScreen
                          ? 28
                          : undefined,
                    },
                  ],
                  height: '10%',
                  marginBottom: '5%',
                  marginTop: '1%',
                  textAlign: 'center',
                  width: '50%',
                },
                dimensions.width
              )}
            />
          </LinearGradient>
        </View>
      </ImageBackground>
    </ScreenContainer>
  );
};

export default withTheme(Onboarding1Screen);
