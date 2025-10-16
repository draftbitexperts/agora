import React from 'react';
import {
  Button,
  Icon,
  NumberInput,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  Spacer,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { BlurView } from 'expo-blur';
import {
  ActivityIndicator,
  Image,
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
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openImagePickerUtil from '../utils/openImagePicker';
import showAlertUtil from '../utils/showAlert';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { isNewUser: null };

const IntroImagesScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const params = useParams();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [armM, setArmM] = React.useState(0);
  const [backImage, setBackImage] = React.useState('');
  const [calfM, setCalfM] = React.useState(0);
  const [chestM, setChestM] = React.useState(0);
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [formErr, setFormErr] = React.useState('');
  const [frontImage, setFrontImage] = React.useState('');
  const [image1, setImage1] = React.useState('');
  const [image2, setImage2] = React.useState('');
  const [image3, setImage3] = React.useState('');
  const [loggingMeasurement, setLoggingMeasurement] = React.useState(false);
  const [measTabIndex, setMeasTabIndex] = React.useState(0);
  const [measurementsData, setMeasurementsData] = React.useState([]);
  const [name, setName] = React.useState('');
  const [showMeasurementForm, setShowMeasurementForm] = React.useState(false);
  const [sideImage, setSideImage] = React.useState('');
  const [thighM, setThighM] = React.useState(0);
  const [uploadingImage, setUploadingImage] = React.useState(false);
  const [waistM, setWaistM] = React.useState(0);
  const [weightM, setWeightM] = React.useState(0);
  const performUploadBeforeProgressPhotosPOST =
    PerformApi.useUploadBeforeProgressPhotosPOST();
  const performUploadAfterProgressPhotosPOST =
    PerformApi.useUploadAfterProgressPhotosPOST();
  const performLogMeasurementsPOST = PerformApi.useLogMeasurementsPOST();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        const apiResponse = (await PerformApi.getProgressImagesGET(Constants))
          ?.json;
        setFrontImage((apiResponse && apiResponse[0])?.front_image?.url);
        setBackImage((apiResponse && apiResponse[0])?.back_image?.url);
        setSideImage((apiResponse && apiResponse[0])?.side_image?.url);
        console.log(apiResponse);
      } catch (err) {
        console.error(err);
      }
    };
    handler();
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
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: palettes.App.Studily_Dark_UI,
          justifyContent: 'center',
          opacity: 0.8,
        },
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
            {'Progress Photos'}
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
              {'Keep on top of our progress!'}
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
                videoId={1048653475}
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
                '! Keeping on top of your progress is essential, you can do this through pictures as well as measurements, weigh-ins, how your clothes fit and performance. So upload a new set of pictures every 3 weeks so you can see how well you have done!'
              }
            </Text>
          </View>
        </View>

        <SimpleStyleKeyboardAwareScrollView
          enableAutomaticScroll={false}
          enableOnAndroid={false}
          enableResetScrollToCoords={false}
          keyboardShouldPersistTaps={'never'}
          showsVerticalScrollIndicator={true}
          viewIsInsideTabBar={false}
        >
          {/* Progress Pictures Container */}
          <View
            style={StyleSheet.applyWidth(
              { marginTop: 16, paddingLeft: 10, paddingRight: 10 },
              dimensions.width
            )}
          >
            {/* Front Pic Container View 1 */}
            <View>
              {/* Front Pic Touchable */}
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      const img1 = await openImagePickerUtil({
                        mediaTypes: 'Images',
                        allowsEditing: false,
                        quality: 0.2,
                        allowsMultipleSelection: false,
                        selectionLimit: 0,
                        outputBase64: true,
                      });

                      if (img1) {
                        setFrontImage(img1);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
              >
                {/* Background Colour View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                      borderRadius: 20,
                      height: '100%',
                      justifyContent: 'center',
                      opacity: 0.3,
                      position: 'absolute',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                >
                  {/* Upload Icon */}
                  <Icon
                    size={24}
                    color={theme.colors.background.brand}
                    name={'FontAwesome/cloud-upload'}
                  />
                  {/* Upload front image Text */}
                  <>
                    {frontImage ? null : (
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            {
                              color: palettes.Brand.Surface,
                              fontFamily: 'Inter_400Regular',
                              fontSize: 17,
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Upload front image'}
                      </Text>
                    )}
                  </>
                </View>
                {/* Upload Image View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'center',
                      height: 150,
                      justifyContent: 'center',
                      width: 350,
                    },
                    dimensions.width
                  )}
                >
                  {/* Upload Image */}
                  <>
                    {!frontImage ? null : (
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(`${frontImage}`)}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            {
                              borderRadius: 20,
                              height: 130,
                              overflow: 'hidden',
                              width: 130,
                            }
                          ),
                          dimensions.width
                        )}
                      />
                    )}
                  </>
                </View>
              </Touchable>
            </View>
            {/* Side Pic Container View 2 */}
            <View
              style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
            >
              {/* Back Pic Touchable  */}
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      const img = await openImagePickerUtil({
                        mediaTypes: 'Images',
                        allowsEditing: false,
                        quality: 0.2,
                        allowsMultipleSelection: false,
                        selectionLimit: 0,
                        outputBase64: true,
                      });

                      if (img) {
                        setBackImage(img);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
              >
                {/* Background Colour View */}
                <>
                  {image2 ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          alignSelf: 'center',
                          backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                          borderRadius: 20,
                          height: '100%',
                          justifyContent: 'center',
                          opacity: 0.3,
                          position: 'absolute',
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      {/* Upload Icon */}
                      <Icon
                        size={24}
                        color={theme.colors.background.brand}
                        name={'FontAwesome/cloud-upload'}
                      />
                      {/* Upload back image Text */}
                      <>
                        {backImage ? null : (
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: palettes.Brand.Surface,
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 17,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Upload back image'}
                          </Text>
                        )}
                      </>
                    </View>
                  )}
                </>
                {/* Upload Image View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'center',
                      height: 150,
                      justifyContent: 'center',
                      width: 350,
                    },
                    dimensions.width
                  )}
                >
                  {/* Upload Image */}
                  <>
                    {!backImage ? null : (
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(`${backImage}`)}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            {
                              borderRadius: 20,
                              height: 130,
                              overflow: 'hidden',
                              width: 130,
                            }
                          ),
                          dimensions.width
                        )}
                      />
                    )}
                  </>
                </View>
              </Touchable>
            </View>
            {/* Back Pic Container View 3 */}
            <View
              style={StyleSheet.applyWidth({ marginTop: 16 }, dimensions.width)}
            >
              {/* Side Pic Touchable 2 */}
              <Touchable
                onPress={() => {
                  const handler = async () => {
                    try {
                      const img = await openImagePickerUtil({
                        mediaTypes: 'Images',
                        allowsEditing: false,
                        quality: 0.2,
                        allowsMultipleSelection: false,
                        selectionLimit: 0,
                        outputBase64: true,
                      });

                      if (img) {
                        setSideImage(img);
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
              >
                {/* Background Colour View */}
                <>
                  {image3 ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          alignItems: 'center',
                          alignSelf: 'center',
                          backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                          borderRadius: 20,
                          height: '100%',
                          justifyContent: 'center',
                          marginLeft: 16,
                          opacity: 0.3,
                          position: 'absolute',
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      {/* Upload Icon */}
                      <Icon
                        size={24}
                        color={theme.colors.background.brand}
                        name={'FontAwesome/cloud-upload'}
                      />
                      {/* Upload side image Text */}
                      <>
                        {sideImage ? null : (
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: palettes.Brand.Surface,
                                  fontFamily: 'Inter_400Regular',
                                  fontSize: 17,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Upload side image'}
                          </Text>
                        )}
                      </>
                    </View>
                  )}
                </>
                {/* Upload Image View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'center',
                      height: 150,
                      justifyContent: 'center',
                      width: 350,
                    },
                    dimensions.width
                  )}
                >
                  {/* Upload Image */}
                  <>
                    {!sideImage ? null : (
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(`${sideImage}`)}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            {
                              borderRadius: 20,
                              height: 130,
                              overflow: 'hidden',
                              width: 130,
                            }
                          ),
                          dimensions.width
                        )}
                      />
                    )}
                  </>
                </View>
              </Touchable>
            </View>
            {/* Submit Button */}
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                const handler = async () => {
                  try {
                    setUploadingImage(true);
                    let resObj = {};
                    if (params?.isNewUser ?? defaultProps.isNewUser) {
                      const performREs = (
                        await performUploadBeforeProgressPhotosPOST.mutateAsync(
                          {
                            back: backImage,
                            front: frontImage,
                            side: sideImage,
                          }
                        )
                      )?.json;
                      resObj = performREs;
                    } else {
                      const performREs2 = (
                        await performUploadAfterProgressPhotosPOST.mutateAsync({
                          back: backImage,
                          front: frontImage,
                          side: sideImage,
                          type: 'After',
                        })
                      )?.json;
                      resObj = performREs2;
                    }

                    setUploadingImage(false);
                    console.log(resObj);
                    if (resObj?.result === 'success') {
                      setShowMeasurementForm(true);
                      setThighM(0);
                      setChestM(0);
                      setWaistM(0);
                      setWeightM(0);
                      setCalfM(0);
                      undefined;
                      setShowMeasurementForm(true);
                    } else {
                      showAlertUtil({
                        title: 'Upload image failed',
                        message: resObj?.message,
                        buttonText: 'Ok',
                      });
                    }
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              loading={Boolean(uploadingImage)}
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgba(0, 0, 0, 0)',
                  borderColor: palettes.App['Custom Color'],
                  borderRadius: 20,
                  borderWidth: 2,
                  fontFamily: 'Inter_700Bold',
                  fontSize: 16,
                  height: 56,
                  marginTop: 35,
                  textAlign: 'center',
                },
                dimensions.width
              )}
              title={'Submit '}
            />
          </View>
          <Spacer left={8} right={8} bottom={50} top={50} />
        </SimpleStyleKeyboardAwareScrollView>
      </ScrollView>
      {/* Modal - Measurement form NEW */}
      <Modal
        supportedOrientations={['portrait', 'landscape']}
        animationType={'slide'}
        presentationStyle={'pageSheet'}
        transparent={true}
        visible={Boolean(showMeasurementForm)}
      >
        {/* Contianer */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color_22'],
              borderRadius: 12,
              bottom: 0,
              opacity: 1,
              padding: 20,
              paddingBottom: 40,
              paddingLeft: 10,
              paddingRight: 10,
              position: 'absolute',
              width: '100%',
            },
            dimensions.width
          )}
        >
          {/* Background Colour View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignSelf: 'center',
                backgroundColor: palettes.App['Custom Color_22'],
                borderRadius: 20,
                height: '100%',
                opacity: 1,
                position: 'absolute',
                width: '100%',
              },
              dimensions.width
            )}
          />
          <SimpleStyleKeyboardAwareScrollView
            enableResetScrollToCoords={false}
            keyboardShouldPersistTaps={'never'}
            showsVerticalScrollIndicator={true}
            viewIsInsideTabBar={false}
            enableAutomaticScroll={true}
            enableOnAndroid={true}
          >
            {/* Title Container */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'flex-start', margin: 4, marginBottom: 4 },
                dimensions.width
              )}
            >
              {/* Title */}
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
                      fontSize: 17,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Body Measurements'}
              </Text>
            </View>
            {/* Arms View */}
            <View
              style={StyleSheet.applyWidth({ margin: 4 }, dimensions.width)}
            >
              {/* Arms Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App.White,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginBottom: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Arms'}
              </Text>
              {/* Input Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.ViewBG,
                    borderRadius: 14,
                    paddingBottom: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                <NumberInput
                  changeTextDelay={500}
                  onChangeText={newNumberInputValue => {
                    try {
                      setArmM(newNumberInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                    .props}
                  placeholder={'Measure Arm..'}
                  placeholderTextColor={theme.colors.text.light}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.NumberInputStyles(theme)['Number Input']
                        .style,
                      {
                        backgroundColor: palettes.Brand.Surface,
                        fontFamily: 'Inter_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                  value={armM}
                />
              </View>
            </View>
            {/* Waist View */}
            <View
              style={StyleSheet.applyWidth({ margin: 4 }, dimensions.width)}
            >
              {/* Waist Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App.White,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginBottom: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Waist'}
              </Text>
              {/* Input Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.ViewBG,
                    borderRadius: 14,
                    paddingBottom: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                <NumberInput
                  changeTextDelay={500}
                  onChangeText={newNumberInputValue => {
                    try {
                      setWaistM(newNumberInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                    .props}
                  placeholder={'Measure Waist..'}
                  placeholderTextColor={theme.colors.text.light}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.NumberInputStyles(theme)['Number Input']
                        .style,
                      {
                        backgroundColor: palettes.Brand.Surface,
                        fontFamily: 'Inter_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                  value={waistM}
                />
              </View>
            </View>
            {/* Thigh View */}
            <View
              style={StyleSheet.applyWidth({ margin: 4 }, dimensions.width)}
            >
              {/* Thigh Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App.White,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginBottom: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Thigh'}
              </Text>
              {/* Input Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.ViewBG,
                    borderRadius: 14,
                    paddingBottom: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                <NumberInput
                  changeTextDelay={500}
                  onChangeText={newNumberInputValue => {
                    try {
                      setThighM(newNumberInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                    .props}
                  placeholder={'Measure Thigh..'}
                  placeholderTextColor={theme.colors.text.light}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.NumberInputStyles(theme)['Number Input']
                        .style,
                      {
                        backgroundColor: palettes.Brand.Surface,
                        fontFamily: 'Inter_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                  value={thighM}
                />
              </View>
            </View>
            {/* Chest View */}
            <View
              style={StyleSheet.applyWidth({ margin: 4 }, dimensions.width)}
            >
              {/* Chest Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App.White,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginBottom: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Chest'}
              </Text>
              {/* Input Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.ViewBG,
                    borderRadius: 14,
                    paddingBottom: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                <NumberInput
                  changeTextDelay={500}
                  onChangeText={newNumberInputValue => {
                    try {
                      setChestM(newNumberInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                    .props}
                  placeholder={'Measure Chest..'}
                  placeholderTextColor={theme.colors.text.light}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.NumberInputStyles(theme)['Number Input']
                        .style,
                      {
                        backgroundColor: palettes.Brand.Surface,
                        fontFamily: 'Inter_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                  value={chestM}
                />
              </View>
            </View>
            {/* Calf View */}
            <View
              style={StyleSheet.applyWidth({ margin: 4 }, dimensions.width)}
            >
              {/* Calf Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App.White,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginBottom: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Calf'}
              </Text>
              {/* Input Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.ViewBG,
                    borderRadius: 14,
                    paddingBottom: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                <NumberInput
                  changeTextDelay={500}
                  onChangeText={newNumberInputValue => {
                    try {
                      setCalfM(newNumberInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                    .props}
                  placeholder={'Measure Calf..'}
                  placeholderTextColor={theme.colors.text.light}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.NumberInputStyles(theme)['Number Input']
                        .style,
                      {
                        backgroundColor: palettes.Brand.Surface,
                        fontFamily: 'Inter_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                  value={calfM}
                />
              </View>
            </View>
            {/* Current Weight View */}
            <View
              style={StyleSheet.applyWidth({ margin: 4 }, dimensions.width)}
            >
              {/* Current weight Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: palettes.App.White,
                      fontFamily: 'Inter_400Regular',
                      fontSize: 16,
                      marginBottom: 8,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Current Weight'}
              </Text>
              {/* Input Container */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.ViewBG,
                    borderRadius: 14,
                    paddingBottom: 12,
                    paddingLeft: 16,
                    paddingRight: 16,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                <NumberInput
                  changeTextDelay={500}
                  onChangeText={newNumberInputValue => {
                    try {
                      setWeightM(newNumberInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.NumberInputStyles(theme)['Number Input']
                    .props}
                  placeholder={'Measure Weight..'}
                  placeholderTextColor={theme.colors.text.light}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.NumberInputStyles(theme)['Number Input']
                        .style,
                      {
                        backgroundColor: palettes.Brand.Surface,
                        fontFamily: 'Inter_400Regular',
                      }
                    ),
                    dimensions.width
                  )}
                  value={weightM}
                />
              </View>
            </View>

            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: theme.colors.background.danger,
                    fontFamily: 'Inter_400Regular',
                    fontSize: 12,
                  }
                ),
                dimensions.width
              )}
            >
              {formErr}
            </Text>
            {/* Button View */}
            <View
              style={StyleSheet.applyWidth(
                { paddingTop: 16 },
                dimensions.width
              )}
            >
              {/* Skip Button */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    setShowMeasurementForm(false);
                    if (params?.isNewUser ?? defaultProps.isNewUser) {
                      navigation.navigate('AllSetUp9Screen', {}, { pop: true });
                    } else {
                      navigation.navigate(
                        'TrackYourStats7Screen',
                        {},
                        { pop: true }
                      );
                    }
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
                      borderWidth: 1,
                      fontFamily: 'Inter_700Bold',
                    }
                  ),
                  dimensions.width
                )}
                title={'Skip'}
              />
              {/* Submit Button */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  const handler = async () => {
                    try {
                      setLoggingMeasurement(true);
                      const logREs = (
                        await performLogMeasurementsPOST.mutateAsync({
                          arm: armM,
                          calf: calfM,
                          chest: chestM,
                          isInitial: true,
                          thigh: thighM,
                          waist: waistM,
                          weight: weightM,
                        })
                      )?.json;
                      setLoggingMeasurement(false);
                      if (logREs?.message) {
                        setFormErr(logREs?.message);
                      } else {
                        setFormErr('');
                        setShowMeasurementForm(false);
                        if (params?.isNewUser ?? defaultProps.isNewUser) {
                          navigation.navigate(
                            'AllSetUp9Screen',
                            {},
                            { pop: true }
                          );
                        } else {
                          navigation.navigate(
                            'TrackYourStats7Screen',
                            {},
                            { pop: true }
                          );
                        }

                        /* hidden 'Navigate' action */
                      }
                    } catch (err) {
                      console.error(err);
                    }
                  };
                  handler();
                }}
                {...GlobalStyles.ButtonStyles(theme)['Button'].props}
                loading={Boolean(loggingMeasurement)}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button'].style,
                    {
                      backgroundColor: 'rgba(0, 0, 0, 0)',
                      borderColor: palettes.App['Custom Color'],
                      borderWidth: 1,
                      fontFamily: 'Inter_700Bold',
                      marginTop: 12,
                    }
                  ),
                  dimensions.width
                )}
                title={'Submit'}
              />
            </View>
          </SimpleStyleKeyboardAwareScrollView>
          {/* Fetch 3 */}
          <PerformApi.FetchGetCurrentMeasurementGET
            handlers={{
              on2xx: fetch3Data => {
                try {
                  setArmM(fetch3Data?.json?.arm);
                  setWaistM(fetch3Data?.json?.waist);
                  setThighM(fetch3Data?.json?.thigh);
                  setChestM(fetch3Data?.json?.chest);
                  setCalfM(fetch3Data?.json?.calf);
                  setWeightM(fetch3Data?.json?.current_weight);
                } catch (err) {
                  console.error(err);
                }
              },
            }}
          >
            {({ loading, error, data, refetchGetCurrentMeasurement }) => {
              const fetch3Data = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return null;
            }}
          </PerformApi.FetchGetCurrentMeasurementGET>
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(IntroImagesScreen);
