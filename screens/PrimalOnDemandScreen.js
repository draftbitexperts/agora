import React from 'react';
import {
  Icon,
  LinearGradient,
  ScreenContainer,
  Spacer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
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

const PrimalOnDemandScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
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
        showsVerticalScrollIndicator={true}
      >
        <HeaderBlock />
        {/* Title View */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', marginTop: 16 },
            dimensions.width
          )}
        >
          {/* Title Text */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: palettes.App['Custom Color'],
                fontFamily: 'Inter_400Regular',
                fontSize: 26,
              }),
              dimensions.width
            )}
          >
            {'Primal On Demand'}
          </Text>
          {/* Initial Info View */}
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row' },
              dimensions.width
            )}
          >
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
                    textAlign: 'center',
                  }
                ),
                dimensions.width
              )}
            >
              {"Don't worry if you miss a session they are all right here!"}
            </Text>
          </View>
        </View>
        {/* Coaches Video Container View */}
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
          {/* Coaches Video View */}
          <View
            style={StyleSheet.applyWidth(
              { paddingBottom: 20 },
              dimensions.width
            )}
          >
            {/* Video View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  marginBottom: 16,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 20,
                },
                dimensions.width
              )}
            >
              {/* Fetch 2 */}
              <PerformApi.FetchGetVideoIdGET screenName={'Primal On Demand'}>
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
                      height={200}
                      quality={'2k'}
                      videoId={fetch2Data?.videoId}
                    />
                  );
                }}
              </PerformApi.FetchGetVideoIdGET>
            </View>
            {/* Coach's Corner Text View */}
            <View
              style={StyleSheet.applyWidth(
                { paddingLeft: 30, paddingRight: 30 },
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
                {'Coach: Dave'}
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
                {'Hit Play and listen to the break down'}
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
              {'! Grab a towel and your water, hit play and get sweating!'}
            </Text>
          </View>
        </View>
        {/* This Months Content View */}
        <View
          style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
        >
          {/* This Months Content Title View */}
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
                    fontSize: 26,
                  },
                  dimensions.width
                )}
              >
                {'This week'}
              </Text>
            </View>
          </View>
          {/* Coach's Monthly Content */}
          <View
            style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
          >
            {/* Background Colour View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  height: 300,
                  left: 0,
                  opacity: 0.3,
                  position: 'absolute',
                  right: 0,
                  width: '100%',
                },
                dimensions.width
              )}
            />
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
                    {/* Coach's Video List */}
                    <FlatList
                      data={fetchData}
                      inverted={false}
                      keyExtractor={(coachSVideoListData, index) =>
                        coachSVideoListData?.id ??
                        coachSVideoListData?.uuid ??
                        index?.toString() ??
                        JSON.stringify(coachSVideoListData)
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={
                        "Scroll View->This Months Content View->Coach's Monthly Content->Fetch->Coach's Video List"
                      }
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const coachSVideoListData = item;
                        return (
                          <>
                            {/* Coach's Video View */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.App.Studily_Slate_Blue_Dark,
                                  borderRadius: 20,
                                  height: 300,
                                  opacity: 0.3,
                                  position: 'absolute',
                                  width: 320,
                                },
                                dimensions.width
                              )}
                            />
                            {/* Individual Coach Card View */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: 'rgba(0, 0, 0, 0)',
                                  borderBottomWidth: 1,
                                  borderColor: 'rgba(0, 0, 0, 0)',
                                  borderLeftWidth: 1,
                                  borderRadius: 20,
                                  borderRightWidth: 1,
                                  borderTopWidth: 1,
                                  height: 300,
                                  opacity: 1,
                                  paddingBottom: 16,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 16,
                                  width: 320,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Video and Text View */}
                              <View>
                                {/* Video View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { borderRadius: 16, overflow: 'hidden' },
                                    dimensions.width
                                  )}
                                >
                                  {/* Video Image  */}
                                  <ImageBackground
                                    resizeMode={'cover'}
                                    source={imageSource(
                                      Images['ondemandplaceholder']
                                    )}
                                    style={StyleSheet.applyWidth(
                                      {
                                        borderRadius: 0,
                                        height: 200,
                                        width: '100%',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Overlay View */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          marginTop: 70,
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
                                  </ImageBackground>
                                </View>
                                {/* Coaches Name View */}
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
                                  {/* Coach's Name Text */}
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    numberOfLines={2}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: palettes.Brand['Strong Inverse'],
                                        flex: 1,
                                        fontFamily: 'Inter_500Medium',
                                        fontSize: 18,
                                        lineHeight: 24,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'Check out this months content!'}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <Touchable />
                            <Spacer bottom={8} left={8} right={8} top={8} />
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                      contentContainerStyle={StyleSheet.applyWidth(
                        {
                          backgroundColor: 'rgba(0, 0, 0, 0)',
                          paddingLeft: 10,
                        },
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
        {/* This Months Content View 2 */}
        <View
          style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
        >
          {/* This Months Content Title View */}
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
                    fontSize: 26,
                  },
                  dimensions.width
                )}
              >
                {'Last Week'}
              </Text>
            </View>
          </View>
          {/* Coach's Monthly Content */}
          <View
            style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
          >
            {/* Background Colour View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  height: 300,
                  left: 0,
                  opacity: 0.3,
                  position: 'absolute',
                  right: 0,
                  width: '100%',
                },
                dimensions.width
              )}
            />
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
                    {/* Coach's Video List */}
                    <FlatList
                      data={fetchData}
                      inverted={false}
                      keyExtractor={(coachSVideoListData, index) =>
                        coachSVideoListData?.id ??
                        coachSVideoListData?.uuid ??
                        index?.toString() ??
                        JSON.stringify(coachSVideoListData)
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={
                        "Scroll View->This Months Content View 2->Coach's Monthly Content->Fetch->Coach's Video List"
                      }
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const coachSVideoListData = item;
                        return (
                          <>
                            {/* Coach's Video View */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor:
                                    palettes.App.Studily_Slate_Blue_Dark,
                                  borderRadius: 20,
                                  height: 300,
                                  opacity: 0.3,
                                  position: 'absolute',
                                  width: 320,
                                },
                                dimensions.width
                              )}
                            />
                            {/* Individual Coach Card View */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  backgroundColor: 'rgba(0, 0, 0, 0)',
                                  borderBottomWidth: 1,
                                  borderColor: 'rgba(0, 0, 0, 0)',
                                  borderLeftWidth: 1,
                                  borderRadius: 20,
                                  borderRightWidth: 1,
                                  borderTopWidth: 1,
                                  height: 300,
                                  opacity: 1,
                                  paddingBottom: 16,
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 16,
                                  width: 320,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Video and Text View */}
                              <View>
                                {/* Video View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { borderRadius: 16, overflow: 'hidden' },
                                    dimensions.width
                                  )}
                                >
                                  {/* Video Image  */}
                                  <ImageBackground
                                    resizeMode={'cover'}
                                    source={imageSource(
                                      Images['ondemandplaceholder']
                                    )}
                                    style={StyleSheet.applyWidth(
                                      {
                                        borderRadius: 0,
                                        height: 200,
                                        width: '100%',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Overlay View */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'center',
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                          marginTop: 70,
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
                                  </ImageBackground>
                                </View>
                                {/* Coaches Name View */}
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
                                  {/* Coach's Name Text */}
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    numberOfLines={2}
                                    style={StyleSheet.applyWidth(
                                      {
                                        color: palettes.Brand['Strong Inverse'],
                                        flex: 1,
                                        fontFamily: 'Inter_500Medium',
                                        fontSize: 18,
                                        lineHeight: 24,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {'Check out this months content!'}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <Touchable />
                            <Spacer bottom={8} left={8} right={8} top={8} />
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                      contentContainerStyle={StyleSheet.applyWidth(
                        {
                          backgroundColor: 'rgba(0, 0, 0, 0)',
                          paddingLeft: 10,
                        },
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
        <Spacer left={8} right={8} bottom={50} top={50} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default withTheme(PrimalOnDemandScreen);
