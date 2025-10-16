import React from 'react';
import {
  Button,
  Checkbox,
  CircleImage,
  CircularProgress,
  Icon,
  IconButton,
  NumberInput,
  Pressable,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  Spacer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Modal,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import * as reactNativeDeviceInfo from 'react-native-device-info';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import HeaderBlock from '../components/HeaderBlock';
import VimeoFixedBlock from '../components/VimeoFixedBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as BarcodeScanner from '../custom-files/BarcodeScanner';
import isLoggedIn from '../global-functions/isLoggedIn';
import updateUserTasks from '../global-functions/updateUserTasks';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import showAlertUtil from '../utils/showAlert';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Home10ModuleTestScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [armM, setArmM] = React.useState(0);
  const [calfM, setCalfM] = React.useState(0);
  const [chestM, setChestM] = React.useState(0);
  const [completedTasks, setCompletedTasks] = React.useState(0);
  const [formErr, setFormErr] = React.useState('');
  const [intentLogSession, setIntentLogSession] = React.useState(false);
  const [lastWeekSet1, setLastWeekSet1] = React.useState(0);
  const [lastWeekSet2, setLastWeekSet2] = React.useState(0);
  const [lastWeekSet3, setLastWeekSet3] = React.useState(0);
  const [lastWeekSet4, setLastWeekSet4] = React.useState(0);
  const [logSessionError, setLogSessionError] = React.useState('');
  const [loggingMeasurement, setLoggingMeasurement] = React.useState(false);
  const [logingSession, setLogingSession] = React.useState(false);
  const [measTabIndex, setMeasTabIndex] = React.useState(0);
  const [measurementsData, setMeasurementsData] = React.useState([]);
  const [notesInputValue1, setNotesInputValue1] = React.useState('');
  const [openModaltest, setOpenModaltest] = React.useState(false);
  const [openModaltestthree, setOpenModaltestthree] = React.useState(false);
  const [openTodoModal, setOpenTodoModal] = React.useState(false);
  const [scanQR, setScanQR] = React.useState(false);
  const [seconds, setSeconds] = React.useState(0);
  const [sessionOptions, setSessionOptions] = React.useState([]);
  const [session_exercise_id, setSession_exercise_id] = React.useState(0);
  const [showMeasurementForm, setShowMeasurementForm] = React.useState(false);
  const [showTodoList, setShowTodoList] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [taskFive, setTaskFive] = React.useState(false);
  const [taskFour, setTaskFour] = React.useState(false);
  const [taskOne, setTaskOne] = React.useState(false);
  const [taskThree, setTaskThree] = React.useState(false);
  const [taskTwo, setTaskTwo] = React.useState(false);
  const [thighM, setThighM] = React.useState(0);
  const [thisWeekSet1, setThisWeekSet1] = React.useState('');
  const [thisWeekSet2, setThisWeekSet2] = React.useState('');
  const [thisWeekSet3, setThisWeekSet3] = React.useState('');
  const [thisWeekSet4, setThisWeekSet4] = React.useState('');
  const [updatingTask, setUpdatingTask] = React.useState(false);
  const [waistM, setWaistM] = React.useState(0);
  const [weightM, setWeightM] = React.useState(0);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const calculatePercentage = item => {
    return (item / 5) * 100;
  };

  const cunstructSessionOptions = sessions => {
    // const sessions = [{ "id": 1, "created_at": 1706016348929, "sessions_id": 1, "exercise_id": 1, "_exercise": [{ "id": 1, "created_at": 1685516301594, "name": "Squats", "instructions": "Start with your feet shoulder width apart, shoulders back, chest up, brace your core, squat to 90 degrees or lower, then  return to the start position.", "video_url": "IODxDxX7oi4", "sessions_id": 1 }], "_sessions": { "id": 1, "created_at": 1705669758482, "name": "Push Session" } }, { "id": 2, "created_at": 1706016631512, "sessions_id": 1, "exercise_id": 2, "_exercise": [{ "id": 2, "created_at": 1685516320163, "name": "Jump Squats", "instructions": "Start with your feet shoulder width apart, shoulders back, chest up, brace your core, squat to 90 degrees or lower, then explode as powerful as possible with a jump and repeat.", "video_url": "IODxDxX7oi4", "sessions_id": 1 }], "_sessions": { "id": 1, "created_at": 1705669758482, "name": "Push Session" } }]

    console.log(sessions);
    return sessions.map(({ id, session_id, _exercise, _sessions }) => ({
      value: id,
      label: `${_exercise[0].name} from ${_sessions.name}`,
    }));
  };

  const getTasksNumber = input => {
    return input
      ? Object.values(input).filter(item => item === true).length
      : 0;
  };

  const isTablet = setGlobalVariableValue => {
    const isTablet = reactNativeDeviceInfo.isTablet();
    if (isTablet) {
      setGlobalVariableValue({
        key: 'IS_TABLET',
        value: true,
      });
    }
  };
  const performDailyTasksPATCH = PerformApi.useDailyTasksPATCH();
  const performLogMeasurementsPOST = PerformApi.useLogMeasurementsPOST();
  const performLogASessionPOST = PerformApi.useLogASessionPOST();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      /* hidden 'Log to Console' action */
      isTablet(setGlobalVariableValue);
      if (!isLoggedIn(Variables)) {
        navigation.navigate('LogInScreen', {}, { pop: true });
      }
      /* hidden 'Run a Custom Function' action */
      /* hidden 'Set Variable' action */
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
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App.Studily_Dark_UI, opacity: 0.8 },
        dimensions.width
      )}
    >
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.applyWidth(
          { alignItems: 'stretch' },
          dimensions.width
        )}
      >
        <HeaderBlock showBackButton={false} />
        {/* Title View Container */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'center',
              marginTop: 16,
            },
            dimensions.width
          )}
        >
          {/* Title View */}
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row' },
              dimensions.width
            )}
          >
            {/* Title Text 1 */}
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
                    fontSize: 26,
                  }
                ),
                dimensions.width
              )}
            >
              {'Primal'}
            </Text>
            {/* Title Text 2 */}
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
                    fontSize: 26,
                  }
                ),
                dimensions.width
              )}
            >
              {'Hub'}
            </Text>
          </View>
          {/* Initial Info View */}
          <View>
            {/* Title Text */}
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
                    textAlign: 'left',
                  }
                ),
                dimensions.width
              )}
            >
              {'It all starts here!'}
            </Text>
          </View>
        </View>
        {/* Info Video Container View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: {
                minWidth: Breakpoints.Tablet,
                value: 'flex-start',
              },
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
                alignSelf: 'center',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                borderRadius: 24,
                height: [
                  { minWidth: Breakpoints.Mobile, value: '100%' },
                  { minWidth: Breakpoints.Tablet, value: '100%' },
                ],
                opacity: 0.3,
                position: [
                  { minWidth: Breakpoints.Mobile, value: 'absolute' },
                  { minWidth: Breakpoints.Tablet, value: 'absolute' },
                ],
                width: [
                  { minWidth: Breakpoints.Mobile, value: '100%' },
                  { minWidth: Breakpoints.Tablet, value: '100%' },
                ],
              },
              dimensions.width
            )}
          />
          {/* Video View */}
          <View
            style={StyleSheet.applyWidth(
              {
                borderRadius: 24,
                paddingLeft: 20,
                paddingRight: 20,
                paddingTop: 20,
              },
              dimensions.width
            )}
          >
            <VimeoFixedBlock height={200} quality={'2k'} videoId={1051550171} />
          </View>

          <View
            style={StyleSheet.applyWidth(
              {
                paddingBottom: 25,
                paddingLeft: 25,
                paddingRight: 25,
                paddingTop: 16,
              },
              dimensions.width
            )}
          >
            {/* Intro Video Title Text */}
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
              {'Welcome to the Primal App!'}
            </Text>
            {/* Into Video Subtitle Text */}
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
                    opacity: 0.5,
                  }
                ),
                dimensions.width
              )}
            >
              {'Hit play and learn how to use the home page!'}
            </Text>
          </View>
        </View>
        {/* Heading View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-start',
              flex: 2,
              flexDirection: 'column',
              marginLeft: 10,
              marginRight: 10,
              marginTop: 16,
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
          {/* Content and Text View */}
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'column' },
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
                  fontFamily: 'Inter_500Medium',
                  fontSize: 18,
                  marginBottom: 10,
                  marginLeft: 30,
                  marginRight: 30,
                  marginTop: 10,
                },
                dimensions.width
              )}
            >
              {'Welcome to the Team!'}
            </Text>
            {/* Greetings Text 2 */}
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
                    marginLeft: 30,
                    marginRight: 30,
                    paddingBottom: 16,
                  }
                ),
                dimensions.width
              )}
            >
              {'Hi, '}
              {Constants['USER']?.profile?.name}
              {
                "! Welcome to the Primal Hub! If it's your first time here hit the how to video above and follow the steps. If you have been here before you know the drill! LETS GO!!!"
              }
            </Text>
          </View>
        </View>
        {/* Goals Container View  */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              flexDirection: 'row',
              height: 110,
              justifyContent: 'flex-start',
              marginLeft: 10,
              marginRight: 10,
              marginTop: 16,
              opacity: 1,
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
          <Touchable
            onPress={() => {
              try {
                setOpenModaltest(true);
              } catch (err) {
                console.error(err);
              }
            }}
            style={StyleSheet.applyWidth(
              { height: '100%', width: '100%' },
              dimensions.width
            )}
          >
            {/* Container */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: 16,
                },
                dimensions.width
              )}
            >
              {/* Golas View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: '"rgba(0, 0, 0, 0)"',
                    borderRadius: 15,
                    height: '100%',
                    justifyContent: 'center',
                    paddingLeft: 30,
                  },
                  dimensions.width
                )}
              >
                {/* Goals Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  style={StyleSheet.applyWidth(
                    {
                      color: palettes.App['Custom Color_2'],
                      fontFamily: 'Inter_500Medium',
                      fontSize: 18,
                    },
                    dimensions.width
                  )}
                >
                  {'Set Your Goals'}
                </Text>
                {/* Goals Container Button View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      height: 32,
                      justifyContent: 'center',
                      marginTop: 5,
                      width: 124,
                    },
                    dimensions.width
                  )}
                >
                  {/* Set Your Goals Subtext */}
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom Color_2'],
                        fontFamily: 'Inter_400Regular',
                        fontSize: 12,
                        opacity: 0.5,
                      },
                      dimensions.width
                    )}
                  >
                    {'Set and monitor your goals once a week!'}
                  </Text>
                </View>
              </View>
              {/* Goals Icon */}
              <Image
                resizeMode={'cover'}
                source={imageSource(Images['goaliconpng'])}
                style={StyleSheet.applyWidth(
                  { height: 80, width: 65 },
                  dimensions.width
                )}
              />
            </View>
          </Touchable>
        </View>
        {/* Nutrition To Do Weight View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'stretch',
              flexDirection: 'row',
              gap: 16,
              padding: 16,
            },
            dimensions.width
          )}
        >
          {/* Nutrition */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'stretch',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark_30,
                borderRadius: 20,
                flex: 1,
                flexDirection: 'row',
                height: 280,
                justifyContent: 'center',
                overflow: 'hidden',
              },
              dimensions.width
            )}
          >
            {/* Nutrition Touchable */}
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate(
                    'BottomTabNavigator',
                    {
                      screen: 'Nutrition',
                      params: { screen: 'NutritionIndexScreen' },
                    },
                    { pop: true }
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { borderColor: 'rgba(0, 0, 0, 0)', borderWidth: 3 },
                dimensions.width
              )}
            >
              {/* Nutrition View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderRadius: 20,
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    opacity: 1,
                  },
                  dimensions.width
                )}
              >
                {/* Nutrition Text View  */}
                <View>
                  {/* Nutrition Text */}
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
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Nutrition'}
                  </Text>
                </View>
                {/* Nutrition Icon View */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginTop: 5 },
                    dimensions.width
                  )}
                >
                  {/* Nutrition Icon  */}
                  <Image
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
                    source={imageSource(Images['IconNutritionHi1'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'].style,
                        { height: 120, width: 120 }
                      ),
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </Touchable>
          </View>
          {/* To Do Weight View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'stretch',
                backgroundColor: 'rgba(0, 0, 0, 0)',
                flex: 1,
                gap: 16,
              },
              dimensions.width
            )}
          >
            {/* To Do View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderRadius: 20,
                  flex: 2,
                  justifyContent: 'center',
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
                    bottom: 0,
                    height: '100%',
                    opacity: 0.3,
                    position: 'absolute',
                    width: '100%',
                  },
                  dimensions.width
                )}
              />
              {/* To Do Touchable */}
              <Touchable
                onPress={() => {
                  try {
                    /* hidden 'Navigate' action */
                    setOpenTodoModal(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  { borderColor: 'rgba(0, 0, 0, 0)', borderWidth: 5 },
                  dimensions.width
                )}
              >
                {/* To Do View */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', justifyContent: 'center' },
                    dimensions.width
                  )}
                >
                  {/* To Do Text */}
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
                          marginBottom: 5,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'To Do'}
                  </Text>
                  {/* To Do Circle View */}
                  <View>
                    <CircularProgress
                      animationDuration={500}
                      indeterminate={false}
                      isAnimated={true}
                      lineCap={'round'}
                      showTrack={true}
                      startPosition={'top'}
                      thickness={10}
                      trackColor={theme.colors.border.base}
                      trackLineCap={'round'}
                      color={palettes.App['Custom Color']}
                      maximumValue={5}
                      style={StyleSheet.applyWidth(
                        { height: 60, width: 60 },
                        dimensions.width
                      )}
                      value={completedTasks}
                    />
                    {/* Percentage Text View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', marginTop: 4 },
                        dimensions.width
                      )}
                    >
                      {/* Percentage Text */}
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
                              fontSize: 20,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {completedTasks * 20}
                        {'%'}
                      </Text>
                    </View>
                  </View>
                  {/* Fetch 2 */}
                  <PerformApi.FetchDailyTasksGET
                    handlers={{
                      on2xx: fetch2Data => {
                        try {
                          setCompletedTasks(getTasksNumber(fetch2Data?.json));
                          setTaskOne(fetch2Data?.json?.task_one);
                          setTaskTwo(fetch2Data?.json?.task_two);
                          setTaskThree(fetch2Data?.json?.task_three);
                          setTaskFour(fetch2Data?.json?.task_four);
                          setTaskFive(fetch2Data?.json?.task_five);
                        } catch (err) {
                          console.error(err);
                        }
                      },
                    }}
                  >
                    {({ loading, error, data, refetchDailyTasks }) => {
                      const fetch2Data = data?.json;
                      if (loading) {
                        return <ActivityIndicator />;
                      }

                      if (error || data?.status < 200 || data?.status >= 300) {
                        return <ActivityIndicator />;
                      }

                      return null;
                    }}
                  </PerformApi.FetchDailyTasksGET>
                </View>
              </Touchable>
            </View>
            {/* Weight View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderRadius: 20,
                  flex: 1,
                  justifyContent: 'center',
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
                    bottom: 0,
                    height: '100%',
                    opacity: 0.3,
                    position: 'absolute',
                    right: 0,
                    width: '100%',
                  },
                  dimensions.width
                )}
              ></View>

              <Touchable
                onPress={() => {
                  try {
                    /* hidden 'Navigate' action */
                    setShowMeasurementForm(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                {/* Fetch 5 */}
                <PerformApi.FetchGetCurrentMeasurementGET>
                  {({ loading, error, data, refetchGetCurrentMeasurement }) => {
                    const fetch5Data = data?.json;
                    if (loading) {
                      return <ActivityIndicator />;
                    }

                    if (error || data?.status < 200 || data?.status >= 300) {
                      return <ActivityIndicator />;
                    }

                    return (
                      <>
                        {/* Weight Text View */}
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
                          {/* Weight Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App['Custom Color'],
                                fontFamily: 'Inter_500Medium',
                                fontSize: 18,
                                marginRight: 5,
                              },
                              dimensions.width
                            )}
                          >
                            {'Weight'}
                          </Text>
                          {/* Number Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App['Custom Color_2'],
                                fontFamily: 'Inter_700Bold',
                                fontSize: 30,
                              },
                              dimensions.width
                            )}
                          >
                            {fetch5Data?.current_weight}
                          </Text>
                          {/* Kg Text */}
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.App['Custom Color_2'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 18,
                                marginLeft: 5,
                              },
                              dimensions.width
                            )}
                          >
                            {'Kg'}
                          </Text>
                        </View>
                      </>
                    );
                  }}
                </PerformApi.FetchGetCurrentMeasurementGET>
              </Touchable>
            </View>
          </View>
        </View>
        {/* Coaches Corner Track Your Stats Container View  */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'stretch',
              flexDirection: 'row',
              gap: 16,
              paddingLeft: 16,
              paddingRight: 16,
            },
            dimensions.width
          )}
        >
          {/* Community */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'stretch',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark_30,
                borderRadius: 20,
                flex: 1,
                overflow: 'hidden',
              },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate('CoachesCornerScreen', {}, { pop: true });
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                  },
                  dimensions.width
                )}
              >
                {/* Community Image */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['FitnessCoachComp'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { marginTop: 10 }
                    ),
                    dimensions.width
                  )}
                />
                {/* Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { paddingBottom: 10, paddingLeft: 10, paddingRight: 10 },
                    dimensions.width
                  )}
                >
                  {/* Community Text */}
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
                          marginTop: 5,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Coaches Corner'}
                  </Text>
                  {/* Share What Your Eating Or Ask Questions Text */}
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
                          fontFamily: 'Inter_400Regular',
                          fontSize: 12,
                          marginTop: 5,
                          opacity: 0.5,
                          textAlign: 'center',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      'Check in with the team \nand see what is going on \nor ask a question'
                    }
                  </Text>
                </View>
              </View>
            </Touchable>
          </View>
          {/* Track your status */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'stretch',
                backgroundColor: palettes.App.Studily_Slate_Blue_Dark_30,
                borderRadius: 20,
                flex: 1,
                overflow: 'hidden',
              },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                try {
                  navigation.navigate(
                    'TrackYourStats7Screen',
                    {},
                    { pop: true }
                  );
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              {/* Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                  },
                  dimensions.width
                )}
              >
                {/* Session Log Icon */}
                <Image
                  resizeMode={'cover'}
                  source={imageSource(Images['StatsIcon'])}
                  style={StyleSheet.applyWidth(
                    { height: 100, marginTop: 10, width: 100 },
                    dimensions.width
                  )}
                />
                {/* Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { paddingBottom: 10, paddingLeft: 10, paddingRight: 10 },
                    dimensions.width
                  )}
                >
                  {/* Scan Me Text */}
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
                          marginTop: 5,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Track Your Stats'}
                  </Text>
                  {/* Make sure you ... Text */}
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
                          fontFamily: 'Inter_400Regular',
                          fontSize: 12,
                          marginTop: 5,
                          opacity: 0.5,
                          textAlign: 'center',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Make sure you stay \naccountable! log every session!'}
                  </Text>
                </View>
              </View>
            </Touchable>
          </View>
        </View>
        {/* Exercise Program Container View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: '"rgba(0, 0, 0, 0)"',
              borderRadius: 0,
              marginTop: 16,
              paddingLeft: 16,
              paddingRight: 16,
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
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                borderRadius: 0,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                height: '100%',
                opacity: 0.3,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          {/* Exercise Program View */}
          <View
            style={StyleSheet.applyWidth({ marginTop: 20 }, dimensions.width)}
          >
            {/* Exercise Program Title View  */}
            <View
              style={StyleSheet.applyWidth(
                { paddingLeft: 20 },
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
                      fontFamily: 'Inter_500Medium',
                      fontSize: 18,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Choose Your Exercise Program'}
              </Text>
            </View>
            {/* Exercise Programs View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginLeft: 15,
                  marginTop: 8,
                  overflow: 'hidden',
                },
                dimensions.width
              )}
            >
              <ScrollView
                bounces={true}
                keyboardShouldPersistTaps={'never'}
                nestedScrollEnabled={false}
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={StyleSheet.applyWidth(
                  { paddingBottom: 20, paddingLeft: 16, paddingRight: 16 },
                  dimensions.width
                )}
                horizontal={true}
                showsVerticalScrollIndicator={false}
              >
                {/* 8 Week Course Container View */}
                <View
                  style={StyleSheet.applyWidth(
                    { height: 210, marginLeft: 10, marginRight: 0 },
                    dimensions.width
                  )}
                >
                  {/* 8 Week Course Touchable */}
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'P1CourseIndexModuleTestScreen',
                          {},
                          { pop: true }
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      {
                        height: 200,
                        marginBottom: 8,
                        marginRight: 10,
                        marginTop: 8,
                      },
                      dimensions.width
                    )}
                  >
                    {/* 8 Week Course View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 8, height: 200, width: 172 },
                        dimensions.width
                      )}
                    >
                      {/* 8 Week Course Image View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { borderRadius: 8, overflow: 'hidden' },
                          dimensions.width
                        )}
                      >
                        {/* 8 Week Course Image */}
                        <ImageBackground
                          resizeMode={'cover'}
                          source={imageSource(Images['apptest45'])}
                          style={StyleSheet.applyWidth(
                            { height: 128, width: 172 },
                            dimensions.width
                          )}
                        />
                      </View>
                      {/* 8 Week Course Title Text  */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App['Custom Color_2'],
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 15,
                            marginTop: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {'Foundation Course'}
                      </Text>
                      {/* 8 Week Course Subtitle Text */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App['Custom Color_2'],
                            fontFamily: 'Inter_400Regular',
                            fontSize: 12,
                            marginTop: 8,
                            opacity: 0.5,
                          },
                          dimensions.width
                        )}
                      >
                        {
                          'Here is our life changing health and wellbeing program!'
                        }
                      </Text>
                    </View>
                  </Touchable>
                </View>
                {/* Hyrox Container View */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginLeft: 10, marginRight: 0 },
                    dimensions.width
                  )}
                >
                  {/* Hyrox Touchable */}
                  <Touchable
                    onPress={() => {
                      try {
                        /* Navigate action skipped because Hyrox Index is hidden */
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { marginBottom: 8, marginRight: 10, marginTop: 8 },
                      dimensions.width
                    )}
                  >
                    {/* Hyrox View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 8, height: 181, width: 172 },
                        dimensions.width
                      )}
                    >
                      {/* Hyrox Image View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { borderRadius: 8, overflow: 'hidden' },
                          dimensions.width
                        )}
                      >
                        {/* Hyrox Image */}
                        <ImageBackground
                          resizeMode={'cover'}
                          source={imageSource(
                            Images['trainingindexhyroxcoverimagehyrox11']
                          )}
                          style={StyleSheet.applyWidth(
                            { height: 128, width: 172 },
                            dimensions.width
                          )}
                        />
                      </View>
                      {/* Hyrox Title Text */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App['Custom Color_2'],
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 15,
                            marginTop: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {'Hyrox'}
                      </Text>
                      {/*  Hyrox Subtitle Text */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App['Custom Color_2'],
                            fontFamily: 'Inter_400Regular',
                            fontSize: 12,
                            marginTop: 8,
                            opacity: 0.5,
                          },
                          dimensions.width
                        )}
                      >
                        {
                          'Prep for the competition or challenge yourself in the gym!'
                        }
                      </Text>
                    </View>
                  </Touchable>
                </View>
                {/* Primal On Demand View */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginLeft: 10, marginRight: 0 },
                    dimensions.width
                  )}
                >
                  {/* Primal On Demand Touchable */}
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'PrimalOnDemandScreen',
                          {},
                          { pop: true }
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { marginBottom: 8, marginRight: 10, marginTop: 8 },
                      dimensions.width
                    )}
                  >
                    {/* Primal On Demand View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 8, height: 181, width: 172 },
                        dimensions.width
                      )}
                    >
                      {/* Primal On Demand Image View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { borderRadius: 8, overflow: 'hidden' },
                          dimensions.width
                        )}
                      >
                        {/* Primal On Demand Image */}
                        <ImageBackground
                          resizeMode={'cover'}
                          source={imageSource(Images['apptest31'])}
                          style={StyleSheet.applyWidth(
                            { height: 128, width: 172 },
                            dimensions.width
                          )}
                        />
                      </View>
                      {/* Primal On Demand Title Text */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App['Custom Color_2'],
                            fontFamily: 'Inter_600SemiBold',
                            fontSize: 15,
                            marginTop: 10,
                          },
                          dimensions.width
                        )}
                      >
                        {'Primal On Demand'}
                      </Text>
                      {/* Other Subtitle Text */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App['Custom Color_2'],
                            fontFamily: 'Inter_400Regular',
                            fontSize: 12,
                            marginTop: 8,
                            opacity: 0.5,
                          },
                          dimensions.width
                        )}
                      >
                        {'If you miss a session no problem! catch up here!'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        {/* Message and Community Container View */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'stretch', gap: 16, padding: 16 },
            dimensions.width
          )}
        >
          {/* Row */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'stretch', flexDirection: 'row', gap: 16 },
              dimensions.width
            )}
          >
            {/* Community */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App.Studily_Slate_Blue_Dark_30,
                  borderRadius: 20,
                  flex: 1,
                  overflow: 'hidden',
                },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    navigation.navigate('Community', {}, { pop: true });
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', justifyContent: 'center' },
                    dimensions.width
                  )}
                >
                  {/* Community Image */}
                  <Image
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
                    source={imageSource(Images['CommunityIcon'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'].style,
                        { marginTop: 10 }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* Text View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { paddingBottom: 10, paddingLeft: 10, paddingRight: 10 },
                      dimensions.width
                    )}
                  >
                    {/* Community Text */}
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
                            marginTop: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Community'}
                    </Text>
                    {/* Share What Your Eating Or Ask Questions Text */}
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
                            fontFamily: 'Inter_400Regular',
                            fontSize: 12,
                            marginTop: 5,
                            opacity: 0.5,
                            textAlign: 'center',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {
                        'Check in with the team \nand see what is going on \nor ask a question'
                      }
                    </Text>
                  </View>
                </View>
              </Touchable>
            </View>
            {/* Session Log */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App.Studily_Slate_Blue_Dark_30,
                  borderRadius: 20,
                  flex: 1,
                  overflow: 'hidden',
                },
                dimensions.width
              )}
            >
              <Touchable
                onPress={() => {
                  try {
                    setScanQR(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', justifyContent: 'center' },
                    dimensions.width
                  )}
                >
                  {/* Session Log Icon */}
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['orcodescanicon3'])}
                    style={StyleSheet.applyWidth(
                      { height: 100, marginTop: 10, width: 100 },
                      dimensions.width
                    )}
                  />
                  {/* Text View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { paddingBottom: 10, paddingLeft: 10, paddingRight: 10 },
                      dimensions.width
                    )}
                  >
                    {/* Scan Me Text */}
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
                            marginTop: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Scan Me'}
                    </Text>
                    {/* Make sure you ... Text */}
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
                            fontFamily: 'Inter_400Regular',
                            fontSize: 12,
                            marginTop: 5,
                            opacity: 0.5,
                            textAlign: 'center',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Make sure you stay \naccountable! log every session!'}
                    </Text>
                  </View>
                </View>
              </Touchable>
            </View>
          </View>

          <PerformApi.FetchGetLiveSessionInfoGET refetchInterval={20000}>
            {({ loading, error, data, refetchGetLiveSessionInfo }) => {
              const fetchData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <SimpleStyleFlatList
                  data={fetchData}
                  decelerationRate={'normal'}
                  horizontal={false}
                  inverted={false}
                  keyExtractor={(listData, index) => listData?.id}
                  keyboardShouldPersistTaps={'never'}
                  listKey={
                    'Scroll View->Message and Community Container View->Fetch->List'
                  }
                  nestedScrollEnabled={false}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  pagingEnabled={false}
                  renderItem={({ item, index }) => {
                    const listData = item;
                    return (
                      <>
                        {/* Coaches Corner Container View  */}
                        <>
                          {!listData?.hasStarted ? null : (
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'flex-start',
                                  backgroundColor: 'rgba(0, 0, 0, 0)',
                                  flexDirection: 'row',
                                  justifyContent: 'center',
                                  opacity: 1,
                                  width: '100%',
                                },
                                dimensions.width
                              )}
                            >
                              <Pressable
                                onPress={() => {
                                  try {
                                    navigation.navigate(
                                      'LiveStreamingScreen',
                                      { channelId: listData?.channel },
                                      { pop: true }
                                    );
                                  } catch (err) {
                                    console.error(err);
                                  }
                                }}
                                style={StyleSheet.applyWidth(
                                  { width: '100%' },
                                  dimensions.width
                                )}
                              >
                                {/* Background Colour View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor:
                                        palettes.App.Studily_Slate_Blue_Dark,
                                      borderRadius: 20,
                                      height: '100%',
                                      opacity: 0.3,
                                      position: 'absolute',
                                      width: '100%',
                                    },
                                    dimensions.width
                                  )}
                                />
                                {/* Coaches corner View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      backgroundColor: '"rgba(0, 0, 0, 0)"',
                                      borderRadius: 15,
                                      flexDirection: 'column',
                                      height: '100%',
                                      justifyContent: 'center',
                                      width: '100%',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Coaches Corner Image View */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      { marginBottom: 10, marginTop: 20 },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Coaches Corner Icon */}
                                    <Image
                                      resizeMode={'cover'}
                                      source={imageSource(
                                        Images['LiveIconpng']
                                      )}
                                      style={StyleSheet.applyWidth(
                                        { height: 60, width: 80 },
                                        dimensions.width
                                      )}
                                    />
                                  </View>
                                  {/* Go Live Text View */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      { marginBottom: 20 },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Coaches Corner Text */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: palettes.App['Custom Color_2'],
                                          fontFamily: 'Inter_500Medium',
                                          fontSize: 28,
                                          textAlign: 'center',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {'GO LIVE!'}
                                    </Text>
                                    {/* Make sure you ... Text */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        StyleSheet.compose(
                                          GlobalStyles.TextStyles(theme)['Text']
                                            .style,
                                          {
                                            alignSelf: 'center',
                                            color:
                                              palettes.App['Custom #ffffff'],
                                            fontFamily: 'Inter_400Regular',
                                            fontSize: 12,
                                            marginTop: 5,
                                            opacity: 0.5,
                                            textAlign: 'center',
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {'Hit Go Live! and leave the rest to us!'}
                                    </Text>
                                  </View>
                                </View>
                              </Pressable>
                            </View>
                          )}
                        </>
                      </>
                    );
                  }}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                  snapToAlignment={'start'}
                  style={StyleSheet.applyWidth(
                    { height: 220 },
                    dimensions.width
                  )}
                />
              );
            }}
          </PerformApi.FetchGetLiveSessionInfoGET>
        </View>
      </SimpleStyleScrollView>

      <Modal
        animationType={'none'}
        supportedOrientations={['portrait', 'landscape']}
        transparent={false}
        visible={Boolean(scanQR)}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: palettes.App.Studily_Dark_Primary,
              flex: 1,
              justifyContent: 'center',
            },
            dimensions.width
          )}
        >
          {/* Barcode scanner */}
          <Utils.CustomCodeErrorBoundary>
            <BarcodeScanner.Index
              toggler={() => {
                console.log('in togggler');
                setScanQR(false);
                setIntentLogSession(true);
              }}
            />
          </Utils.CustomCodeErrorBoundary>
          <View
            style={StyleSheet.applyWidth({ padding: 12 }, dimensions.width)}
          >
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  { color: palettes.App.Studily_Milk_White }
                ),
                dimensions.width
              )}
            >
              {'Please scan the QR code'}
            </Text>
          </View>
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth({ marginTop: 30 }, dimensions.width)}
          >
            <IconButton
              onPress={() => {
                try {
                  setScanQR(false);
                } catch (err) {
                  console.error(err);
                }
              }}
              color={palettes.App.Studily_Milk_White}
              icon={'Ionicons/close-circle'}
              size={32}
            />
          </View>
        </View>
      </Modal>
      {/* Goals Modal */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        presentationStyle={'pageSheet'}
        transparent={true}
        visible={Boolean(openModaltest)}
      >
        {/* Background View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App.Studily_Dark_UI,
              borderRadius: 16,
              flex: 1,
              justifyContent: 'center',
              marginLeft: 10,
              marginRight: 10,
              marginTop: dimensions.height * 0.19,
              opacity: 1,
              paddingBottom: 20,
              paddingTop: 20,
            },
            dimensions.width
          )}
        >
          {/* Modal Container View */}
          <View
            style={StyleSheet.applyWidth(
              {
                flex: 1,
                justifyContent: 'center',
                paddingLeft: 20,
                paddingRight: 20,
              },
              dimensions.width
            )}
          >
            <SimpleStyleScrollView
              bounces={true}
              horizontal={false}
              keyboardShouldPersistTaps={'never'}
              nestedScrollEnabled={false}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
            >
              {/* Goals View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'column',
                    marginBottom: 20,
                    paddingLeft: 20,
                  },
                  dimensions.width
                )}
              >
                {/* Golals */}
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
                        fontSize: 26,
                        textAlign: 'left',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Goals'}
                </Text>
                {/* Sub Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', marginTop: 10, paddingRight: 10 },
                    dimensions.width
                  )}
                >
                  {/* Remember to review... */}
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
                          textAlign: 'left',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      'Remember to review your goals weekly! If you hit them great, if not go again until they are embedded in your life.'
                    }
                  </Text>
                </View>
              </View>
              {/* Goals  Container View */}
              <View
                style={StyleSheet.applyWidth(
                  { backgroundColor: 'rgba(0, 0, 0, 0)' },
                  dimensions.width
                )}
              >
                {/* Goals View  */}
                <View
                  style={StyleSheet.applyWidth(
                    {
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
                        alignSelf: 'center',
                        backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderRadius: 16,
                        height: [
                          { minWidth: Breakpoints.Mobile, value: 230 },
                          { minWidth: Breakpoints.Tablet, value: '100%' },
                        ],
                        opacity: 0.3,
                        position: [
                          { minWidth: Breakpoints.Mobile, value: 'relative' },
                          { minWidth: Breakpoints.Tablet, value: 'absolute' },
                        ],
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    <Touchable
                      onPress={() => {
                        try {
                          navigation.navigate(
                            'CreateGoals8Screen',
                            {},
                            { pop: true }
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      style={StyleSheet.applyWidth(
                        { height: '100%', width: '100%' },
                        dimensions.width
                      )}
                    />
                  </View>
                  {/* Goal Text View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderColor: 'rgba(0, 0, 0, 0)',
                        borderRadius: 16,
                        flexDirection: 'column',
                        marginTop: 10,
                        opacity: 1,
                        paddingBottom: 20,
                        paddingLeft: [
                          { minWidth: Breakpoints.Mobile, value: 30 },
                          { minWidth: Breakpoints.Tablet, value: 20 },
                        ],
                        paddingRight: {
                          minWidth: Breakpoints.Tablet,
                          value: 20,
                        },
                        position: [
                          { minWidth: Breakpoints.Mobile, value: 'absolute' },
                          { minWidth: Breakpoints.Tablet, value: 'relative' },
                        ],
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Goals Title Text View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { marginBottom: 10 },
                        dimensions.width
                      )}
                    >
                      {/* Goal Title Text */}
                      <Text
                        accessible={true}
                        selectable={false}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.App['Custom Color_2'],
                            fontFamily: 'Inter_400Regular',
                            fontSize: 26,
                          },
                          dimensions.width
                        )}
                      >
                        {'Here are your goals!'}
                      </Text>
                    </View>

                    <PerformApi.FetchGetGoalGET>
                      {({ loading, error, data, refetchGetGoal }) => {
                        const fetchData = data?.json;
                        if (loading) {
                          return <ActivityIndicator />;
                        }

                        if (
                          error ||
                          data?.status < 200 ||
                          data?.status >= 300
                        ) {
                          return <ActivityIndicator />;
                        }

                        return (
                          <>
                            {/* Goal Text Container View */}
                            <View
                              style={StyleSheet.applyWidth(
                                { alignItems: 'stretch' },
                                dimensions.width
                              )}
                            >
                              <Touchable>
                                {/* Goal 1 View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      justifyContent: 'flex-start',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Goal 1 */}
                                  <View>
                                    {/* Goal 1 Text */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: palettes.App['Custom Color'],
                                          fontFamily: 'Inter_400Regular',
                                          fontSize: 20,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {'Goal 1'}
                                    </Text>
                                    {/* Goal 1 Text View */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Goal 1 Text */}
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.App['Custom Color_2'],
                                            fontFamily: 'Inter_400Regular',
                                            fontSize: 18,
                                            marginTop: 5,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {fetchData?.goal_one}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </Touchable>
                              {/* Touchable 2 */}
                              <Touchable>
                                {/* Goal 2 View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      justifyContent: 'flex-start',
                                      marginTop: 5,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Goal 2 */}
                                  <View>
                                    {/* Goal 2 Text */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: palettes.App['Custom Color'],
                                          fontFamily: 'Inter_400Regular',
                                          fontSize: 20,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {'Goal 2'}
                                    </Text>
                                    {/* Goal 2 Text View */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Goal 2 Text */}
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.App['Custom Color_2'],
                                            fontFamily: 'Inter_400Regular',
                                            fontSize: 18,
                                            marginTop: 5,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {fetchData?.goal_two}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </Touchable>
                              {/* Touchable 3 */}
                              <Touchable>
                                {/* Goal 3 View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      justifyContent: 'flex-start',
                                      marginTop: 5,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Goal 3 */}
                                  <View>
                                    {/* Goal 3 Text */}
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      style={StyleSheet.applyWidth(
                                        {
                                          color: palettes.App['Custom Color'],
                                          fontFamily: 'Inter_400Regular',
                                          fontSize: 20,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {'Goal 3'}
                                    </Text>
                                    {/* Goal 3 Text View */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Goal 3 Text */}
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.App['Custom Color_2'],
                                            fontFamily: 'Inter_400Regular',
                                            fontSize: 18,
                                            marginTop: 5,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {fetchData?.goal_three}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                              </Touchable>
                            </View>
                          </>
                        );
                      }}
                    </PerformApi.FetchGetGoalGET>
                  </View>
                </View>
                {/* GoalsText View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      paddingBottom: 16,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 16,
                    },
                    dimensions.width
                  )}
                >
                  {/* You are 40% more... */}
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
                    {'You are 40% more likely to hit a goal if you write down!'}
                  </Text>
                  {/* You only fail... */}
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
                    {'You only fail when you quit!'}
                  </Text>
                </View>
              </View>
              {/* Button View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 30,
                  },
                  dimensions.width
                )}
              >
                {/* Close */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      setOpenModaltest(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'].style,
                      {
                        backgroundColor: null,
                        borderColor: palettes.App['Custom Color'],
                        borderRadius: 20,
                        borderWidth: 2,
                        color: palettes.App['Custom Color'],
                        fontFamily: 'Inter_400Regular',
                        width: 120,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Close'}
                />
                {/* Set Goals */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      navigation.navigate(
                        'CreateGoals8Screen',
                        { isNewUser: false },
                        { pop: true }
                      );
                      setOpenModaltest(false);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ButtonStyles(theme)['Button'].style,
                      {
                        backgroundColor: null,
                        borderColor: palettes.App['Custom Color'],
                        borderRadius: 20,
                        borderWidth: 2,
                        color: palettes.App['Custom Color'],
                        fontFamily: 'Inter_400Regular',
                        width: 120,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Set Goals'}
                />
              </View>
            </SimpleStyleScrollView>
          </View>
        </View>
      </Modal>
      {/* Todo Modal */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        presentationStyle={'pageSheet'}
        transparent={true}
        visible={Boolean(openTodoModal)}
      >
        {/* Background View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App.Studily_Dark_UI,
              borderRadius: 16,
              flex: 1,
              justifyContent: 'center',
              marginLeft: 10,
              marginRight: 10,
              marginTop: dimensions.height * 0.19,
              opacity: 1,
              paddingBottom: 20,
              paddingTop: 20,
            },
            dimensions.width
          )}
        >
          {/* Modal Container View */}
          <View
            style={StyleSheet.applyWidth(
              {
                flex: 1,
                justifyContent: 'center',
                paddingLeft: 20,
                paddingRight: 20,
              },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'stretch',
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
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 10,
                    },
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
                          /* hidden 'Set Variable' action */
                          const res = (
                            await performDailyTasksPATCH.mutateAsync({
                              taskFive: taskFive,
                              taskFour: taskFour,
                              taskOne: newCheckboxValue,
                              taskThree: taskThree,
                              taskTwo: taskTwo,
                            })
                          )?.json;
                          /* hidden 'Log to Console' action */
                          /* hidden 'Run a Custom Function' action */
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
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 10,
                    },
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
                          setUpdatingTask(true);
                          const res = (
                            await performDailyTasksPATCH.mutateAsync({
                              taskFive: taskFive,
                              taskFour: taskFour,
                              taskOne: taskOne,
                              taskThree: taskThree,
                              taskTwo: newCheckboxValue,
                            })
                          )?.json;
                          setUpdatingTask(false);
                          /* hidden 'Run a Custom Function' action */
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    color={palettes.App['Custom #ffffff']}
                    disabled={Boolean(updatingTask)}
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
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 10,
                    },
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
                          setUpdatingTask(true);
                          const res = (
                            await performDailyTasksPATCH.mutateAsync({
                              taskFive: taskFive,
                              taskFour: taskFour,
                              taskOne: taskOne,
                              taskThree: newCheckboxValue,
                              taskTwo: taskTwo,
                            })
                          )?.json;
                          setUpdatingTask(false);
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    color={palettes.App['Custom #ffffff']}
                    disabled={Boolean(updatingTask)}
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
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 10,
                    },
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
                          setUpdatingTask(true);
                          const res = (
                            await performDailyTasksPATCH.mutateAsync({
                              taskFive: taskFive,
                              taskFour: newCheckboxValue,
                              taskOne: taskOne,
                              taskThree: taskThree,
                              taskTwo: taskTwo,
                            })
                          )?.json;
                          setUpdatingTask(false);
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    color={palettes.App['Custom #ffffff']}
                    disabled={Boolean(updatingTask)}
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
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: 10,
                    },
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
                          setUpdatingTask(true);
                          const res = (
                            await performDailyTasksPATCH.mutateAsync({
                              taskFive: newCheckboxValue,
                              taskFour: taskFour,
                              taskOne: taskOne,
                              taskThree: taskThree,
                              taskTwo: taskTwo,
                            })
                          )?.json;
                          setUpdatingTask(false);
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    color={palettes.App['Custom #ffffff']}
                    disabled={Boolean(updatingTask)}
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
                        setOpenTodoModal(false);
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
          </View>
        </View>
      </Modal>
      {/* Modal - Measurement form NEW */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        presentationStyle={'fullScreen'}
        transparent={true}
        visible={Boolean(showMeasurementForm)}
      >
        {/* Contianer */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color_22'],
              borderRadius: 12,
              bottom: 0,
              opacity: 1,
              padding: 20,
              paddingBottom: 40,
              paddingLeft: 10,
              paddingRight: 10,
              position: 'absolute',
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Background Colour View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                backgroundColor: palettes.App['Custom Color_22'],
                borderRadius: 20,
                height: '100%',
                opacity: 1,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          <SimpleStyleKeyboardAwareScrollView
            enableResetScrollToCoords={false}
            keyboardShouldPersistTaps={'never'}
            showsVerticalScrollIndicator={true}
            viewIsInsideTabBar={false}
            enableAutomaticScroll={true}
            enableOnAndroid={true}
          >
            {/* Title Container */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'flex-start', margin: 4, marginBottom: 4 },
                dimensions.width
              )}
            >
              {/* Title */}
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
                      fontSize: 17,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Body Measurements'}
              </Text>
            </View>
            {/* Arms View */}
            <View
              style={StyleSheet.applyWidth({ margin: 4 }, dimensions.width)}
            >
              {/* Arms Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App.White,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginBottom: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Arms'}
              </Text>
              {/* Input Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.ViewBG,
                    borderRadius: 14,
                    paddingBottom: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                <NumberInput
                  changeTextDelay={500}
                  onChangeText={newNumberInputValue => {
                    try {
                      setArmM(newNumberInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                    .props}
                  placeholder={'Measure Arm..'}
                  placeholderTextColor={theme.colors.text.light}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.NumberInputStyles(theme)['Number Input']
                        .style,
                      {
                        backgroundColor: palettes.Brand.Surface,
                        fontFamily: 'Inter_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                  value={armM}
                />
              </View>
            </View>
            {/* Waist View */}
            <View
              style={StyleSheet.applyWidth({ margin: 4 }, dimensions.width)}
            >
              {/* Waist Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App.White,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginBottom: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Waist'}
              </Text>
              {/* Input Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.ViewBG,
                    borderRadius: 14,
                    paddingBottom: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                <NumberInput
                  changeTextDelay={500}
                  onChangeText={newNumberInputValue => {
                    try {
                      setWaistM(newNumberInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                    .props}
                  placeholder={'Measure Waist..'}
                  placeholderTextColor={theme.colors.text.light}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.NumberInputStyles(theme)['Number Input']
                        .style,
                      {
                        backgroundColor: palettes.Brand.Surface,
                        fontFamily: 'Inter_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                  value={waistM}
                />
              </View>
            </View>
            {/* Thigh View */}
            <View
              style={StyleSheet.applyWidth({ margin: 4 }, dimensions.width)}
            >
              {/* Thigh Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App.White,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginBottom: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Thigh'}
              </Text>
              {/* Input Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.ViewBG,
                    borderRadius: 14,
                    paddingBottom: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                <NumberInput
                  changeTextDelay={500}
                  onChangeText={newNumberInputValue => {
                    try {
                      setThighM(newNumberInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                    .props}
                  placeholder={'Measure Thigh..'}
                  placeholderTextColor={theme.colors.text.light}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.NumberInputStyles(theme)['Number Input']
                        .style,
                      {
                        backgroundColor: palettes.Brand.Surface,
                        fontFamily: 'Inter_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                  value={thighM}
                />
              </View>
            </View>
            {/* Chest View */}
            <View
              style={StyleSheet.applyWidth({ margin: 4 }, dimensions.width)}
            >
              {/* Chest Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App.White,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginBottom: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Chest'}
              </Text>
              {/* Input Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.ViewBG,
                    borderRadius: 14,
                    paddingBottom: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                <NumberInput
                  changeTextDelay={500}
                  onChangeText={newNumberInputValue => {
                    try {
                      setChestM(newNumberInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                    .props}
                  placeholder={'Measure Chest..'}
                  placeholderTextColor={theme.colors.text.light}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.NumberInputStyles(theme)['Number Input']
                        .style,
                      {
                        backgroundColor: palettes.Brand.Surface,
                        fontFamily: 'Inter_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                  value={chestM}
                />
              </View>
            </View>
            {/* Calf View */}
            <View
              style={StyleSheet.applyWidth({ margin: 4 }, dimensions.width)}
            >
              {/* Calf Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App.White,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginBottom: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Calf'}
              </Text>
              {/* Input Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.ViewBG,
                    borderRadius: 14,
                    paddingBottom: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                <NumberInput
                  changeTextDelay={500}
                  onChangeText={newNumberInputValue => {
                    try {
                      setCalfM(newNumberInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                    .props}
                  placeholder={'Measure Calf..'}
                  placeholderTextColor={theme.colors.text.light}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.NumberInputStyles(theme)['Number Input']
                        .style,
                      {
                        backgroundColor: palettes.Brand.Surface,
                        fontFamily: 'Inter_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                  value={calfM}
                />
              </View>
            </View>
            {/* Current Weight View */}
            <View
              style={StyleSheet.applyWidth({ margin: 4 }, dimensions.width)}
            >
              {/* Current weight Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App.White,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginBottom: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Current Weight'}
              </Text>
              {/* Input Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.ViewBG,
                    borderRadius: 14,
                    paddingBottom: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                <NumberInput
                  changeTextDelay={500}
                  onChangeText={newNumberInputValue => {
                    try {
                      setWeightM(newNumberInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                    .props}
                  placeholder={'Measure Weight..'}
                  placeholderTextColor={theme.colors.text.light}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.NumberInputStyles(theme)['Number Input']
                        .style,
                      {
                        backgroundColor: palettes.Brand.Surface,
                        fontFamily: 'Inter_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                  value={weightM}
                />
              </View>
            </View>

            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: theme.colors.background.danger,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                  }
                ),
                dimensions.width
              )}
            >
              {formErr}
            </Text>
            {/* Button View */}
            <View
              style={StyleSheet.applyWidth(
                { paddingTop: 16 },
                dimensions.width
              )}
            >
              {/* Cancel Button */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    setShowMeasurementForm(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'].style,
                    {
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: palettes.App['Custom Color'],
                      borderWidth: 1,
                      fontFamily: 'Inter_700Bold',
                    }
                  ),
                  dimensions.width
                )}
                title={'Cancel'}
              />
              {/* Submit Button */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  const handler = async () => {
                    try {
                      setLoggingMeasurement(true);
                      const logREs = (
                        await performLogMeasurementsPOST.mutateAsync({
                          arm: armM,
                          calf: calfM,
                          chest: chestM,
                          isInitial: true,
                          thigh: thighM,
                          waist: waistM,
                          weight: weightM,
                        })
                      )?.json;
                      setLoggingMeasurement(false);
                      if (logREs?.message) {
                        setFormErr(logREs?.message);
                      } else {
                        setFormErr('');
                        setShowMeasurementForm(false);
                        /* hidden 'Navigate' action */
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                loading={Boolean(loggingMeasurement)}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'].style,
                    {
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: palettes.App['Custom Color'],
                      borderWidth: 1,
                      fontFamily: 'Inter_700Bold',
                      marginTop: 12,
                    }
                  ),
                  dimensions.width
                )}
                title={'Submit'}
              />
            </View>
          </SimpleStyleKeyboardAwareScrollView>
          {/* Fetch 3 */}
          <PerformApi.FetchGetCurrentMeasurementGET
            handlers={{
              on2xx: fetch3Data => {
                try {
                  setArmM(fetch3Data?.json?.arm);
                  setWaistM(fetch3Data?.json?.waist);
                  setThighM(fetch3Data?.json?.thigh);
                  setChestM(fetch3Data?.json?.chest);
                  setCalfM(fetch3Data?.json?.calf);
                  setWeightM(fetch3Data?.json?.current_weight);
                } catch (err) {
                  console.error(err);
                }
              },
            }}
          >
            {({ loading, error, data, refetchGetCurrentMeasurement }) => {
              const fetch3Data = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return null;
            }}
          </PerformApi.FetchGetCurrentMeasurementGET>
        </View>
      </Modal>
      <>
        {!intentLogSession ? null : (
          <View
            onLayout={event => {
              const handler = async () => {
                try {
                  setIntentLogSession(false);
                  (await performLogASessionPOST.mutateAsync())?.json;

                  showAlertUtil({
                    title: 'Session Logged',
                    message: undefined,
                    buttonText: 'Ok',
                  });
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
          />
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(Home10ModuleTestScreen);
