import React from 'react';
import {
  Circle,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Image, StatusBar, Text, View } from 'react-native';
import SkipButtonBlock from '../components/SkipButtonBlock';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Onboarding4Screen = props => {
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
      {/* Image Background */}
      <Image
        resizeMode={'cover'}
        source={imageSource(Images['onboarding4coverimagecomplete2'])}
        style={StyleSheet.applyWidth(
          { height: '100%', width: '100%' },
          dimensions.width
        )}
      />
      {/* Background Colour View */}
      <View
        style={StyleSheet.applyWidth(
          {
            backgroundColor: '"rgb(2, 0, 0)"',
            borderTopRightRadius: 50,
            bottom: 0,
            height: 320,
            left: 0,
            opacity: 0.5,
            position: 'absolute',
            right: 0,
          },
          dimensions.width
        )}
      />
      {/* Information Container View */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-start',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderTopRightRadius: 50,
            bottom: 0,
            height: 320,
            justifyContent: 'space-around',
            left: 0,
            paddingBottom: 45,
            paddingLeft: 25,
            paddingTop: 25,
            position: 'absolute',
            right: 0,
          },
          dimensions.width
        )}
      >
        {/* Text View */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          {/* Heading Text */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.App['Custom Color_2'],
                fontFamily: 'Inter_600SemiBold',
                fontSize: 30,
                lineHeight: 40,
                textAlign: 'left',
              },
              dimensions.width
            )}
          >
            {'Support and\nResults'}
          </Text>
          {/* Description Text */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.App['Custom Color_2'],
                fontSize: 15,
                lineHeight: 25,
                marginTop: 10,
                opacity: 1,
                paddingRight: 40,
                textAlign: 'left',
              },
              dimensions.width
            )}
          >
            {
              'With 24/7 support 365 days a year we can guarantee those life changing results'
            }
          </Text>
        </View>
        {/* Next Skip View */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flexDirection: 'row', marginRight: 20 },
            dimensions.width
          )}
        >
          {/* Next Touchable */}
          <Touchable
            onPress={() => {
              try {
                navigation.navigate(
                  'Onboarding5NotificationScreen',
                  {},
                  { pop: true }
                );
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* Green Circle */}
            <Circle
              bgColor={palettes.App['Custom Color']}
              size={60}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderColor: palettes.App['Custom Color'],
                  borderWidth: 2,
                },
                dimensions.width
              )}
            >
              {/* Arrow Icon */}
              <Icon
                size={24}
                color={palettes.App['Custom Color_2']}
                name={'Entypo/chevron-right'}
              />
            </Circle>
          </Touchable>
          <SkipButtonBlock />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Onboarding4Screen);
