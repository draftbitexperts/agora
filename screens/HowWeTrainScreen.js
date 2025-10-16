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

const HowWeTrainScreen = props => {
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
            {'How We Train'}
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
              {'Its all about variation'}
            </Text>
          </View>
        </View>
        {/* Training Book Container View */}
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
          {/* Training Book Touchable */}
          <Touchable
            onPress={() => {
              try {
                navigation.navigate('PdfTheTrainingScreen', {}, { pop: true });
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
              {/* Its All About Text... */}
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
                {'Keep Your Training Fresh'}
              </Text>
              {/* Read the PDF Button */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    navigation.navigate(
                      'PdfTheTrainingScreen',
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
            {/* The Training Cover Image Container View */}
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
              {/* The Training Book Cover Image */}
              <Image
                {...GlobalStyles.ImageStyles(theme)['Image'].props}
                resizeMode={'center'}
                source={imageSource(Images['howwetraincoverimage'])}
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
                              ? dimensions.height * (65 / 100)
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
        {/* Training Index Container View */}
        <View
          style={StyleSheet.applyWidth(
            { marginTop: 16, paddingLeft: 10, paddingRight: 10 },
            dimensions.width
          )}
        >
          {/* The Training Index Button */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.navigate(
                  'BottomTabNavigator',
                  {
                    screen: 'Training',
                    params: { screen: 'TrainingIndexScreen' },
                  },
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
                  fontFamily: 'Inter_700Bold',
                  fontSize: 16,
                  height: 50,
                  width: '100%',
                }
              ),
              dimensions.width
            )}
            title={'Training Index'}
          />
        </View>
        <Spacer left={8} right={8} bottom={50} top={50} />
      </ScrollView>
    </ScreenContainer>
  );
};

export default withTheme(HowWeTrainScreen);
