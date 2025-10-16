import React from 'react';
import {
  Button,
  Circle,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Image, Text, View } from 'react-native';
import * as PerformApi from '../apis/PerformApi.js';
import SkipButtonBlock from '../components/SkipButtonBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getPushTokenUtil from '../utils/getPushToken';
import imageSource from '../utils/imageSource';
import showAlertUtil from '../utils/showAlert';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Onboarding5NotificationScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [isLoading, setIsLoading] = React.useState(false);
  const performUpdateExpoPushTokenPOST =
    PerformApi.useUpdateExpoPushTokenPOST();

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
            {'Allow Notifications'}
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
              'We would like to send you notifications to keep you motivated with workout reminders, progress updates, and new training tips.'
            }
          </Text>
        </View>
        {/* Next Skip View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              bottom: 20,
              flexDirection: 'column',
              left: 0,
              position: 'absolute',
              right: 0,
            },
            dimensions.width
          )}
        >
          {/* Enable Notification */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              const handler = async () => {
                try {
                  setIsLoading(true);
                  const res = await getPushTokenUtil({
                    permissionErrorMessage:
                      'Sorry, we need notifications permissions to make this work.',
                    deviceErrorMessage:
                      'Must use physical device for Push Notifications.',
                    showAlertOnPermissionError: true,
                    showAlertOnDeviceError: true,
                  });

                  console.log(res);
                  await setGlobalVariableValue({
                    key: 'PUSH_TOKEN',
                    value: res,
                  });
                  const api_Response = (
                    await performUpdateExpoPushTokenPOST.mutateAsync({
                      pushToken: res,
                    })
                  )?.json;
                  setIsLoading(false);
                  /* hidden 'If/Else' action */
                  navigation.navigate(
                    'UserInfo6Screen',
                    { newUser: true },
                    { pop: true }
                  );
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            disabled={Boolean(isLoading)}
            loading={Boolean(isLoading)}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App['Almost Transparent'],
                borderColor: palettes.App['Custom Color'],
                borderRadius: 24,
                borderWidth: 2,
                color: palettes.App['Custom Color'],
                fontFamily: 'Poppins_500Medium',
                fontSize: 17,
                height: 48,
                marginBottom: 25,
                marginLeft: 40,
                marginRight: 40,
                marginTop: 25,
                textAlign: 'center',
              },
              dimensions.width
            )}
            title={'Enable Notification'}
          />
          <SkipButtonBlock />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(Onboarding5NotificationScreen);
