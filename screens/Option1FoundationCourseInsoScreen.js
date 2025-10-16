import React from 'react';
import {
  Button,
  ScreenContainer,
  Spacer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { Image, ScrollView, StatusBar, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import HeaderBlock from '../components/HeaderBlock';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const Option1FoundationCourseInsoScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
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
            {'Foundation Course: Option 1'}
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
              {'Build habits and routine'}
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
          <Touchable
            onPress={() => {
              try {
                navigation.navigate(
                  'PdfTheNutritionOption1Screen',
                  {},
                  { pop: true }
                );
              } catch (err) {
                console.error(err);
              }
            }}
          >
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
                {'Build Habits with basics'}
              </Text>
              {/* Read the PDF Button */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    navigation.navigate(
                      'PdfTheNutritionOption1Screen',
                      {},
                      { pop: true }
                    );
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
                  paddingBottom: 10,
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
                  Images['foundationdietplanoption1coverimage']
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
                              ? dimensions.height * (70 / 100)
                              : 430,
                        },
                      ],
                      width: '100%',
                    }
                  ),
                  dimensions.width
                )}
              />
            </View>
          </Touchable>
        </View>
        <Spacer left={8} right={8} bottom={50} top={50} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default withTheme(Option1FoundationCourseInsoScreen);
