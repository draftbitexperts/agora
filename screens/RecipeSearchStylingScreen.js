import React from 'react';
import {
  Button,
  Icon,
  Pressable,
  ScreenContainer,
  SimpleStyleFlashList,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  Spacer,
  StarRating,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import {
  ActivityIndicator,
  ImageBackground,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import * as SpoonacularApi from '../apis/SpoonacularApi.js';
import HeaderBlock from '../components/HeaderBlock';
import VimeoFixedBlock from '../components/VimeoFixedBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const RecipeSearchStylingScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [search, setSearch] = React.useState('');
  const [ratingValue, setRatingValue] = React.useState(undefined);
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
      scrollable={false}
      hasSafeArea={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App.Studily_Dark_UI, opacity: 0.8 },
        dimensions.width
      )}
    >
      <SimpleStyleKeyboardAwareScrollView
        enableResetScrollToCoords={false}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
        enableAutomaticScroll={true}
        enableOnAndroid={true}
        extraScrollHeight={200}
        keyboardShouldPersistTaps={'handled'}
      >
        <HeaderBlock />
        {/* Title Text Container View */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flexDirection: 'column', marginTop: 16 },
            dimensions.width
          )}
        >
          {/* Title View */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'column' },
              dimensions.width
            )}
          >
            {/* Title Text 1 */}
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
                  }
                ),
                dimensions.width
              )}
            >
              {'PRIMAL'}
            </Text>
            {/* Title Text 2 */}
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
              {'Recipe Guide'}
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
                videoId={1046871024}
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
                {'Access over 350,000 recipes'}
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
                {'Hit play and learn how to use our extensive recipe guide'}
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
              paddingBottom: 16,
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
                '! Type in the ingredients you would like in your meal and we will do the rest! Enjoy!'
              }
            </Text>
          </View>
        </View>
        {/* Search Bar Container View  */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              paddingLeft: 10,
              paddingRight: 10,
            },
            dimensions.width
          )}
        >
          {/* Search Bar View */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.App['BG Gray'],
                borderBottomWidth: 1,
                borderColor: theme.colors.border.brand,
                borderLeftWidth: 1,
                borderRadius: 16,
                borderRightWidth: 1,
                borderTopWidth: 1,
                flex: 1,
                flexDirection: 'row',
                height: 56,
                paddingLeft: 20,
                paddingRight: 20,
              },
              dimensions.width
            )}
          >
            {/* Search Icon */}
            <Icon
              size={24}
              color={palettes.App['Custom Color_21']}
              name={'EvilIcons/search'}
            />
            {/* Search Text View */}
            <View
              style={StyleSheet.applyWidth(
                {
                  flex: 1,
                  justifyContent: 'center',
                  marginLeft: 5,
                  marginRight: 5,
                },
                dimensions.width
              )}
            >
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setSearch(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                onChangeTextDelayed={newTextInputValue => {
                  try {
                    setSearch(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                blurOnSubmit={true}
                clearTextOnFocus={true}
                editable={true}
                enablesReturnKeyAutomatically={true}
                placeholder={'Search'}
                placeholderTextColor={palettes.App['Custom Color_21']}
                style={StyleSheet.applyWidth(
                  {
                    borderColor: theme.colors.border.brand,
                    borderRadius: 8,
                    color: palettes.App['Custom #ffffff'],
                    fontFamily: 'Inter_400Regular',
                    fontSize: 15,
                    paddingBottom: 8,
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingTop: 8,
                  },
                  dimensions.width
                )}
                value={search}
              />
            </View>
          </View>
        </View>

        <SpoonacularApi.FetchSearchResultsGET
          apiKey={Constants['SPOONACULAR_API']}
          handlers={{
            onData: fetchData => {
              try {
                console.log(fetchData);
              } catch (err) {
                console.error(err);
              }
            },
          }}
          number={5}
          query={search}
        >
          {({ loading, error, data, refetchSearchResults }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                <SimpleStyleFlashList
                  data={fetchData?.results}
                  estimatedItemSize={50}
                  horizontal={false}
                  inverted={false}
                  keyExtractor={(flashListData, index) => flashListData?.id}
                  listKey={'Keyboard Aware Scroll View->Fetch->FlashList'}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  renderItem={({ item, index }) => {
                    const flashListData = item;
                    return (
                      <>
                        {/* Card Touchable */}
                        <Touchable
                          onLongPress={() => {
                            try {
                              /* Navigate action skipped because Recipe Page is hidden */
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                          onPress={() => {
                            try {
                              navigation.navigate(
                                'RecipePageStylingScreen',
                                { id: flashListData?.id },
                                { pop: true }
                              );
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          {/* Card Container View */}
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignItems: 'center',
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
                            {/* Card View */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  paddingBottom: 20,
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                  paddingTop: 20,
                                  width: '100%',
                                },
                                dimensions.width
                              )}
                            >
                              {/* Recipe Image */}
                              <ImageBackground
                                resizeMode={'cover'}
                                source={imageSource(`${flashListData?.image}`)}
                                style={StyleSheet.applyWidth(
                                  {
                                    borderColor: theme.colors.text.strong,
                                    borderRadius: 20,
                                    height: 230,
                                    overflow: 'hidden',
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* I Want This Container View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      paddingBottom: 16,
                                      paddingLeft: 16,
                                      paddingRight: 16,
                                      paddingTop: 16,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* I Want This View */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      { alignItems: 'flex-end' },
                                      dimensions.width
                                    )}
                                  >
                                    {/* I Want This Button */}
                                    <Button
                                      accessible={true}
                                      iconPosition={'left'}
                                      style={StyleSheet.applyWidth(
                                        {
                                          backgroundColor:
                                            palettes.App['Custom Color'],
                                          borderRadius: 64,
                                          fontFamily: 'Inter_500Medium',
                                          fontSize: 12,
                                          minHeight: 0,
                                          minWidth: 0,
                                          paddingBottom: 8,
                                          paddingLeft: 10,
                                          paddingRight: 10,
                                          paddingTop: 8,
                                          textAlign: 'center',
                                        },
                                        dimensions.width
                                      )}
                                      title={'I Want This!'}
                                    />
                                  </View>
                                </View>
                                {/* Recipes Title View */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    { marginTop: 60, paddingRight: 10 },
                                    dimensions.width
                                  )}
                                >
                                  {/* Recipe Title View 2 */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        backgroundColor: 'rgba(0, 0, 0, 0)',
                                        borderBottomWidth: 1,
                                        borderColor: 'rgba(0, 0, 0, 0)',
                                        borderLeftWidth: 1,
                                        borderTopWidth: 1,
                                        flexDirection: 'row',
                                        opacity: 1,
                                        paddingBottom: 12,
                                        paddingRight: 12,
                                        position: 'relative',
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Background Colour View */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          backgroundColor: '"rgb(0, 0, 0)"',
                                          borderColor: 'rgba(0, 0, 0, 0)',
                                          height: '100%',
                                          opacity: 0.59,
                                          position: 'absolute',
                                          width: '100%',
                                        },
                                        dimensions.width
                                      )}
                                    />
                                    {/* Recipe Text View */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          borderColor: 'rgba(0, 0, 0, 0)',
                                          flex: 1,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      {/* Recipe Text */}
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color:
                                              palettes.App['Custom #ffffff'],
                                            fontFamily: 'Inter_600SemiBold',
                                            fontSize: 18,
                                            lineHeight: 18,
                                            marginBottom: 10,
                                            marginLeft: 5,
                                            marginTop: 10,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {flashListData?.title}
                                      </Text>
                                    </View>
                                    {/* Star Rating View */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          justifyContent: 'center',
                                          marginLeft: 8,
                                          marginRight: 5,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <StarRating
                                        isEditable={true}
                                        maxStars={5}
                                        starSize={16}
                                        activeColor={
                                          theme.colors.background.danger
                                        }
                                        inactiveColor={theme.colors.text.light}
                                        rating={ratingValue}
                                      />
                                    </View>
                                  </View>
                                </View>
                              </ImageBackground>
                            </View>
                          </View>
                        </Touchable>
                      </>
                    );
                  }}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                />
                {/* No match view */}
                <>
                  {!(fetchData?.results?.length === 0) ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          paddingBottom: 20,
                          paddingLeft: 20,
                          paddingRight: 20,
                          paddingTop: 20,
                          width: '100%',
                        },
                        dimensions.width
                      )}
                    >
                      {/* Card View */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            gap: 20,
                            height: 300,
                            justifyContent: 'flex-start',
                            marginTop: 20,
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
                          {'No matching recipes found.'}
                        </Text>

                        <Pressable
                          onPress={() => {
                            try {
                              setSearch('');
                            } catch (err) {
                              console.error(err);
                            }
                          }}
                        >
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                theme.typography.body1,
                                { color: theme.colors.text.light }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Clear Search'}
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  )}
                </>
              </>
            );
          }}
        </SpoonacularApi.FetchSearchResultsGET>
        <Spacer left={8} right={8} bottom={50} top={50} />
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(RecipeSearchStylingScreen);
