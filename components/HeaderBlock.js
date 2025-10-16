import React from 'react';
import { CircleImage, Icon, Touchable, withTheme } from '@draftbit/ui';
import { ActivityIndicator, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = {
  isGreen: true,
  screenTitle: 'Title Name',
  showBackButton: true,
  showMiddleName: false,
  showSettingsButton: true,
};

const HeaderBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const calculatePercentage = item => {
    return (item / 5) * 100;
  };

  const getTasksNumber = input => {
    return Object.values(input).filter(item => item === true).length;
  };

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: palettes.App.Studily_Dark_Primary,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 16,
          paddingLeft: 16,
          paddingRight: 16,
          width: '100%',
        },
        dimensions.width
      )}
    >
      {/* Avatar Back Button Container View */}
      <View
        style={StyleSheet.applyWidth(
          { flexDirection: 'row' },
          dimensions.width
        )}
      >
        <PerformApi.FetchAuthMeGET
          handlers={{
            on2xx: fetchData => {
              const handler = async () => {
                try {
                  await setGlobalVariableValue({
                    key: 'USER',
                    value: fetchData?.json,
                  });
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            },
          }}
        >
          {({ loading, error, data, refetchAuthMe }) => {
            const fetchData = data?.json;
            if (loading) {
              return <View />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return (
                <>
                  {/* View 2 */}
                  <View />
                </>
              );
            }

            return null;
          }}
        </PerformApi.FetchAuthMeGET>
        {/* Back Button View */}
        <>
          {!(props.showBackButton ?? defaultProps.showBackButton) ? null : (
            <View
              style={StyleSheet.applyWidth(
                { justifyContent: 'center' },
                dimensions.width
              )}
            >
              {/* Button Touchable */}
              <Touchable
                onPress={() => {
                  try {
                    navigation.goBack();
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  { marginBottom: 5, marginLeft: 5, marginTop: 5 },
                  dimensions.width
                )}
              >
                <Icon
                  color={
                    (props.isGreen ?? defaultProps.isGreen
                      ? palettes.App['Custom Color']
                      : palettes.App.Hyrox) ?? palettes.App['Custom Color']
                  }
                  name={'Ionicons/arrow-back-circle-sharp'}
                  size={43}
                />
              </Touchable>
            </View>
          )}
        </>
        {/* Avatar View */}
        <View
          style={StyleSheet.applyWidth(
            { justifyContent: 'center' },
            dimensions.width
          )}
        >
          {/* Avatar Touchable */}
          <Touchable
            onLongPress={() => {
              try {
                navigation.navigate(
                  'P1Week1CoachesCornerScreen',
                  {},
                  { pop: true }
                );
              } catch (err) {
                console.error(err);
              }
            }}
            onPress={() => {
              try {
                navigation.navigate('UserInfo6Screen', {}, { pop: true });
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { marginBottom: 5, marginLeft: 5, marginRight: 5, marginTop: 5 },
              dimensions.width
            )}
          >
            <>
              {Constants['USER']?.profile?.profile_image?.url ? null : (
                <CircleImage size={35} source={Images.UserImage} />
              )}
            </>
            <>
              {!Constants['USER']?.profile?.profile_image?.url ? null : (
                <CircleImage
                  size={35}
                  source={imageSource(
                    `${Constants['USER']?.profile?.profile_image?.url}`
                  )}
                />
              )}
            </>
          </Touchable>
        </View>
      </View>
      {/* Middle Frame */}
      <>
        {!(props.showMiddleName ?? defaultProps.showMiddleName) ? null : (
          <View
            style={StyleSheet.applyWidth(
              {
                flexGrow: 1,
                flexShrink: 0,
                paddingBottom: 12,
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 12,
              },
              dimensions.width
            )}
          >
            {/* Title */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.Brand.Surface,
                  fontFamily: 'Inter_700Bold',
                  fontSize: 16,
                  lineHeight: 20,
                  textAlign: 'center',
                },
                dimensions.width
              )}
            >
              {props.screenTitle ?? defaultProps.screenTitle}
            </Text>
          </View>
        )}
      </>
      {/* Message Notification Container */}
      <View
        style={StyleSheet.applyWidth(
          { flexDirection: 'row' },
          dimensions.width
        )}
      >
        {/* Settings Touchable */}
        <>
          {!(
            props.showSettingsButton ?? defaultProps.showSettingsButton
          ) ? null : (
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate('UserProfileScreen', {}, { pop: true });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* Message View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    height: 48,
                    justifyContent: 'center',
                    width: 48,
                  },
                  dimensions.width
                )}
              >
                {/* Message Icon */}
                <Icon
                  size={24}
                  color={palettes.App['Custom #ffffff']}
                  name={'AntDesign/setting'}
                />
              </View>
            </Touchable>
          )}
        </>
      </View>
    </View>
  );
};

export default withTheme(HeaderBlock);
