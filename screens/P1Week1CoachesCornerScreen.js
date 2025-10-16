import React from 'react';
import {
  Button,
  Icon,
  IconButton,
  Pressable,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Spacer,
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
import VimeoFixedBlock from '../components/VimeoFixedBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import * as BarcodeScanner from '../custom-files/BarcodeScanner';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const P1Week1CoachesCornerScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [completedTasks, setCompletedTasks] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [openModaltest, setOpenModaltest] = React.useState(false);
  const [openModaltestthree, setOpenModaltestthree] = React.useState(false);
  const [openModaltesttwo, setOpenModaltesttwo] = React.useState(false);
  const [openModeltestfour, setOpenModeltestfour] = React.useState(false);
  const [scanQR, setScanQR] = React.useState(false);
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
        {
          backgroundColor: palettes.App.Studily_Dark_UI,
          flexWrap: 'wrap-reverse',
          opacity: 0.8,
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
        style={StyleSheet.applyWidth({ opacity: 0.8 }, dimensions.width)}
      >
        <HeaderBlock />
        {/* Primal Title Text View */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'column', marginTop: 16 },
            dimensions.width
          )}
        >
          {/* Primal Title Text */}
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
            {'Primal'}
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
            {/* Foundation Course Text */}
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
              {'Foundation Course'}
            </Text>
            {/* Week Text */}
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
                    fontSize: 16,
                    marginLeft: 5,
                  }
                ),
                dimensions.width
              )}
            >
              {'Week 1'}
            </Text>
          </View>
        </View>
        {/* Coaches Corner Video Container View */}
        <View
          style={StyleSheet.applyWidth(
            { marginLeft: 15, marginRight: 15, marginTop: 16 },
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
            {/* Fetch 2 */}
            <PerformApi.FetchGetCoachCornerVideoGET week={1}>
              {({ loading, error, data, refetchGetCoachCornerVideo }) => {
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
            </PerformApi.FetchGetCoachCornerVideoGET>
          </View>
          {/* Coach's Corner Text View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-start',
                paddingBottom: 20,
                paddingLeft: 30,
                paddingTop: 20,
              },
              dimensions.width
            )}
          >
            {/* Coach Name Text View */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'flex-start', marginTop: 5 },
                dimensions.width
              )}
            >
              {/* Coach Name Text */}
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
            </View>
            {/* Hit Play For All Info View */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'flex-start', marginTop: 5 },
                dimensions.width
              )}
            >
              {/* Hit Play for all info Text */}
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
                {'Hit play for all week 1 info!'}
              </Text>
            </View>
          </View>
        </View>
        {/* Heading View 2 */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-start',
              backgroundColor: palettes.App.Studily_Slate_Blue_Dark_30,
              borderRadius: 20,
              flexDirection: 'column',
              marginLeft: 15,
              marginRight: 15,
              marginTop: 16,
              paddingBottom: 16,
            },
            dimensions.width
          )}
        >
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
                '! Welcome to the first week of the Primal Foundation Course. Week to week you will be given different workouts and nutrition advice so make sure you always watch the Coaches Corner video.'
              }
            </Text>
          </View>
        </View>
        {/* Cards */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'stretch', flex: 1, gap: 16, padding: 16 },
            dimensions.width
          )}
        >
          {/*  Row 1 */}
          <View
            style={StyleSheet.applyWidth(
              { flexDirection: 'row', gap: 16, height: 300 },
              dimensions.width
            )}
          >
            {/* Nutrition */}
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
                {/* Contianer */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1, justifyContent: 'center' },
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
              </Touchable>
            </View>
            {/* Workouts Column */}
            <View
              style={StyleSheet.applyWidth(
                { flex: 1, gap: 16 },
                dimensions.width
              )}
            >
              {/* Body weight */}
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
                      setOpenModaltesttwo(true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { height: '100%', width: '100%' },
                    dimensions.width
                  )}
                >
                  {/* Contianer */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flex: 1,
                        gap: 8,
                        justifyContent: 'center',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Nutrition Icon  */}
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
                              fontFamily: 'Inter_400Regular',
                              fontSize: 16,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Bodyweight Workout'}
                      </Text>
                    </View>
                  </View>
                </Touchable>
              </View>
              {/* Weighted */}
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
                      setOpenModaltestthree(true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  style={StyleSheet.applyWidth(
                    { height: '100%', width: '100%' },
                    dimensions.width
                  )}
                >
                  {/* Contianer */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        flex: 1,
                        gap: 8,
                        justifyContent: 'center',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Nutrition Icon  */}
                    <Image
                      resizeMode={'cover'}
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      source={imageSource(Images['weightedworkouticon'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { height: 60, width: 70 }
                        ),
                        dimensions.width
                      )}
                    />
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
                              fontFamily: 'Inter_400Regular',
                              fontSize: 16,
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Weighted Workout'}
                      </Text>
                    </View>
                  </View>
                </Touchable>
              </View>
            </View>
          </View>
          {/* Row 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'stretch',
                flexDirection: 'row',
                gap: 16,
                justifyContent: 'space-between',
              },
              dimensions.width
            )}
          >
            {/* Community */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
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
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1 },
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
                  {/* Community Text View */}
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
                    {/* Check in with team */}
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
            {/* Scan me */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
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
                style={StyleSheet.applyWidth(
                  { width: '100%' },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flex: 1 },
                    dimensions.width
                  )}
                >
                  {/* Scan Me  Icon */}
                  <Image
                    resizeMode={'cover'}
                    source={imageSource(Images['orcodescanicon3'])}
                    style={StyleSheet.applyWidth(
                      { height: 100, marginTop: 10, width: 100 },
                      dimensions.width
                    )}
                  />
                  {/* Scan Me Text View */}
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

          <View>
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
                    listKey={'Scroll View->Cards->View->Fetch->List'}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    pagingEnabled={false}
                    renderItem={({ item, index }) => {
                      const listData = item;
                      return (
                        <>
                          {/* Go Live Corner Container View  */}
                          <>
                            {!listData?.hasStarted ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor: 'rgba(0, 0, 0, 0)',
                                    flexDirection: 'row',
                                    height: '100%',
                                    justifyContent: 'flex-end',
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
                                    {/* Go Live Image View */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        { marginBottom: 10, marginTop: 20 },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Go Live  Icon */}
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
                                      {/* Go Live Text */}
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.App['Custom Color_2'],
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
                                        {...GlobalStyles.TextStyles(theme)[
                                          'Text'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.TextStyles(theme)[
                                              'Text'
                                            ].style,
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
                                        {
                                          'Hit Go Live! and leave the rest to us!'
                                        }
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
                  />
                );
              }}
            </PerformApi.FetchGetLiveSessionInfoGET>
          </View>
        </View>
      </SimpleStyleScrollView>
      <Spacer left={8} right={8} bottom={50} top={50} />
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
            <BarcodeScanner.Index toggler={setScanQR} />
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
      {/* Modal 2 */}
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
              {/* This Weeks Diet View */}
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'column', marginBottom: 20, marginLeft: 5 },
                  dimensions.width
                )}
              >
                {/* The Diet This Week Text */}
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
                  {'The Diet This Week'}
                </Text>
                {/* Sub Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', marginTop: 10, paddingRight: 10 },
                    dimensions.width
                  )}
                >
                  {/* Week 1: Follow... */}
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
                      'Week 1: Follow the meal format, have carbs with every meal and get 3 litres of water in.'
                    }
                  </Text>
                </View>
              </View>
              {/* Coaches Corner Video Container View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.Studily_Slate_Blue_Dark_30,
                    borderRadius: 20,
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 16,
                    paddingTop: 16,
                  },
                  dimensions.width
                )}
              >
                <VimeoFixedBlock
                  height={160}
                  quality={'2k'}
                  videoId={1040125589}
                />
                {/* Coach's Corner Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-start',
                      bottom: 20,
                      left: 0,
                      paddingLeft: 20,
                      paddingTop: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Coach Name Text View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'flex-start', marginTop: 5 },
                      dimensions.width
                    )}
                  >
                    {/* Coach Name Text */}
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
                  </View>
                  {/* Hit Play For All Info View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'flex-start', marginTop: 5 },
                      dimensions.width
                    )}
                  >
                    {/* Hit Play for all info Text */}
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
                      {'Hit play for all week 1 info!'}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Button View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginBottom: 30,
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
                        width: 90,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Back'}
                />
                {/* Diet Pllnner */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      navigation.navigate(
                        'PdfDietPlannerWeek1Screen',
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
                  title={'Diet Planner'}
                />
                {/* Menus */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      navigation.navigate(
                        'PdfMenuWeek1Screen',
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
                        width: 90,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Menus'}
                />
              </View>
            </SimpleStyleScrollView>
          </View>
        </View>
      </Modal>
      {/* Modal Calisthenic Workout */}
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
              {/* This Weeks Calisthenic Workout */}
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'column', marginBottom: 20, marginLeft: 5 },
                  dimensions.width
                )}
              >
                {/* This Weeks Calisthenic Workout Text */}
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
                  {'This Weeks Bodyweight Workout '}
                </Text>
                {/* Sub Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', marginTop: 10, paddingRight: 10 },
                    dimensions.width
                  )}
                >
                  {/* This is just one... */}
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
                      "This is just one of the training methods you can use this week. Remember you can do a Weighted Workout or GO LIVE as well! This week's theme is a fitness test!"
                    }
                  </Text>
                </View>
              </View>
              {/* Coaches Corner Video Container View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.Studily_Slate_Blue_Dark_30,
                    borderRadius: 20,
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 16,
                    paddingTop: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Coaches Corner Video View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      paddingBottom: 16,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: [
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
                    },
                    dimensions.width
                  )}
                >
                  <VimeoFixedBlock
                    height={160}
                    quality={'2k'}
                    videoId={1040126870}
                  />
                </View>
                {/* Coach's Corner Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-start',
                      bottom: 20,
                      left: 0,
                      paddingLeft: 20,
                      paddingTop: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Coach Name Text View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'flex-start', marginTop: 5 },
                      dimensions.width
                    )}
                  >
                    {/* Coach Name Text */}
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
                  </View>
                  {/* Hit Play For All Info View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'flex-start', marginTop: 5 },
                      dimensions.width
                    )}
                  >
                    {/* Hit Play for all info Text */}
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
                      {'Hit play for all week 1 info!'}
                    </Text>
                  </View>
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
                        width: 120,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Back'}
                />
                {/* Lets Train */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      navigation.navigate(
                        'P1BodyweightWorkoutWeek1Layout2Screen',
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
                        width: 120,
                      }
                    ),
                    dimensions.width
                  )}
                  title={"Let's Train"}
                />
              </View>
            </SimpleStyleScrollView>
          </View>
        </View>
      </Modal>
      {/* Modal Weighted Workout  */}
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
              {/* Weighted Workout View */}
              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'column', marginBottom: 20, marginLeft: 5 },
                  dimensions.width
                )}
              >
                {/* Weighted Workout Text */}
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
                  {'This Weeks Weighted Workout'}
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
                      "This weeks theme is a fitness test! So grab your dumbbells, a box and let's go! If you don't have any you could always do the Calisthenics Workout or the Go Live session."
                    }
                  </Text>
                </View>
              </View>
              {/* Coaches Corner Video Container View 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.Studily_Slate_Blue_Dark_30,
                    borderRadius: 20,
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 16,
                    paddingTop: 16,
                  },
                  dimensions.width
                )}
              >
                {/* Coaches Corner Video View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      paddingBottom: 16,
                      paddingLeft: 20,
                      paddingRight: 20,
                      paddingTop: [
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
                    },
                    dimensions.width
                  )}
                >
                  <VimeoFixedBlock
                    height={160}
                    quality={'2k'}
                    videoId={1040127793}
                  />
                </View>
                {/* Coach's Corner Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-start',
                      bottom: 20,
                      left: 0,
                      paddingLeft: 20,
                      paddingTop: 20,
                    },
                    dimensions.width
                  )}
                >
                  {/* Coach Name Text View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'flex-start', marginTop: 5 },
                      dimensions.width
                    )}
                  >
                    {/* Coach Name Text */}
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
                  </View>
                  {/* Hit Play For All Info View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'flex-start', marginTop: 5 },
                      dimensions.width
                    )}
                  >
                    {/* Hit Play for all info Text */}
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
                      {'Hit play for all week 1 info!'}
                    </Text>
                  </View>
                </View>
              </View>
              {/* Button View  */}
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
                        width: 120,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'Back'}
                />
                {/* Lets Train */}
                <Button
                  accessible={true}
                  iconPosition={'left'}
                  onPress={() => {
                    try {
                      navigation.navigate(
                        'P1WeightedWorkoutWeek1Layout2Screen',
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
                        width: 120,
                      }
                    ),
                    dimensions.width
                  )}
                  title={"Let's Train"}
                />
              </View>
            </SimpleStyleScrollView>
          </View>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(P1Week1CoachesCornerScreen);
