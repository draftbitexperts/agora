import React from 'react';
import {
  Button,
  Link,
  ScreenContainer,
  Spacer,
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

const NutritionForPerformanceInfoScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [emailValue, setEmailValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [nameValue, setNameValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');
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
        <HeaderBlock isGreen={false} />
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
                color: palettes.App.Hyrox,
                fontFamily: 'Inter_400Regular',
                fontSize: 26,
              }),
              dimensions.width
            )}
          >
            {'Nutrition For Performance'}
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
              {'Fuel For Performance!'}
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
          <View>
            {/* Coaches Video View 2 */}
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
                videoId={1049272123}
              />
            </View>
            {/* Coaches Video Text View */}
            <View
              style={StyleSheet.applyWidth(
                { marginBottom: 20, paddingLeft: 30, paddingRight: 30 },
                dimensions.width
              )}
            >
              {/* Coach Text */}
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
              {/* Hit play and listen to the breakdown... Text */}
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
                '! This is the nutrition plan for you if you are looking to deliver optimum performance! so you need time to plan and prep your food!'
              }
            </Text>
          </View>
        </View>
        {/* Diet Book Container View */}
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
                padding: 16,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          {/* Diet Book Touchable */}
          <Touchable>
            {/* Title Text And Button View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  height: 50,
                  marginTop: 20,
                  paddingLeft: [
                    { minWidth: Breakpoints.Mobile, value: 10 },
                    { minWidth: Breakpoints.Tablet, value: 30 },
                  ],
                  position: 'relative',
                },
                dimensions.width
              )}
            >
              {/* Build habits with ... Text */}
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
                      fontSize: 20,
                      textTransform: 'capitalize',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Optimising Nutrition '}
              </Text>
              {/* Read the PDF Button */}
              <Button
                accessible={true}
                iconPosition={'left'}
                {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'].style,
                    {
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: palettes.App.Hyrox,
                      borderRadius: 20,
                      borderWidth: 2,
                      height: 40,
                      position: 'absolute',
                      right: [
                        { minWidth: Breakpoints.Mobile, value: 10 },
                        { minWidth: Breakpoints.Tablet, value: 30 },
                      ],
                      width: 100,
                    }
                  ),
                  dimensions.width
                )}
                title={'Read the PDF'}
              />
            </View>
            {/* Eat What We Tell You Cover Image View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 20,
                  marginTop: 20,
                  paddingLeft: 30,
                  paddingRight: 30,
                },
                dimensions.width
              )}
            >
              {/* Eat What We Tell You Book Cover Image */}
              <Image
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                resizeMode={'contain'}
                source={imageSource(
                  Images['nutritionforperformance2025placeholder2']
                )}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ImageStyles(theme)['Image'].style,
                    {
                      height: [
                        { minWidth: Breakpoints.Mobile, value: 430 },
                        {
                          minWidth: Breakpoints.Mobile,
                          value:
                            dimensions.width >= Breakpoints.Tablet
                              ? dimensions.height * (80 / 100)
                              : 430,
                        },
                      ],
                      position: 'relative',
                      width: '100%',
                    }
                  ),
                  dimensions.width
                )}
              />
            </View>
          </Touchable>
        </View>
        {/* Download Weekly Planner Button View */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 16, paddingLeft: 10, paddingRight: 10 },
            dimensions.width
          )}
        >
          {/* Download The Weekly Planner Button */}
          <Button
            accessible={true}
            iconPosition={'left'}
            {...GlobalStyles.ButtonStyles(theme)['Button'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button'].style,
                {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderColor: palettes.App.Hyrox,
                  borderRadius: 20,
                  borderWidth: 2,
                  fontFamily: 'Inter_700Bold',
                  fontSize: 16,
                  height: 50,
                  width: '100%',
                }
              ),
              dimensions.width
            )}
            title={'Need something bespoke?'}
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
    </ScreenContainer>
  );
};

export default withTheme(NutritionForPerformanceInfoScreen);
