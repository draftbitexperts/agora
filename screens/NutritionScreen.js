import React from 'react';
import {
  Checkbox,
  CircleImage,
  Divider,
  Icon,
  Link,
  NumberInput,
  ScreenContainer,
  Spacer,
  Stepper,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import * as WebBrowser from 'expo-web-browser';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import HeaderBlock from '../components/HeaderBlock';
import VimeoFixedBlock from '../components/VimeoFixedBlock';
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

const NutritionScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [age, setAge] = React.useState(0);
  const [calories, setCalories] = React.useState(0);
  const [frequency, setFrequency] = React.useState(0);
  const [goal, setGoal] = React.useState('');
  const [height, setHeight] = React.useState(0);
  const [isFemale, setIsFemale] = React.useState(false);
  const [isMale, setIsMale] = React.useState(false);
  const [leanMuscle, setLeanMuscle] = React.useState(false);
  const [numberInputValue3, setNumberInputValue3] = React.useState('');
  const [performance, setPerformance] = React.useState(false);
  const [pickerValue, setPickerValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [weightLoss, setWeightLoss] = React.useState(false);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [numberInputValue, setNumberInputValue] = React.useState(undefined);
  const [stepperValue, setStepperValue] = React.useState(0);
  const ageFontCheck = () => {
    if (age < 10) {
      return 30;
    } else if (age < 100) {
      return 20;
    } else {
      return 15;
    }
  };

  const calculateCalories = () => {
    // The ‘number of times a week you train’ is still there but it doesn’t affect any of the information now needed.
    // The new way it works is as follows based on the goal section i have added…
    // If the the goal is Weight loss
    // On a training day add 350 calories to the BMR
    // On a Non training day add 150 calories to the BMR
    // if the goal is to Build lean muscle
    // On a Training day add 500 calories to the BMR
    // On a Non training day add 250 calories to the BMR
    // If the goal is Performance
    // On a training day add 400 calories to the BMR
    // No On a Non training day add 200 calories to the BMR
    // Hope all that makes sense
    let w = 10 * weight;
    let h = 6.25 * height;
    let a = 5 * age;
    let bmr = w + h - a;
    let trainingCalories = 0;
    let nonTrainingCalories = 0;
    let protien = 0;
    let fat = 0;
    let trainingCarbs = 0;
    let nonTrainingCarbs = 0;
    let temp;
    let cal = isMale ? bmr + 5 : bmr - 161;

    if (cal < 0) return 0;
    console.log(goal);

    switch (goal) {
      case 'weight':
        trainingCalories = Math.ceil(cal + 350);
        nonTrainingCalories = Math.ceil(cal + 150);
        protien = Math.ceil(2.2 * weight);
        fat = Math.ceil(0.77 * weight);
        temp = protien * 4 + fat * 9;

        trainingCarbs = Math.ceil((trainingCalories - temp) / 4);
        nonTrainingCarbs = Math.ceil((nonTrainingCalories - temp) / 4);

        return {
          training: {
            calories: trainingCalories,
            protien,
            fat,
            carbs: trainingCarbs,
          },
          nonTraining: {
            calories: nonTrainingCalories,
            protien,
            fat,
            carbs: nonTrainingCarbs,
          },
        };
      case 'muscle':
        trainingCalories = Math.ceil(cal + 500);
        nonTrainingCalories = Math.ceil(cal + 250);
        protien = Math.ceil(2.2 * weight);
        fat = Math.ceil(0.77 * weight);
        temp = protien * 4 + fat * 9;

        trainingCarbs = Math.ceil((trainingCalories - temp) / 4);
        nonTrainingCarbs = Math.ceil((nonTrainingCalories - temp) / 4);
        return {
          training: {
            calories: trainingCalories,
            protien,
            fat,
            carbs: trainingCarbs,
          },
          nonTraining: {
            calories: nonTrainingCalories,
            protien,
            fat,
            carbs: nonTrainingCarbs,
          },
        };
      case 'performance':
        trainingCalories = Math.ceil(cal + 400);
        nonTrainingCalories = Math.ceil(cal + 200);
        protien = Math.ceil(2.2 * weight);
        fat = Math.ceil(0.77 * weight);
        temp = protien * 4 + fat * 9;

        trainingCarbs = Math.ceil((trainingCalories - temp) / 4);
        nonTrainingCarbs = Math.ceil((nonTrainingCalories - temp) / 4);

        return {
          training: {
            calories: trainingCalories,
            protien,
            fat,
            carbs: trainingCarbs,
          },
          nonTraining: {
            calories: nonTrainingCalories,
            protien,
            fat,
            carbs: nonTrainingCarbs,
          },
        };

      default:
        return {
          training: { calories: 0, protien: 0, fat: 0, carbs: 0 },
          nonTraining: { calories: 0, protien: 0, fat: 0, carbs: 0 },
        };
    }
  };

  const heightCheck = () => {
    if (height < 10) {
      return 30;
    } else if (height < 100) {
      return 20;
    } else {
      return 15;
    }
  };

  const weightFontCheck = () => {
    if (weight < 10) {
      return 30;
    } else if (weight < 100) {
      return 20;
    } else {
      return 15;
    }
  };
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
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App.Studily_Dark_UI, opacity: 0.8 },
        dimensions.width
      )}
    >
      <ScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        contentContainerStyle={StyleSheet.applyWidth(
          { paddingBottom: 25 },
          dimensions.width
        )}
        showsVerticalScrollIndicator={false}
      >
        <HeaderBlock />
        {/* Calorie Calculator Title View */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'column', marginTop: 16 },
            dimensions.width
          )}
        >
          {/* Calorie Calculator Text */}
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
            {'Calorie Calculator'}
          </Text>
          {/* Sub Text View */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            {/* Flexible dieting made simple Text */}
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
                  }
                ),
                dimensions.width
              )}
            >
              {'Flexible dieting made easy'}
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
                videoId={1046770278}
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
                {'Calorie counting made simple'}
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
                {
                  'Hit play and learn how to use the calorie and macro calculator'
                }
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
              {'Hi, '}
              {Constants['USER']?.profile?.name}
              {
                "! Let's work out your calories based on your goals! Fill your info in below..."
              }
            </Text>
          </View>
        </View>
        {/* Height Weight Age Container View */}
        <View
          style={StyleSheet.applyWidth(
            { paddingLeft: 10, paddingRight: 10 },
            dimensions.width
          )}
        >
          {/* Background Colour View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                borderRadius: 16,
                height: '100%',
                opacity: 0.3,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          {/* Height Weight Age View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderRadius: 16,
                flexDirection: 'row',
                height: 120,
                justifyContent: 'space-evenly',
                marginLeft: 16,
                marginRight: 16,
                opacity: 1,
              },
              dimensions.width
            )}
          >
            {/* Weight View */}
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
              {/* Weight Info View */}
              <View>
                {/* Weight Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom Color_2'],
                      fontFamily: 'Inter_500Medium',
                      fontSize: 16,
                    },
                    dimensions.width
                  )}
                >
                  {'Weight'}
                </Text>
                {/* Weight Input View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 8,
                    },
                    dimensions.width
                  )}
                >
                  <NumberInput
                    changeTextDelay={500}
                    onChangeText={newNumberInputValue => {
                      try {
                        setWeight(newNumberInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    webShowOutline={true}
                    {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                      .props}
                    editable={true}
                    placeholder={'0'}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.NumberInputStyles(theme)['Number Input']
                          .style,
                        {
                          color: palettes.App['Custom #ffffff'],
                          fontFamily: 'Inter_500Medium',
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 30 },
                            {
                              minWidth: Breakpoints.Mobile,
                              value: weightFontCheck(),
                            },
                          ],
                          height: 50,
                          textAlign: 'center',
                          width: 50,
                        }
                      ),
                      dimensions.width
                    )}
                    value={weight}
                  />
                  {/* Kg Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom Color'],
                        fontFamily: 'Inter_400Regular',
                        paddingLeft: 5,
                      },
                      dimensions.width
                    )}
                  >
                    {'Kg'}
                  </Text>
                </View>
              </View>
              <Divider
                color={palettes.App['Custom Color_2']}
                style={StyleSheet.applyWidth(
                  { height: 40, position: 'absolute', right: 0, width: 1 },
                  dimensions.width
                )}
              />
            </View>
            {/* Height View */}
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
              {/* Height Info View */}
              <View>
                {/* Height Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom Color_2'],
                      fontFamily: 'Inter_500Medium',
                      fontSize: 16,
                    },
                    dimensions.width
                  )}
                >
                  {'Height'}
                </Text>
                {/* Height Input */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 8,
                    },
                    dimensions.width
                  )}
                >
                  <NumberInput
                    changeTextDelay={500}
                    onChangeText={newNumberInputValue => {
                      const numberInputValue = newNumberInputValue;
                      try {
                        setHeight(newNumberInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    webShowOutline={true}
                    {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                      .props}
                    editable={true}
                    placeholder={'0'}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.NumberInputStyles(theme)['Number Input']
                          .style,
                        {
                          color: palettes.App['Custom #ffffff'],
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 30 },
                            {
                              minWidth: Breakpoints.Mobile,
                              value: heightCheck(),
                            },
                          ],
                          height: 50,
                          textAlign: 'center',
                          width: 50,
                        }
                      ),
                      dimensions.width
                    )}
                    value={height}
                  />
                  {/* Cm text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom Color'],
                        fontFamily: 'Inter_400Regular',
                        marginLeft: 5,
                      },
                      dimensions.width
                    )}
                  >
                    {'Cm'}
                  </Text>
                </View>
              </View>
              <Divider
                color={palettes.App['Custom Color_2']}
                style={StyleSheet.applyWidth(
                  { height: 40, position: 'absolute', right: 0, width: 1 },
                  dimensions.width
                )}
              />
            </View>
            {/* Age View */}
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
              {/* Age Info View */}
              <View>
                {/* Age Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom Color_2'],
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                    },
                    dimensions.width
                  )}
                >
                  {'Age'}
                </Text>
                {/* Age Input */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 8,
                    },
                    dimensions.width
                  )}
                >
                  <NumberInput
                    changeTextDelay={500}
                    onChangeText={newNumberInputValue => {
                      try {
                        setAge(newNumberInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    webShowOutline={true}
                    {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                      .props}
                    editable={true}
                    placeholder={'0'}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.NumberInputStyles(theme)['Number Input']
                          .style,
                        {
                          color: palettes.App['Custom #ffffff'],
                          fontFamily: 'Inter_400Regular',
                          fontSize: [
                            { minWidth: Breakpoints.Mobile, value: 30 },
                            {
                              minWidth: Breakpoints.Mobile,
                              value: ageFontCheck(),
                            },
                          ],
                          height: 50,
                          textAlign: 'center',
                          width: 50,
                        }
                      ),
                      dimensions.width
                    )}
                    value={age}
                  />
                  {/* Years Text */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom Color'],
                        fontFamily: 'Inter_400Regular',
                        marginLeft: 5,
                      },
                      dimensions.width
                    )}
                  >
                    {'Years'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Male or Female Container View */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 16, paddingLeft: 10, paddingRight: 10 },
            dimensions.width
          )}
        >
          {/* Background colour View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                borderRadius: 16,
                height: '100%',
                opacity: 0.3,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          {/* Gender Text View */}
          <View
            style={StyleSheet.applyWidth(
              { left: 30, position: 'absolute', top: 5 },
              dimensions.width
            )}
          >
            {/* Are you male or female Text */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: palettes.App['Custom #ffffff'],
                    fontFamily: 'Inter_500Medium',
                    fontSize: 16,
                  }
                ),
                dimensions.width
              )}
            >
              {'Are you male or female?'}
            </Text>
          </View>
          {/* Male Or Female View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderRadius: 16,
                flexDirection: 'row',
                height: 120,
                justifyContent: 'space-evenly',
                marginLeft: 16,
                marginRight: 16,
                opacity: 1,
              },
              dimensions.width
            )}
          >
            {/* Male View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 15,
                },
                dimensions.width
              )}
            >
              {/* Male Check Box View */}
              <View>
                {/* Male Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: palettes.App['Custom Color_2'],
                    },
                    dimensions.width
                  )}
                >
                  {'Male'}
                </Text>
                {/* Male Checkbox View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 3,
                    },
                    dimensions.width
                  )}
                />
                {/* Male Checkbox */}
                <Checkbox
                  onPress={newMaleCheckboxValue => {
                    const checkboxValue = newMaleCheckboxValue;
                    try {
                      setIsMale(true);
                      setIsFemale(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  color={palettes.App['Custom #ffffff']}
                  size={50}
                  status={isMale}
                  uncheckedColor={palettes.App['Custom Color']}
                />
              </View>
              <Divider
                color={palettes.App['Custom Color_2']}
                style={StyleSheet.applyWidth(
                  { height: 40, position: 'absolute', right: 0, width: 1 },
                  dimensions.width
                )}
              />
            </View>
            {/* Female View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 15,
                },
                dimensions.width
              )}
            >
              {/* Female Checkbox View */}
              <View>
                {/* Female Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: palettes.App['Custom Color_2'],
                    },
                    dimensions.width
                  )}
                >
                  {'Female'}
                </Text>
                {/* Female Checkbox View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 3,
                    },
                    dimensions.width
                  )}
                >
                  {/* Female Checkbox */}
                  <Checkbox
                    onPress={newFemaleCheckboxValue => {
                      const checkboxValue = newFemaleCheckboxValue;
                      try {
                        setIsMale(false);
                        setIsFemale(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    color={palettes.App['Custom #ffffff']}
                    size={50}
                    status={isFemale}
                    uncheckedColor={palettes.App['Custom Color']}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Goal Container View */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 16, paddingLeft: 10, paddingRight: 10 },
            dimensions.width
          )}
        >
          {/* Background Colour View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                borderRadius: 16,
                height: '100%',
                opacity: 0.3,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          {/* Goal Text View */}
          <View
            style={StyleSheet.applyWidth(
              { left: 30, position: 'absolute', top: 5 },
              dimensions.width
            )}
          >
            {/* What is Your Goal Text */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: palettes.App['Custom #ffffff'],
                    fontFamily: 'Inter_500Medium',
                    fontSize: 16,
                  }
                ),
                dimensions.width
              )}
            >
              {'What is your Goal?'}
            </Text>
          </View>
          {/* Goal View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderRadius: 16,
                flexDirection: 'row',
                height: 120,
                justifyContent: 'space-evenly',
                marginLeft: 16,
                marginRight: 16,
                opacity: 1,
              },
              dimensions.width
            )}
          >
            {/* Weight Loss View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 15,
                },
                dimensions.width
              )}
            >
              {/* Weight Loss View 2  */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                {/* Weight Loss Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: palettes.App['Custom Color_2'],
                    },
                    dimensions.width
                  )}
                >
                  {'Weight Loss'}
                </Text>
                {/* Weight Loss Checkbox View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 3,
                    },
                    dimensions.width
                  )}
                />
                {/* Weight Loss Checkbox */}
                <Checkbox
                  onPress={newWeightLossCheckboxValue => {
                    try {
                      setWeightLoss(newWeightLossCheckboxValue);
                      setPerformance(false);
                      setGoal('weight');
                      setLeanMuscle(false);
                      calculateCalories();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  color={palettes.App['Custom #ffffff']}
                  size={50}
                  status={weightLoss}
                  uncheckedColor={palettes.App['Custom Color']}
                />
              </View>
              <Divider
                color={palettes.App['Custom Color_2']}
                style={StyleSheet.applyWidth(
                  { height: 40, position: 'absolute', right: 0, width: 1 },
                  dimensions.width
                )}
              />
            </View>
            {/* Build Muscle View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 15,
                },
                dimensions.width
              )}
            >
              {/* Build Muscle View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                {/* Build Muscle Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: palettes.App['Custom Color_2'],
                    },
                    dimensions.width
                  )}
                >
                  {'Build Muscle'}
                </Text>
                {/* Build Muscle Checkbox View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 3,
                    },
                    dimensions.width
                  )}
                >
                  {/* Build Muscle Checkbox */}
                  <Checkbox
                    onPress={newBuildMuscleCheckboxValue => {
                      try {
                        setPerformance(false);
                        setWeightLoss(false);
                        setLeanMuscle(newBuildMuscleCheckboxValue);
                        setGoal('muscle');
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    color={palettes.App['Custom #ffffff']}
                    size={50}
                    status={leanMuscle}
                    uncheckedColor={palettes.App['Custom Color']}
                  />
                </View>
              </View>
              {/* Divider 2 */}
              <Divider
                color={palettes.App['Custom Color_2']}
                style={StyleSheet.applyWidth(
                  { height: 40, position: 'absolute', right: 0, width: 1 },
                  dimensions.width
                )}
              />
            </View>
            {/* Performance View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 15,
                },
                dimensions.width
              )}
            >
              {/* Performance View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                {/* Performance Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: palettes.App['Custom Color_2'],
                    },
                    dimensions.width
                  )}
                >
                  {'Performance'}
                </Text>
                {/* Performance Checkbox View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 3,
                    },
                    dimensions.width
                  )}
                >
                  {/* Performance Checkbox */}
                  <Checkbox
                    onPress={newPerformanceCheckboxValue => {
                      try {
                        setPerformance(newPerformanceCheckboxValue);
                        setWeightLoss(false);
                        setLeanMuscle(false);
                        setGoal('performance');
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    color={palettes.App['Custom #ffffff']}
                    size={50}
                    status={performance}
                    uncheckedColor={palettes.App['Custom Color']}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Training Container View */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 16, paddingLeft: 10, paddingRight: 10 },
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
          {/* Training View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderRadius: 16,
                flexDirection: 'row',
                height: 120,
                marginRight: 16,
                opacity: 1,
              },
              dimensions.width
            )}
          >
            {/* Training Title And Number View */}
            <View
              style={StyleSheet.applyWidth(
                { flex: 1, flexDirection: 'column', justifyContent: 'center' },
                dimensions.width
              )}
            >
              {/* Training Title And Number View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'row', marginLeft: 20 },
                  dimensions.width
                )}
              >
                {/* How many times a week do you train Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_500Medium',
                      fontSize: 16,
                      textAlign: 'left',
                    },
                    dimensions.width
                  )}
                >
                  {'How many times a week\ndo you train?'}
                </Text>
              </View>
              {/* Counter View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    height: 50,
                    justifyContent: 'center',
                    position: 'absolute',
                    right: 20,
                  },
                  dimensions.width
                )}
              >
                <Stepper
                  iconSize={24}
                  onChange={newStepperValue => {
                    const stepperValue = newStepperValue;
                    try {
                      setFrequency(newStepperValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  iconColor={palettes.App['Custom #ffffff']}
                  max={10}
                  min={0}
                  style={StyleSheet.applyWidth(
                    {
                      color: '"rgb(255, 255, 255)"',
                      fontFamily: 'Inter_400Regular',
                      fontSize: 27,
                    },
                    dimensions.width
                  )}
                  value={frequency}
                />
              </View>
            </View>
          </View>
        </View>
        {/* See below your calories intake per day View */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 16, paddingLeft: 20 },
            dimensions.width
          )}
        >
          {/* See below your calorie intake per day Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: palettes.App['Custom #ffffff'],
                fontFamily: 'Inter_400Regular',
                fontSize: 18,
              }),
              dimensions.width
            )}
          >
            {'See below your calories intake per day!'}
          </Text>
        </View>
        {/* Daily Calories Training Day Container View */}
        <View
          style={StyleSheet.applyWidth(
            {
              height: { minWidth: Breakpoints.Tablet, value: 120 },
              marginTop: 16,
              paddingLeft: 10,
              paddingRight: 10,
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
                borderRadius: 16,
                height: '100%',
                opacity: 0.3,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          {/* Daily Calories Training Day View 1 */}
          <View
            style={StyleSheet.applyWidth(
              {
                flexDirection: 'row',
                height: [
                  { minWidth: Breakpoints.Mobile, value: 120 },
                  { minWidth: Breakpoints.Tablet, value: 120 },
                ],
                justifyContent: 'flex-start',
                opacity: 1,
                width: { minWidth: Breakpoints.Tablet, value: '100%' },
              },
              dimensions.width
            )}
          >
            {/* Calories Training Day View */}
            <View
              style={StyleSheet.applyWidth(
                { justifyContent: 'center', paddingLeft: 20 },
                dimensions.width
              )}
            >
              {/* Here are your calories on a training day Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      alignSelf: 'flex-start',
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_500Medium',
                      fontSize: 18,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Here are your calories \non a training day'}
              </Text>
            </View>
            {/* Calories per day Training Day View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'center',
                  position: 'absolute',
                  right: 30,
                  top: 25,
                },
                dimensions.width
              )}
            >
              {/* Calories per day Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: '"rgb(255, 255, 255)"',
                      fontSize: 31,
                      marginBottom: 5,
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {calculateCalories()?.training?.calories}
              </Text>
              {/* Calories per day number Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom Color'],
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Calories per day'}
              </Text>
            </View>
          </View>
        </View>
        {/* Daily Calories Non Training Day Container */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 16, paddingLeft: 10, paddingRight: 10 },
            dimensions.width
          )}
        >
          {/* Background Colour View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                borderRadius: 16,
                height: '100%',
                opacity: 0.3,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          {/* Daily Calories Non Training Day View 1 */}
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', height: 120, opacity: 1 },
              dimensions.width
            )}
          >
            {/* Calories Non Training day View */}
            <View
              style={StyleSheet.applyWidth(
                { justifyContent: 'center', paddingLeft: 20 },
                dimensions.width
              )}
            >
              {/* Here are you calories on a non training day Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      alignSelf: 'center',
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_500Medium',
                      fontSize: 18,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Here are your calories \non a non training day'}
              </Text>
            </View>
            {/* Calories Per Day Non Training Day View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'center',
                  position: 'absolute',
                  right: 30,
                  top: 25,
                },
                dimensions.width
              )}
            >
              {/* Calories Per Day 2 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: '"rgb(255, 255, 255)"',
                      fontSize: 31,
                      marginBottom: 5,
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {calculateCalories()?.nonTraining?.calories}
              </Text>
              {/* Calories Per Day number Text 2 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom Color'],
                      fontFamily: 'Inter_400Regular',
                      fontSize: 14,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Calories per day'}
              </Text>
            </View>
          </View>
        </View>
        {/* See Below you macro intake per day View */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 16, paddingLeft: 20 },
            dimensions.width
          )}
        >
          {/* See below your macro intake per day Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: palettes.App['Custom #ffffff'],
                fontFamily: 'Inter_400Regular',
                fontSize: 18,
              }),
              dimensions.width
            )}
          >
            {'See below your macro intake per day!'}
          </Text>
        </View>
        {/* Macros Training Day Container  */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 16, paddingLeft: 10, paddingRight: 10 },
            dimensions.width
          )}
        >
          {/* Background Colour View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                borderRadius: 16,
                height: '100%',
                marginLeft: 16,
                marginRight: 16,
                opacity: 0.3,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          {/* Macros Training Day View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderRadius: 16,
                flexDirection: 'row',
                height: 120,
                justifyContent: 'space-evenly',
                opacity: 1,
              },
              dimensions.width
            )}
          >
            {/* Macros On A Training Day View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'flex-start',
                  left: 20,
                  position: 'absolute',
                  top: 3,
                },
                dimensions.width
              )}
            >
              {/* Macros on a training day Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_500Medium',
                      fontSize: 16,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Macros on a training day'}
              </Text>
            </View>
            {/* Protein View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 15,
                },
                dimensions.width
              )}
            >
              {/* Protein Text View */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'column' },
                  dimensions.width
                )}
              >
                {/* Protein Title Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: palettes.App['Custom Color'],
                    },
                    dimensions.width
                  )}
                >
                  {'Protein'}
                </Text>
                {/* Protein Text Number View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 3,
                    },
                    dimensions.width
                  )}
                />
                {/* Protein Number Text  */}
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
                        fontSize: 30,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {calculateCalories()?.training?.protien}
                </Text>
              </View>
              <Divider
                color={palettes.App['Custom Color_2']}
                style={StyleSheet.applyWidth(
                  { height: 40, position: 'absolute', right: 0, width: 1 },
                  dimensions.width
                )}
              />
              {/* Gram Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom Color'],
                      fontFamily: 'Inter_400Regular',
                      marginTop: 20,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'G'}
              </Text>
            </View>
            {/* Carbohydrates View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 15,
                },
                dimensions.width
              )}
            >
              {/* Carbohydrates Text View */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                {/* Carbohydrate Title Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    { alignSelf: 'center', color: '"rgb(0, 255, 0)"' },
                    dimensions.width
                  )}
                >
                  {'Carbohydrates'}
                </Text>
                {/* Carbohydrate Text Number View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 3,
                    },
                    dimensions.width
                  )}
                >
                  {/* Carbohydrate Number Text */}
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
                          fontSize: 30,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {calculateCalories()?.training?.carbs}
                  </Text>
                  {/* Gram Text 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: palettes.App['Custom Color'],
                          fontFamily: 'Inter_400Regular',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'G'}
                  </Text>
                </View>
              </View>
              {/* Divider 2 */}
              <Divider
                color={palettes.App['Custom Color_2']}
                style={StyleSheet.applyWidth(
                  { height: 40, position: 'absolute', right: 0, width: 1 },
                  dimensions.width
                )}
              />
            </View>
            {/* Fat View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 15,
                },
                dimensions.width
              )}
            >
              {/* Fat Text View */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                {/* Fat Title Terxt */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: palettes.App['Custom Color'],
                    },
                    dimensions.width
                  )}
                >
                  {'Fat'}
                </Text>
                {/* Fat Text Number View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 3,
                    },
                    dimensions.width
                  )}
                >
                  {/* Fat Text */}
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
                          fontSize: 30,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {calculateCalories()?.training?.fat}
                  </Text>
                </View>
              </View>
              {/* Gram Text 3 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom Color'],
                      fontFamily: 'Inter_400Regular',
                      marginTop: 20,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'G'}
              </Text>
            </View>
          </View>
        </View>
        {/* Macros Non Training Container */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 16, paddingLeft: 10, paddingRight: 10 },
            dimensions.width
          )}
        >
          {/* Background Colour View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                borderRadius: 16,
                height: '100%',
                opacity: 0.3,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          {/* Macros Non Training Day View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderRadius: 16,
                flexDirection: 'row',
                height: 120,
                justifyContent: 'space-evenly',
                opacity: 1,
              },
              dimensions.width
            )}
          >
            {/* Macros Tittle Text View */}
            <View
              style={StyleSheet.applyWidth(
                { left: 20, position: 'absolute', top: 3 },
                dimensions.width
              )}
            >
              {/* Macros on a non training day Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_500Medium',
                      fontSize: 16,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Macros on a non training day'}
              </Text>
            </View>
            {/* Protein View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 15,
                },
                dimensions.width
              )}
            >
              {/* Protein Text View */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', flexDirection: 'column' },
                  dimensions.width
                )}
              >
                {/* Protein Title Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: palettes.App['Custom Color'],
                    },
                    dimensions.width
                  )}
                >
                  {'Protein'}
                </Text>
                {/* Protein Text Number View  */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 3,
                    },
                    dimensions.width
                  )}
                />
                {/* Protein Text */}
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
                        fontSize: 30,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {calculateCalories()?.nonTraining?.protien}
                </Text>
              </View>
              <Divider
                color={palettes.App['Custom Color_2']}
                style={StyleSheet.applyWidth(
                  { height: 40, position: 'absolute', right: 0, width: 1 },
                  dimensions.width
                )}
              />
              {/* Gram Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom Color'],
                      fontFamily: 'Inter_400Regular',
                      marginTop: 20,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'G'}
              </Text>
            </View>
            {/* Carbohydrates View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 15,
                },
                dimensions.width
              )}
            >
              {/* Carbohydrates Text View */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                {/* Carbohydrate Title Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    { alignSelf: 'center', color: '"rgb(0, 255, 0)"' },
                    dimensions.width
                  )}
                >
                  {'Carbohydrates'}
                </Text>
                {/* Carbohydrate Text Number View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 3,
                    },
                    dimensions.width
                  )}
                >
                  {/* Carbohydrate Text */}
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
                          fontSize: 30,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {calculateCalories()?.nonTraining?.carbs}
                  </Text>
                  {/* Gram Text 2 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: palettes.App['Custom Color'],
                          fontFamily: 'Inter_400Regular',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'G'}
                  </Text>
                </View>
              </View>
              {/* Divider 2 */}
              <Divider
                color={palettes.App['Custom Color_2']}
                style={StyleSheet.applyWidth(
                  { height: 40, position: 'absolute', right: 0, width: 1 },
                  dimensions.width
                )}
              />
            </View>
            {/* Fat View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 15,
                },
                dimensions.width
              )}
            >
              {/* Fat Text View */}
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center' },
                  dimensions.width
                )}
              >
                {/* Fat Title Terxt */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      alignSelf: 'center',
                      color: palettes.App['Custom Color'],
                    },
                    dimensions.width
                  )}
                >
                  {'Fat'}
                </Text>
                {/* Fat Text Number View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 3,
                    },
                    dimensions.width
                  )}
                >
                  {/* Fat Text */}
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
                          fontSize: 30,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {calculateCalories()?.nonTraining?.fat}
                  </Text>
                </View>
              </View>
              {/* Gram Text 3 */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom Color'],
                      fontFamily: 'Inter_400Regular',
                      marginTop: 20,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'G'}
              </Text>
            </View>
          </View>
        </View>
        {/* Need Inspiration Container View */}
        <View
          style={StyleSheet.applyWidth(
            { height: 230, marginTop: 16, paddingLeft: 10, paddingRight: 10 },
            dimensions.width
          )}
        >
          {/* Background Colour View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                borderRadius: 16,
                height: '100%',
                opacity: 0.3,
                padding: 16,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          {/* Need Inspiration Touchable */}
          <Touchable
            onPress={() => {
              try {
                navigation.navigate(
                  'RecipeSearchStylingScreen',
                  {},
                  { pop: true }
                );
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth({ height: 230 }, dimensions.width)}
          >
            {/* Need Inspiration Title Text View */}
            <View
              style={StyleSheet.applyWidth(
                { marginLeft: 30, marginTop: 10, position: 'absolute' },
                dimensions.width
              )}
            >
              {/* Need Inspiration Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_500Medium',
                      fontSize: 18,
                      textTransform: 'capitalize',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Need inspiration?'}
              </Text>
            </View>
            {/* Need Inspiration Image View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  height: 120,
                  justifyContent: 'center',
                  marginLeft: 30,
                  marginRight: 30,
                  marginTop: 40,
                },
                dimensions.width
              )}
            >
              {/* Need Inspiration Image */}
              <Image
                resizeMode={'cover'}
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                source={imageSource(Images['recipeguidecoverimage3'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    { height: '100%', width: '100%' }
                  ),
                  dimensions.width
                )}
              />
            </View>
            {/* Need Inspiration Text View  */}
            <View
              style={StyleSheet.applyWidth(
                { marginLeft: 30, marginTop: 10 },
                dimensions.width
              )}
            >
              {/* Check out our recipe Text */}
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
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Check out our recipe guide!'}
              </Text>
              {/* With over 350 recipes to choose from Text */}
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
                {'With over 350,000 recipes to choose from!'}
              </Text>
            </View>
          </Touchable>
        </View>
        {/* Citation View */}
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
          {/* Citation View */}
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
            {/* NHS Eatwell Guide */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: palettes.App['Custom #ffffff'],
                    fontFamily: 'Inter_400Regular_Italic',
                    fontSize: 13,
                  }
                ),
                dimensions.width
              )}
            >
              {'Learn more about healthy eating at '}
              <Link
                accessible={true}
                onPress={() => {
                  const handler = async () => {
                    try {
                      await WebBrowser.openBrowserAsync(
                        'https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/the-eatwell-guide/'
                      );
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                selectable={false}
                {...GlobalStyles.LinkStyles(theme)['Link'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.LinkStyles(theme)['Link'].style,
                    {
                      color: palettes.App['Custom Color'],
                      fontFamily: 'Inter_400Regular_Italic',
                      fontSize: 13,
                      textDecorationLine: 'underline',
                    }
                  ),
                  dimensions.width
                )}
                title={'NHS Eatwell Guide'}
              />
            </Text>
          </View>
        </View>
        <Spacer left={8} right={8} bottom={50} top={50} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default withTheme(NutritionScreen);
