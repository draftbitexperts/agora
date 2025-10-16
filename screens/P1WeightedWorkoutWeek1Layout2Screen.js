import React from 'react';
import {
  AccordionGroup,
  Circle,
  Icon,
  ScreenContainer,
  SimpleStyleScrollView,
  Spacer,
  Swiper,
  SwiperItem,
  Timer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { ActivityIndicator, Image, StatusBar, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import HeaderBlock from '../components/HeaderBlock';
import VimeoFixedBlock from '../components/VimeoFixedBlock';
import Images from '../config/Images';
import * as CustomVimeoVideoSwiper from '../custom-files/CustomVimeoVideoSwiper';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const P1WeightedWorkoutWeek1Layout2Screen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const [data, setData] = React.useState([
    {
      id: '1',
      title: 'The Brief',
      action: 'Foundation',
      videoId: '1042951101',
      duration: 20,
      equipments: [
        { name: 'Dumbbell', imageName: 'dumbbell' },
        { name: 'Jump Box', imageName: 'jumpbox' },
        { name: 'Bodyweight', imageName: 'bodyweighticon' },
      ],
      singleRounds: 'RPE 7',
    },
    {
      id: '2',
      title: 'Renegade Row',
      action: 'Foundation',
      videoId: '1033082017',
      duration: 20,
      equipments: [
        { name: 'Dumbbell', imageName: 'dumbbell' },
        { name: 'Jump Box', imageName: 'jumpbox' },
        { name: 'Bodyweight', imageName: 'bodyweighticon' },
      ],
      singleRounds: 'RPE 7',
    },
    {
      id: '3',
      title: 'Deadlift',
      action: 'Foundation',
      videoId: '1033091631',
      duration: 20,
      equipments: [
        { name: 'Dumbbell', imageName: 'dumbbell' },
        { name: 'Jump Box', imageName: 'jumpbox' },
        { name: 'Bodyweight', imageName: 'bodyweighticon' },
      ],
      singleRounds: 'RPE 7',
    },
    {
      id: '4',
      title: 'Floor Press',
      action: 'Foundation',
      videoId: '1033102171',
      duration: 20,
      equipments: [
        { name: 'Dumbbell', imageName: 'dumbbell' },
        { name: 'Jump Box', imageName: 'jumpbox' },
        { name: 'Bodyweight', imageName: 'bodyweighticon' },
      ],
      singleRounds: 'RPE 7',
    },
    {
      id: '5',
      title: 'Box Jump',
      action: 'Foundation',
      videoId: '1033105311',
      duration: 20,
      equipments: [
        { name: 'Dumbbell', imageName: 'dumbbell' },
        { name: 'Jump Box', imageName: 'jumpbox' },
        { name: 'Bodyweight', imageName: 'bodyweighticon' },
      ],
      singleRounds: 'RPE 7',
    },
    {
      id: '6',
      title: 'Leg Raise',
      action: 'Foundation',
      videoId: '1033110701',
      duration: 20,
      equipments: [
        { name: 'Dumbbell', imageName: 'dumbbell' },
        { name: 'Jump Box', imageName: 'jumpbox' },
        { name: 'Bodyweight', imageName: 'bodyweighticon' },
      ],
      singleRounds: 'RPE 7',
    },
    {
      id: '7',
      title: 'Squat Press',
      action: 'Foundation',
      videoId: '1033114343',
      duration: 20,
      equipments: [
        { name: 'Dumbbell', imageName: 'dumbbell' },
        { name: 'Jump Box', imageName: 'jumpbox' },
        { name: 'Bodyweight', imageName: 'bodyweighticon' },
      ],
      singleRounds: 'RPE 7',
    },
  ]);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [scanQR, setScanQR] = React.useState(false);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (!isFocused) {
      return;
    }
    const entry = StatusBar.pushStackEntry?.({ barStyle: 'light-content' });
    return () => StatusBar.popStackEntry?.(entry);
  }, [isFocused]);

  const scrollViewExerciseContainerViewSwiperContainerViewStopwatchSRef =
    React.useRef();

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
        showsVerticalScrollIndicator={true}
        style={StyleSheet.applyWidth(
          { opacity: 0.8, paddingBottom: 150 },
          dimensions.width
        )}
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
                    opacity: 0.5,
                  }
                ),
                dimensions.width
              )}
            >
              {'Weighted Workout'}
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
        {/* Exercise Container View */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'stretch',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderRadius: 20,
              flex: 1,
              marginTop: 16,
              paddingLeft: 10,
              paddingRight: 10,
              position: 'relative',
            },
            dimensions.width
          )}
        >
          {/* Swiper Container View */}
          <View
            style={StyleSheet.applyWidth(
              { borderRadius: 20, flex: 1 },
              dimensions.width
            )}
          >
            {/* Swiper View */}
            <View
              style={StyleSheet.applyWidth({ width: '100%' }, dimensions.width)}
            >
              {/* Background Colour View 1 */}
              <View
                style={StyleSheet.applyWidth(
                  {
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
              {/* Ifie Swiper */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: palettes.App.Studily_Slate_Blue_Dark_30,
                    borderRadius: 20,
                    justifyContent: 'center',
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                <Utils.CustomCodeErrorBoundary>
                  <CustomVimeoVideoSwiper.VimeoVideoPlayer
                    data={data}
                    height={300}
                    quality="2K"
                  />
                </Utils.CustomCodeErrorBoundary>
              </View>
              {/* Swiper Image View  */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    bottom: 0,
                    flexDirection: 'row',
                    position: 'absolute',
                    right: 0,
                  },
                  dimensions.width
                )}
              >
                {/* Swiper Hand Text */}
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
                {/* Swiper Image */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['SwipeIcon'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { height: 50, width: 50 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
            </View>
            {/* Exercise Name and Reps View 1 */}
            <View
              style={StyleSheet.applyWidth(
                { flexDirection: 'column', marginTop: 15 },
                dimensions.width
              )}
            >
              {/* Background Colour View 1 */}
              <View
                style={StyleSheet.applyWidth(
                  {
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
              {/* Todays Workout View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    paddingBottom: 20,
                    paddingLeft: 15,
                    paddingTop: 20,
                  },
                  dimensions.width
                )}
              >
                {/* Todays workout Text */}
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
                        fontSize: 28,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Todays Workout!'}
                </Text>
              </View>
              {/* Exercise View */}
              <View
                style={StyleSheet.applyWidth(
                  { paddingBottom: 30, paddingLeft: 15, paddingRight: 10 },
                  dimensions.width
                )}
              >
                {/* Exercise 1 */}
                <AccordionGroup
                  caretSize={24}
                  iconSize={24}
                  {...GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                    .props}
                  caretColor={palettes.App['Custom Color']}
                  closedColor={palettes.App['Custom #ffffff']}
                  label={'Renegade Row'}
                  openColor={palettes.App['Custom Color']}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                        .style,
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'Inter_400Regular',
                        fontSize: 20,
                        paddingLeft: null,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {/* Program Info Container View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    {/* Program Info View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { width: '70%' },
                        dimensions.width
                      )}
                    >
                      {/* Sets View 2 */}
                      <View>
                        {/* Exercise name Text 1 */}
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
                          {'Sets'}
                        </Text>
                      </View>
                      {/* Reps View 1 */}
                      <View>
                        {/* Rest Text 1 */}
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
                          {'Reps'}
                        </Text>
                      </View>
                      {/* Rest View 2 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                color: palettes.App['Custom Color_8'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Rest'}
                        </Text>
                      </View>
                    </View>
                    {/* Reps Rest View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { width: '30%' },
                        dimensions.width
                      )}
                    >
                      {/* Sets View 3 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'1'}
                        </Text>
                      </View>
                      {/* Reps View 3 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'50'}
                        </Text>
                      </View>
                      {/* Rest View 4 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom Color_8'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'ALAP'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </AccordionGroup>
                {/* Exercise 2 */}
                <AccordionGroup
                  caretSize={24}
                  iconSize={24}
                  {...GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                    .props}
                  caretColor={palettes.App['Custom Color']}
                  closedColor={palettes.App['Custom #ffffff']}
                  label={'Deadlift'}
                  openColor={palettes.App['Custom Color']}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                        .style,
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'Inter_400Regular',
                        fontSize: 20,
                        marginTop: 10,
                        paddingLeft: null,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {/* Program Info Container View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    {/* Program Info View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { width: '70%' },
                        dimensions.width
                      )}
                    >
                      {/* Sets View 2 */}
                      <View>
                        {/* Exercise name Text 1 */}
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
                          {'Sets'}
                        </Text>
                      </View>
                      {/* Reps View 1 */}
                      <View>
                        {/* Rest Text 1 */}
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
                          {'Reps'}
                        </Text>
                      </View>
                      {/* Rest View 2 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                color: palettes.App['Custom Color_8'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Rest'}
                        </Text>
                      </View>
                    </View>
                    {/* Reps Rest View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { width: '30%' },
                        dimensions.width
                      )}
                    >
                      {/* Sets View 3 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'1'}
                        </Text>
                      </View>
                      {/* Reps View 3 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'50'}
                        </Text>
                      </View>
                      {/* Rest View 4 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom Color_8'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'ALAP'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </AccordionGroup>
                {/* Exercise 3 */}
                <AccordionGroup
                  caretSize={24}
                  iconSize={24}
                  {...GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                    .props}
                  caretColor={palettes.App['Custom Color']}
                  closedColor={palettes.App['Custom #ffffff']}
                  label={'Floor Press'}
                  openColor={palettes.App['Custom Color']}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                        .style,
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'Inter_400Regular',
                        fontSize: 20,
                        marginTop: 10,
                        paddingLeft: null,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {/* Program Info Container View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    {/* Program Info View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { width: '70%' },
                        dimensions.width
                      )}
                    >
                      {/* Sets View 2 */}
                      <View>
                        {/* Exercise name Text 1 */}
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
                          {'Sets'}
                        </Text>
                      </View>
                      {/* Reps View 1 */}
                      <View>
                        {/* Rest Text 1 */}
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
                          {'Reps'}
                        </Text>
                      </View>
                      {/* Rest View 2 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                color: palettes.App['Custom Color_8'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Rest'}
                        </Text>
                      </View>
                    </View>
                    {/* Reps Rest View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { width: '30%' },
                        dimensions.width
                      )}
                    >
                      {/* Sets View 3 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'1'}
                        </Text>
                      </View>
                      {/* Reps View 3 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'50'}
                        </Text>
                      </View>
                      {/* Rest View 4 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom Color_8'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'ALAP'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </AccordionGroup>
                {/* Exercise 4 */}
                <AccordionGroup
                  caretSize={24}
                  iconSize={24}
                  {...GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                    .props}
                  caretColor={palettes.App['Custom Color']}
                  closedColor={palettes.App['Custom #ffffff']}
                  label={'Box Jump'}
                  openColor={palettes.App['Custom Color']}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                        .style,
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'Inter_400Regular',
                        fontSize: 20,
                        marginTop: 10,
                        paddingLeft: null,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {/* Program Info Container View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    {/* Program Info View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { width: '70%' },
                        dimensions.width
                      )}
                    >
                      {/* Sets View 2 */}
                      <View>
                        {/* Exercise name Text 1 */}
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
                          {'Sets'}
                        </Text>
                      </View>
                      {/* Reps View 1 */}
                      <View>
                        {/* Rest Text 1 */}
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
                          {'Reps'}
                        </Text>
                      </View>
                      {/* Rest View 2 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                color: palettes.App['Custom Color_8'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Rest'}
                        </Text>
                      </View>
                    </View>
                    {/* Reps Rest View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { width: '30%' },
                        dimensions.width
                      )}
                    >
                      {/* Sets View 3 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'1'}
                        </Text>
                      </View>
                      {/* Reps View 3 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'50'}
                        </Text>
                      </View>
                      {/* Rest View 4 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom Color_8'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'ALAP'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </AccordionGroup>
                {/* Exercise 5 */}
                <AccordionGroup
                  caretSize={24}
                  iconSize={24}
                  {...GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                    .props}
                  caretColor={palettes.App['Custom Color']}
                  closedColor={palettes.App['Custom #ffffff']}
                  label={'Leg Raise'}
                  openColor={palettes.App['Custom Color']}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                        .style,
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'Inter_400Regular',
                        fontSize: 20,
                        marginTop: 10,
                        paddingLeft: null,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {/* Program Info Container View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    {/* Program Info View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { width: '70%' },
                        dimensions.width
                      )}
                    >
                      {/* Sets View 2 */}
                      <View>
                        {/* Exercise name Text 1 */}
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
                          {'Sets'}
                        </Text>
                      </View>
                      {/* Reps View 1 */}
                      <View>
                        {/* Rest Text 1 */}
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
                          {'Reps'}
                        </Text>
                      </View>
                      {/* Rest View 2 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                color: palettes.App['Custom Color_8'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Rest'}
                        </Text>
                      </View>
                    </View>
                    {/* Reps Rest View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { width: '30%' },
                        dimensions.width
                      )}
                    >
                      {/* Sets View 3 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'1'}
                        </Text>
                      </View>
                      {/* Reps View 3 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'50'}
                        </Text>
                      </View>
                      {/* Rest View 4 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom Color_8'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'ALAP'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </AccordionGroup>
                {/* Exercise 6 */}
                <AccordionGroup
                  caretSize={24}
                  iconSize={24}
                  {...GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                    .props}
                  caretColor={palettes.App['Custom Color']}
                  closedColor={palettes.App['Custom #ffffff']}
                  label={'Squat Press'}
                  openColor={palettes.App['Custom Color']}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.AccordionGroupStyles(theme)['Accordion']
                        .style,
                      {
                        color: palettes.App['Custom #ffffff'],
                        fontFamily: 'Inter_400Regular',
                        fontSize: 20,
                        marginTop: 10,
                        paddingLeft: null,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {/* Program Info Container View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    {/* Program Info View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { width: '70%' },
                        dimensions.width
                      )}
                    >
                      {/* Sets View 2 */}
                      <View>
                        {/* Exercise name Text 1 */}
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
                          {'Sets'}
                        </Text>
                      </View>
                      {/* Reps View 1 */}
                      <View>
                        {/* Rest Text 1 */}
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
                          {'Reps'}
                        </Text>
                      </View>
                      {/* Rest View 2 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                color: palettes.App['Custom Color_8'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'Rest'}
                        </Text>
                      </View>
                    </View>
                    {/* Reps Rest View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { width: '30%' },
                        dimensions.width
                      )}
                    >
                      {/* Sets View 3 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'1'}
                        </Text>
                      </View>
                      {/* Reps View 3 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom #ffffff'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'50'}
                        </Text>
                      </View>
                      {/* Rest View 4 */}
                      <View>
                        {/* Rest Text 1 */}
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'flex-end',
                                color: palettes.App['Custom Color_8'],
                                fontFamily: 'Inter_400Regular',
                                fontSize: 20,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'ALAP'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </AccordionGroup>
              </View>
            </View>
            {/* Stopwatch */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'stretch', marginTop: 15 },
                dimensions.width
              )}
            >
              {/* Background Colour View 1 */}
              <View
                style={StyleSheet.applyWidth(
                  {
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
              {/* S */}
              <Timer
                {...GlobalStyles.TimerStyles(theme)['Timer'].props}
                countDirection={'up'}
                format={'hh:mm:ss'}
                initialTime={0}
                ref={
                  scrollViewExerciseContainerViewSwiperContainerViewStopwatchSRef
                }
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TimerStyles(theme)['Timer'].style,
                    {
                      color: palettes.App['Custom #ffffff'],
                      fontFamily: 'Inter_600SemiBold',
                      fontSize: 40,
                      marginTop: 40,
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
                updateInterval={1000}
              />
              {/* Control Panel View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'column',
                    gap: 12,
                    justifyContent: 'space-evenly',
                    marginTop: 20,
                    paddingBottom: 20,
                  },
                  dimensions.width
                )}
              >
                {/* Play Pause View */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', justifyContent: 'center' },
                    dimensions.width
                  )}
                >
                  {/* Tap to Pause Touchable */}
                  <>
                    {!isPlaying ? null : (
                      <Touchable
                        onPress={() => {
                          try {
                            setIsPlaying(false);

                            scrollViewExerciseContainerViewSwiperContainerViewStopwatchSRef.current?.stop();
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        {/* Green Circle */}
                        <Circle
                          bgColor={palettes.App['Custom Color_5']}
                          size={48}
                          style={StyleSheet.applyWidth(
                            { backgroundColor: palettes.App['Custom Color'] },
                            dimensions.width
                          )}
                        >
                          {/* PlayIcon */}
                          <Icon
                            size={24}
                            color={palettes.App['Custom #ffffff']}
                            name={'Ionicons/pause'}
                            style={StyleSheet.applyWidth(
                              { marginLeft: 2 },
                              dimensions.width
                            )}
                          />
                        </Circle>
                      </Touchable>
                    )}
                  </>
                  {/* Tap to Play Touchable */}
                  <>
                    {isPlaying ? null : (
                      <Touchable
                        onPress={() => {
                          try {
                            setIsPlaying(true);

                            scrollViewExerciseContainerViewSwiperContainerViewStopwatchSRef.current?.start();
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        {/* Red Circle */}
                        <Circle
                          bgColor={palettes.App['Custom Color_5']}
                          size={48}
                          style={StyleSheet.applyWidth(
                            { backgroundColor: palettes.App['Custom Color'] },
                            dimensions.width
                          )}
                        >
                          {/* Pause Icon */}
                          <Icon
                            size={24}
                            color={palettes.App['Custom #ffffff']}
                            name={'Ionicons/play'}
                            style={StyleSheet.applyWidth(
                              { marginLeft: 2 },
                              dimensions.width
                            )}
                          />
                        </Circle>
                      </Touchable>
                    )}
                  </>
                </View>
                {/* Next View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      height: 48,
                      justifyContent: 'center',
                      paddingLeft: 25,
                      paddingRight: 25,
                    },
                    dimensions.width
                  )}
                >
                  {/* Next Touchable */}
                  <Touchable
                    onPress={() => {
                      try {
                        scrollViewExerciseContainerViewSwiperContainerViewStopwatchSRef.current?.reset(
                          0
                        );

                        setIsPlaying(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* Next Text */}
                    <Text
                      accessible={true}
                      selectable={false}
                      style={StyleSheet.applyWidth(
                        {
                          color: palettes.App['Custom #ffffff'],
                          fontFamily: 'Inter_400Regular',
                          fontSize: 22,
                          opacity: 0.65,
                          textAlign: 'center',
                        },
                        dimensions.width
                      )}
                    >
                      {'Reset'}
                    </Text>
                  </Touchable>
                </View>
              </View>
            </View>
            {/* Message and Session Log Container View */}
            <View
              style={StyleSheet.applyWidth(
                { marginTop: 16, width: '100%' },
                dimensions.width
              )}
            >
              {/* Message and Session Log View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flex: 1,
                    flexDirection: 'row',
                    gap: 16,
                    justifyContent: 'space-between',
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                {/* Community View  */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      flex: 1,
                      height: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {/* Community Touchable */}
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.navigate('Community', {}, { pop: true });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* Community Icon View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignItems: 'center', width: '100%' },
                        dimensions.width
                      )}
                    >
                      {/* Background Colour View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignSelf: 'center',
                            backgroundColor:
                              palettes.App.Studily_Slate_Blue_Dark,
                            borderColor: 'rgba(0, 0, 0, 0)',
                            borderRadius: 20,
                            height: [
                              { minWidth: Breakpoints.Mobile, value: '100%' },
                              { minWidth: Breakpoints.Tablet, value: '100%' },
                            ],
                            opacity: 0.3,
                            position: [
                              {
                                minWidth: Breakpoints.Mobile,
                                value: 'absolute',
                              },
                              {
                                minWidth: Breakpoints.Tablet,
                                value: 'absolute',
                              },
                            ],
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      ></View>
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
                          {
                            paddingBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                          },
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
                            'Check in with the team \nand get that sweaty selfie on! '
                          }
                        </Text>
                      </View>
                    </View>
                  </Touchable>
                </View>
                {/* Session log Container View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      flex: 1,
                      flexDirection: 'column',
                      height: '100%',
                      justifyContent: 'flex-start',
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
                        setScanQR(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* Session Log Image View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { alignContent: 'center', alignItems: 'center' },
                        dimensions.width
                      )}
                    >
                      {/* Session Log Image */}
                      <Image
                        resizeMode={'cover'}
                        source={imageSource(Images['sessionlog'])}
                        style={StyleSheet.applyWidth(
                          { height: 100, marginTop: 10, width: 100 },
                          dimensions.width
                        )}
                      />
                      {/* Session Log Text View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            paddingBottom: 10,
                            paddingLeft: 10,
                            paddingRight: 10,
                          },
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
                          {'Session Log'}
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
                          {'Stay accountable! \nLog every session!'}
                        </Text>
                      </View>
                    </View>
                  </Touchable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </SimpleStyleScrollView>
    </ScreenContainer>
  );
};

export default withTheme(P1WeightedWorkoutWeek1Layout2Screen);
