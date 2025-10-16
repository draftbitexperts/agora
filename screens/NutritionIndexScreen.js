import React from 'react';
import {
  CircleImage,
  Icon,
  ScreenContainer,
  Spacer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import * as Linking from 'expo-linking';
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

const NutritionIndexScreen = props => {
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
        {/* Nutrition Title View */}
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
                fontSize: 28,
              }),
              dimensions.width
            )}
          >
            {'Nutrition Pathway'}
          </Text>
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
                  paddingBottom: 10,
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 20,
                },
                dimensions.width
              )}
            >
              <VimeoFixedBlock
                height={200}
                quality={'2k'}
                videoId={1051333648}
              />
            </View>
            {/* Coaches Video Text View */}
            <View
              style={StyleSheet.applyWidth(
                { paddingLeft: 30, paddingRight: 30 },
                dimensions.width
              )}
            >
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
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Coach: Dave'}
              </Text>
              {/* Hit Play and listen... */}
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
              {
                '! There are more factors than just a goal or foods you like when trying to find the ideal food plan. Make sure you have watched the video as it will explain all. '
              }
            </Text>
          </View>
        </View>
        {/* Eat What We Tell You Container View */}
        <View
          style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
        >
          {/* Eat What We Tell You Touchable */}
          <Touchable
            onPress={() => {
              try {
                navigation.navigate(
                  'EatWhatWeTellYouScreen',
                  {},
                  { pop: true }
                );
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* Eat What We Tell You View */}
            <View
              style={StyleSheet.applyWidth(
                { paddingLeft: 10, paddingRight: 10 },
                dimensions.width
              )}
            >
              {/* Background Colour View  */}
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
              {/* Eat What We Tell You Text View */}
              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 10, paddingLeft: 30, paddingRight: 30 },
                  dimensions.width
                )}
              >
                {/* Eat what we tell you text */}
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
                  {'Keep It Simple'}
                </Text>
              </View>
              {/* Eat What We Tell You Image View */}
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
                {/* Eat What We Tell You Image */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['eatwhatwetellyoucoverimage2'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { borderRadius: 20, height: 215, width: null }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Eat What We Tell You Text View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    marginBottom: 20,
                    marginTop: 20,
                    paddingLeft: 30,
                    paddingRight: 30,
                  },
                  dimensions.width
                )}
              >
                {/* A full nutrition and habit... Text */}
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
                  {'A full nutrition and habit reset!'}
                </Text>
                {/* A great diet  if you ... Text */}
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
                    "A great diet if you like simplicity and don't have a lot of time!"
                  }
                </Text>
              </View>
            </View>
          </Touchable>
        </View>
        {/* Eat What You Want Container View */}
        <View
          style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
        >
          {/* Eat What Want Touchable */}
          <Touchable
            onPress={() => {
              try {
                navigation.navigate(
                  'EatWhatYouWantInfoScreen',
                  {},
                  { pop: true }
                );
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* Eat What You Want View */}
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
              {/* Eat What You Want Text View */}
              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 10, paddingLeft: 30, paddingRight: 30 },
                  dimensions.width
                )}
              >
                {/* Eat what you want Text */}
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
                  {'Need Some Flexibility?'}
                </Text>
              </View>
              {/* Eat What You Want Image View */}
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
                {/* Eat What You Want Image */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['eatwhatyouwantcoverimage'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { borderRadius: 20, height: 215, width: null }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Eat What You Want Text View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    marginBottom: 20,
                    marginTop: 20,
                    paddingLeft: 30,
                    paddingRight: 30,
                  },
                  dimensions.width
                )}
              >
                {/* Need flexibility Text  */}
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
                  {'A Diet That Fits Your Lifestyle!'}
                </Text>
                {/* The perfect solution ... Text */}
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
                    'The perfect solution if you have time to prep and like cooking.'
                  }
                </Text>
              </View>
            </View>
          </Touchable>
        </View>
        {/* Nutrition For Performance Container View   */}
        <View
          style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
        >
          {/* Nutrition For Performance Touchable */}
          <Touchable
            onPress={() => {
              try {
                navigation.navigate(
                  'NutritionForPerformanceInfoScreen',
                  {},
                  { pop: true }
                );
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* Nutrition For Performance View */}
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
              {/* Nutrition For Performance Text View */}
              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 10, paddingLeft: 30, paddingRight: 30 },
                  dimensions.width
                )}
              >
                {/* Nutrition For Performance Text */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        color: '"rgb(255, 255, 0)"',
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 22,
                        textTransform: 'capitalize',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Eat Like An Athlete'}
                </Text>
              </View>
              {/* Nutrition For Performance Image View */}
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
                {/* Nutrition For Performance Image */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(
                    Images['nutritionindexcoverimage2placeholder']
                  )}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { borderRadius: 20, height: 215, width: null }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Nutrition For Performance Text View */}
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
                {/* Learn hoe to fuel... Text */}
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
                  {'Learn how to fuel your body!'}
                </Text>
                {/* A great diet if... Text */}
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
                    'A perfect diet if you are interested in nutrition and want to take your performance to the next level.'
                  }
                </Text>
              </View>
            </View>
          </Touchable>
        </View>
        {/* Need Something Bespoke */}
        <View
          style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
        >
          {/* Need something bespoke Touchable */}
          <Touchable
            onPress={() => {
              try {
                Linking.openURL('mailto:hello@primaltraining.co.uk');
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* Need something Bespoke View */}
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
              {/* Need something bespoke Text View */}
              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 10, paddingLeft: 30, paddingRight: 30 },
                  dimensions.width
                )}
              >
                {/* Need something bespoke Text */}
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
                  {'Want To Go To Next Level?'}
                </Text>
              </View>
              {/* Need something bespoke Image View */}
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
                {/* Need something bespoke Image */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(
                    Images['needsomethingbespokecoverimage3']
                  )}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { borderRadius: 20, height: 215, width: null }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Need something bespoke Text View */}
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
                {/* Do you need something ... Text */}
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
                  {
                    'Want something specifically tailored to your goal?! Hit the picture and send the team an email!'
                  }
                </Text>
                {/* Do you have an event ... Text */}
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
                    'Do you have an event or competition you need to prepare for? If so this is the option for you!'
                  }
                </Text>
              </View>
            </View>
          </Touchable>
        </View>
        {/* Need Inspiration */}
        <View
          style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
        >
          {/* Need inspiration Touchable */}
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
          >
            {/* Need inspiration View */}
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
              {/* Need inspiration Text View */}
              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 10, paddingLeft: 30, paddingRight: 30 },
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
                        color: palettes.App['Custom Color'],
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 22,
                        textTransform: 'capitalize',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'Need Inspiration'}
                </Text>
              </View>
              {/* Need inspiration Image View */}
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
                {/* Need inspiration Image */}
                <Image
                  resizeMode={'cover'}
                  {...GlobalStyles.ImageStyles(theme)['Image'].props}
                  source={imageSource(Images['recipeguidecoverimage3'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ImageStyles(theme)['Image'].style,
                      { borderRadius: 20, height: 215, width: null }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Need inspiration Text View */}
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
                {/* Checkout our recipe ... Text */}
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
                  {'Checkout Our Recipe Guide'}
                </Text>
                {/* Type in the ingredients  ... Text */}
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
                    'Type in the ingredients you would like and you are guaranteed to find a something that tickles your fancy with over 350,000 recipes to choose from!'
                  }
                </Text>
              </View>
            </View>
          </Touchable>
        </View>
        <Spacer left={8} right={8} bottom={50} top={50} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default withTheme(NutritionIndexScreen);
