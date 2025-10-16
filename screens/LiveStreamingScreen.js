import React from 'react';
import {
  Button,
  Icon,
  IconButton,
  Pressable,
  ScreenContainer,
  SimpleStyleFlatList,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { ActivityIndicator, StatusBar, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AgoraApi from '../apis/AgoraApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import * as AgoraSelector from '../custom-files/AgoraSelector';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const defaultProps = { channelId: 'dave' };

const LiveStreamingScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const params = useParams();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [broadcasterVideoState, setBroadcasterVideoState] = React.useState('');
  const [isJoined, setIsJoined] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [left, setLeft] = React.useState(false);
  const [peerIds, setPeerIds] = React.useState([]);
  const [showControl, setShowControl] = React.useState(false);
  const [showUsers, setShowUsers] = React.useState(false);
  const [watchingUid, setWatchingUid] = React.useState(0);
  const watchingUidRef = React.useRef(0); // Keep ref in sync with state for event listeners
  
  // Helper to update both state and ref
  const updateWatchingUid = React.useCallback((uid) => {
    watchingUidRef.current = uid;
    setWatchingUid(uid);
  }, []);
  
  const joinChannel = () => {
    AgoraEngine.current.joinChannel(
      null,
      props.route.param?.channelId || Constants.STREAMING_CHANNEL,
      null,
      Constants.AUTH_UUID
    );
  };

  const leaveChannel = () => {
    AgoraEngine.current.leaveChannel();
  };

  const onSwitchCamera = () => {
    AgoraEngine.current.switchCamera();
  };

  const showRemoteVideoState = () => {
    return broadcasterVideoState == VideoRemoteState?.Decoding;
  };

  const toggleAudio = () => {
    AgoraEngine.current.muteLocalAudioStream(!isMuted);
  };

  const videoStateMessage = () => {
    switch (broadcasterVideoState) {
      case VideoRemoteState.Stopped:
        return 'Video turned off by Host';

      case VideoRemoteState.Frozen:
        return 'Connection Issue, Please Wait';

      case VideoRemoteState.Failed:
        return 'Network Error';

      default:
        return 'No state';
    }
  };
  const {
    RtcEngine,
    ChannelProfile,
    ClientRole,
    RtcLocalView,
    RtcRemoteView,
    VideoRemoteState,
    VideoRenderMode,
  } = AgoraSelector;
  const AgoraEngine = React.useRef();
  // const [broadcasterVideoState, setBroadcasterVideoState] = React.useState(
  //     VideoRemoteState?.Decoding
  // );

  const init = async () => {
    AgoraEngine.current = await RtcEngine.create(Constants.AGORA_APP_ID);
    AgoraEngine.current.enableVideo();
    AgoraEngine.current.setChannelProfile(ChannelProfile.LiveBroadcasting);
    AgoraEngine.current.setClientRole(ClientRole.Broadcaster);
    
    // Start local camera preview - CRITICAL for video to show
    AgoraEngine.current.startPreview();

    AgoraEngine.current.addListener('RemoteVideoStateChanged', (uid, state) => {
      console.log('RemoteVideoStateChanged', { uid, state });
      // Only update video state if we're watching this user
      if (uid === watchingUid || watchingUid === 0) {
        setBroadcasterVideoState(state);
      }
    });

    AgoraEngine.current.addListener('UserJoined', (uid, elapsed) => {
      console.log('UserJoined', { uid, elapsed });
      // Automatically watch the first user who joins
      setWatchingUid(prevUid => {
        if (prevUid === 0 || prevUid === null) {
          console.log('Setting watchingUid to first joined user:', uid);
          return uid;
        }
        return prevUid;
      });
    });

    AgoraEngine.current.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', { uid, reason });
      // If the user we're watching goes offline, reset
      if (uid === watchingUid) {
        setWatchingUid(0);
        setBroadcasterVideoState(VideoRemoteState?.Stopped);
      }
    });

    AgoraEngine.current.addListener(
      'JoinChannelSuccess',
      (channel, uid, elapsed) => {
        console.log('JoinChannelSuccess', channel, uid, elapsed);
        setIsJoined(true);
      }
    );
    AgoraEngine.current.addListener('LeaveChannel', (channel, uid) => {
      console.log('Leave channel success', channel, uid);
      setIsJoined(false);
      if (uid == watchingUid) setWatchingUid(null);
    });
    AgoraEngine.current.addListener(
      'LocalAudioStateChanged',
      (state, error) => {
        console.log('audio state param ', { state, error });
        switch (state) {
          case 0: {
            setIsMuted(true);
            break;
          }
          case 1:
          case 2: {
            setIsMuted(false);
            break;
          }
        }
      }
    );
  };

  // const rtcProps = {
  //     appId: '9e77f9e2fe0240139905db0f62204ffd',
  //     channel: 'dave',
  //   };
  React.useEffect(() => {
    console.log('auth id ', Constants.AUTH_UUID);
    // const [broadcasterVideoState, setBroadcasterVideoState] = React.useState(
    //     VideoRemoteState?.Decoding
    // );
    setBroadcasterVideoState(VideoRemoteState?.Decoding);
    init()
      .then(() => {
        AgoraEngine.current.joinChannel(
          null, //'007eJxTYMh8LL+pxPrlXQvrWk+rotybKVkLJsxqdnrtK/ha6tl+108KDJap5uZplqlGaakGRiYGhsaWlgamKUkGaWZGRgYmaWkpjIuC0xsCGRn2eEYzMzJAIIjPwpCSWJbKwAAAWzcfKQ==',
          props.route.param?.channelId || Constants.STREAMING_CHANNEL,
          null,
          Constants.AUTH_UUID
        );
      })
      .catch(e => {
        console.log('error ', e);
      });

    return () => {
      // Proper cleanup
      AgoraEngine?.current?.stopPreview();
      AgoraEngine?.current?.destroy();
    };
  }, []);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      console.log(watchingUid);
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
      hasSafeArea={true}
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: palettes.App.Studily_Dark_UI,
          flex: 1,
          opacity: 0.8,
        },
        dimensions.width
      )}
    >
      {/* Container */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            width: '100%',
          },
          dimensions.width
        )}
      >
        {/* Not joined */}
        <>
          {isJoined ? null : (
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', flex: 1, justifyContent: 'center' },
                dimensions.width
              )}
            >
              <ActivityIndicator
                animating={true}
                hidesWhenStopped={true}
                size={'small'}
                {...GlobalStyles.ActivityIndicatorStyles(theme)[
                  'Activity Indicator'
                ].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.ActivityIndicatorStyles(theme)[
                    'Activity Indicator'
                  ].style,
                  dimensions.width
                )}
              />
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  dimensions.width
                )}
              >
                {'Joining Stream, Please wait'}
              </Text>
            </View>
          )}
        </>
        {/* Joined */}
        <>
          {!isJoined ? null : (
            <View
              style={StyleSheet.applyWidth(
                { flex: 1, height: '100%', width: '100%' },
                dimensions.width
              )}
            >
              {/* Remote */}
              <>
                {!watchingUid ? null : (
                  <View
                    style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
                  >
                    {/* Remote */}
                    <>
                      {!showRemoteVideoState() ? null : (
                        <Utils.CustomCodeErrorBoundary>
                          <RtcRemoteView.SurfaceView
                            uid={watchingUid}
                            style={{
                              flex: 1,
                            }}
                            channelId={
                              props.route.param?.channelId ||
                              Constants.STREAMING_CHANNEL
                            }
                            zOrderMediaOverlay={true}
                            renderMode={VideoRenderMode.Hidden}
                          />
                        </Utils.CustomCodeErrorBoundary>
                      )}
                    </>
                    <>
                      {showRemoteVideoState() ? null : (
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              alignItems: 'center',
                              flex: 1,
                              justifyContent: 'center',
                            },
                            dimensions.width
                          )}
                        >
                          <ActivityIndicator
                            animating={true}
                            hidesWhenStopped={true}
                            size={'small'}
                            {...GlobalStyles.ActivityIndicatorStyles(theme)[
                              'Activity Indicator'
                            ].props}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.ActivityIndicatorStyles(theme)[
                                'Activity Indicator'
                              ].style,
                              dimensions.width
                            )}
                          />
                        </View>
                      )}
                    </>
                  </View>
                )}
              </>
              {/* Local 2 */}
              <>
                {!(watchingUid
                  ? dimensions.height > dimensions.width
                  : true) ? null : (
                  <Utils.CustomCodeErrorBoundary>
                    <RtcLocalView.SurfaceView
                      style={{
                        flex: 1,
                      }}
                      channelId={
                        props.route.param?.channelId ||
                        Constants.STREAMING_CHANNEL
                      }
                    />
                  </Utils.CustomCodeErrorBoundary>
                )}
              </>
            </View>
          )}
        </>
      </View>
      {/* Absolute Overlay */}
      <View
        style={StyleSheet.applyWidth(
          { bottom: 0, left: 0, position: 'absolute', right: 0, top: 0 },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            { flex: 1, justifyContent: 'space-between', zIndex: -1 },
            dimensions.width
          )}
        >
          {/* Header */}
          <>
            {!showControl ? null : (
              <View>
                {/* Back Button View */}
                <View
                  style={StyleSheet.applyWidth(
                    { justifyContent: 'center' },
                    dimensions.width
                  )}
                >
                  {/* Button Touchable */}
                  <Touchable
                    onPress={() => {
                      try {
                        navigation.goBack();
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    style={StyleSheet.applyWidth(
                      { marginBottom: 5, marginLeft: 5, marginTop: 5 },
                      dimensions.width
                    )}
                  >
                    <Icon
                      color={palettes.App['Custom Color']}
                      name={'Ionicons/arrow-back-circle-sharp'}
                      size={43}
                    />
                  </Touchable>
                </View>
              </View>
            )}
          </>
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'stretch', flex: 1, flexDirection: 'row' },
              dimensions.width
            )}
          >
            <Button
              accessible={true}
              iconPosition={'left'}
              onPress={() => {
                const handler = async () => {
                  try {
                    console.log('pressed');
                    setShowControl(true);
                    await waitUtil({ milliseconds: 2000 });
                    setShowControl(false);
                  } catch (err) {
                    console.error(err);
                  }
                };
                handler();
              }}
              title={'Get Started'}
              {...GlobalStyles.ButtonStyles(theme)['Button'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ButtonStyles(theme)['Button'].style,
                  theme.typography.button,
                  {
                    backgroundColor: palettes.App.Transparent,
                    color: palettes.App.Transparent,
                    width: '100%',
                  }
                ),
                dimensions.width
              )}
            />
          </View>
          {/* Button Container */}
          <>
            {!showControl ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App.Studily_Dark_Primary,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    opacity: 1,
                    paddingBottom: 10,
                    paddingTop: 10,
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                {/* switch */}
                <Touchable
                  onPress={() => {
                    try {
                      onSwitchCamera();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <Icon
                      size={24}
                      color={palettes.App['Custom Color']}
                      name={'Entypo/cycle'}
                    />
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
                            marginTop: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Switch'}
                    </Text>
                  </View>
                </Touchable>
                {/* leave */}
                <Touchable
                  onPress={() => {
                    try {
                      leaveChannel();
                      navigation.goBack();
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    <Icon
                      size={24}
                      color={palettes.App['Custom Color']}
                      name={'Feather/log-out'}
                    />
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
                            marginTop: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Leave'}
                    </Text>
                  </View>
                </Touchable>
                {/* Audio */}
                <Touchable
                  onPress={() => {
                    try {
                      toggleAudio();
                      setIsMuted(!isMuted);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center' },
                      dimensions.width
                    )}
                  >
                    {/* muted */}
                    <>
                      {!isMuted ? null : (
                        <Icon
                          size={24}
                          color={palettes.App['Custom Color_8']}
                          name={'Ionicons/volume-mute'}
                        />
                      )}
                    </>
                    {/* unmuted */}
                    <>
                      {isMuted ? null : (
                        <Icon
                          size={24}
                          color={palettes.App['Custom Color']}
                          name={'AntDesign/sound'}
                        />
                      )}
                    </>
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
                            marginTop: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {isMuted ? 'Unmute' : 'Mute'}
                    </Text>
                  </View>
                </Touchable>
                {/* Users */}
                <Touchable
                  onPress={() => {
                    try {
                      setShowUsers(true);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                >
                  <View
                    style={StyleSheet.applyWidth(
                      { alignItems: 'center', justifyContent: 'center' },
                      dimensions.width
                    )}
                  >
                    <Icon
                      size={24}
                      color={palettes.App['Custom Color']}
                      name={'FontAwesome/users'}
                    />
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
                            marginTop: 5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Users'}
                    </Text>
                  </View>
                </Touchable>
              </View>
            )}
          </>
          {/* User list */}
          <>
            {!showUsers ? null : (
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: theme.colors.text.light,
                    bottom: 0,
                    left: 0,
                    padding: 12,
                    position: 'absolute',
                    right: 0,
                    top: 0,
                  },
                  dimensions.width
                )}
              >
                {/* Header */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', flexDirection: 'row' },
                    dimensions.width
                  )}
                >
                  <IconButton
                    onPress={() => {
                      try {
                        setShowUsers(false);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    size={32}
                    color={theme.colors.text.strong}
                    icon={'AntDesign/caretleft'}
                  />
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      dimensions.width
                    )}
                  >
                    {'Users'}
                  </Text>
                </View>
                {/* Users */}
                <AgoraApi.FetchGetChannelUserListGET
                  appId={Constants['AGORA_APP_ID']}
                  channelName={'dave'}
                >
                  {({ loading, error, data, refetchGetChannelUserList }) => {
                    const usersData = data?.json;
                    if (loading) {
                      return <ActivityIndicator />;
                    }

                    if (error || data?.status < 200 || data?.status >= 300) {
                      return <ActivityIndicator />;
                    }

                    return (
                      <SimpleStyleFlatList
                        data={usersData?.data?.broadcasters}
                        decelerationRate={'normal'}
                        horizontal={false}
                        inverted={false}
                        keyExtractor={(listData, index) => index}
                        keyboardShouldPersistTaps={'never'}
                        listKey={
                          'Absolute Overlay->View->User list->Users->List'
                        }
                        nestedScrollEnabled={false}
                        numColumns={1}
                        onEndReachedThreshold={0.5}
                        pagingEnabled={false}
                        renderItem={({ item, index }) => {
                          const listData = item;
                          return (
                            <>
                              {!(listData !== Constants['AUTH_UUID']) ? null : (
                                <Pressable
                                  onPress={() => {
                                    try {
                                      setWatchingUid(listData);
                                      setShowUsers(false);
                                    } catch (err) {
                                      console.error(err);
                                    }
                                  }}
                                >
                                  <View
                                    style={StyleSheet.applyWidth(
                                      {
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingBottom: 4,
                                        paddingLeft: 12,
                                        paddingRight: 12,
                                        paddingTop: 4,
                                      },
                                      dimensions.width
                                    )}
                                  >
                                    <Text
                                      accessible={true}
                                      selectable={false}
                                      {...GlobalStyles.TextStyles(theme)['Text']
                                        .props}
                                      style={StyleSheet.applyWidth(
                                        GlobalStyles.TextStyles(theme)['Text']
                                          .style,
                                        dimensions.width
                                      )}
                                    >
                                      {listData}
                                    </Text>
                                    <IconButton
                                      onPress={() => {
                                        try {
                                          setWatchingUid(listData);
                                          setShowUsers(false);
                                        } catch (err) {
                                          console.error(err);
                                        }
                                      }}
                                      size={32}
                                      color={theme.colors.branding.primary}
                                      disabled={Boolean(
                                        watchingUid === Constants['AUTH_UUID']
                                      )}
                                      icon={'AntDesign/eye'}
                                    />
                                  </View>
                                </Pressable>
                              )}
                            </>
                          );
                        }}
                        showsHorizontalScrollIndicator={true}
                        showsVerticalScrollIndicator={true}
                        snapToAlignment={'start'}
                      />
                    );
                  }}
                </AgoraApi.FetchGetChannelUserListGET>
              </View>
            )}
          </>
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(LiveStreamingScreen);
