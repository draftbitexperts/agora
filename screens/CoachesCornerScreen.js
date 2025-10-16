import React from 'react';
import {
  CircleImage,
  Icon,
  IconButton,
  LinearGradient,
  ScreenContainer,
  Slider,
  Spacer,
  Swiper,
  SwiperItem,
  SwitchRow,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { BlurView } from 'expo-blur';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as InterimAPIApi from '../apis/InterimAPIApi.js';
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

const CoachesCornerScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [checkboxRowValue, setCheckboxRowValue] = React.useState('');
  const [selectedTopic, setSelectedTopic] = React.useState('Engineering');
  const [showFilters, setShowFilters] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const [skillLevel, setSkillLevel] = React.useState(2);
  const [switchRowValue, setSwitchRowValue] = React.useState(true);
  const [switchRowValue2, setSwitchRowValue2] = React.useState(true);
  const [switchRowValue3, setSwitchRowValue3] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
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
      hasTopSafeArea={true}
      scrollable={true}
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
        showsVerticalScrollIndicator={true}
      >
        <HeaderBlock />
        {/* Coaches Corner Title View */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'column', marginTop: 16 },
            dimensions.width
          )}
        >
          {/* Coaches Corner Title Text */}
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
            {'Coaches Corner!'}
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
            {/* If this is your first time here ... Text */}
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
              {'If this is your first time here watch the video below!!'}
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
              {/* Fetch 2 */}
              <PerformApi.FetchGetVideoIdGET screenName={'Coaches Corner'}>
                {({ loading, error, data, refetchGetVideoId }) => {
                  const fetch2Data = data?.json;
                  if (loading) {
                    return <ActivityIndicator />;
                  }

                  if (error || data?.status < 200 || data?.status >= 300) {
                    return <ActivityIndicator />;
                  }

                  return (
                    <VimeoFixedBlock
                      quality={'2k'}
                      videoId={fetch2Data?.videoId}
                    />
                  );
                }}
              </PerformApi.FetchGetVideoIdGET>
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
                      opacity: 0.5,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Hit play and find out what is going on this month'}
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
                '! We have had another great month here at Primal! Now have a watch and find out what we have planned for the coming month! and also see how some of our community members are doing!'
              }
            </Text>
          </View>
        </View>
        {/* This Months Content Title View */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flexDirection: 'row', paddingLeft: 15 },
            dimensions.width
          )}
        >
          {/* This Month Text View */}
          <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
            {/* This Months Content Text */}
            <Text
              accessible={true}
              selectable={false}
              style={StyleSheet.applyWidth(
                {
                  color: palettes.App['Custom #ffffff'],
                  fontFamily: 'Inter_400Regular',
                  fontSize: 28,
                },
                dimensions.width
              )}
            >
              {'This Month'}
            </Text>
          </View>
        </View>
        {/* Popular Diets 101 Container View */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 16, paddingLeft: 10, paddingRight: 10 },
            dimensions.width
          )}
        >
          {/* Background Colour View  */}
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
          {/* Popular Diets Explained Text View */}
          <View
            style={StyleSheet.applyWidth(
              { marginTop: 10, paddingLeft: 30, paddingRight: 30 },
              dimensions.width
            )}
          >
            {/* Popular diets explained Text */}
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
              {'Popular diets explained!'}
            </Text>
          </View>

          <Swiper
            dotColor={theme.colors.text.light}
            dotsTouchable={true}
            hideDots={false}
            minDistanceForAction={0.2}
            minDistanceToCapture={5}
            timeout={0}
            vertical={false}
            {...GlobalStyles.SwiperStyles(theme)['Swiper'].props}
            dotActiveColor={palettes.App['Custom Color']}
            loop={true}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.SwiperStyles(theme)['Swiper'].style,
                { height: 315 }
              ),
              dimensions.width
            )}
          >
            {/* The Keto Diet Swiper Item */}
            <SwiperItem>
              {/* Swiper Item View */}
              <View>
                {/* Swiper Image 1 View */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginTop: 10, paddingLeft: 30, paddingRight: 30 },
                    dimensions.width
                  )}
                >
                  {/* Swiper Image 1 */}
                  <Image
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
                    source={imageSource(Images['ExampleFoodPic'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'].style,
                        { height: 215, width: '100%' }
                      ),
                      dimensions.width
                    )}
                  />
                </View>
                {/* Swiper 1 Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      marginBottom: 20,
                      marginTop: 10,
                      paddingLeft: 30,
                      paddingRight: 30,
                    },
                    dimensions.width
                  )}
                >
                  {/* Swiper 1 Title Text */}
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
                  {/* Swiper 1 subtitle Text */}
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
                    {'Is the switch in fuel for you?!'}
                  </Text>
                </View>
              </View>
            </SwiperItem>
            {/* Primal Foundation Diet Swiper Item */}
            <SwiperItem>
              {/* Swiper Item View */}
              <View>
                {/* Swiper Image 1 View */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginTop: 10, paddingLeft: 30, paddingRight: 30 },
                    dimensions.width
                  )}
                >
                  {/* Swiper Image 1 */}
                  <Image
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
                    source={imageSource(Images['ExampleFoodPic'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'].style,
                        { height: 215, width: '100%' }
                      ),
                      dimensions.width
                    )}
                  />
                </View>
                {/* Swiper 1 Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      marginBottom: 20,
                      marginTop: 10,
                      paddingLeft: 30,
                      paddingRight: 30,
                    },
                    dimensions.width
                  )}
                >
                  {/* Swiper 1 Title Text */}
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
                    {'The Keto Diet'}
                  </Text>
                  {/* Swiper 1 subtitle Text */}
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
                    {'Is the switch in fuel for you?!'}
                  </Text>
                </View>
              </View>
            </SwiperItem>
            {/* Fasting Diet Swiper Item */}
            <SwiperItem>
              {/* Swiper Item View */}
              <View>
                {/* Swiper Image 1 View */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginTop: 10, paddingLeft: 30, paddingRight: 30 },
                    dimensions.width
                  )}
                >
                  {/* Swiper Image 1 */}
                  <Image
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
                    source={imageSource(Images['ExampleFoodPic'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'].style,
                        { height: 215, width: '100%' }
                      ),
                      dimensions.width
                    )}
                  />
                </View>
                {/* Swiper 1 Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      marginBottom: 20,
                      marginTop: 10,
                      paddingLeft: 30,
                      paddingRight: 30,
                    },
                    dimensions.width
                  )}
                >
                  {/* Swiper 1 Title Text */}
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
                    {'The Keto Diet'}
                  </Text>
                  {/* Swiper 1 subtitle Text */}
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
                    {'Is the switch in fuel for you?!'}
                  </Text>
                </View>
              </View>
            </SwiperItem>
          </Swiper>
          {/* Swiper Hand View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                bottom: 0,
                flexDirection: 'row',
                position: 'absolute',
                right: 10,
              },
              dimensions.width
            )}
          >
            {/* Swipe Text */}
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
              {'Swipe'}
            </Text>
            <Image
              resizeMode={'cover'}
              {...GlobalStyles.ImageStyles(theme)['Image'].props}
              source={imageSource(Images['SwipeIcon'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ImageStyles(theme)['Image'].style,
                  { height: 60, width: 60 }
                ),
                dimensions.width
              )}
            />
          </View>
        </View>
        {/* Featured Clients Container View */}
        <View
          style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
        >
          {/* Featured Clients Title View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                flexDirection: 'row',
                paddingLeft: 16,
                paddingRight: 24,
              },
              dimensions.width
            )}
          >
            {/* Featured Clients Text View */}
            <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
              {/* Featured Clients Text */}
              <Text
                accessible={true}
                selectable={false}
                style={StyleSheet.applyWidth(
                  {
                    color: palettes.Brand['Strong Inverse'],
                    fontFamily: 'Inter_400Regular',
                    fontSize: 28,
                  },
                  dimensions.width
                )}
              >
                {'Featured Clients'}
              </Text>
            </View>
          </View>
          {/* Featured Client Container View */}
          <View
            style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
          >
            <InterimAPIApi.FetchCoursesGET>
              {({ loading, error, data, refetchCourses }) => {
                const fetchData = data?.json;
                if (loading) {
                  return <ActivityIndicator />;
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return <ActivityIndicator />;
                }

                return (
                  <>
                    {/* Featured Client List */}
                    <FlatList
                      data={fetchData}
                      inverted={false}
                      keyExtractor={(featuredClientListData, index) =>
                        featuredClientListData?.id ??
                        featuredClientListData?.uuid ??
                        index?.toString() ??
                        JSON.stringify(featuredClientListData)
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={
                        'Scroll View->Featured Clients Container View->Featured Client Container View->Fetch->Featured Client List'
                      }
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const featuredClientListData = item;
                        return (
                          <>
                            {/* Featured Client View */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.App.Studily_Slate_Blue_Dark,
                                  borderRadius: 20,
                                  height: 484,
                                  opacity: 0.3,
                                  position: 'absolute',
                                  width: 320,
                                },
                                dimensions.width
                              )}
                            />
                            {/* Featured Client Card View */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  borderBottomWidth: 1,
                                  borderColor: 'rgba(0, 0, 0, 0)',
                                  borderLeftWidth: 1,
                                  borderRadius: 24,
                                  borderRightWidth: 1,
                                  borderTopWidth: 1,
                                  paddingBottom: 16,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 16,
                                  width: 320,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Video Image View */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    borderRadius: 16,
                                    height: 300,
                                    overflow: 'hidden',
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Video Image */}
                                <ImageBackground
                                  resizeMode={'cover'}
                                  source={imageSource(
                                    Images['Rectangle224293']
                                  )}
                                  style={StyleSheet.applyWidth(
                                    { borderRadius: 0, height: 300 },
                                    dimensions.width
                                  )}
                                />
                                {/* Video Overlay */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                      justifyContent: 'center',
                                      marginBottom: 100,
                                      paddingBottom: 16,
                                      paddingLeft: 16,
                                      paddingRight: 16,
                                      paddingTop: 16,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Play Icon */}
                                  <Icon
                                    color={palettes.App['Custom #ffffff']}
                                    name={'AntDesign/caretright'}
                                    size={40}
                                  />
                                </View>
                              </View>
                              {/* Clients Name View */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 16,
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Clients Name Text */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: palettes.Brand['Strong Inverse'],
                                      flex: 1,
                                      fontFamily: 'System',
                                      fontSize: 18,
                                      fontWeight: '600',
                                      lineHeight: 24,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {"Check Out Chloe's Story"}
                                </Text>
                              </View>
                              {/* Client Quote Text View */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { marginTop: 12 },
                                  dimensions.width
                                )}
                              >
                                {/* Client quote Text */}
                                <Text
                                  accessible={true}
                                  selectable={false}
                                  numberOfLines={2}
                                  style={StyleSheet.applyWidth(
                                    {
                                      color: palettes.App['Custom Color'],
                                      fontFamily: 'System',
                                      fontSize: 14,
                                      fontWeight: '400',
                                      lineHeight: 24,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {'Quote "Graft hard get results" '}
                                </Text>
                              </View>
                              {/* Footer */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    marginTop: 16,
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Avatar And Text View */}
                                <View>
                                  {/* Avatar Circle Image */}
                                  <CircleImage
                                    size={36}
                                    source={Images.Avatar2}
                                  />
                                </View>
                                {/* Client Name And Age View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { flex: 1, marginLeft: 16 },
                                    dimensions.width
                                  )}
                                >
                                  {/* Client Name Age Text */}
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: palettes.Brand['Strong Inverse'],
                                        fontFamily: 'System',
                                        fontWeight: '600',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'Sarah '}
                                  </Text>
                                  {/* Client age Text */}
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: palettes.App['Custom Color'],
                                        fontFamily: 'System',
                                        fontSize: 12,
                                        fontWeight: '400',
                                        marginTop: 2,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'42 years old'}
                                  </Text>
                                </View>
                                {/* Client Goal View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { alignItems: 'flex-end' },
                                    dimensions.width
                                  )}
                                >
                                  {/* Goal Text */}
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: palettes.App['Custom Color_2'],
                                        fontFamily: 'System',
                                        fontWeight: '600',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'Goal: Weight Loss'}
                                  </Text>
                                  {/* session a week Text */}
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: palettes.App['Custom Color'],
                                        fontFamily: 'System',
                                        fontSize: 12,
                                        fontWeight: '600',
                                        marginTop: 2,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'3 sessions a week'}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <Spacer bottom={8} left={8} right={8} top={8} />
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                      contentContainerStyle={StyleSheet.applyWidth(
                        { marginBottom: 10, paddingLeft: 24 },
                        dimensions.width
                      )}
                      horizontal={true}
                    />
                  </>
                );
              }}
            </InterimAPIApi.FetchCoursesGET>
          </View>
        </View>
        {/* Notification Modals Not Sure */}
        <>
          {!showNotifications ? null : (
            <View>
              {/* iOS Notifications */}
              <>
                {Platform.OS === 'android' ? null : (
                  <Modal
                    supportedOrientations={['portrait', 'landscape']}
                    animationType={'slide'}
                    transparent={true}
                    visible={Boolean(showNotifications)}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.App['Custom Color'],
                          borderTopLeftRadius: 24,
                          borderTopRightRadius: 24,
                          flex: 1,
                          marginTop: 54,
                          overflow: 'hidden',
                        },
                        dimensions.width
                      )}
                    >
                      {/* Header */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: theme.colors.text.medium,
                            flexDirection: 'row',
                            paddingBottom: 12,
                            paddingLeft: 24,
                            paddingRight: 24,
                            paddingTop: 12,
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'System',
                                fontSize: 20,
                                fontWeight: '600',
                              },
                              dimensions.width
                            )}
                          >
                            {'Notifications'}
                          </Text>
                        </View>
                        <IconButton
                          onPress={() => {
                            try {
                              setShowNotifications(false);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          color={palettes.App['Custom Color_2']}
                          icon={'MaterialCommunityIcons/close-circle-outline'}
                          size={36}
                        />
                      </View>

                      <InterimAPIApi.FetchNotificationsGET>
                        {({ loading, error, data, refetchNotifications }) => {
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
                            <FlatList
                              data={fetchData}
                              horizontal={false}
                              inverted={false}
                              keyExtractor={(listData, index) =>
                                listData?.id ??
                                listData?.uuid ??
                                index?.toString() ??
                                JSON.stringify(listData)
                              }
                              keyboardShouldPersistTaps={'never'}
                              listKey={
                                'Scroll View->Notification Modals Not Sure->iOS Notifications->View->Fetch->List'
                              }
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
                                  <>
                                    <View>
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.Brand.Medium_Inverse,
                                            fontFamily: 'System',
                                            fontSize: 16,
                                            fontWeight: '400',
                                            lineHeight: 24,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.message}
                                      </Text>

                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.Brand['Light Inverse'],
                                            fontFamily: 'System',
                                            fontSize: 12,
                                            fontWeight: '400',
                                            marginTop: 6,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.sent_at}
                                      </Text>
                                    </View>
                                    <Spacer
                                      left={8}
                                      right={8}
                                      bottom={12}
                                      top={12}
                                    />
                                  </>
                                );
                              }}
                              showsHorizontalScrollIndicator={true}
                              showsVerticalScrollIndicator={true}
                              contentContainerStyle={StyleSheet.applyWidth(
                                {
                                  paddingBottom: 24,
                                  paddingLeft: 24,
                                  paddingRight: 24,
                                  paddingTop: 24,
                                },
                                dimensions.width
                              )}
                            />
                          );
                        }}
                      </InterimAPIApi.FetchNotificationsGET>
                    </View>
                  </Modal>
                )}
              </>
              {/* Android Notifications */}
              <>
                {!(Platform.OS === 'android') ? null : (
                  <Modal
                    supportedOrientations={['portrait', 'landscape']}
                    animationType={'slide'}
                    transparent={true}
                    visible={Boolean(showNotifications)}
                  >
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.App['Custom Color'],
                          borderTopLeftRadius: 24,
                          borderTopRightRadius: 24,
                          flex: 1,
                          marginTop: 20,
                          overflow: 'hidden',
                        },
                        dimensions.width
                      )}
                    >
                      {/* Header */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            backgroundColor: theme.colors.text.medium,
                            flexDirection: 'row',
                            paddingBottom: 12,
                            paddingLeft: 24,
                            paddingRight: 24,
                            paddingTop: 12,
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { flex: 1 },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            selectable={false}
                            style={StyleSheet.applyWidth(
                              {
                                color: palettes.Brand['Strong Inverse'],
                                fontFamily: 'System',
                                fontSize: 20,
                                fontWeight: '600',
                              },
                              dimensions.width
                            )}
                          >
                            {'Notifications'}
                          </Text>
                        </View>
                        <IconButton
                          onPress={() => {
                            try {
                              setShowNotifications(false);
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          color={palettes.App['Custom Color_2']}
                          icon={'MaterialCommunityIcons/close-circle-outline'}
                          size={36}
                        />
                      </View>

                      <InterimAPIApi.FetchNotificationsGET>
                        {({ loading, error, data, refetchNotifications }) => {
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
                            <FlatList
                              data={fetchData}
                              horizontal={false}
                              inverted={false}
                              keyExtractor={(listData, index) =>
                                listData?.id ??
                                listData?.uuid ??
                                index?.toString() ??
                                JSON.stringify(listData)
                              }
                              keyboardShouldPersistTaps={'never'}
                              listKey={
                                'Scroll View->Notification Modals Not Sure->Android Notifications->View->Fetch->List'
                              }
                              nestedScrollEnabled={false}
                              numColumns={1}
                              onEndReachedThreshold={0.5}
                              renderItem={({ item, index }) => {
                                const listData = item;
                                return (
                                  <>
                                    <View>
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.Brand.Medium_Inverse,
                                            fontFamily: 'System',
                                            fontSize: 16,
                                            fontWeight: '400',
                                            lineHeight: 24,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.message}
                                      </Text>

                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.Brand['Light Inverse'],
                                            fontFamily: 'System',
                                            fontSize: 12,
                                            fontWeight: '400',
                                            marginTop: 6,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.sent_at}
                                      </Text>
                                    </View>
                                    <Spacer
                                      left={8}
                                      right={8}
                                      bottom={12}
                                      top={12}
                                    />
                                  </>
                                );
                              }}
                              showsHorizontalScrollIndicator={true}
                              showsVerticalScrollIndicator={true}
                              contentContainerStyle={StyleSheet.applyWidth(
                                {
                                  paddingBottom: 24,
                                  paddingLeft: 24,
                                  paddingRight: 24,
                                  paddingTop: 24,
                                },
                                dimensions.width
                              )}
                            />
                          );
                        }}
                      </InterimAPIApi.FetchNotificationsGET>
                    </View>
                  </Modal>
                )}
              </>
            </View>
          )}
        </>
        {/* Search Filters Modal Not Sure */}
        <>
          {!showFilters ? null : (
            <Modal
              supportedOrientations={['portrait', 'landscape']}
              animationType={'fade'}
              transparent={true}
              visible={Boolean(showFilters)}
            >
              <BlurView
                experimentalBlurMethod={'none'}
                intensity={50}
                style={StyleSheet.applyWidth(
                  {
                    flex: 1,
                    flexBasis: 0,
                    flexGrow: 1,
                    flexShrink: 1,
                    justifyContent: 'center',
                    paddingBottom: 36,
                    paddingLeft: 36,
                    paddingRight: 36,
                    paddingTop: 36,
                  },
                  dimensions.width
                )}
                tint={'dark'}
              >
                {/* Card */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App['Custom Color'],
                      borderRadius: 24,
                      overflow: 'hidden',
                    },
                    dimensions.width
                  )}
                >
                  {/* Header */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        backgroundColor: theme.colors.text.medium,
                        flexDirection: 'row',
                        paddingBottom: 12,
                        paddingLeft: 24,
                        paddingRight: 16,
                        paddingTop: 12,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.Brand['Strong Inverse'],
                          flex: 1,
                          fontFamily: 'System',
                          fontSize: 18,
                          fontWeight: '600',
                        },
                        dimensions.width
                      )}
                    >
                      {'Search Filters'}
                    </Text>
                    <IconButton
                      onPress={() => {
                        try {
                          setShowFilters(false);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      color={palettes.App['Custom Color_2']}
                      icon={'Ionicons/close-circle-outline'}
                      size={36}
                    />
                  </View>
                  {/* Body */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        paddingBottom: 24,
                        paddingLeft: 24,
                        paddingRight: 24,
                        paddingTop: 24,
                      },
                      dimensions.width
                    )}
                  >
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.Brand['Light Inverse'],
                          fontFamily: 'System',
                          fontSize: 16,
                          fontWeight: '400',
                        },
                        dimensions.width
                      )}
                    >
                      {'Refine your search results using filters'}
                    </Text>
                    {/* Courses */}
                    <View
                      style={StyleSheet.applyWidth(
                        { marginTop: 16 },
                        dimensions.width
                      )}
                    >
                      <SwitchRow
                        onValueChange={newSwitchRowValue => {
                          try {
                            setSwitchRowValue(newSwitchRowValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        activeThumbColor={palettes.Brand['Light Inverse']}
                        activeTrackColor={palettes.App.Green}
                        inactiveThumbColor={theme.colors.text.medium}
                        inactiveTrackColor={theme.colors.text.medium}
                        label={'Courses'}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '600',
                            marginLeft: 0,
                            marginRight: 0,
                          },
                          dimensions.width
                        )}
                        value={switchRowValue}
                      />
                    </View>
                    {/* Topics */}
                    <View
                      style={StyleSheet.applyWidth(
                        { marginTop: 16 },
                        dimensions.width
                      )}
                    >
                      <SwitchRow
                        onValueChange={newSwitchRowValue => {
                          try {
                            setSwitchRowValue2(newSwitchRowValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        activeThumbColor={palettes.Brand['Light Inverse']}
                        activeTrackColor={palettes.App.Green}
                        inactiveThumbColor={theme.colors.text.medium}
                        inactiveTrackColor={theme.colors.text.medium}
                        label={'Topics'}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '600',
                            marginLeft: 0,
                            marginRight: 0,
                          },
                          dimensions.width
                        )}
                        value={switchRowValue2}
                      />
                    </View>
                    {/* Instructors */}
                    <View
                      style={StyleSheet.applyWidth(
                        { marginTop: 16 },
                        dimensions.width
                      )}
                    >
                      <SwitchRow
                        onValueChange={newSwitchRowValue => {
                          try {
                            setSwitchRowValue3(newSwitchRowValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        activeThumbColor={palettes.Brand['Light Inverse']}
                        activeTrackColor={palettes.App.Green}
                        inactiveThumbColor={theme.colors.text.medium}
                        inactiveTrackColor={theme.colors.text.medium}
                        label={'Instructors'}
                        style={StyleSheet.applyWidth(
                          {
                            color: palettes.Brand['Strong Inverse'],
                            fontFamily: 'System',
                            fontSize: 16,
                            fontWeight: '600',
                            marginLeft: 0,
                            marginRight: 0,
                          },
                          dimensions.width
                        )}
                        value={switchRowValue3}
                      />
                    </View>
                    {/* Skill Level */}
                    <View
                      style={StyleSheet.applyWidth(
                        { marginTop: 16 },
                        dimensions.width
                      )}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          },
                          dimensions.width
                        )}
                      >
                        {/* Label */}
                        <Text
                          accessible={true}
                          selectable={false}
                          style={StyleSheet.applyWidth(
                            {
                              color: palettes.Brand['Strong Inverse'],
                              fontFamily: 'System',
                              fontSize: 16,
                              fontWeight: '600',
                            },
                            dimensions.width
                          )}
                        >
                          {'Skill Level'}
                        </Text>
                        {/* Beginner */}
                        <>
                          {!(skillLevel === 1) ? null : (
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'System',
                                  fontSize: 16,
                                  fontWeight: '600',
                                },
                                dimensions.width
                              )}
                            >
                              {'Beginner'}
                            </Text>
                          )}
                        </>
                        {/* Intermediate */}
                        <>
                          {!(skillLevel === 2) ? null : (
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'System',
                                  fontSize: 16,
                                  fontWeight: '600',
                                },
                                dimensions.width
                              )}
                            >
                              {'Intermediate'}
                            </Text>
                          )}
                        </>
                        {/* Advanced */}
                        <>
                          {!(skillLevel === 3) ? null : (
                            <Text
                              accessible={true}
                              selectable={false}
                              style={StyleSheet.applyWidth(
                                {
                                  color: palettes.Brand['Strong Inverse'],
                                  fontFamily: 'System',
                                  fontSize: 16,
                                  fontWeight: '600',
                                },
                                dimensions.width
                              )}
                            >
                              {'Advanced'}
                            </Text>
                          )}
                        </>
                      </View>
                      <Slider
                        onValueChange={newSliderValue => {
                          try {
                            setSkillLevel(newSliderValue);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        leftIcon={'MaterialCommunityIcons/gauge-empty'}
                        maximumValue={3}
                        minimumTrackTintColor={palettes.App['Custom Color_2']}
                        minimumValue={1}
                        rightIcon={'MaterialCommunityIcons/gauge-full'}
                        step={1}
                        style={StyleSheet.applyWidth(
                          { marginTop: 8 },
                          dimensions.width
                        )}
                        thumbTintColor={palettes.App['Custom Color_2']}
                        value={skillLevel}
                      />
                    </View>
                  </View>
                </View>
              </BlurView>
            </Modal>
          )}
        </>
        <Spacer left={8} right={8} bottom={50} top={50} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default withTheme(CoachesCornerScreen);
