import React from 'react';
import {
  Button,
  Circle,
  Icon,
  ScreenContainer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { StatusBar, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getPushTokenUtil from '../utils/getPushToken';
import showAlertUtil from '../utils/showAlert';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const EnableNotificationScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const performUpdateExpoPushTokenPOST =
    PerformApi.useUpdateExpoPushTokenPOST();
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
      scrollable={false}
      hasSafeArea={true}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App.Studily_Dark_UI,
          justifyContent: 'space-between',
        },
        dimensions.width
      )}
    >
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          { alignItems: 'center', flexDirection: 'row', paddingLeft: 10 },
          dimensions.width
        )}
      />
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            paddingBottom: 5,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 16,
          },
          dimensions.width
        )}
      >
        <Circle
          {...GlobalStyles.CircleStyles(theme)['Circle'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.CircleStyles(theme)['Circle'].style,
              {
                backgroundColor: palettes.App.Peoplebit_Light_Stone_Gray,
                padding: 30,
              }
            ),
            dimensions.width
          )}
        >
          <Icon
            color={palettes.App.Peoplebit_Stone_Gray}
            name={'MaterialCommunityIcons/bell-ring'}
            size={100}
          />
        </Circle>
        {/* Enable Notification */}
        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: palettes.App['Custom Color'],
              fontFamily: 'Poppins_700Bold',
              fontSize: 35,
              marginLeft: 40,
              marginRight: 40,
              marginTop: 50,
              textAlign: 'center',
            },
            dimensions.width
          )}
        >
          {'Enable \nNotification'}
        </Text>

        <Text
          accessible={true}
          selectable={false}
          style={StyleSheet.applyWidth(
            {
              color: palettes.App.Peoplebit_Stone_Gray,
              fontFamily: 'Poppins_400Regular',
              fontSize: 15,
              marginLeft: 40,
              marginRight: 40,
              marginTop: 30,
              textAlign: 'center',
            },
            dimensions.width
          )}
        >
          {'Turn on notifications to stay updated with app alerts!'}
        </Text>
      </View>
      {/* Clicks */}
      <View>
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center' },
            dimensions.width
          )}
        >
          {/* Error Message */}
          <>
            {!errorMessage ? null : (
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: '"rgb(255, 2, 2)"',
                      marginLeft: 20,
                      marginRight: 20,
                    }
                  ),
                  dimensions.width
                )}
              >
                {errorMessage}
              </Text>
            )}
          </>
        </View>
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
                if (api_Response?.message) {
                  setErrorMessage(api_Response?.message);
                }
                if (api_Response?.message) {
                  return;
                }
                navigation.navigate(
                  'BottomTabNavigator',
                  {
                    screen: 'Home',
                    params: { screen: 'Home10ModuleTestScreen' },
                  },
                  { pop: true }
                );
                /* hidden 'If/Else' action */
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
        {/* May be later */}
        <Touchable
          onPress={() => {
            try {
              setErrorMessage('');
              navigation.navigate(
                'BottomTabNavigator',
                {
                  screen: 'Home',
                  params: { screen: 'Home10ModuleTestScreen' },
                },
                { pop: true }
              );
            } catch (err) {
              console.error(err);
            }
          }}
          style={StyleSheet.applyWidth({ marginBottom: 10 }, dimensions.width)}
        >
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', height: 48, justifyContent: 'center' },
              dimensions.width
            )}
          >
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App.Peoplebit_Stone_Gray,
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 13,
                  textDecorationLine: 'underline',
                },
                dimensions.width
              )}
            >
              {'Maybe later'}
            </Text>
          </View>
        </Touchable>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(EnableNotificationScreen);
