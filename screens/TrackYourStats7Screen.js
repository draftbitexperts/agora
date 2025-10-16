import React from 'react';
import {
  Button,
  CircleImage,
  Icon,
  NumberInput,
  Pressable,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  Swiper,
  SwiperItem,
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
import * as MeasurementChart from '../custom-files/MeasurementChart';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import showAlertUtil from '../utils/showAlert';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { showWeightGraph: null };

const TrackYourStats7Screen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const params = useParams();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [afterRecrod, setAfterRecrod] = React.useState({});
  const [armM, setArmM] = React.useState(0);
  const [beforeRecord, setBeforeRecord] = React.useState({});
  const [calfM, setCalfM] = React.useState(0);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [checkboxValue2, setCheckboxValue2] = React.useState(false);
  const [chestM, setChestM] = React.useState(0);
  const [formErr, setFormErr] = React.useState('');
  const [loggingMeasurement, setLoggingMeasurement] = React.useState(false);
  const [measSliderMeta, setMeasSliderMeta] = React.useState([
    { key: 'arm', title: 'Arms' },
    { key: 'chest', title: 'Chest' },
    { key: 'waist', title: 'Waist' },
    { key: 'thigh', title: 'Hips' },
    { key: 'calf', title: 'Quads' },
    { key: 'current_weight', title: 'Weight' },
  ]);
  const [measTabIndex, setMeasTabIndex] = React.useState(0);
  const [measurementsData, setMeasurementsData] = React.useState([]);
  const [numberInputValue, setNumberInputValue] = React.useState('');
  const [numberInputValue2, setNumberInputValue2] = React.useState('');
  const [numberInputValue3, setNumberInputValue3] = React.useState('');
  const [numberInputValue4, setNumberInputValue4] = React.useState('');
  const [pickerValue, setPickerValue] = React.useState('');
  const [showMeasurementForm, setShowMeasurementForm] = React.useState(false);
  const [stepperValue, setStepperValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const [thighM, setThighM] = React.useState(0);
  const [waistM, setWaistM] = React.useState(0);
  const [weightM, setWeightM] = React.useState(0);
  // get data for chart for a particular body part
  const getChartData = part => {
    if (!measurementsData || measurementsData.length === 0) return [];

    const sorted = [...measurementsData].sort(
      (a, b) => a.measurement_date - b.measurement_date
    );
    const firstDate = sorted[0].measurement_date;
    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;

    return sorted
      .filter(item => typeof item[part] === 'number')
      .map(item => {
        const weekDiff =
          (item.measurement_date - firstDate) / millisecondsPerWeek;

        return {
          x: parseFloat((weekDiff + 1).toFixed(2)),
          y: item[part],
        };
      });

    //const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    //return measurementsData.map((item, index) => ({ x: index == 0 ? 1 : Math.ceil((item.measurement_date - measurementsData[0].measurement_date) / millisecondsPerWeek), y: item[part] }))

    // const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;

    // return measurementsData.map((item, index) => {
    //   const x = index === 0
    //     ? 1
    //     : Math.ceil((item.measurement_date - measurementsData[0].measurement_date) / millisecondsPerWeek);
    //   const y = item[part];

    //   console.log(`Index: ${index}, Measurement Date: ${item.measurement_date}, X: ${x}, Y: ${y}`);

    //   return { x, y };
    // });
  };

  // This function takes the name of the body parts and return start and current measurement of that part
  const getMeasurementsSliderValue = part => {
    //console.log(part, measurementsData)
    if (!measurementsData.length) return { start: {}, current: {} };
    let ret = {
      start: measurementsData.find(item => item.intital_measurements)?.[part],
      current: measurementsData.slice(-1)[0][part],
    };

    // console.log(part, ret)
    return ret;
  };
  const performLogMeasurementsPOST = PerformApi.useLogMeasurementsPOST();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      /* hidden 'API Request' action */
      /* hidden 'If/Else' action */
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
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={false}
        style={StyleSheet.applyWidth({ paddingBottom: 25 }, dimensions.width)}
      >
        <HeaderBlock />
        {/* Calorie Calculator Title View */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'column', marginTop: 16 },
            dimensions.width
          )}
        >
          {/* Calorie Calculator Text */}
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
            {'Track Your Progress'}
          </Text>
          {/* Sub Text View */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center' },
              dimensions.width
            )}
          >
            {/* Flexible dieting made simple Text */}
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
              {'Lets see your progress'}
            </Text>
          </View>
        </View>
        {/* Coach's Information Video Container View 2 */}
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
                videoId={1046833940}
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
                {'Tracking progress'}
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
                {
                  'Hit play and learn all the different ways you can track your journey.'
                }
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
                "! It's always important to see how far you have come so don't forget to update your weight, pictures and measurements."
              }
            </Text>
          </View>
        </View>
        {/* Monitoring Progress Container View */}
        <View
          style={StyleSheet.applyWidth(
            { height: 450, marginTop: 16, paddingRight: 10, width: '100%' },
            dimensions.width
          )}
        >
          {/* Fetch Progress photo */}
          <PerformApi.FetchGetProgressImagesGET
            handlers={{
              on2xx: fetchProgressPhotoData => {
                try {
                  const result = fetchProgressPhotoData?.json;
                  setBeforeRecord(
                    fetchProgressPhotoData?.json?.find(
                      item => item.type == 'Before'
                    )
                  );
                  setAfterRecrod(
                    (() => {
                      const e = fetchProgressPhotoData?.json?.find(
                        item => item.type == 'After'
                      );
                      console.log('after record', e);
                      return e;
                    })()
                  );
                } catch (err) {
                  console.error(err);
                }
              },
              onData: fetchProgressPhotoData => {
                try {
                  /* hidden 'Log to Console' action */
                } catch (err) {
                  console.error(err);
                }
              },
            }}
          >
            {({ loading, error, data, refetchGetProgressImages }) => {
              const fetchProgressPhotoData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return null;
            }}
          </PerformApi.FetchGetProgressImagesGET>
          <Swiper
            dotColor={theme.colors.text.light}
            dotsTouchable={true}
            hideDots={false}
            loop={false}
            minDistanceForAction={0.2}
            minDistanceToCapture={5}
            timeout={0}
            vertical={false}
            {...GlobalStyles.SwiperStyles(theme)['Swiper'].props}
            dotActiveColor={palettes.App['Custom Color']}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.SwiperStyles(theme)['Swiper'].style,
                { height: 460 }
              ),
              dimensions.width
            )}
          >
            <SwiperItem>
              {/* Check-ins Front View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    flexDirection: 'column',
                    height: 460,
                    marginLeft: 10,
                    opacity: 1,
                    overflow: 'hidden',
                  },
                  dimensions.width
                )}
              >
                {/* Background Colour View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                      borderRadius: 20,
                      flexDirection: 'row',
                      height: 460,
                      opacity: 0.3,
                      overflow: 'hidden',
                      position: 'absolute',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                />
                {/* Monitor Progress Title Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginLeft: 10, marginTop: 20 },
                    dimensions.width
                  )}
                >
                  {/* Monitor Progress Title Text */}
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
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Monitor progress with pictures'}
                  </Text>
                </View>
                {/* Monitor Progress Front View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      paddingLeft: 10,
                      paddingRight: 10,
                    },
                    dimensions.width
                  )}
                >
                  {/* Before Front Image View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderColor: palettes.App['Custom #ffffff'],
                        borderWidth: 2,
                        height: 280,
                        marginTop: 10,
                        width: '49%',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Background Colour View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                          opacity: 0.3,
                        },
                        dimensions.width
                      )}
                    />
                    {/* Before Text View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { opacity: 1 },
                        dimensions.width
                      )}
                    >
                      {/* Before Text */}
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
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Before'}
                      </Text>
                    </View>
                    {/* Before Image View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { paddingLeft: 2, paddingTop: 2 },
                        dimensions.width
                      )}
                    >
                      {/* Before Image */}
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(beforeRecord?.front_image?.url)}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 252, width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                    </View>
                  </View>
                  {/* After Front Image View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderColor: palettes.App['Custom #ffffff'],
                        borderWidth: 2,
                        height: 280,
                        marginTop: 10,
                        width: '49%',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Background Colour View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                          opacity: 0.3,
                        },
                        dimensions.width
                      )}
                    />
                    {/* After Text View */}
                    <View>
                      {/* After Text */}
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
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Current'}
                      </Text>
                    </View>
                    {/* After Image View */}
                    <View>
                      {/* After Image  */}
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(
                          afterRecrod?.front_image?.url ||
                            Images['PexelsMarkofitProduction61587731']
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 254, width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                      {/* Primal Logo View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            bottom: 0,
                            height: 60,
                            opacity: 1,
                            position: 'absolute',
                            right: 0,
                            width: 60,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Primal Logo */}
                        <Image
                          resizeMode={'cover'}
                          {...GlobalStyles.ImageStyles(theme)['Image'].props}
                          source={imageSource(Images['IMG0118'])}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ImageStyles(theme)['Image'].style,
                              {
                                height: 50,
                                marginLeft: 3,
                                marginTop: 3,
                                position: 'absolute',
                                width: 50,
                              }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                {/* Update Images */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'flex-end',
                      marginTop: 10,
                    },
                    dimensions.width
                  )}
                >
                  <Pressable
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'IntroImagesScreen',
                          { isNewUser: false },
                          { pop: true }
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* Update Images */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          theme.typography.body1,
                          {
                            color: palettes.App['Custom Color'],
                            fontFamily: 'Inter_600SemiBold',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Update Images'}
                    </Text>
                  </Pressable>
                </View>
                {/* Front Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginLeft: 10 },
                    dimensions.width
                  )}
                >
                  {/* Front Title Text */}
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
                    {'Front'}
                  </Text>
                  {/* Front Subtitle Text */}
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
                    {'Remember to take pics every 3 weeks!'}
                  </Text>
                </View>
              </View>
            </SwiperItem>
            {/* Swiper Item 2 */}
            <SwiperItem>
              {/* Check-ins Side View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    flexDirection: 'column',
                    height: 460,
                    marginLeft: 10,
                    opacity: 1,
                    overflow: 'hidden',
                  },
                  dimensions.width
                )}
              >
                {/* Background Colour View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                      borderRadius: 20,
                      flexDirection: 'row',
                      height: 460,
                      opacity: 0.3,
                      overflow: 'hidden',
                      position: 'absolute',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                />
                {/* Monitor Progress Title Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginLeft: 10, marginTop: 20 },
                    dimensions.width
                  )}
                >
                  {/* Monitor Progress Title Text */}
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
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Monitor progress with pictures'}
                  </Text>
                </View>
                {/* Monitor Progress Front View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      paddingLeft: 10,
                      paddingRight: 10,
                    },
                    dimensions.width
                  )}
                >
                  {/* Before Side Image View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderColor: palettes.App['Custom #ffffff'],
                        borderWidth: 2,
                        height: 280,
                        marginTop: 10,
                        width: '49%',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Background Colour View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                          opacity: 0.3,
                        },
                        dimensions.width
                      )}
                    />
                    {/* Before Text View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { opacity: 1 },
                        dimensions.width
                      )}
                    >
                      {/* Before Text */}
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
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Before'}
                      </Text>
                    </View>
                    {/* Before Image View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { paddingLeft: 2, paddingTop: 2 },
                        dimensions.width
                      )}
                    >
                      {/* Before Image */}
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(
                          beforeRecord?.side_image?.url ||
                            Images['PexelsMarkofitProduction61587731']
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 252, width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                    </View>
                  </View>
                  {/* After Side Image View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderColor: palettes.App['Custom #ffffff'],
                        borderWidth: 2,
                        height: 280,
                        marginTop: 10,
                        width: '49%',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Background Colour View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                          opacity: 0.3,
                        },
                        dimensions.width
                      )}
                    />
                    {/* After Text View */}
                    <View>
                      {/* After Text */}
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
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Current'}
                      </Text>
                    </View>
                    {/* After Image View */}
                    <View>
                      {/* After Image  */}
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(
                          afterRecrod?.side_image?.url ||
                            Images['PexelsMarkofitProduction61587731']
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 254, width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                      {/* Primal Logo View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            bottom: 0,
                            height: 60,
                            opacity: 1,
                            position: 'absolute',
                            right: 0,
                            width: 60,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Primal Logo */}
                        <Image
                          resizeMode={'cover'}
                          {...GlobalStyles.ImageStyles(theme)['Image'].props}
                          source={imageSource(Images['IMG0118'])}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ImageStyles(theme)['Image'].style,
                              {
                                height: 50,
                                marginLeft: 3,
                                marginTop: 3,
                                position: 'absolute',
                                width: 50,
                              }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                {/* Update Images */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'flex-end',
                      marginTop: 10,
                    },
                    dimensions.width
                  )}
                >
                  <Pressable
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'IntroImagesScreen',
                          { isNewUser: false },
                          { pop: true }
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* Update Images */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          theme.typography.body1,
                          {
                            color: palettes.App['Custom Color'],
                            fontFamily: 'Inter_600SemiBold',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Update Images'}
                    </Text>
                  </Pressable>
                </View>
                {/* Side Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginLeft: 10 },
                    dimensions.width
                  )}
                >
                  {/* Side Title Text */}
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
                    {'Side'}
                  </Text>
                  {/* Side Subtitle Text */}
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
                    {'Remember to take pics every 3 weeks!'}
                  </Text>
                </View>
              </View>
            </SwiperItem>
            {/* Swiper Item 3 */}
            <SwiperItem>
              {/* Check-ins Back View */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    flexDirection: 'column',
                    height: 460,
                    marginLeft: 10,
                    opacity: 1,
                    overflow: 'hidden',
                  },
                  dimensions.width
                )}
              >
                {/* Background Colour View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                      borderRadius: 20,
                      flexDirection: 'row',
                      height: 460,
                      opacity: 0.3,
                      overflow: 'hidden',
                      position: 'absolute',
                      width: '100%',
                    },
                    dimensions.width
                  )}
                />
                {/* Monitor Progress Title Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginLeft: 10, marginTop: 20 },
                    dimensions.width
                  )}
                >
                  {/* Monitor Progress Title Text */}
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
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Monitor progress with pictures'}
                  </Text>
                </View>
                {/* Monitor Progress Front View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 10,
                      paddingLeft: 10,
                      paddingRight: 10,
                    },
                    dimensions.width
                  )}
                >
                  {/* Before Back Image View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderColor: palettes.App['Custom #ffffff'],
                        borderWidth: 2,
                        height: 280,
                        marginTop: 10,
                        width: '49%',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Background Colour View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                          opacity: 0.3,
                        },
                        dimensions.width
                      )}
                    />
                    {/* Before Text View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { opacity: 1 },
                        dimensions.width
                      )}
                    >
                      {/* Before Text */}
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
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Before'}
                      </Text>
                    </View>
                    {/* Before Image View */}
                    <View
                      style={StyleSheet.applyWidth(
                        { paddingLeft: 2, paddingTop: 2 },
                        dimensions.width
                      )}
                    >
                      {/* Before Image */}
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(
                          beforeRecord?.back_image?.url ||
                            Images['PexelsMarkofitProduction61587731']
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 252, width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                    </View>
                  </View>
                  {/* After Back Image View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderColor: palettes.App['Custom #ffffff'],
                        borderWidth: 2,
                        height: 280,
                        marginTop: 10,
                        width: '49%',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Background Colour View */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          backgroundColor: palettes.App.Studily_Slate_Blue_Dark,
                          opacity: 0.3,
                        },
                        dimensions.width
                      )}
                    />
                    {/* After Text View */}
                    <View>
                      {/* After Text */}
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
                              textAlign: 'center',
                            }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Current'}
                      </Text>
                    </View>
                    {/* After Image View */}
                    <View>
                      {/* After Image  */}
                      <Image
                        resizeMode={'cover'}
                        {...GlobalStyles.ImageStyles(theme)['Image'].props}
                        source={imageSource(
                          afterRecrod?.back_image?.url ||
                            Images['PexelsMarkofitProduction61587731']
                        )}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ImageStyles(theme)['Image'].style,
                            { height: 254, width: '100%' }
                          ),
                          dimensions.width
                        )}
                      />
                      {/* Primal Logo View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            bottom: 0,
                            height: 60,
                            opacity: 1,
                            position: 'absolute',
                            right: 0,
                            width: 60,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Primal Logo */}
                        <Image
                          resizeMode={'cover'}
                          {...GlobalStyles.ImageStyles(theme)['Image'].props}
                          source={imageSource(Images['IMG0118'])}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ImageStyles(theme)['Image'].style,
                              {
                                height: 50,
                                marginLeft: 3,
                                marginTop: 3,
                                position: 'absolute',
                                width: 50,
                              }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    </View>
                  </View>
                </View>
                {/* Update Images 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      alignSelf: 'center',
                      justifyContent: 'flex-end',
                      marginTop: 10,
                    },
                    dimensions.width
                  )}
                >
                  <Pressable
                    onPress={() => {
                      try {
                        navigation.navigate(
                          'IntroImagesScreen',
                          { isNewUser: false },
                          { pop: true }
                        );
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* Update Images */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Text'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Text'].style,
                          theme.typography.body1,
                          {
                            color: palettes.App['Custom Color'],
                            fontFamily: 'Inter_600SemiBold',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Update Images'}
                    </Text>
                  </Pressable>
                </View>
                {/* Back Text View */}
                <View
                  style={StyleSheet.applyWidth(
                    { marginLeft: 10 },
                    dimensions.width
                  )}
                >
                  {/* Back Title Text */}
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
                    {'Back'}
                  </Text>
                  {/* Back Subtitle Text */}
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
                    {'Remember to take pics every 3 weeks!'}
                  </Text>
                </View>
              </View>
            </SwiperItem>
          </Swiper>
        </View>
        {/* Measurements Container View  */}
        <View
          style={StyleSheet.applyWidth(
            { marginLeft: 10, marginRight: 10, marginTop: 20 },
            dimensions.width
          )}
        >
          {/* Fetch 2 */}
          <PerformApi.FetchGetAllMeasurementsGET
            handlers={{
              on2xx: fetch2Data => {
                try {
                  setMeasurementsData(
                    (() => {
                      const e = fetch2Data?.json;
                      console.log('measure', e);
                      return e;
                    })()
                  );
                } catch (err) {
                  console.error(err);
                }
              },
              onData: fetch2Data => {
                try {
                  /* hidden 'Log to Console' action */
                } catch (err) {
                  console.error(err);
                }
              },
            }}
          >
            {({ loading, error, data, refetchGetAllMeasurements }) => {
              const fetch2Data = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <>
                  {!measurementsData?.length ? null : (
                    <Swiper
                      data={measSliderMeta}
                      dotColor={theme.colors.text.light}
                      dotsTouchable={true}
                      hideDots={false}
                      keyExtractor={(swiperData, index) =>
                        swiperData?.id ??
                        swiperData?.uuid ??
                        index?.toString() ??
                        JSON.stringify(swiperData)
                      }
                      listKey={
                        'Scroll View->Measurements Container View ->Fetch 2->Swiper'
                      }
                      loop={false}
                      minDistanceForAction={0.2}
                      minDistanceToCapture={5}
                      onIndexChanged={newIndex => {
                        try {
                          setMeasTabIndex(newIndex);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      renderItem={({ item, index }) => {
                        const swiperData = item;
                        return (
                          <>
                            <SwiperItem
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                },
                                dimensions.width
                              )}
                            >
                              {/* Arms Container View */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor: 'rgba(56, 67, 84, 0.3)',
                                    borderRadius: 20,
                                    height: '100%',
                                    paddingLeft: 10,
                                    paddingRight: 10,
                                    width: '100%',
                                  },
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
                                      opacity: 0.3,
                                      position: 'absolute',
                                      width: 380,
                                    },
                                    dimensions.width
                                  )}
                                />
                                {/* Title Text View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { marginTop: 20 },
                                    dimensions.width
                                  )}
                                >
                                  {/* Monitor with measurements Text */}
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
                                          color: palettes.App['Custom #ffffff'],
                                          fontFamily: 'Inter_600SemiBold',
                                          fontSize: 20,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {'Monitor with measurements'}
                                  </Text>
                                </View>
                                {/* Arms Text View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { marginTop: 10 },
                                    dimensions.width
                                  )}
                                >
                                  {/* Arms Text */}
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
                                          color: palettes.App['Custom Color'],
                                          fontFamily: 'Inter_600SemiBold',
                                          fontSize: 25,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {swiperData?.title}
                                  </Text>
                                </View>
                                {/* Graph View */}
                                <View
                                  onLayout={event => {
                                    try {
                                      const data = getChartData(
                                        swiperData?.key
                                      );
                                      console.log(data);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems:
                                        dimensions.width >= Breakpoints.Tablet
                                          ? 'center'
                                          : undefined,
                                      borderColor:
                                        palettes.App['Custom #ffffff'],
                                      borderWidth: 2,
                                      marginTop: 20,
                                      overflow: 'hidden',
                                      width: '100%',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Utils.CustomCodeErrorBoundary>
                                    <MeasurementChart.Index
                                      data={getChartData(swiperData?.key)}
                                      index={measTabIndex}
                                    />
                                  </Utils.CustomCodeErrorBoundary>
                                </View>
                                {/* Start and Current Measurement View  */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexDirection: 'row',
                                      height: 45,
                                      justifyContent: 'space-evenly',
                                      marginTop: 20,
                                      width: '100%',
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Start View */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      { width: '50%' },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Start Measurement View */}
                                    <View>
                                      {/* Start Measurement Text */}
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
                                              color:
                                                palettes.App['Custom #ffffff'],
                                              fontFamily: 'Inter_400Regular',
                                              fontSize: 16,
                                              textAlign: 'center',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {'Start measurement '}
                                      </Text>
                                    </View>
                                    {/* Size CM View */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'flex-end',
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Number Text */}
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
                                              color:
                                                palettes.App['Custom Color'],
                                              fontFamily: 'Inter_400Regular',
                                              fontSize: 20,
                                              marginRight: 3,
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {
                                          getMeasurementsSliderValue(
                                            swiperData?.key
                                          )?.start
                                        }
                                      </Text>
                                      {/* CM Text 3 */}
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
                                              color:
                                                palettes.App['Custom #ffffff'],
                                              fontFamily: 'Inter_400Regular',
                                              fontSize: 20,
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {swiperData?.title === 'Weight'
                                          ? 'kg'
                                          : 'cm'}
                                      </Text>
                                    </View>
                                  </View>
                                  {/* Current Measurement View */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      { width: '50%' },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Current Measurement Text View */}
                                    <View>
                                      {/* Current Measurement Text */}
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
                                              color:
                                                palettes.App['Custom #ffffff'],
                                              fontFamily: 'Inter_400Regular',
                                              fontSize: 16,
                                              textAlign: 'center',
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {'Current measurement '}
                                      </Text>
                                    </View>
                                    {/* Size CM View  */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          alignItems: 'flex-end',
                                          flexDirection: 'row',
                                          justifyContent: 'center',
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Number Text */}
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
                                              color:
                                                palettes.App['Custom Color'],
                                              fontFamily: 'Inter_400Regular',
                                              fontSize: 20,
                                              marginRight: 3,
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {
                                          getMeasurementsSliderValue(
                                            (
                                              measSliderMeta &&
                                              measSliderMeta[measTabIndex]
                                            )?.key
                                          )?.current
                                        }
                                      </Text>
                                      {/* CM Text 2 */}
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
                                              color:
                                                palettes.App['Custom #ffffff'],
                                              fontFamily: 'Inter_400Regular',
                                              fontSize: 20,
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
                                        {swiperData?.title === 'Weight'
                                          ? 'kg'
                                          : 'cm'}
                                      </Text>
                                    </View>
                                  </View>
                                </View>
                                {/* Log Measurement Button */}
                                <Button
                                  accessible={true}
                                  iconPosition={'left'}
                                  onPress={() => {
                                    try {
                                      setArmM(0);
                                      setWaistM(0);
                                      setThighM(0);
                                      setChestM(0);
                                      setCalfM(0);
                                      setWeightM(0);
                                      setFormErr('');
                                      setShowMeasurementForm(true);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                  {...GlobalStyles.ButtonStyles(theme)['Button']
                                    .props}
                                  style={StyleSheet.applyWidth(
                                    StyleSheet.compose(
                                      GlobalStyles.ButtonStyles(theme)['Button']
                                        .style,
                                      {
                                        backgroundColor: 'rgba(0, 0, 0, 0)',
                                        borderColor:
                                          palettes.App['Custom Color'],
                                        borderRadius: 20,
                                        borderWidth: 2,
                                        color: palettes.App['Custom #ffffff'],
                                        fontFamily: 'Inter_600SemiBold',
                                        marginTop: 20,
                                        width: '100%',
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                  title={'Log measurement'}
                                />
                              </View>
                            </SwiperItem>
                          </>
                        );
                      }}
                      timeout={0}
                      vertical={false}
                      {...GlobalStyles.SwiperStyles(theme)['Swiper'].props}
                      dotActiveColor={palettes.App['Custom Color']}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.SwiperStyles(theme)['Swiper'].style,
                          { height: 580 }
                        ),
                        dimensions.width
                      )}
                    />
                  )}
                </>
              );
            }}
          </PerformApi.FetchGetAllMeasurementsGET>
        </View>
      </SimpleStyleScrollView>
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
              {/* Cancel Button */}
              <Button
                accessible={true}
                iconPosition={'left'}
                onPress={() => {
                  try {
                    setShowMeasurementForm(false);
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
                title={'Cancel'}
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

export default withTheme(TrackYourStats7Screen);
