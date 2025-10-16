import React from 'react';
import {
  Button,
  CircularProgress,
  Icon,
  Link,
  ScreenContainer,
  SimpleStyleScrollView,
  Spacer,
  Swiper,
  SwiperItem,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import * as WebBrowser from 'expo-web-browser';
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

const P1CourseIndexModuleTestScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [isLoading, setIsLoading] = React.useState(false);
  const [isReseting, setIsReseting] = React.useState(false);
  const [openModaltest, setOpenModaltest] = React.useState(false);
  const [openModaltestthree, setOpenModaltestthree] = React.useState(false);
  const [openModaltesttwo, setOpenModaltesttwo] = React.useState(false);
  const [openModeltestfour, setOpenModeltestfour] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
  const performLogHabitsPOST = PerformApi.useLogHabitsPOST();
  const performResetHabitStreakDELETE = PerformApi.useResetHabitStreakDELETE();
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
      hasSafeArea={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App.Studily_Dark_UI,
          justifyContent: 'space-between',
          opacity: 0.8,
        },
        dimensions.width
      )}
    >
      <ScrollView
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        bounces={false}
        style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
      >
        <HeaderBlock />
        {/* Primal Foundation Title View */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'column', marginTop: 16 },
            dimensions.width
          )}
        >
          {/* Welcome to Primal ...Text */}
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
            {'Welcome To Primal'}
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
            {/* Foundation Course Text  */}
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
              {'Foundation Course'}
            </Text>
          </View>
        </View>
        {/* Coach's Corner Container View */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: 'rgba(0, 0, 0, 0)',
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
                borderRadius: 20,
                height: '100%',
                opacity: 0.3,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          {/* Coaches Corner Video View */}
          <View
            style={StyleSheet.applyWidth(
              { paddingLeft: 20, paddingRight: 20, paddingTop: 20 },
              dimensions.width
            )}
          >
            <VimeoFixedBlock height={200} quality={'2k'} videoId={1038138296} />
          </View>
          {/* Coach's Corner Text View */}
          <View
            style={StyleSheet.applyWidth(
              {
                paddingBottom: 16,
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 16,
              },
              dimensions.width
            )}
          >
            {/* Coach's Name Text */}
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
              {'Coach: Jess'}
            </Text>
            {/* Coach's Corner Subtitle */}
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
              {"Hit Play and let's make a start! "}
            </Text>
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
                  }
                ),
                dimensions.width
              )}
            >
              {'Hi, '}
              {Constants['USER']?.profile?.name}
              {
                '! Here is where it all begins. There will be ups and downs but thats how change works.  '
              }
            </Text>
          </View>
        </View>
        {/* Nutrition To Do Weight Container View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: 'rgba(0, 0, 0, 0)',
              flexDirection: 'column',
              height: 435,
              marginTop: 16,
              paddingLeft: 10,
              paddingRight: 10,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* This Weeks Content */}
          <View
            style={StyleSheet.applyWidth(
              { flex: 2, flexDirection: 'row', justifyContent: 'space-evenly' },
              dimensions.width
            )}
          >
            {/* Nutrition View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderRadius: 20,
                  height: '100%',
                  marginRight: 8,
                  width: '48%',
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
              {/* Nutrition Touchable */}
              <Touchable
                onPress={() => {
                  try {
                    setOpenModaltest(true);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  {
                    borderColor: 'rgba(0, 0, 0, 0)',
                    borderWidth: 3,
                    height: '100%',
                    width: '100%',
                  },
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
                      flexDirection: 'column',
                      height: '100%',
                      justifyContent: 'center',
                      opacity: 1,
                      width: '100%',
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
                            textAlign: 'center',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Diet \nInformation'}
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
            {/* Diet Exercise Support View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  flex: 2,
                  height: '100%',
                  marginLeft: 8,
                  width: '50%',
                },
                dimensions.width
              )}
            >
              {/* Exercise View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderRadius: 20,
                    height: '47.5%',
                    justifyContent: 'center',
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
                      bottom: 0,
                      height: '100%',
                      opacity: 0.3,
                      position: 'absolute',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                />
                {/* Bodyweight Workout Image View  */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'center',
                      height: 60,
                      position: 'absolute',
                      top: '20%',
                      width: '60%',
                    },
                    dimensions.width
                  )}
                >
                  {/* Bodyweight workout Image */}
                  <Image
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
                    source={imageSource(Images['bodyweightworkouticon'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'].style,
                        { height: 60, width: 40 }
                      ),
                      dimensions.width
                    )}
                  />
                </View>
                {/* Exercise Info Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignSelf: 'center', bottom: 20, position: 'absolute' },
                    dimensions.width
                  )}
                >
                  {/* Bodyweight Workout Text */}
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
                          textAlign: 'center',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'How We Exercise'}
                  </Text>
                </View>
                {/* To Do Touchable */}
                <Touchable
                  onPress={() => {
                    try {
                      setOpenModaltesttwo(true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    {
                      borderColor: 'rgba(0, 0, 0, 0)',
                      borderWidth: 5,
                      height: '100%',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                />
              </View>
              {/* Support View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    borderRadius: 20,
                    bottom: 0,
                    height: '47.5%',
                    justifyContent: 'center',
                    position: 'absolute',
                    right: 0,
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
                      bottom: 0,
                      height: '100%',
                      opacity: 0.3,
                      position: 'absolute',
                      right: 0,
                      width: '100%',
                    },
                    dimensions.width
                  )}
                />
                {/* Support Image View  2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'center',
                      height: 60,
                      position: 'absolute',
                      top: '20%',
                      width: '60%',
                    },
                    dimensions.width
                  )}
                >
                  {/* Support  Image */}
                  <Image
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
                    source={imageSource(Images['CommunityIcon'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'].style,
                        { height: 60, width: 60 }
                      ),
                      dimensions.width
                    )}
                  />
                </View>
                {/* Support Text View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignSelf: 'center', bottom: 20, position: 'absolute' },
                    dimensions.width
                  )}
                >
                  {/* Support  Text */}
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
                          textAlign: 'center',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Support'}
                  </Text>
                </View>
                <Touchable
                  onPress={() => {
                    try {
                      setOpenModaltestthree(true);
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
            </View>
          </View>
          {/* Tracking Container View */}
          <View
            style={StyleSheet.applyWidth(
              { height: 130, marginTop: 16, width: '100%' },
              dimensions.width
            )}
          >
            {/* Tracking Container */}
            <View
              style={StyleSheet.applyWidth(
                { borderRadius: 20, height: '100%', width: '100%' },
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
              {/* Tracking Image View   */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    alignSelf: 'center',
                    height: 60,
                    position: 'absolute',
                    top: '20%',
                    width: '60%',
                  },
                  dimensions.width
                )}
              >
                {/* Tracking Image */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['StatsIcon'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 60, width: 60 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Tracking Text View  */}
              <View
                style={StyleSheet.applyWidth(
                  { alignSelf: 'center', bottom: 15, position: 'absolute' },
                  dimensions.width
                )}
              >
                {/* Tracking Text */}
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
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Tracking your Progress '}
                </Text>
              </View>
              <Touchable
                onPress={() => {
                  try {
                    setOpenModeltestfour(true);
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
          </View>
        </View>
        {/* 8 Week Program Container View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: '"rgba(0, 0, 0, 0)"',
              borderRadius: 0,
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
          {/* 8 week Program View */}
          <View
            style={StyleSheet.applyWidth({ marginTop: 20 }, dimensions.width)}
          >
            {/* 8 Week Program Title View  */}
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
                {'Week 1 to 8'}
              </Text>
            </View>
            {/* 8 week Program View */}
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
                {/* Week Container View */}
                <View
                  style={StyleSheet.applyWidth(
                    { height: 210, marginLeft: 10, marginRight: 0 },
                    dimensions.width
                  )}
                >
                  {/* Week Touchable */}
                  <Touchable
                    onPress={() => {
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
                    {/* Week Course View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 8, height: 200, width: 172 },
                        dimensions.width
                      )}
                    >
                      {/* Week Course Image View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { borderRadius: 8, overflow: 'hidden' },
                          dimensions.width
                        )}
                      >
                        {/* Week Course Image */}
                        <ImageBackground
                          resizeMode={'cover'}
                          source={imageSource(Images['apptest71'])}
                          style={StyleSheet.applyWidth(
                            { height: 128, width: 172 },
                            dimensions.width
                          )}
                        />
                      </View>
                      {/* Week Course Title Text  */}
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
                        {'Week 1'}
                      </Text>
                      {/* Week Course Subtitle Text */}
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
                        {"Let's start building those positive habits!"}
                      </Text>
                    </View>
                  </Touchable>
                </View>
                {/* Week Container View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    { height: 210, marginLeft: 10, marginRight: 0 },
                    dimensions.width
                  )}
                >
                  {/* Week Touchable */}
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'P1Week2CoachesCornerScreen',
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
                    {/* Week Course View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 8, height: 200, width: 172 },
                        dimensions.width
                      )}
                    >
                      {/* Week Course Image View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { borderRadius: 8, overflow: 'hidden' },
                          dimensions.width
                        )}
                      >
                        {/* Week Course Image */}
                        <ImageBackground
                          resizeMode={'cover'}
                          source={imageSource(Images['apptest45'])}
                          style={StyleSheet.applyWidth(
                            { height: 128, width: 172 },
                            dimensions.width
                          )}
                        />
                      </View>
                      {/* Week Course Title Text  */}
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
                        {'Week 2'}
                      </Text>
                      {/* Week Course Subtitle Text */}
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
                        {'Week 1 in the bag! keep focussed!'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
                {/* Week Container View 3 */}
                <View
                  style={StyleSheet.applyWidth(
                    { height: 210, marginLeft: 10, marginRight: 0 },
                    dimensions.width
                  )}
                >
                  {/* Week Touchable */}
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'P1Week3CoachesCornerScreen',
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
                    {/* Week Course View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 8, height: 200, width: 172 },
                        dimensions.width
                      )}
                    >
                      {/* Week Course Image View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { borderRadius: 8, overflow: 'hidden' },
                          dimensions.width
                        )}
                      >
                        {/* Week Course Image */}
                        <ImageBackground
                          resizeMode={'cover'}
                          source={imageSource(Images['apptest65'])}
                          style={StyleSheet.applyWidth(
                            { height: 128, width: 172 },
                            dimensions.width
                          )}
                        />
                      </View>
                      {/* Week Course Title Text  */}
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
                        {'Week 3'}
                      </Text>
                      {/* Week Course Subtitle Text */}
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
                          'This is the toughest week... The hard work starts here!'
                        }
                      </Text>
                    </View>
                  </Touchable>
                </View>
                {/* Week Container View 4 */}
                <View
                  style={StyleSheet.applyWidth(
                    { height: 210, marginLeft: 10, marginRight: 0 },
                    dimensions.width
                  )}
                >
                  {/* Week Touchable */}
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'P1Week4CoachesCornerScreen',
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
                    {/* Week Course View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 8, height: 200, width: 172 },
                        dimensions.width
                      )}
                    >
                      {/* Week Course Image View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { borderRadius: 8, overflow: 'hidden' },
                          dimensions.width
                        )}
                      >
                        {/* Week Course Image */}
                        <ImageBackground
                          resizeMode={'cover'}
                          source={imageSource(Images['apptest813'])}
                          style={StyleSheet.applyWidth(
                            { height: 128, width: 172 },
                            dimensions.width
                          )}
                        />
                      </View>
                      {/* Week Course Title Text  */}
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
                        {'Week 4'}
                      </Text>
                      {/* Week Course Subtitle Text */}
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
                        {'You are at the halfway point! Well done!'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
                {/* Week Container View 5 */}
                <View
                  style={StyleSheet.applyWidth(
                    { height: 210, marginLeft: 10, marginRight: 0 },
                    dimensions.width
                  )}
                >
                  {/* Week Touchable */}
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'P1Week5CoachesCornerScreen',
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
                    {/* Week Course View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 8, height: 200, width: 172 },
                        dimensions.width
                      )}
                    >
                      {/* Week Course Image View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { borderRadius: 8, overflow: 'hidden' },
                          dimensions.width
                        )}
                      >
                        {/* Week Course Image */}
                        <ImageBackground
                          resizeMode={'cover'}
                          source={imageSource(Images['apptest144'])}
                          style={StyleSheet.applyWidth(
                            { height: 128, width: 172 },
                            dimensions.width
                          )}
                        />
                      </View>
                      {/* Week Course Title Text  */}
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
                        {'Week 5'}
                      </Text>
                      {/* Week Course Subtitle Text */}
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
                          'The positive lifestyle habits are in place! Stick to the plan'
                        }
                      </Text>
                    </View>
                  </Touchable>
                </View>
                {/* Week Container View 6 */}
                <View
                  style={StyleSheet.applyWidth(
                    { height: 210, marginLeft: 10, marginRight: 0 },
                    dimensions.width
                  )}
                >
                  {/* Week Touchable */}
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'P1Week6CoachesCornerScreen',
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
                    {/* Week Course View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 8, height: 200, width: 172 },
                        dimensions.width
                      )}
                    >
                      {/* Week Course Image View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { borderRadius: 8, overflow: 'hidden' },
                          dimensions.width
                        )}
                      >
                        {/* Week Course Image */}
                        <ImageBackground
                          resizeMode={'cover'}
                          source={imageSource(Images['apptest134'])}
                          style={StyleSheet.applyWidth(
                            { height: 128, width: 172 },
                            dimensions.width
                          )}
                        />
                      </View>
                      {/* Week Course Title Text  */}
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
                        {'Week 6'}
                      </Text>
                      {/* Week Course Subtitle Text */}
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
                          'You will feel an increase in energy this week so train hard!'
                        }
                      </Text>
                    </View>
                  </Touchable>
                </View>
                {/* Week Container View 7 */}
                <View
                  style={StyleSheet.applyWidth(
                    { height: 210, marginLeft: 10, marginRight: 0 },
                    dimensions.width
                  )}
                >
                  {/* Week Touchable */}
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'P1Week7CoachesCornerScreen',
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
                    {/* Week Course View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 8, height: 200, width: 172 },
                        dimensions.width
                      )}
                    >
                      {/* Week Course Image View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { borderRadius: 8, overflow: 'hidden' },
                          dimensions.width
                        )}
                      >
                        {/* Week Course Image */}
                        <ImageBackground
                          resizeMode={'cover'}
                          source={imageSource(Images['apptest114'])}
                          style={StyleSheet.applyWidth(
                            { height: 128, width: 172 },
                            dimensions.width
                          )}
                        />
                      </View>
                      {/* Week Course Title Text  */}
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
                        {'Week 7'}
                      </Text>
                      {/* Week Course Subtitle Text */}
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
                        {'The foundations are nearly embedded... Great work!'}
                      </Text>
                    </View>
                  </Touchable>
                </View>
                {/* Week Container View 8 */}
                <View
                  style={StyleSheet.applyWidth(
                    { height: 210, marginLeft: 10, marginRight: 0 },
                    dimensions.width
                  )}
                >
                  {/* Week Touchable */}
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'P1Week8CoachesCornerScreen',
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
                    {/* Week Course View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { borderRadius: 8, height: 200, width: 172 },
                        dimensions.width
                      )}
                    >
                      {/* Week Course Image View */}
                      <View
                        style={StyleSheet.applyWidth(
                          { borderRadius: 8, overflow: 'hidden' },
                          dimensions.width
                        )}
                      >
                        {/* Week Course Image */}
                        <ImageBackground
                          resizeMode={'cover'}
                          source={imageSource(Images['apptest124'])}
                          style={StyleSheet.applyWidth(
                            { height: 128, width: 172 },
                            dimensions.width
                          )}
                        />
                      </View>
                      {/* Week Course Title Text  */}
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
                        {'Week 8'}
                      </Text>
                      {/* Week Course Subtitle Text */}
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
                          'Well done on completing our Foundation Course! Are you ready for the next step?'
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
                        {
                          "If you miss a live session don't worry... Catch up here!"
                        }
                      </Text>
                    </View>
                  </Touchable>
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        {/* 60 Days to Change A Habit View */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 16, paddingLeft: 16, paddingRight: 16 },
            dimensions.width
          )}
        >
          {/* 60 days to change a habit Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: palettes.App['Custom #ffffff'],
                fontFamily: 'Inter_400Regular',
                fontSize: 28,
              }),
              dimensions.width
            )}
          >
            {'60 Days to change a habit'}
          </Text>
          {/* Check off the days as you go Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: palettes.App['Custom #ffffff'],
                fontFamily: 'Inter_400Regular',
                fontSize: 12,
                marginTop: 5,
                opacity: 0.5,
              }),
              dimensions.width
            )}
          >
            {'Check of the days as you go!'}
          </Text>
        </View>
        {/* 60 Days Countdown Container View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignSelf: 'center',
              borderRadius: 8,
              height: 180,
              justifyContent: 'center',
              marginBottom: 20,
              marginLeft: 5,
              marginRight: 5,
              marginTop: 20,
              overflow: 'hidden',
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Fetch 2 */}
          <PerformApi.FetchGetHabitStreakGET
            handlers={{
              onData: fetch2Data => {
                try {
                  console.log(fetch2Data, 'AAAA');
                } catch (err) {
                  console.error(err);
                }
              },
            }}
          >
            {({ loading, error, data, refetchGetHabitStreak }) => {
              const fetch2Data = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <>
                  {/* 60 Days View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        height: '100%',
                        justifyContent: 'center',
                        position: 'absolute',
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    {/* 60 Text */}
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
                            fontSize: 50,
                            textAlign: 'center',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {60 - fetch2Data}
                    </Text>
                    {/* Days Text */}
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
                            fontSize: 22,
                            textAlign: 'center',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Days'}
                    </Text>
                    {/* Circle View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          height: '100%',
                          justifyContent: 'center',
                          position: 'absolute',
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
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
                        maximumValue={60}
                        style={StyleSheet.applyWidth(
                          {
                            alignSelf: 'center',
                            height: 180,
                            position: 'absolute',
                            width: 180,
                          },
                          dimensions.width
                        )}
                        value={(() => {
                          const e = fetch2Data;
                          console.log(e);
                          return e;
                        })()}
                      />
                    </View>
                  </View>
                </>
              );
            }}
          </PerformApi.FetchGetHabitStreakGET>
        </View>
        {/* Start Button Reset Button View */}
        <View
          style={StyleSheet.applyWidth(
            {
              flexDirection: 'row',
              paddingLeft: 16,
              paddingRight: 16,
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Lets Go Button */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              const handler = async () => {
                try {
                  setIsLoading(true);
                  const logHabitsResult = (
                    await performLogHabitsPOST.mutateAsync()
                  )?.json;
                  console.log(logHabitsResult);
                  setIsLoading(false);
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button'].props}
            loading={Boolean(isLoading)}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button'].style,
                {
                  backgroundColor: palettes.App.Transparent,
                  borderColor: palettes.App['Custom Color'],
                  borderWidth: 2,
                  marginRight: 5,
                  width: '50%',
                }
              ),
              dimensions.width
            )}
            title={'Lets Go!'}
          />
          {/* Restart Button */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              const handler = async () => {
                try {
                  setIsReseting(true);
                  (await performResetHabitStreakDELETE.mutateAsync())?.json;
                  setIsReseting(false);
                } catch (err) {
                  console.error(err);
                }
              };
              handler();
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button'].props}
            loading={Boolean(isReseting)}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button'].style,
                {
                  backgroundColor: palettes.App.Transparent,
                  borderColor: palettes.App['Custom Color_8'],
                  borderWidth: 2,
                  marginLeft: 5,
                  width: '50%',
                }
              ),
              dimensions.width
            )}
            title={'Restart'}
          />
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

      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        presentationStyle={'pageSheet'}
        transparent={true}
        visible={Boolean(openModaltest)}
      >
        {/* Background View */}
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
              {/* The Diet View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'column',
                    marginBottom: 20,
                    marginTop: 16,
                    paddingLeft: 16,
                  },
                  dimensions.width
                )}
              >
                {/* The Diet Text */}
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
                  {'The Diet'}
                </Text>
                {/* Sub Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', marginTop: 10, paddingRight: 10 },
                    dimensions.width
                  )}
                >
                  {/* Remember No Question... */}
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
                      "Remember no question is a stupid question! If there is something you don't understand put it on the community thread."
                    }
                  </Text>
                </View>
              </View>
              {/* Coach's Corner Container View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: [
                      { minWidth: Breakpoints.Mobile, value: 16 },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: (() => {
                          const e =
                            dimensions.width > dimensions.height ? 30 : 10;
                          console.log('top padding', e);
                          return e;
                        })(),
                      },
                    ],
                    paddingTop: 16,
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
                {/* Coach's Corner Video View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderRadius: 0,
                      marginTop: 16,
                      overflow: 'hidden',
                      paddingLeft: 30,
                      paddingRight: 30,
                    },
                    dimensions.width
                  )}
                >
                  <VimeoFixedBlock
                    height={160}
                    quality={'2k'}
                    videoId={1038143830}
                  />
                </View>
                {/* Coach's Corner Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      paddingBottom: 32,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 16,
                    },
                    dimensions.width
                  )}
                >
                  {/* Coach's name Text */}
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
                    {'Coach: Jess'}
                  </Text>
                  {/* Hit play fro the next steps Text */}
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
                    {'Hit Play and learn about our 2 diet options'}
                  </Text>
                </View>
              </View>
              {/* Button View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginTop: 20,
                  },
                  dimensions.width
                )}
              >
                {/* Back Button */}
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
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Back'}
                />
                {/* PDF Button Container View */}
                <View
                  style={StyleSheet.applyWidth(
                    { paddingBottom: 20 },
                    dimensions.width
                  )}
                >
                  {/* Option 1 PDF  */}
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'Option1FoundationCourseInsoScreen',
                          {},
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
                          marginBottom: 10,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Option 1 PDF'}
                  />
                  {/* Option 2  PDF */}
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'Option2MenusScreen',
                          {},
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
                        }
                      ),
                      dimensions.width
                    )}
                    title={'Option 2 PDF'}
                  />
                </View>
                {/* Next */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      setOpenModaltest(false);
                      setOpenModaltesttwo(true);
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
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Next'}
                />
              </View>
            </SimpleStyleScrollView>
          </View>
        </View>
      </Modal>
      {/* Modal 2 */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        presentationStyle={'pageSheet'}
        transparent={true}
        visible={Boolean(openModaltesttwo)}
      >
        {/* Background View */}
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
              {/* How To Exercise View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'column',
                    marginBottom: 20,
                    marginTop: 16,
                    paddingLeft: 16,
                  },
                  dimensions.width
                )}
              >
                {/* How To Exercise Text */}
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
                  {'How We Exercise'}
                </Text>
                {/* Sub Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', marginTop: 10, paddingRight: 10 },
                    dimensions.width
                  )}
                >
                  {/* Here is where we plan how ... */}
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
                      'Here is where you learn about all the different ways you can train and plan your weeks exercise.'
                    }
                  </Text>
                </View>
              </View>
              {/* Coach's Corner Container View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: [
                      { minWidth: Breakpoints.Mobile, value: 16 },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: (() => {
                          const e =
                            dimensions.width > dimensions.height ? 30 : 10;
                          console.log('top padding', e);
                          return e;
                        })(),
                      },
                    ],
                    paddingTop: 16,
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
                {/* Coach's Corner Video View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderRadius: 0,
                      marginTop: 16,
                      overflow: 'hidden',
                      paddingLeft: 30,
                      paddingRight: 30,
                    },
                    dimensions.width
                  )}
                >
                  <VimeoFixedBlock
                    height={160}
                    quality={'2k'}
                    videoId={1038150994}
                  />
                </View>
                {/* Coach's Corner Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      paddingBottom: 32,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 16,
                    },
                    dimensions.width
                  )}
                >
                  {/* Coach's name Text */}
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
                    {'Coach: Jess'}
                  </Text>
                  {/* Hit play fro the next steps Text */}
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
                    {'Hit Play to learn how we exercise'}
                  </Text>
                </View>
              </View>
              {/* Button View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginBottom: 20,
                    marginTop: 20,
                  },
                  dimensions.width
                )}
              >
                {/* Back Button */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      setOpenModaltesttwo(false);
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
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Back'}
                />
                {/* Read The PDF */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      navigation.navigate(
                        'HowWeTrainScreen',
                        {},
                        { pop: true }
                      );
                      setOpenModaltesttwo(false);
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
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Read the PDF'}
                />
                {/* Next */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      setOpenModaltesttwo(false);
                      setOpenModaltestthree(true);
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
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Next'}
                />
              </View>
            </SimpleStyleScrollView>
          </View>
        </View>
      </Modal>
      {/* Modal 3 */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        presentationStyle={'pageSheet'}
        transparent={true}
        visible={Boolean(openModaltestthree)}
      >
        {/* Background View */}
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
              {/* The Community View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'column',
                    marginBottom: 20,
                    marginTop: 16,
                    paddingLeft: 16,
                  },
                  dimensions.width
                )}
              >
                {/* The Community Text */}
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
                  {'The Community'}
                </Text>
                {/* Sub Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', marginTop: 10, paddingRight: 10 },
                    dimensions.width
                  )}
                >
                  {/* We are all about... */}
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
                      'We are all about community here! We go through the journey as a team and this is why we get the results we do.'
                    }
                  </Text>
                </View>
              </View>
              {/* Coach's Corner Container View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: [
                      { minWidth: Breakpoints.Mobile, value: 16 },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: (() => {
                          const e =
                            dimensions.width > dimensions.height ? 30 : 10;
                          console.log('top padding', e);
                          return e;
                        })(),
                      },
                    ],
                    paddingTop: 16,
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
                {/* Coach's Corner Video View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderRadius: 0,
                      marginTop: 16,
                      overflow: 'hidden',
                      paddingLeft: 30,
                      paddingRight: 30,
                    },
                    dimensions.width
                  )}
                >
                  <VimeoFixedBlock
                    height={160}
                    quality={'2k'}
                    videoId={1038375778}
                  />
                </View>
                {/* Coach's Corner Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      paddingBottom: 32,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 16,
                    },
                    dimensions.width
                  )}
                >
                  {/* Coach's name Text */}
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
                    {'Coach: Jess'}
                  </Text>
                  {/* Hit play fro the next steps Text */}
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
                    {'Hit Play and learn how we support you!'}
                  </Text>
                </View>
              </View>
              {/* Button View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginBottom: 20,
                    marginTop: 20,
                  },
                  dimensions.width
                )}
              >
                {/* Back Button */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      setOpenModaltestthree(false);
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
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Back'}
                />
                {/* Read The PDF */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      navigation.navigate(
                        'TheCommunityInfoScreen',
                        {},
                        { pop: true }
                      );
                      setOpenModaltestthree(false);
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
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Read the PDF'}
                />
                {/* Next */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      setOpenModaltestthree(false);
                      setOpenModeltestfour(true);
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
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Next'}
                />
              </View>
            </SimpleStyleScrollView>
          </View>
        </View>
      </Modal>
      {/* Modal 4 */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        presentationStyle={'pageSheet'}
        transparent={true}
        visible={Boolean(openModeltestfour)}
      >
        {/* Background View */}
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
              {/* Tracking Your Results View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'column',
                    marginBottom: 20,
                    marginTop: 16,
                    paddingLeft: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Tracking Your Results Text */}
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
                  {'Tracking Your Progress'}
                </Text>
                {/* Sub Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', marginTop: 10, paddingRight: 10 },
                    dimensions.width
                  )}
                >
                  {/* We are all about... */}
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
                      'Tracking is a crucial component of any health and fitness journey as it provides tangible insights into progress and areas needing improvement, and most importantly it offers a sense of accomplishment by highlighting milestones, thereby reinforcing positive behaviours and fostering a sustainable, healthy lifestyle.'
                    }
                  </Text>
                </View>
              </View>
              {/* Coach's Corner Container View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: [
                      { minWidth: Breakpoints.Mobile, value: 16 },
                      {
                        minWidth: Breakpoints.Mobile,
                        value: (() => {
                          const e =
                            dimensions.width > dimensions.height ? 30 : 10;
                          console.log('top padding', e);
                          return e;
                        })(),
                      },
                    ],
                    paddingTop: 16,
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
                {/* Coach's Corner Video View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderRadius: 0,
                      marginTop: 16,
                      overflow: 'hidden',
                      paddingLeft: 30,
                      paddingRight: 30,
                    },
                    dimensions.width
                  )}
                >
                  <VimeoFixedBlock
                    height={160}
                    quality={'2k'}
                    videoId={1040089648}
                    width={dimensions.width - 120}
                  />
                </View>
                {/* Coach's Corner Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      paddingBottom: 32,
                      paddingLeft: 16,
                      paddingRight: 16,
                      paddingTop: 16,
                    },
                    dimensions.width
                  )}
                >
                  {/* Coach's name Text */}
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
                    {'Coach: Jess'}
                  </Text>
                  {/* Hit play fro the next steps Text */}
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
                    {'Hit play and learn how we track'}
                  </Text>
                </View>
              </View>
              {/* Button View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginBottom: 20,
                    marginTop: 30,
                  },
                  dimensions.width
                )}
              >
                {/* Back Button */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      setOpenModeltestfour(false);
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
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Back'}
                />
                {/* Read The PDF */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      navigation.navigate(
                        'TrackYourProgressInfoScreen',
                        {},
                        { pop: true }
                      );
                      setOpenModeltestfour(false);
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
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Read the PDF'}
                />
                {/* Close */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      setOpenModeltestfour(false);
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
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Close'}
                />
              </View>
            </SimpleStyleScrollView>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(P1CourseIndexModuleTestScreen);
