import React from 'react';
import {
  Link,
  ScreenContainer,
  Spacer,
  WebView,
  withTheme,
} from '@draftbit/ui';
import * as WebBrowser from 'expo-web-browser';
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import * as SpoonacularApi from '../apis/SpoonacularApi.js';
import HeaderBlock from '../components/HeaderBlock';
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

const defaultProps = { id: 324694 };

const RecipePageStylingScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const params = useParams();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
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
        {/* Primal Title View */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'column', marginTop: 16 },
            dimensions.width
          )}
        >
          {/* Primal Text */}
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
            {/* Recipe Text */}
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
                    textAlign: 'center',
                  }
                ),
                dimensions.width
              )}
            >
              {'Recipe Guide'}
            </Text>
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
              {' Here is the recipe you chose... Enjoy!'}
            </Text>
          </View>
        </View>
        {/* Fetch 2 */}
        <SpoonacularApi.FetchRecipeDetailsGET
          apiKey={'4378f6dd95d1417fa748848913751e0d'}
          id={params?.id ?? defaultProps.id}
        >
          {({ loading, error, data, refetchRecipeDetails }) => {
            const fetch2Data = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                {/* Image And Text View */}
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
                  {/* Recipe Image */}
                  <Image
                    resizeMode={'cover'}
                    {...GlobalStyles.ImageStyles(theme)['Image'].props}
                    source={imageSource(`${fetch2Data?.image}`)}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ImageStyles(theme)['Image'].style,
                        {
                          height: 215,
                          overflow: 'hidden',
                          top: 20,
                          width: '90%',
                        }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* Recipe Title View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { marginBottom: 20, marginTop: 30, width: '85%' },
                      dimensions.width
                    )}
                  >
                    {/* Recipe Title Text */}
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
                      {fetch2Data?.title}
                    </Text>
                  </View>
                </View>
              </>
            );
          }}
        </SpoonacularApi.FetchRecipeDetailsGET>
        {/* Fetch 3 */}
        <SpoonacularApi.FetchNutritionGET
          api={Constants['SPOONACULAR_API']}
          id={params?.id ?? defaultProps.id}
        >
          {({ loading, error, data, refetchNutrition }) => {
            const fetch3Data = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                {/* Calories and Macros View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 16,
                    },
                    dimensions.width
                  )}
                >
                  {/* Calories View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row', marginRight: 5 },
                      dimensions.width
                    )}
                  >
                    {/* Calories Text */}
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
                            marginRight: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Calories:'}
                    </Text>
                    {/* Number */}
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
                      {fetch3Data?.calories}
                    </Text>
                  </View>
                  {/* Protein View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row', marginRight: 5 },
                      dimensions.width
                    )}
                  >
                    {/* Protein Text */}
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
                            marginRight: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Protein:'}
                    </Text>
                    {/* Number */}
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
                      {fetch3Data?.protein}
                    </Text>
                  </View>
                  {/* Fats View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row', marginRight: 5 },
                      dimensions.width
                    )}
                  >
                    {/* Fats Text */}
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
                            marginRight: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Fats: '}
                    </Text>
                    {/* Number */}
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
                      {fetch3Data?.fat}
                    </Text>
                  </View>
                  {/* Carbs View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row' },
                      dimensions.width
                    )}
                  >
                    {/* Carbs Text */}
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
                            marginRight: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Carbs:'}
                    </Text>
                    {/* Number */}
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
                      {fetch3Data?.carbs}
                    </Text>
                  </View>
                </View>
              </>
            );
          }}
        </SpoonacularApi.FetchNutritionGET>
        {/* Ingredients Text View */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'flex-start', marginTop: 20, paddingLeft: 16 },
            dimensions.width
          )}
        >
          {/* Ingredients Title Text */}
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
            {'Ingredients'}
          </Text>
        </View>
        {/* Fetch 4 */}
        <SpoonacularApi.FetchIngredientsGET
          apiKey={Constants['SPOONACULAR_API']}
          id={params?.id ?? defaultProps.id}
        >
          {({ loading, error, data, refetchIngredients }) => {
            const fetch4Data = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                {/* Ingredients Container View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-start',
                      marginTop: 20,
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
                        borderRadius: 20,
                        height: '100%',
                        opacity: 0.3,
                        position: 'absolute',
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  />
                  {/* Ingredients View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgba(0, 0, 0, 0)',
                        height: 200,
                        marginBottom: 20,
                        marginTop: 20,
                        position: 'relative',
                        width: '95%',
                      },
                      dimensions.width
                    )}
                  >
                    <FlatList
                      data={fetch4Data?.ingredients}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(listData, index) =>
                        listData?.id ??
                        listData?.uuid ??
                        index?.toString() ??
                        JSON.stringify(listData)
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={
                        'Scroll View->Fetch 4->Ingredients Container View->Ingredients View->List'
                      }
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const listData = item;
                        return (
                          <>
                            {/* Text View */}
                            <View
                              style={StyleSheet.applyWidth(
                                { flexDirection: 'row', marginTop: 5 },
                                dimensions.width
                              )}
                            >
                              {/* Ingredients Text */}
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
                                      fontFamily: 'Inter_400Regular',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {listData?.name}
                                {': '}
                              </Text>
                              {/* Ingredient weight Text */}
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
                                      fontFamily: 'Inter_400Regular',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {Math.ceil(listData?.amount?.metric?.value)}{' '}
                              </Text>
                              {/* Ingredients measurement Text */}
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
                                      fontFamily: 'Inter_400Regular',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {listData?.amount?.metric?.unit}
                              </Text>
                            </View>
                          </>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                      contentContainerStyle={StyleSheet.applyWidth(
                        {
                          marginBottom: 20,
                          marginLeft: 20,
                          marginTop: 20,
                          paddingBottom: 20,
                        },
                        dimensions.width
                      )}
                    />
                  </View>
                  {/* Scroll Image View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        bottom: 10,
                        flexDirection: 'row',
                        position: 'absolute',
                        right: 10,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Scroll Text */}
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
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Scroll'}
                    </Text>
                    {/* Green Hand Image */}
                    <Image
                      resizeMode={'cover'}
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      source={imageSource(Images['ScrollHandGreenImage'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { height: 40, width: 40 }
                        ),
                        dimensions.width
                      )}
                    />
                  </View>
                </View>
              </>
            );
          }}
        </SpoonacularApi.FetchIngredientsGET>
        {/* Method Title View */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'flex-start', marginTop: 16, paddingLeft: 16 },
            dimensions.width
          )}
        >
          {/* Method Text */}
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
            {'Method'}
          </Text>
        </View>

        <SpoonacularApi.FetchInstructionsGET
          apiKey={Constants['SPOONACULAR_API']}
          id={params?.id ?? defaultProps.id}
        >
          {({ loading, error, data, refetchInstructions }) => {
            const fetchData = data?.json;
            if (loading) {
              return <ActivityIndicator />;
            }

            if (error || data?.status < 200 || data?.status >= 300) {
              return <ActivityIndicator />;
            }

            return (
              <>
                {/* Method Container View */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-start',
                      marginTop: 16,
                      paddingLeft: 10,
                      paddingRight: 10,
                    },
                    dimensions.width
                  )}
                >
                  {/* Bacground Colour View */}
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
                  {/* Method View */}
                  <View
                    style={StyleSheet.applyWidth(
                      { marginBottom: 20, marginTop: 20, width: '80%' },
                      dimensions.width
                    )}
                  >
                    <FlatList
                      data={fetchData}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(listData, index) =>
                        listData?.id ??
                        listData?.uuid ??
                        index?.toString() ??
                        JSON.stringify(listData)
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={
                        'Scroll View->Fetch->Method Container View->Method View->List'
                      }
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item, index }) => {
                        const listData = item;
                        return (
                          <FlatList
                            data={listData?.steps}
                            horizontal={false}
                            inverted={false}
                            keyExtractor={(listData, index) =>
                              listData?.id ??
                              listData?.uuid ??
                              index?.toString() ??
                              JSON.stringify(listData)
                            }
                            keyboardShouldPersistTaps={'never'}
                            listKey={JSON.stringify(listData?.steps)}
                            nestedScrollEnabled={false}
                            numColumns={1}
                            onEndReachedThreshold={0.5}
                            renderItem={({ item, index }) => {
                              const listData = item;
                              return (
                                <>
                                  {/* Method Text View */}
                                  <View
                                    style={StyleSheet.applyWidth(
                                      { paddingRight: 10 },
                                      dimensions.width
                                    )}
                                  >
                                    {/* Method Text */}
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
                                            color:
                                              palettes.App['Custom #ffffff'],
                                            fontFamily: 'Inter_400Regular',
                                            marginBottom: 5,
                                            paddingRight: 5,
                                          }
                                        ),
                                        dimensions.width
                                      )}
                                    >
                                      {listData?.number}
                                      {'. '}
                                      {listData?.step}
                                    </Text>
                                  </View>
                                </>
                              );
                            }}
                            showsHorizontalScrollIndicator={true}
                            showsVerticalScrollIndicator={true}
                          />
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                      style={StyleSheet.applyWidth(
                        { height: 275 },
                        dimensions.width
                      )}
                      contentContainerStyle={StyleSheet.applyWidth(
                        {
                          marginBottom: 20,
                          marginLeft: 20,
                          marginTop: 20,
                          paddingBottom: 20,
                        },
                        dimensions.width
                      )}
                    />
                  </View>
                  {/* Scroll Image View */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        bottom: 10,
                        flexDirection: 'row',
                        position: 'absolute',
                        right: 10,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Scroll Text */}
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
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Scroll'}
                    </Text>
                    {/* Green Hand Image */}
                    <Image
                      resizeMode={'cover'}
                      {...GlobalStyles.ImageStyles(theme)['Image'].props}
                      source={imageSource(Images['ScrollHandGreenImage'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ImageStyles(theme)['Image'].style,
                          { height: 40, width: 40 }
                        ),
                        dimensions.width
                      )}
                    />
                  </View>
                </View>
              </>
            );
          }}
        </SpoonacularApi.FetchInstructionsGET>
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

export default withTheme(RecipePageStylingScreen);
