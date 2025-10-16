import React from 'react';
import {
  Button,
  KeyboardAvoidingView,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import HeaderBlock from '../components/HeaderBlock';
import VimeoFixedBlock from '../components/VimeoFixedBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { isNewUser: false };

const CreateGoals8Screen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const params = useParams();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [goalOne, setGoalOne] = React.useState('');
  const [goalThree, setGoalThree] = React.useState('');
  const [goalTwo, setGoalTwo] = React.useState('');
  const [name, setName] = React.useState('');
  const performCreateOrEditGoalsPATCH = PerformApi.useCreateOrEditGoalsPATCH();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const apiResponse = (await PerformApi.getGoalGET(Constants))?.json;
        setGoalOne(apiResponse?.goal_one);
        setGoalTwo(apiResponse?.goal_two);
        setGoalThree(apiResponse?.goal_three);
        console.log(apiResponse);
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
        {
          backgroundColor: palettes.App.Studily_Dark_UI,
          justifyContent: 'center',
          opacity: 0.8,
        },
        dimensions.width
      )}
    >
      <SimpleStyleKeyboardAwareScrollView
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        enableAutomaticScroll={true}
      >
        <HeaderBlock />
        {/* Define Your Goals Title View */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'column', marginTop: 16 },
            dimensions.width
          )}
        >
          {/* Define your goals Title Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: palettes.App['Custom Color'],
                fontFamily: 'Inter_400Regular',
                fontSize: 26,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'Define your goals'}
          </Text>
          {/* Sub Text View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              },
              dimensions.width
            )}
          >
            {/* You are 45% more likely ... Text */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: palettes.App['Custom #ffffff'],
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    opacity: 0.5,
                    textAlign: 'center',
                  }
                ),
                dimensions.width
              )}
            >
              {
                'You are 45% more likely to achieve your goals if you write them down!'
              }
            </Text>
          </View>
        </View>
        {/* Coach's Information Video Container View */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 20, paddingLeft: 10, paddingRight: 10 },
            dimensions.width
          )}
        >
          {/* Background Colour View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                borderRadius: 20,
                height: '100%',
                opacity: 0.3,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          {/* Coach's information View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-start',
                opacity: 1,
                paddingBottom: 20,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
                position: 'relative',
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* Coach's Video View */}
            <View
              style={StyleSheet.applyWidth(
                { marginBottom: 10, width: '100%' },
                dimensions.width
              )}
            >
              <VimeoFixedBlock
                height={200}
                quality={'2k'}
                videoId={1046864396}
              />
            </View>
            {/* Coach's Video Text View */}
            <View>
              {/* Coach Dave Text */}
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
                      fontSize: 18,
                      marginBottom: 5,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Coach: Dave'}
              </Text>
              {/* Coach's Video Title Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Lets make a plan'}
              </Text>
              {/* Coach's video Subtitle Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_400Regular',
                      fontSize: 12,
                      marginTop: 5,
                      opacity: 0.5,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Hit play and learn how to set achievable goals'}
              </Text>
            </View>
          </View>
        </View>
        {/* Heading View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-start',
              flex: 2,
              flexDirection: 'column',
              marginLeft: 10,
              marginRight: 10,
              marginTop: 16,
              paddingBottom: 16,
            },
            dimensions.width
          )}
        >
          {/* Background Colour View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                borderRadius: 20,
                height: '100%',
                opacity: 0.3,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          {/* Greetings View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 16,
                paddingBottom: 16,
                paddingLeft: 16,
                paddingRight: 16,
              },
              dimensions.width
            )}
          >
            {/* Greetings Text */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: palettes.App['Custom #ffffff'],
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                  }
                ),
                dimensions.width
              )}
            >
              {"Let's set some achievable goals!"}
            </Text>
          </View>
        </View>
        {/* Goals Container */}
        <View>
          {/* Goal 1 View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark_30,
                borderRadius: 20,
                flex: 2,
                height: 110,
                paddingLeft: 10,
                paddingRight: 10,
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* Background Colour View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                  borderRadius: 20,
                  height: '100%',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* Goal 1 Title Text */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: palettes.App['Custom Color'],
                    fontFamily: 'Inter_500Medium',
                    fontSize: 18,
                    marginLeft: 30,
                    marginTop: 10,
                  },
                  dimensions.width
                )}
              >
                {'Goal 1'}
              </Text>
              {/* Goal 1 Input */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newGoal1InputValue => {
                  try {
                    setGoalOne(newGoal1InputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                editable={true}
                placeholder={'Goal 1'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom #ffffff'],
                    borderBottomWidth: 1,
                    borderColor: palettes.App['Custom Color_4'],
                    borderLeftWidth: 1,
                    borderRadius: 5,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: '"rgb(0, 0, 0)"',
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    height: '45%',
                    marginBottom: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 12,
                    paddingBottom: 8,
                    paddingLeft: 16,
                    paddingRight: 8,
                    paddingTop: 8,
                    width: '90%',
                  },
                  dimensions.width
                )}
                value={goalOne}
              />
            </View>
          </View>
          {/* Goal 2 View  */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flex: 2,
                height: 110,
                marginTop: 16,
                paddingLeft: 10,
                paddingRight: 10,
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* Background Colour View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                  borderRadius: 20,
                  height: '100%',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* Goal 2 Title Text */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: palettes.App['Custom Color'],
                    fontFamily: 'Inter_500Medium',
                    fontSize: 18,
                    marginLeft: 30,
                    marginTop: 10,
                  },
                  dimensions.width
                )}
              >
                {'Goal 2'}
              </Text>
              {/* Goal 2 Input */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newGoal2InputValue => {
                  try {
                    setGoalTwo(newGoal2InputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                editable={true}
                placeholder={'Goal 2'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom #ffffff'],
                    borderBottomWidth: 1,
                    borderColor: palettes.App['Custom Color_4'],
                    borderLeftWidth: 1,
                    borderRadius: 5,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: '"rgb(0, 0, 0)"',
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    height: '45%',
                    marginBottom: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 12,
                    paddingBottom: 8,
                    paddingLeft: 16,
                    paddingRight: 8,
                    paddingTop: 8,
                    width: '90%',
                  },
                  dimensions.width
                )}
                value={goalTwo}
              />
            </View>
          </View>
          {/* Goal 3 View   */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flex: 2,
                height: 110,
                marginTop: 16,
                paddingLeft: 10,
                paddingRight: 10,
                width: '100%',
              },
              dimensions.width
            )}
          >
            {/* Background Colour View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                  borderRadius: 20,
                  height: '100%',
                  width: '100%',
                },
                dimensions.width
              )}
            >
              {/* Goal 3 */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    alignSelf: 'flex-start',
                    color: palettes.App['Custom Color'],
                    fontFamily: 'Inter_500Medium',
                    fontSize: 18,
                    marginLeft: 30,
                    marginTop: 10,
                  },
                  dimensions.width
                )}
              >
                {'Goal 3'}
              </Text>
              {/* Goal 3 */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newGoal3Value => {
                  try {
                    setGoalThree(newGoal3Value);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                editable={true}
                placeholder={'Goal 3'}
                placeholderTextColor={theme.colors.text.light}
                secureTextEntry={false}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom #ffffff'],
                    borderBottomWidth: 1,
                    borderColor: palettes.App['Custom Color_4'],
                    borderLeftWidth: 1,
                    borderRadius: 5,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: '"rgb(0, 0, 0)"',
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    height: '45%',
                    marginBottom: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 12,
                    paddingBottom: 8,
                    paddingLeft: 16,
                    paddingRight: 8,
                    paddingTop: 8,
                    width: '90%',
                  },
                  dimensions.width
                )}
                value={goalThree}
              />
            </View>
          </View>
          {/* submit */}
          <>
            {params?.isNewUser ?? defaultProps.isNewUser ? null : (
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  const handler = async () => {
                    try {
                      (
                        await performCreateOrEditGoalsPATCH.mutateAsync({
                          goalOne: goalOne,
                          goalThree: goalThree,
                          goalTwo: goalTwo,
                        })
                      )?.json;
                      navigation.navigate(
                        'IntroImagesScreen',
                        {
                          isNewUser:
                            params?.isNewUser ?? defaultProps.isNewUser,
                        },
                        { pop: true }
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderColor: palettes.App['Custom Color'],
                    borderRadius: 20,
                    borderWidth: 2,
                    fontFamily: 'Inter_700Bold',
                    fontSize: 16,
                    height: 56,
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 30,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
                title={'Upload Images'}
              />
            )}
          </>
          {/* submit 2 */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              const handler = async () => {
                try {
                  (
                    await performCreateOrEditGoalsPATCH.mutateAsync({
                      goalOne: goalOne,
                      goalThree: goalThree,
                      goalTwo: goalTwo,
                    })
                  )?.json;
                  if (params?.isNewUser ?? defaultProps.isNewUser) {
                    navigation.navigate(
                      'IntroImagesScreen',
                      {
                        isNewUser: params?.isNewUser ?? defaultProps.isNewUser,
                      },
                      { pop: true }
                    );
                  } else {
                    navigation.goBack();
                  }
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: palettes.App['Custom Color'],
                borderRadius: 20,
                borderWidth: 2,
                fontFamily: 'Inter_700Bold',
                fontSize: 16,
                height: 56,
                marginLeft: 10,
                marginRight: 10,
                marginTop: 30,
                textAlign: 'center',
              },
              dimensions.width
            )}
            title={'Submit '}
          />
        </View>
        <Spacer left={8} right={8} bottom={50} top={50} />
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(CreateGoals8Screen);
