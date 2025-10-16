import React from 'react';
import {
  Button,
  Icon,
  KeyboardAvoidingView,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const LogInScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [emailValue, setEmailValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoging, setIsLoging] = React.useState(false);
  const [nameValue, setNameValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
  const [signupIntent, setSignupIntent] = React.useState(false);
  const [textInput2Value, setTextInput2Value] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const isValidateForm = (email, password) => {
    const expr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let foundError = false;

    if (email.length < 1) {
      setErrorMessage('Please enter your email');
      return false;
    } else {
      setErrorMessage('');
    }

    if (!expr.test(email)) {
      setErrorMessage('Please enter a valid email');
      return false;
    } else {
      setErrorMessage('');
    }

    if (password.length < 1) {
      setErrorMessage('Please enter your password');
      return false;
    } else {
      setErrorMessage('');
    }

    return true;
  };

  const validateFormForSignup = () => {
    const expr = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let foundError = false;

    if (emailValue.length < 1) {
      setErrorMessage('Please enter an email address');
      return false;
    } else {
      setErrorMessage('');
    }

    if (!expr.test(emailValue)) {
      setErrorMessage('Please enter a valid email address');
      return false;
    } else {
      setErrorMessage('');
    }

    if (passwordValue.length < 1) {
      setErrorMessage('Please enter a password');
      return false;
    } else {
      setErrorMessage('');
    }

    if (passwordValue.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return false;
    } else {
      setErrorMessage('');
    }

    return true;
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      if (Constants['AUTHORIZATION_HEADER']?.length > 8) {
        navigation.navigate('BottomTabNavigator', {}, { pop: true });
      }
    } catch (err) {
      console.error(err);
    }
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
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App.Studily_Dark_UI, opacity: 0.8 },
        dimensions.width
      )}
    >
      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        keyboardShouldPersistTaps={'handled'}
      >
        {/* Title Container View */}
        <>
          {signupIntent ? null : (
            <View
              style={StyleSheet.applyWidth(
                { marginTop: '40%' },
                dimensions.width
              )}
            >
              {/* Login Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: '"rgb(255, 255, 255)"',
                      fontFamily: 'System',
                      fontSize: 30,
                      fontWeight: '400',
                      marginBottom: 20,
                      marginLeft: 20,
                      marginRight: 20,
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Login'}
              </Text>
            </View>
          )}
        </>
        {/* Title Container View 2 */}
        <>
          {!signupIntent ? null : (
            <View
              style={StyleSheet.applyWidth(
                { marginTop: '40%' },
                dimensions.width
              )}
            >
              {/* Heading Text */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: '"rgb(255, 255, 255)"',
                    fontFamily: 'Inter_700Bold',
                    fontSize: 24,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
              >
                {'Create a new account'}
              </Text>
              {/* Sub Heading Text */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color'],
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    marginBottom: 20,
                    textAlign: 'center',
                  },
                  dimensions.width
                )}
              >
                {'Sign up below'}
              </Text>
            </View>
          )}
        </>
        {/* Info Container */}
        <View>
          {/* Email Container */}
          <View
            style={StyleSheet.applyWidth(
              { marginBottom: 20, marginLeft: 20, marginRight: 20 },
              dimensions.width
            )}
          >
            {/* Email Text */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: '"rgb(254, 254, 254)"',
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    marginTop: 10,
                  }
                ),
                dimensions.width
              )}
            >
              {'Email:'}
            </Text>
            {/* Input 1 */}
            <View
              style={StyleSheet.applyWidth(
                { borderRadius: 20, flexDirection: 'row', marginTop: 10 },
                dimensions.width
              )}
            >
              {/* Input 2 */}
              <View
                style={StyleSheet.applyWidth(
                  { borderRadius: 20, flex: 1 },
                  dimensions.width
                )}
              >
                {/* Input 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-end',
                      backgroundColor: '"rgb(255, 255, 255)"',
                      borderRadius: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Email Value */}
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newEmailValueValue => {
                      try {
                        setEmailValue(newEmailValueValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    placeholder={'Enter a value...'}
                    webShowOutline={true}
                    {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                    placeholderTextColor={theme.colors.background.brand}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                        {
                          backgroundColor: '"rgb(255, 255, 255)"',
                          borderColor: '"rgba(0, 0, 0, 0)"',
                          borderRadius: 20,
                          color: '"rgb(0, 0, 0)"',
                          height: 50,
                          width: '90%',
                        }
                      ),
                      dimensions.width
                    )}
                    value={emailValue}
                  />
                </View>
              </View>
              <Icon
                color={palettes.App['Custom Color']}
                name={'MaterialCommunityIcons/email-open-outline'}
                size={35}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: '"rgba(0, 0, 0, 0)"',
                    height: 50,
                    left: 10,
                    position: 'absolute',
                  },
                  dimensions.width
                )}
              />
            </View>
          </View>
          {/* Password Container */}
          <View
            style={StyleSheet.applyWidth(
              { marginBottom: 20, marginLeft: 20, marginRight: 20 },
              dimensions.width
            )}
          >
            {/* Password Text */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: '"rgb(255, 255, 255)"',
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    marginTop: 10,
                  }
                ),
                dimensions.width
              )}
            >
              {'Password:'}
            </Text>
            {/* Input 4 */}
            <View
              style={StyleSheet.applyWidth(
                { borderRadius: 20, flexDirection: 'row', marginTop: 10 },
                dimensions.width
              )}
            >
              {/* Input 5 */}
              <View
                style={StyleSheet.applyWidth(
                  { borderRadius: 20, flex: 1 },
                  dimensions.width
                )}
              >
                {/* Input 6 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-end',
                      backgroundColor: '"rgb(255, 255, 255)"',
                      borderRadius: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Password Value */}
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newPasswordValueValue => {
                      try {
                        setPasswordValue(newPasswordValueValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    placeholder={'Enter a value...'}
                    webShowOutline={true}
                    {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                    placeholderTextColor={theme.colors.background.brand}
                    secureTextEntry={true}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                        {
                          backgroundColor: '"rgb(255, 255, 255)"',
                          borderColor: '"rgba(0, 0, 0, 0)"',
                          borderRadius: 20,
                          color: '"rgb(0, 0, 0)"',
                          height: 50,
                          width: '90%',
                        }
                      ),
                      dimensions.width
                    )}
                    value={passwordValue}
                  />
                </View>
              </View>
              <Icon
                color={palettes.App['Custom Color']}
                name={'Ionicons/lock-closed-outline'}
                size={35}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: '"rgba(0, 0, 0, 0)"',
                    height: 50,
                    left: 5,
                    position: 'absolute',
                  },
                  dimensions.width
                )}
              />
            </View>
          </View>
        </View>
        {/* Sign in */}
        <>
          {signupIntent ? null : (
            <View>
              {/* Login Value */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  const handler = async () => {
                    try {
                      const isValid = isValidateForm(emailValue, passwordValue);
                      if (!isValid) {
                        return;
                      }
                      setIsLoging(true);
                      const loginResponse = (
                        await PerformApi.loginPOST(Constants, {
                          signupEmail: emailValue,
                          signupPassword: passwordValue,
                        })
                      )?.json;
                      setIsLoging(false);
                      console.log(loginResponse);
                      const authToken = loginResponse?.authToken;
                      const errorMessage = loginResponse?.message;
                      setErrorMessage(errorMessage);
                      if (!authToken) {
                        return;
                      }
                      await setGlobalVariableValue({
                        key: 'AUTHORIZATION_HEADER',
                        value: 'Bearer ' + authToken,
                      });
                      await setGlobalVariableValue({
                        key: 'USER',
                        value: loginResponse?.UserProfile,
                      });
                      await setGlobalVariableValue({
                        key: 'AUTH_UUID',
                        value: loginResponse?.UserProfile?.user_id,
                      });
                      await setGlobalVariableValue({
                        key: 'PUSH_TOKEN',
                        value: loginResponse?.UserProfile?.expo_push_token,
                      });
                      if (loginResponse?.UserProfile?.onboarding_completed) {
                        if (loginResponse?.UserProfile?.expo_push_token) {
                          navigation.navigate(
                            'BottomTabNavigator',
                            {},
                            { pop: true }
                          );
                        } else {
                          navigation.navigate(
                            'EnableNotificationScreen',
                            {},
                            { pop: true }
                          );
                        }
                      } else {
                        navigation.navigate(
                          'Onboarding1Screen',
                          {},
                          { pop: true }
                        );
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                loading={Boolean(isLoging)}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'].style,
                    {
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: palettes.App['Custom Color'],
                      borderRadius: 20,
                      borderWidth: 2,
                      fontFamily: 'Inter_700Bold',
                      fontSize: 16,
                      height: 50,
                      marginBottom: 20,
                      marginLeft: 20,
                      marginRight: 20,
                      marginTop: 30,
                    }
                  ),
                  dimensions.width
                )}
                title={'Login'}
              />
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
          )}
        </>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(LogInScreen);
