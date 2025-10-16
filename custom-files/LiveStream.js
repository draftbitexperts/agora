import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    PermissionsAndroid,
    ActivityIndicator,
    Dimensions,
    Platform,
    TouchableOpacity,
} from 'react-native';

import {
    createAgoraRtcEngine,
    ChannelProfileType,
    ClientRoleType,
    RtcSurfaceView,
    VideoRemoteState,
} from 'react-native-agora';

const dimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

const videoStateMessage = (state) => {
    switch (state) {
        case VideoRemoteState.VideoRemoteStateStopped:
            return 'Video turned off by Host';

        case VideoRemoteState.VideoRemoteStateFrozen:
            return 'Connection Issue, Please Wait';

        case VideoRemoteState.VideoRemoteStateFailed:
            return 'Network Error';

        default:
            return 'Loading...';
    }
};

async function requestCameraAndAudioPermission() {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.CAMERA,
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
        if (
            granted['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.CAMERA'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
            console.log('You can use the cameras & mic');
        } else {
            console.log('Permission denied');
        }
    } catch (err) {
        console.warn(err);
    }
}

export const Index = (props) => {
    const isBroadcaster = props?.isBroadcaster || false;
    const appId = props?.appId || '9e77f9e2fe0240139905db0f62204ffd';
    const channelName = props?.channelName || 'test';
    const token = props?.token || null;

    const [joined, setJoined] = useState(false);
    const [remoteUid, setRemoteUid] = useState(null);
    const [broadcasterVideoState, setBroadcasterVideoState] = useState(
        VideoRemoteState.VideoRemoteStateDecoding,
    );
    const agoraEngineRef = useRef(null);

    const init = async () => {
        try {
            // Create Agora RTC Engine
            agoraEngineRef.current = createAgoraRtcEngine();

            // Initialize the engine with App ID
            agoraEngineRef.current.initialize({
                appId: appId,
                channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
            });

            // Enable video module
            agoraEngineRef.current.enableVideo();

            // Register event handlers
            agoraEngineRef.current.registerEventHandler({
                onJoinChannelSuccess: (connection, elapsed) => {
                    console.log('Join channel success', connection, elapsed);
                    setJoined(true);
                },
                onUserJoined: (connection, uid, elapsed) => {
                    console.log('Remote user joined', uid, elapsed);
                    setRemoteUid(uid);
                },
                onUserOffline: (connection, uid, reason) => {
                    console.log('Remote user left', uid, reason);
                    setRemoteUid(null);
                },
                onRemoteVideoStateChanged: (connection, uid, state, reason, elapsed) => {
                    console.log('Remote video state changed', uid, state, reason);
                    if (uid === 1 || !isBroadcaster) {
                        setBroadcasterVideoState(state);
                    }
                },
                onError: (err, msg) => {
                    console.log('Agora Error:', err, msg);
                },
            });

            // Set client role
            if (isBroadcaster) {
                agoraEngineRef.current.setClientRole(ClientRoleType.ClientRoleBroadcaster);
                // Start preview for broadcaster
                agoraEngineRef.current.startPreview();
            } else {
                agoraEngineRef.current.setClientRole(ClientRoleType.ClientRoleAudience);
            }
        } catch (error) {
            console.error('Error initializing Agora:', error);
        }
    };

    const joinChannel = async () => {
        try {
            const uid = isBroadcaster ? 1 : 0;
            await agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                clientRoleType: isBroadcaster
                    ? ClientRoleType.ClientRoleBroadcaster
                    : ClientRoleType.ClientRoleAudience,
            });
        } catch (error) {
            console.error('Error joining channel:', error);
        }
    };

    const onSwitchCamera = () => {
        try {
            agoraEngineRef.current?.switchCamera();
        } catch (error) {
            console.error('Error switching camera:', error);
        }
    };

    useEffect(() => {
        const setupAgora = async () => {
            if (Platform.OS === 'android') {
                await requestCameraAndAudioPermission();
            }
            await init();
            await joinChannel();
        };

        setupAgora();

        return () => {
            const cleanup = async () => {
                try {
                    await agoraEngineRef.current?.leaveChannel();
                    agoraEngineRef.current?.unregisterEventHandler();
                    agoraEngineRef.current?.release();
                } catch (error) {
                    console.error('Error during cleanup:', error);
                }
            };
            cleanup();
        };
    }, []);

    const renderHost = () => {
        const uidToShow = remoteUid || 1;
        
        return broadcasterVideoState === VideoRemoteState.VideoRemoteStateDecoding ||
            broadcasterVideoState === VideoRemoteState.VideoRemoteStateStarting ? (
            <RtcSurfaceView
                canvas={{
                    uid: uidToShow,
                    renderMode: 1, // Hidden mode
                    sourceType: 1, // Remote video
                }}
                style={styles.fullscreen}
            />
        ) : (
            <View style={styles.broadcasterVideoStateMessage}>
                <Text style={styles.broadcasterVideoStateMessageText}>
                    {videoStateMessage(broadcasterVideoState)}
                </Text>
            </View>
        );
    };

    const renderLocal = () => (
        <RtcSurfaceView
            canvas={{
                uid: 0,
                renderMode: 1, // Hidden mode
                sourceType: 0, // Local video
            }}
            style={styles.fullscreen}
        />
    );

    return (
        <View style={styles.container}>
            {!joined ? (
                <>
                    <ActivityIndicator
                        size={60}
                        color="#222"
                        style={styles.activityIndicator}
                    />
                    <Text style={styles.loadingText}>Joining Stream, Please Wait</Text>
                </>
            ) : (
                <>
                    {isBroadcaster ? renderLocal() : renderHost()}
                    {isBroadcaster && (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={onSwitchCamera}>
                                <Text style={styles.buttonText}>Switch Camera</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    activityIndicator: {
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 18,
        color: '#fff',
    },
    fullscreen: {
        width: dimensions.width,
        height: dimensions.height,
    },
    buttonContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 50,
    },
    button: {
        width: 150,
        backgroundColor: '#fff',
        paddingVertical: 13,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 17,
        color: '#222',
    },
    broadcasterVideoStateMessage: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#222',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    broadcasterVideoStateMessageText: {
        color: '#fff',
        fontSize: 20,
    },
});

export default Index;
