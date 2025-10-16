import React from 'react';
import {
  ActionSheet,
  ActionSheetItem,
  Circle,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleKeyboardAwareScrollView,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Modal,
  RefreshControl,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as PerformApi from '../apis/PerformApi.js';
import HeaderBlock from '../components/HeaderBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import isLoggedIn from '../global-functions/isLoggedIn';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import openCameraUtil from '../utils/openCamera';
import openImagePickerUtil from '../utils/openImagePicker';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const CommunityChatScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const safeAreaInsets = useSafeAreaInsets();
  const [imageUri, setImageUri] = React.useState('');
  const [sendingMsg, setSendingMsg] = React.useState(false);
  const [showAction, setShowAction] = React.useState(false);
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [textInputValue, setTextInputValue] = React.useState('');
  const [viewingImageUrl, setViewingImageUrl] = React.useState('');
  const [refreshingTestViewViewFetchList, setRefreshingTestViewViewFetchList] =
    React.useState(false);
  const listHeight = screenHeight => {
    return screenHeight - (imageUri ? 270 : 190);
  };
  const performSendCommunityChatPOST = PerformApi.useSendCommunityChatPOST();
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
      scrollable={false}
      hasBottomSafeArea={false}
      hasLeftSafeArea={true}
      hasRightSafeArea={true}
      hasSafeArea={false}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        { backgroundColor: palettes.App.Studily_Dark_UI, opacity: 0.8 },
        dimensions.width
      )}
    >
      <ActionSheet visible={Boolean(showAction)}>
        <ActionSheetItem
          color={theme.colors.text.strong}
          onPress={() => {
            const handler = async () => {
              try {
                const image = await openCameraUtil({
                  mediaTypes: 'Images',
                  allowsEditing: false,
                  cameraType: 'back',
                  videoMaxDuration: undefined,
                  quality: 0.2,
                  permissionErrorMessage:
                    'Sorry, we need camera permissions to make this work.',
                  showAlertOnPermissionError: true,
                  outputBase64: true,
                });

                setImageUri(image);
                setShowAction(false);
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          {...GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
            .props}
          label={'Camera'}
          style={StyleSheet.applyWidth(
            GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
              .style,
            dimensions.width
          )}
        />
        {/* Action Sheet Item 2 */}
        <ActionSheetItem
          color={theme.colors.text.strong}
          onPress={() => {
            const handler = async () => {
              try {
                const image = await openImagePickerUtil({
                  mediaTypes: 'Images',
                  allowsEditing: false,
                  quality: 0.2,
                  allowsMultipleSelection: false,
                  selectionLimit: 0,
                  outputBase64: true,
                });

                setImageUri(image);
                setShowAction(false);
              } catch (err) {
                console.error(err);
              }
            };
            handler();
          }}
          {...GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
            .props}
          label={'Gallery'}
          style={StyleSheet.applyWidth(
            GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
              .style,
            dimensions.width
          )}
        />
        {/* Action Sheet Item 3 */}
        <ActionSheetItem
          onPress={() => {
            try {
              setShowAction(false);
            } catch (err) {
              console.error(err);
            }
          }}
          {...GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
            .props}
          color={theme.colors.background.danger}
          label={'Cancel'}
          style={StyleSheet.applyWidth(
            GlobalStyles.ActionSheetItemStyles(theme)['Action Sheet Item']
              .style,
            dimensions.width
          )}
        />
      </ActionSheet>
      {/* Test View */}
      <View
        style={StyleSheet.applyWidth(
          { flex: 1, justifyContent: 'space-between' },
          dimensions.width
        )}
      >
        <HeaderBlock screenTitle={'Community Chat'} showMiddleName={true} />
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          <PerformApi.FetchGetCommunityChatGET refetchInterval={10000}>
            {({ loading, error, data, refetchGetCommunityChat }) => {
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
                  keyExtractor={(listData, index) =>
                    listData?.id ??
                    listData?.uuid ??
                    index?.toString() ??
                    JSON.stringify(listData)
                  }
                  listKey={'Test View->View->Fetch->List'}
                  nestedScrollEnabled={false}
                  numColumns={1}
                  onEndReachedThreshold={0.5}
                  pagingEnabled={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshingTestViewViewFetchList}
                      onRefresh={() => {
                        const handler = async () => {
                          try {
                            setRefreshingTestViewViewFetchList(true);
                            await refetchGetCommunityChat();
                            setRefreshingTestViewViewFetchList(false);
                          } catch (err) {
                            console.error(err);
                            setRefreshingTestViewViewFetchList(false);
                          }
                        };
                        handler();
                      }}
                    />
                  }
                  renderItem={({ item, index }) => {
                    const listData = item;
                    return (
                      <>
                        {/* Message Frame */}
                        <>
                          {!listData?._user?.name ? null : (
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'stretch',
                                  flexDirection: 'row',
                                  flexGrow: 1,
                                  flexShrink: 0,
                                  paddingBottom: 6,
                                  paddingTop: 12,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Left Side Frame */}
                              <View>
                                {/* Flex Frame for Touchable */}
                                <View>
                                  <Touchable>
                                    {/* Circle Image Frame */}
                                    <View
                                      style={StyleSheet.applyWidth(
                                        {
                                          flexGrow: 1,
                                          flexShrink: 0,
                                          paddingBottom: 12,
                                          paddingLeft: 12,
                                          paddingRight: 6,
                                          paddingTop: 18,
                                        },
                                        dimensions.width
                                      )}
                                    >
                                      <Circle
                                        {...GlobalStyles.CircleStyles(theme)[
                                          'Circle'
                                        ].props}
                                        style={StyleSheet.applyWidth(
                                          StyleSheet.compose(
                                            GlobalStyles.CircleStyles(theme)[
                                              'Circle'
                                            ].style,
                                            {
                                              backgroundColor:
                                                palettes.Brand[
                                                  'Strong Inverse'
                                                ],
                                              height: 40,
                                              width: 40,
                                            }
                                          ),
                                          dimensions.width
                                        )}
                                      >
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
                                                fontFamily:
                                                  'AROneSans_400Regular',
                                                fontSize: 18,
                                                textTransform: 'uppercase',
                                              }
                                            ),
                                            dimensions.width
                                          )}
                                        >
                                          {(listData?._user?.name).slice(0, 2)}
                                        </Text>
                                      </Circle>
                                    </View>
                                  </Touchable>
                                </View>
                              </View>
                              {/* Right Side Frame */}
                              <View
                                style={StyleSheet.applyWidth(
                                  { justifyContent: 'center', maxWidth: '61%' },
                                  dimensions.width
                                )}
                              >
                                {/* Message Bubble Frame */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      backgroundColor:
                                        palettes.App.Communial_Icon_BG,
                                      borderBottomRightRadius: 64,
                                      borderTopLeftRadius: 32,
                                      borderTopRightRadius: 64,
                                      flexGrow: 1,
                                      flexShrink: 0,
                                      justifyContent: 'center',
                                      paddingBottom: 12,
                                      paddingLeft: 12,
                                      paddingRight: 36,
                                      paddingTop: 12,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  {/* Rubik Text Style 12/18 Regular */}
                                  <>
                                    {!listData?.body ? null : (
                                      <Text
                                        accessible={true}
                                        selectable={false}
                                        style={StyleSheet.applyWidth(
                                          {
                                            color: palettes.App.Studily_Dark_UI,
                                            fontFamily: 'Inter_400Regular',
                                            fontSize: 12,
                                            lineHeight: 18,
                                            marginBottom: 4,
                                          },
                                          dimensions.width
                                        )}
                                      >
                                        {listData?.body}
                                      </Text>
                                    )}
                                  </>
                                  <Touchable
                                    onPress={() => {
                                      try {
                                        setViewingImageUrl(
                                          listData?.post_image?.url
                                        );
                                        setShowImageModal(true);
                                      } catch (err) {
                                        console.error(err);
                                      }
                                    }}
                                  >
                                    <>
                                      {!listData?.post_image?.url ? null : (
                                        <Image
                                          resizeMode={'cover'}
                                          {...GlobalStyles.ImageStyles(theme)[
                                            'Image'
                                          ].props}
                                          source={imageSource(
                                            `${listData?.post_image?.url}`
                                          )}
                                          style={StyleSheet.applyWidth(
                                            StyleSheet.compose(
                                              GlobalStyles.ImageStyles(theme)[
                                                'Image'
                                              ].style,
                                              {
                                                borderRadius: 12,
                                                height: 200,
                                                width: 200,
                                              }
                                            ),
                                            dimensions.width
                                          )}
                                        />
                                      )}
                                    </>
                                  </Touchable>
                                </View>
                              </View>
                            </View>
                          )}
                        </>
                      </>
                    );
                  }}
                  showsHorizontalScrollIndicator={true}
                  showsVerticalScrollIndicator={true}
                  snapToAlignment={'start'}
                  inverted={true}
                  keyboardShouldPersistTaps={'handled'}
                  style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                />
              );
            }}
          </PerformApi.FetchGetCommunityChatGET>
          <KeyboardAvoidingView
            behavior={'padding'}
            enabled={true}
            keyboardVerticalOffset={0}
            androidBehavior={'height'}
            iosBehavior={'padding'}
            iosKeyboardVerticalOffset={120}
          >
            {/* Keyboard with Emoticons Group */}
            <View
              style={StyleSheet.applyWidth(
                { justifyContent: 'flex-start' },
                dimensions.width
              )}
            >
              {/* Message Frame */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexGrow: 0,
                    flexShrink: 0,
                    gap: 8,
                    paddingBottom: 12,
                    paddingLeft: 12,
                    paddingRight: 12,
                    paddingTop: 12,
                  },
                  dimensions.width
                )}
              >
                {/* Flex Frame for Touchable */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexGrow: 0, flexShrink: 0 },
                    dimensions.width
                  )}
                >
                  <Touchable
                    onPress={() => {
                      try {
                        Keyboard.dismiss();
                        setShowAction(true);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    {/* Flex Frame for Icons */}
                    <View>
                      <Icon
                        color={palettes.App['Custom Color']}
                        name={'Entypo/images'}
                        size={30}
                      />
                    </View>
                  </Touchable>
                </View>
                {/* Flex Input */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderColor: theme.colors.border.brand,
                      borderRadius: 20,
                      borderWidth: 1,
                      flexGrow: 1,
                      flexShrink: 0,
                      marginLeft: 8,
                      paddingBottom: imageUri ? 8 : 0,
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
                        setTextInputValue(newTextInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    webShowOutline={true}
                    placeholder={'Type something...'}
                    placeholderTextColor={theme.colors.text.light}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.Brand['Strong Inverse'],
                        fontFamily: 'Rubik_400Regular',
                        marginLeft: 12,
                        marginRight: 12,
                        maxWidth: dimensions.width - 140,
                        paddingBottom: 15,
                        paddingLeft: 12,
                        paddingRight: 12,
                        paddingTop: 15,
                      },
                      dimensions.width
                    )}
                    value={textInputValue}
                  />
                  <>
                    {!imageUri ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          { height: 80, paddingLeft: 20, width: 100 },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              position: 'absolute',
                              right: 0,
                              top: 0,
                              zIndex: 10,
                            },
                            dimensions.width
                          )}
                        >
                          <Circle
                            {...GlobalStyles.CircleStyles(theme)['Circle']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.CircleStyles(theme)['Circle']
                                  .style,
                                { backgroundColor: theme.colors.text.medium }
                              ),
                              dimensions.width
                            )}
                          >
                            <IconButton
                              onPress={() => {
                                try {
                                  setImageUri(null);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              color={palettes.Brand.Surface}
                              icon={'Entypo/cross'}
                              size={24}
                            />
                          </Circle>
                        </View>
                        <Image
                          resizeMode={'cover'}
                          {...GlobalStyles.ImageStyles(theme)['Image'].props}
                          source={imageSource(`${imageUri}`)}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.ImageStyles(theme)['Image'].style,
                              { height: '100%', width: '100%' }
                            ),
                            dimensions.width
                          )}
                        />
                      </View>
                    )}
                  </>
                </View>
                {/* Flex Frame for Touchable */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexGrow: 0, flexShrink: 0 },
                    dimensions.width
                  )}
                >
                  <Touchable
                    onPress={() => {
                      const handler = async () => {
                        try {
                          setSendingMsg(true);
                          const res = (
                            await performSendCommunityChatPOST.mutateAsync({
                              body: textInputValue,
                              image: imageUri,
                            })
                          )?.json;
                          if (res?.message) {
                          } else {
                            setTextInputValue('');
                            setImageUri(null);
                          }

                          setSendingMsg(false);
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    activeOpacity={1}
                    disabled={Boolean(
                      !(textInputValue || imageUri) || sendingMsg
                    )}
                    disabledOpacity={0.5}
                  >
                    <Circle
                      bgColor={palettes.App.Communical_Primary_Green_CTA}
                      size={48}
                      style={StyleSheet.applyWidth(
                        { backgroundColor: palettes.App['Custom Color'] },
                        dimensions.width
                      )}
                    >
                      {/* Flex Frame for Icons */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            flexGrow: 0,
                            flexShrink: 0,
                            justifyContent: 'center',
                          },
                          dimensions.width
                        )}
                      >
                        <Icon
                          size={24}
                          color={palettes.Brand['Strong Inverse']}
                          name={'FontAwesome/send'}
                        />
                      </View>
                    </Circle>
                  </Touchable>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>

      <Modal
        animationType={'none'}
        supportedOrientations={['portrait', 'landscape']}
        presentationStyle={'fullScreen'}
        transparent={true}
        visible={Boolean(showImageModal)}
      >
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: palettes.App['Custom Color_22'],
              justifyContent: 'center',
              marginTop: 48,
            },
            dimensions.width
          )}
        >
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-end',
                backgroundColor: palettes.App['Custom Color_22'],
                marginTop: safeAreaInsets.top,
              },
              dimensions.width
            )}
          >
            <IconButton
              onPress={() => {
                try {
                  setShowImageModal(false);
                  setViewingImageUrl('');
                } catch (err) {
                  console.error(err);
                }
              }}
              size={32}
              color={palettes.Brand.Surface}
              icon={'Entypo/cross'}
              style={StyleSheet.applyWidth(
                { marginRight: 20 },
                dimensions.width
              )}
            />
          </View>
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            source={imageSource(`${viewingImageUrl}`)}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                { height: '100%', width: '100%' }
              ),
              dimensions.width
            )}
          />
        </View>
      </Modal>
    </ScreenContainer>
  );
};

export default withTheme(CommunityChatScreen);
