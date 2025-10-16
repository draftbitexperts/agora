import React from 'react';
import {
  Button,
  Checkbox,
  Circle,
  CircleImage,
  ExpoImage,
  Icon,
  IconButton,
  ScreenContainer,
  SimpleStyleScrollView,
  SwitchRow,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import {
  ActivityIndicator,
  Image,
  Modal,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import HeaderBlock from '../components/HeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import isLoggedIn from '../global-functions/isLoggedIn';
import updateUserTasks from '../global-functions/updateUserTasks';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import getPushTokenUtil from '../utils/getPushToken';
import hapticFeedbackUtil from '../utils/hapticFeedback';
import imageSource from '../utils/imageSource';
import parseBoolean from '../utils/parseBoolean';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const UserProfileScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [notificationSwitchValue, setNotificationSwitchValue] = React.useState(
    parseBoolean(Constants['PUSH_TOKEN'])
  );
  const [showTodoList, setShowTodoList] = React.useState(false);
  const [switchRowValue, setSwitchRowValue] = React.useState(false);
  const [taskFive, setTaskFive] = React.useState(false);
  const [taskFour, setTaskFour] = React.useState(false);
  const [taskOne, setTaskOne] = React.useState(false);
  const [taskThree, setTaskThree] = React.useState(false);
  const [taskTwo, setTaskTwo] = React.useState(false);
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [switchValue, setSwitchValue] = React.useState(false);
  const performUpdateExpoPushTokenPOST =
    PerformApi.useUpdateExpoPushTokenPOST();
  const performDailyTasksPATCH = PerformApi.useDailyTasksPATCH();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        /* hidden 'Log to Console' action */
        if (!isLoggedIn(Variables)) {
          navigation.navigate('LogInScreen', {}, { pop: true });
        }
        const tasksResult = (await PerformApi.dailyTasksGET(Constants))?.json;
        setTaskOne(tasksResult?.task_one);
        setTaskTwo(tasksResult?.task_two);
        setTaskThree(tasksResult?.task_three);
        setTaskFour(tasksResult?.task_four);
        setTaskFive(tasksResult?.task_five);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

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
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
      >
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flexDirection: 'column', marginTop: 30 },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate('UserInfo6Screen', {}, { pop: true });
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { marginBottom: 12 },
                dimensions.width
              )}
            >
              <Circle
                {...GlobalStyles.CircleStyles(theme)['Circle'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.CircleStyles(theme)['Circle'].style,
                    { backgroundColor: null, overflow: 'hidden' }
                  ),
                  dimensions.width
                )}
              >
                <ExpoImage
                  allowDownscaling={true}
                  cachePolicy={'disk'}
                  contentPosition={'center'}
                  resizeMode={'cover'}
                  transitionDuration={300}
                  transitionEffect={'cross-dissolve'}
                  transitionTiming={'ease-in-out'}
                  {...GlobalStyles.ExpoImageStyles(theme)['Image (default)']
                    .props}
                  source={imageSource(
                    Constants['USER']?.profile?.profile_image?.url ||
                      Images['UserImage']
                  )}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['Image (default)']
                        .style,
                      { height: 80, width: 80 }
                    ),
                    dimensions.width
                  )}
                />
              </Circle>
            </Touchable>

            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color_2'],
                  fontFamily: 'Inter_400Regular',
                  fontSize: 12,
                  marginTop: 6,
                  opacity: 1,
                },
                dimensions.width
              )}
            >
              {'Quote Of The Week'}
            </Text>

            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom Color_2'],
                  fontFamily: 'Inter_600SemiBold',
                  fontSize: 18,
                  marginTop: 16,
                  opacity: 1,
                },
                dimensions.width
              )}
            >
              {Constants['USER']?.profile?.name}
            </Text>
          </View>
        </View>
        {/* To Do List */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderRadius: 20,
              marginBottom: 24,
              marginLeft: 20,
              marginRight: 20,
              marginTop: 24,
            },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                borderRadius: 20,
                height: 100,
                marginTop: 16,
                opacity: 0.3,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          <Touchable
            onPress={() => {
              try {
                setShowTodoList(true);
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ height: 120 }, dimensions.width)}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  flex: 1,
                  height: '100%',
                  justifyContent: 'center',
                  marginTop: 12,
                },
                dimensions.width
              )}
            >
              {/* View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
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
                        backgroundColor: palettes.App['Custom Color'],
                        height: 35,
                        width: 35,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  <Image
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
                    source={imageSource(Images['ToDoList'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'].style,
                        { height: 16, width: 16 }
                      ),
                      dimensions.width
                    )}
                  />
                </Circle>

                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        alignSelf: 'center',
                        color: palettes.App['Custom Color'],
                        fontFamily: 'Inter_400Regular',
                        fontSize: 12,
                        marginLeft: 5,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'To Do List'}
                </Text>
              </View>
            </View>
          </Touchable>
        </View>
        {/* Notification Settings */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderRadius: 20,
              marginBottom: 24,
              marginLeft: 20,
              marginRight: 20,
            },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth({ height: 120 }, dimensions.width)}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App.Studily_Slate_Blue_Dark_30,
                  borderRadius: 20,
                  height: '100%',
                  justifyContent: 'center',
                  padding: 10,
                },
                dimensions.width
              )}
            >
              <SwitchRow
                onValueChange={newSwitchRowValue => {
                  const handler = async () => {
                    const switchValue = newSwitchRowValue;
                    try {
                      await hapticFeedbackUtil({
                        feedbackIntensity: 'success',
                      });

                      setNotificationSwitchValue(newSwitchRowValue);
                      if (newSwitchRowValue) {
                        const tokenResult = await getPushTokenUtil({
                          permissionErrorMessage:
                            'Sorry, we need notifications permissions to make this work.',
                          deviceErrorMessage:
                            'Must use physical device for Push Notifications.',
                          showAlertOnPermissionError: true,
                          showAlertOnDeviceError: true,
                        });

                        (
                          await performUpdateExpoPushTokenPOST.mutateAsync({
                            pushToken: tokenResult,
                          })
                        )?.json;
                        await setGlobalVariableValue({
                          key: 'PUSH_TOKEN',
                          value: tokenResult,
                        });
                      } else {
                        (
                          await performUpdateExpoPushTokenPOST.mutateAsync({
                            pushToken: null,
                          })
                        )?.json;
                        await setGlobalVariableValue({
                          key: 'PUSH_TOKEN',
                          value: '',
                        });
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                {...GlobalStyles.SwitchRowStyles(theme)['Switch Row'].props}
                activeTrackColor={palettes.App['Custom Color']}
                label={'Allow Notifications'}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.SwitchRowStyles(theme)['Switch Row'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Poppins_400Regular',
                    }
                  ),
                  dimensions.width
                )}
                value={notificationSwitchValue}
              />
            </View>
          </View>
        </View>
        {/* Sign Out */}
        <Button
          accessible={true}
          iconPosition={'left'}
          onPress={() => {
            const handler = async () => {
              try {
                await setGlobalVariableValue({
                  key: 'AUTHORIZATION_HEADER',
                  value: '',
                });
                await setGlobalVariableValue({
                  key: 'PUSH_TOKEN',
                  value: '',
                });
                await setGlobalVariableValue({
                  key: 'USER',
                  value: '',
                });
                navigation.push('LogInScreen', {});
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          {...GlobalStyles.ButtonStyles(theme)['Button'].props}
          icon={'Feather/log-in'}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ButtonStyles(theme)['Button'].style,
              theme.typography.button,
              {
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark_30,
                borderRadius: 20,
                color: palettes.App['Custom Color'],
                fontFamily: 'Inter_700Bold',
                height: 100,
                marginLeft: 24,
                marginRight: 24,
              }
            ),
            dimensions.width
          )}
          title={'Logout'}
        />
      </SimpleStyleScrollView>

      <Modal
        animationType={'none'}
        supportedOrientations={['portrait', 'landscape']}
        transparent={true}
        visible={Boolean(showTodoList)}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'stretch',
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              flex: 1,
              height: '100%',
              justifyContent: 'center',
            },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: palettes.App.Studily_Dark_UI,
                height: '76%',
                justifyContent: 'center',
                paddingLeft: 24,
                paddingRight: 24,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-end',
                  position: 'absolute',
                  right: 10,
                  top: 10,
                },
                dimensions.width
              )}
            >
              {/* Close Button */}
              <IconButton
                onPress={() => {
                  try {
                    setShowTodoList(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                size={32}
                color={palettes.App['Custom #ffffff']}
                icon={'Ionicons/close-outline'}
              />
            </View>

            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', marginTop: 10 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 22,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Trained'}
              </Text>
              <Checkbox
                onPress={newCheckboxValue => {
                  const handler = async () => {
                    try {
                      setTaskOne(newCheckboxValue);
                      const res = (
                        await performDailyTasksPATCH.mutateAsync({
                          taskFive: taskFive,
                          taskFour: taskFour,
                          taskOne: newCheckboxValue,
                          taskThree: taskThree,
                          taskTwo: taskTwo,
                        })
                      )?.json;
                      console.log(res);
                      updateUserTasks(Variables, setGlobalVariableValue, res);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                color={palettes.App['Custom #ffffff']}
                size={30}
                status={taskOne}
                style={StyleSheet.applyWidth(
                  { position: 'absolute', right: 10 },
                  dimensions.width
                )}
                uncheckedColor={palettes.App['Custom Color']}
              />
            </View>
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', marginTop: 10 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 22,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Diet'}
              </Text>
              <Checkbox
                onPress={newCheckboxValue => {
                  const handler = async () => {
                    const checkboxValue = newCheckboxValue;
                    try {
                      undefined;
                      const res = (
                        await performDailyTasksPATCH.mutateAsync({
                          taskFive: taskFive,
                          taskFour: taskFour,
                          taskOne: taskOne,
                          taskThree: taskThree,
                          taskTwo: newCheckboxValue,
                        })
                      )?.json;
                      updateUserTasks(Variables, setGlobalVariableValue, res);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                color={palettes.App['Custom #ffffff']}
                size={30}
                status={taskTwo}
                style={StyleSheet.applyWidth(
                  { position: 'absolute', right: 10 },
                  dimensions.width
                )}
                uncheckedColor={palettes.App['Custom Color']}
              />
            </View>
            {/* View 3 */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', marginTop: 10 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 22,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Water'}
              </Text>
              <Checkbox
                onPress={newCheckboxValue => {
                  const handler = async () => {
                    try {
                      setTaskThree(newCheckboxValue);
                      const res = (
                        await performDailyTasksPATCH.mutateAsync({
                          taskFive: taskFive,
                          taskFour: taskFour,
                          taskOne: taskOne,
                          taskThree: newCheckboxValue,
                          taskTwo: taskTwo,
                        })
                      )?.json;
                      updateUserTasks(Variables, setGlobalVariableValue, res);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                color={palettes.App['Custom #ffffff']}
                size={30}
                status={taskThree}
                style={StyleSheet.applyWidth(
                  { position: 'absolute', right: 10 },
                  dimensions.width
                )}
                uncheckedColor={palettes.App['Custom Color']}
              />
            </View>
            {/* View 4 */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', marginTop: 10 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 22,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Posted'}
              </Text>
              <Checkbox
                onPress={newCheckboxValue => {
                  const handler = async () => {
                    try {
                      setTaskFour(newCheckboxValue);
                      const res = (
                        await performDailyTasksPATCH.mutateAsync({
                          taskFive: taskFive,
                          taskFour: newCheckboxValue,
                          taskOne: taskOne,
                          taskThree: taskThree,
                          taskTwo: taskTwo,
                        })
                      )?.json;
                      updateUserTasks(Variables, setGlobalVariableValue, res);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                color={palettes.App['Custom #ffffff']}
                size={30}
                status={taskFour}
                style={StyleSheet.applyWidth(
                  { position: 'absolute', right: 10 },
                  dimensions.width
                )}
                uncheckedColor={palettes.App['Custom Color']}
              />
            </View>
            {/* View 5 */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flexDirection: 'row', marginTop: 10 },
                dimensions.width
              )}
            >
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 22,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Sleep'}
              </Text>
              <Checkbox
                onPress={newCheckboxValue => {
                  const handler = async () => {
                    try {
                      setTaskFive(newCheckboxValue);
                      const res = (
                        await performDailyTasksPATCH.mutateAsync({
                          taskFive: newCheckboxValue,
                          taskFour: taskFour,
                          taskOne: taskOne,
                          taskThree: taskThree,
                          taskTwo: taskTwo,
                        })
                      )?.json;
                      updateUserTasks(Variables, setGlobalVariableValue, res);
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                color={palettes.App['Custom #ffffff']}
                size={30}
                status={taskFive}
                style={StyleSheet.applyWidth(
                  { position: 'absolute', right: 10 },
                  dimensions.width
                )}
                uncheckedColor={palettes.App['Custom Color']}
              />
            </View>
            {/* View 6 */}
            <View
              style={StyleSheet.applyWidth(
                { paddingTop: 48 },
                dimensions.width
              )}
            >
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    setShowTodoList(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'].style,
                    { backgroundColor: palettes.App['Custom Color'] }
                  ),
                  dimensions.width
                )}
                title={'Save'}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(UserProfileScreen);
