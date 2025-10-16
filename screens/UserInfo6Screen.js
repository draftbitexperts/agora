import React from 'react';
import {
  Button,
  CircleImage,
  DatePicker,
  Icon,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  Spacer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { StatusBar, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import HeaderBlock from '../components/HeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openImagePickerUtil from '../utils/openImagePicker';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { newUser: false };

const UserInfo6Screen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const params = useParams();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [calories, setCalories] = React.useState(0);
  const [currentWorkoutSchdulePeriod, setCurrentWorkoutSchdulePeriod] =
    React.useState('');
  const [currentWorkoutScheduleDays, setCurrentWorkoutScheduleDays] =
    React.useState(0);
  const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
  const [editingProfileId, setEditingProfileId] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [height, setHeight] = React.useState(0);
  const [isSaving, setIsSaving] = React.useState(false);
  const [name, setName] = React.useState('');
  const [profile_image, setProfile_image] = React.useState('');
  const [startingWeight, setStartingWeight] = React.useState(0);
  const performProfilePOST = PerformApi.useProfilePOST();
  const performEditMyProfilePUT = PerformApi.useEditMyProfilePUT();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const apiResponse = (await PerformApi.myProfileGET(Constants))?.json;
        console.log(apiResponse);
        setName(apiResponse?.name);
        setGender(apiResponse?.gender);
        setDateOfBirth(apiResponse?.date_of_birth);
        setHeight((apiResponse?.height).toString());
        setStartingWeight((apiResponse?.starting_weight).toString());
        if (apiResponse?.profile_image) {
          setProfile_image(apiResponse?.profile_image?.url);
        }
        setCalories(apiResponse?.calories);
        setCurrentWorkoutScheduleDays(
          apiResponse?.current_workout_schedule_days
        );
        setCurrentWorkoutSchdulePeriod(
          apiResponse?.current_workout_schedule_period
        );
        setEditingProfileId(apiResponse?.id);
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
      scrollable={false}
      hasBottomSafeArea={true}
      hasSafeArea={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App.Studily_Dark_Primary },
        dimensions.width
      )}
    >
      <SimpleStyleKeyboardAwareScrollView
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        enableAutomaticScroll={true}
        keyboardShouldPersistTaps={'handled'}
      >
        <HeaderBlock showSettingsButton={false} />
        {/* Your Info Title View */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'column', marginTop: 16 },
            dimensions.width
          )}
        >
          {/* Your Info Title Text */}
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
            {'Your Info!'}
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
            {/* Give us your information and we will do the rest */}
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
              {'Give us your info and we will do the rest!'}
            </Text>
          </View>
        </View>
        {/* Information Container View */}
        <View
          style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
        >
          {/* Profile Picture Container View */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            {/* Profile Picture View */}
            <View>
              {/* Profile Picture Touchable */}
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      const imageResult = await openImagePickerUtil({
                        mediaTypes: 'Images',
                        allowsEditing: false,
                        quality: 0.2,
                        allowsMultipleSelection: false,
                        selectionLimit: 0,
                        outputBase64: true,
                      });

                      if (imageResult) {
                        setProfile_image(imageResult);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
              >
                {/* User Image */}
                <>
                  {profile_image ? null : (
                    <CircleImage size={100} source={Images.UserImage} />
                  )}
                </>
                {/* User Image */}
                <>
                  {!profile_image ? null : (
                    <CircleImage
                      size={100}
                      source={imageSource(`${profile_image}`)}
                      style={StyleSheet.applyWidth(
                        { position: 'relative' },
                        dimensions.width
                      )}
                    />
                  )}
                </>
                {/* Edit Icon */}
                <CircleImage
                  size={32}
                  source={Images.Edit}
                  style={StyleSheet.applyWidth(
                    { bottom: 0, position: 'absolute', right: 0 },
                    dimensions.width
                  )}
                />
              </Touchable>
            </View>
          </View>
          {/* First Name View */}
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
            {/* First Name Content View */}
            <View
              style={StyleSheet.applyWidth(
                { paddingBottom: 20, paddingLeft: 10, paddingRight: 10 },
                dimensions.width
              )}
            >
              {/* Name Text */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color_2'],
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    opacity: 1,
                    paddingLeft: 10,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
              >
                {'Name'}
              </Text>
              {/* Name Text Input */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newNameTextInputValue => {
                  try {
                    setName(newNameTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                editable={true}
                placeholder={'Jon Doe'}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom #ffffff'],
                    borderBottomWidth: 0.5,
                    borderLeftWidth: 0.5,
                    borderRadius: 8,
                    borderRightWidth: 0.5,
                    borderTopWidth: 0.5,
                    color: theme.colors.text.medium,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    height: 52,
                    marginTop: 10,
                    paddingBottom: 8,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                value={name}
              />
            </View>
          </View>
          {/* Height View */}
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
            {/* Height Content View */}
            <View
              style={StyleSheet.applyWidth(
                { paddingBottom: 20, paddingLeft: 10, paddingRight: 10 },
                dimensions.width
              )}
            >
              {/* Height Text */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color_2'],
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    opacity: 1,
                    paddingLeft: 10,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
              >
                {'Height (cm) '}
              </Text>
              {/* Height Text Input */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newHeightTextInputValue => {
                  try {
                    setHeight(newHeightTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                placeholder={'Enter a value...'}
                webShowOutline={true}
                editable={true}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom #ffffff'],
                    borderBottomWidth: 1,
                    borderColor: palettes.App['Custom Color_4'],
                    borderLeftWidth: 1,
                    borderRadius: 8,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    color: theme.colors.text.medium,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    height: 52,
                    marginTop: 10,
                    paddingBottom: 8,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                value={height}
              />
            </View>
          </View>
          {/* Starting Weight View */}
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
            {/* Starting Weight Content View */}
            <View
              style={StyleSheet.applyWidth(
                { paddingBottom: 20, paddingLeft: 10, paddingRight: 10 },
                dimensions.width
              )}
            >
              {/* Starting Weight Text */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color_2'],
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    opacity: 0.8,
                    paddingLeft: 10,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
              >
                {'Starting Weight (kgs)'}
              </Text>
              {/* Starting Weight Text Input */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newStartingWeightTextInputValue => {
                  try {
                    setStartingWeight(newStartingWeightTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                placeholder={'Enter a value...'}
                webShowOutline={true}
                editable={true}
                placeholderTextColor={theme.colors.text.light}
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom #ffffff'],
                    borderBottomWidth: 0.5,
                    borderColor: palettes.App['Custom Color_4'],
                    borderLeftWidth: 0.5,
                    borderRadius: 8,
                    borderRightWidth: 0.5,
                    borderTopWidth: 0.5,
                    color: theme.colors.text.medium,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 16,
                    height: 52,
                    marginTop: 10,
                    paddingBottom: 8,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                value={startingWeight}
              />
            </View>
          </View>
          {/* Date of Birth View */}
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
            {/* Date Of Birth Content View */}
            <View
              style={StyleSheet.applyWidth(
                { paddingBottom: 20, paddingLeft: 10, paddingRight: 10 },
                dimensions.width
              )}
            >
              {/* Date of birth Text */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color_2'],
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    opacity: 0.8,
                    paddingLeft: 10,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
              >
                {'Date of birth'}
              </Text>
              {/* Date Picker View */}
              <View
                style={StyleSheet.applyWidth(
                  { borderRadius: 8, marginTop: 10, overflow: 'hidden' },
                  dimensions.width
                )}
              >
                <DatePicker
                  autoDismissKeyboard={true}
                  disabled={false}
                  hideLabel={false}
                  inline={false}
                  label={'Date'}
                  leftIconMode={'inset'}
                  mode={'date'}
                  onDateChange={newDatePickerValue => {
                    try {
                      setDateOfBirth(newDatePickerValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  type={'solid'}
                  date={dateOfBirth}
                  maximumDate={new Date()}
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App['Custom #ffffff'],
                      borderColor: palettes.App['Custom #ffffff'],
                      color: theme.colors.text.light,
                      height: 52,
                    },
                    dimensions.width
                  )}
                />
              </View>
            </View>
          </View>
          {/* Gender View */}
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
            {/* Gender Content View */}
            <View
              style={StyleSheet.applyWidth(
                { paddingBottom: 20, paddingLeft: 10, paddingRight: 10 },
                dimensions.width
              )}
            >
              {/* Gender Text */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.App['Custom Color_2'],
                    fontFamily: 'Inter_400Regular',
                    fontSize: 14,
                    opacity: 0.8,
                    paddingBottom: 10,
                    paddingLeft: 10,
                    paddingTop: 10,
                  },
                  dimensions.width
                )}
              >
                {'Gender'}
              </Text>
              {/* Male Female View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flex: 2,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                  },
                  dimensions.width
                )}
              >
                {/* Male Touchable */}
                <Touchable
                  onPress={() => {
                    try {
                      const test = 'male';
                      setGender(test);
                      console.log(test);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { height: 52, width: '45%' },
                    dimensions.width
                  )}
                >
                  {/* Male View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: palettes.App['Custom #ffffff'],
                        borderLeftWidth: 1,
                        borderRadius: 8,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        flexDirection: 'row',
                        height: '100%',
                        paddingLeft: 12,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Tick Icon */}
                    <Icon
                      size={24}
                      color={palettes.App['Custom #ffffff']}
                      name={'FontAwesome/circle-thin'}
                    />
                    {/* Male Text */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.App['Custom Color_2'],
                          fontFamily: 'Inter_400Regular',
                          fontSize: 16,
                          marginLeft: 15,
                        },
                        dimensions.width
                      )}
                    >
                      {'Male'}
                    </Text>
                    <>
                      {!(gender === 'male') ? null : (
                        <CircleImage
                          size={24}
                          source={
                            Images.PngtreeGreenCheckMarkIconFlatStylePngImage1986021
                          }
                          style={StyleSheet.applyWidth(
                            { left: 12, position: 'absolute' },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                  </View>
                </Touchable>
                {/* Female Touchable  */}
                <Touchable
                  onPress={() => {
                    try {
                      const test = 'female';
                      setGender(test);
                      console.log(test);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { height: 52, marginLeft: '5%', width: '45%' },
                    dimensions.width
                  )}
                >
                  {/* Female View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        borderBottomWidth: 1,
                        borderColor: palettes.App['Custom #ffffff'],
                        borderLeftWidth: 1,
                        borderRadius: 8,
                        borderRightWidth: 1,
                        borderTopWidth: 1,
                        flexDirection: 'row',
                        height: '100%',
                        paddingLeft: 12,
                        paddingRight: 12,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Tick Icon */}
                    <Icon
                      size={24}
                      color={palettes.App['Custom Color_2']}
                      name={'FontAwesome/circle-thin'}
                    />
                    {/* Female Text */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.App['Custom Color_2'],
                          fontFamily: 'Inter_400Regular',
                          fontSize: 16,
                          marginLeft: 15,
                        },
                        dimensions.width
                      )}
                    >
                      {'Female'}
                    </Text>
                    <>
                      {!(gender === 'female') ? null : (
                        <CircleImage
                          size={24}
                          source={
                            Images.PngtreeGreenCheckMarkIconFlatStylePngImage1986021
                          }
                          style={StyleSheet.applyWidth(
                            { left: 12, position: 'absolute' },
                            dimensions.width
                          )}
                        />
                      )}
                    </>
                  </View>
                </Touchable>
              </View>
            </View>
          </View>
        </View>

        <View
          style={StyleSheet.applyWidth({ marginTop: 40 }, dimensions.width)}
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
          {/* Save Changes Button */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              const handler = async () => {
                try {
                  if (!name) {
                    setErrorMessage('Please enter your name');
                  }
                  if (!name) {
                    return;
                  }
                  setErrorMessage('');
                  setIsSaving(true);
                  if (params?.newUser ?? defaultProps.newUser) {
                    const apiResponse = (
                      await performProfilePOST.mutateAsync({
                        calories: calories,
                        current_workout_schedule_days:
                          currentWorkoutScheduleDays,
                        current_workout_schedule_period:
                          currentWorkoutSchdulePeriod,
                        date_of_birth: dateOfBirth,
                        gender: gender,
                        height: height,
                        name: name,
                        profile_picture: profile_image ? profile_image : null,
                        starting_weight: startingWeight,
                      })
                    )?.json;
                    navigation.navigate(
                      'CreateGoals8Screen',
                      { isNewUser: true },
                      { pop: true }
                    );
                  } else {
                    const editUserProfileResult = (
                      await performEditMyProfilePUT.mutateAsync({
                        dob: dateOfBirth,
                        gender: gender,
                        height: height,
                        image: profile_image.startsWith('http')
                          ? null
                          : profile_image,
                        name: name,
                        weight: startingWeight,
                      })
                    )?.json;
                    navigation.goBack();
                  }

                  setIsSaving(false);
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            loading={Boolean(isSaving)}
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                borderColor: palettes.App['Custom Color'],
                borderRadius: 20,
                borderWidth: 2,
                color: palettes.App['Custom Color_2'],
                fontFamily: 'Inter_700Bold',
                fontSize: 16,
                height: 56,
                marginBottom: 35,
                marginLeft: 10,
                marginRight: 10,
                marginTop: 10,
                textAlign: 'center',
              },
              dimensions.width
            )}
            title={'Save Changes'}
          />
        </View>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(UserInfo6Screen);
