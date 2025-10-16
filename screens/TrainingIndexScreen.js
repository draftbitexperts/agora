import React from 'react';
import {
  Pressable,
  ScreenContainer,
  SimpleStyleFlatList,
  Spacer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
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
import isLoggedIn from '../global-functions/isLoggedIn';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const TrainingIndexScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      if (!isLoggedIn(Variables)) {
        navigation.navigate('LogInScreen', {}, { pop: true });
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
        <HeaderBlock showBackButton={false} />
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
            {'Training'}
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
                    textAlign: 'left',
                  }
                ),
                dimensions.width
              )}
            >
              {'Here are your programs'}
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
                videoId={1046880335}
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
                {'Find the training that works for you'}
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
                {'Hit play and learn about your different training options'}
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
              {
                '! Now it is time to pick your training! Hit play and learn about the different styles'
              }
            </Text>
          </View>
        </View>
        {/* Hyrox View Container View */}
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
          {/* Hyrox View */}
          <View
            style={StyleSheet.applyWidth(
              { paddingBottom: 20 },
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
            >
              {/* Hyrox Title View  */}
              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 10, paddingLeft: 30, position: 'relative' },
                  dimensions.width
                )}
              >
                {/* Hyrox Title Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        color: palettes.App.Hyrox,
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 22,
                        textTransform: 'capitalize',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Hyrox'}
                </Text>
              </View>
              {/* Hyrox Image View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    justifyContent: 'center',
                    marginTop: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                  },
                  dimensions.width
                )}
              >
                {/* Hyrox Image */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(
                    Images['trainingindexhyroxcoverimagehyrox11']
                  )}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 215, width: null }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Hyrox Text View */}
              <View
                style={StyleSheet.applyWidth(
                  { paddingLeft: 30, paddingTop: 10 },
                  dimensions.width
                )}
              >
                {/* 12 weeks comp prep Text */}
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
                  {'12 weeks comp prep!'}
                </Text>
                {/* All the official programming ... Text */}
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
                  {'All the official programming in one place!'}
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
        {/* 8 Week Program Container View  */}
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
          {/* 8 Week Program View */}
          <View
            style={StyleSheet.applyWidth(
              { paddingBottom: 20 },
              dimensions.width
            )}
          >
            {/* 8 Week Program Touchable */}
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
            >
              {/* 8 Week Text Program Title View */}
              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 10, paddingLeft: 30, position: 'relative' },
                  dimensions.width
                )}
              >
                {/* 8 Week Program Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        color: palettes.App['Custom Color'],
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 22,
                        textTransform: 'capitalize',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Foundation Course'}
                </Text>
              </View>
              {/* 8 Week Program Image View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    justifyContent: 'center',
                    marginTop: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                  },
                  dimensions.width
                )}
              >
                {/* 8 Week Program Image */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['apptest45'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 215, width: null }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Basics 101 View */}
              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 10, paddingLeft: 30 },
                  dimensions.width
                )}
              >
                {/* Basics 101 Text */}
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
                  {'Basics 101!'}
                </Text>
                {/* 8 weeks to reprogram your habits Text */}
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
                  {'8 weeks to reprogram your habits!'}
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
        {/* Primal On Demand */}
        <View
          style={StyleSheet.applyWidth(
            {
              marginBottom: 16,
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
          {/* Primal On Demand View */}
          <View
            style={StyleSheet.applyWidth(
              { paddingBottom: 20 },
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
            >
              {/* Primal On Demand Title View */}
              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 10, paddingLeft: 30, position: 'relative' },
                  dimensions.width
                )}
              >
                {/* Primal On Demand Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        color: palettes.App['Custom Color'],
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 22,
                        textTransform: 'capitalize',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Primal On Demand'}
                </Text>
              </View>
              {/* Primal On Demand Image View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    justifyContent: 'center',
                    marginTop: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                  },
                  dimensions.width
                )}
              >
                {/* Primal On Demand Image */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['apptest31'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 215, width: null }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Missed A Session View */}
              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 10, paddingLeft: 30 },
                  dimensions.width
                )}
              >
                {/* Missed A Session Text */}
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
                  {'Missed a session?'}
                </Text>
                {/* You can catch up...Text */}
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
                  {'You can catch up or repeat a session you enjoyed here!'}
                </Text>
              </View>
            </Touchable>
          </View>
        </View>
        {/* Fetch 2 */}
        <PerformApi.FetchGetLiveSessionInfoGET refetchInterval={20000}>
          {({ loading, error, data, refetchGetLiveSessionInfo }) => {
            const fetch2Data = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <SimpleStyleFlatList
                data={fetch2Data}
                decelerationRate={'normal'}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) => listData?.id}
                keyboardShouldPersistTaps={'never'}
                listKey={'Scroll View->Fetch 2->List'}
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
                                    source={imageSource(Images['LiveIconpng'])}
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
                  { height: 220, marginLeft: 10, marginRight: 10 },
                  dimensions.width
                )}
              />
            );
          }}
        </PerformApi.FetchGetLiveSessionInfoGET>
        <Spacer left={8} right={8} bottom={50} top={50} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default withTheme(TrainingIndexScreen);
