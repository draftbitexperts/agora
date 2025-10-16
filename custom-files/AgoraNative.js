import React from 'react';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  RtcSurfaceView,
  RemoteVideoState as RemoteVideoStateV4,
  RenderModeType,
  LocalAudioStreamState,
  LocalAudioStreamError,
} from 'react-native-agora';

// Compatibility wrapper for RtcEngine to support v3 API
class RtcEngineWrapper {
  constructor(engine) {
    this._engine = engine;
    this._eventHandlers = {};
    this._registeredHandler = {
      onJoinChannelSuccess: (connection, elapsed) => {
        this._emitEvent('JoinChannelSuccess', connection.channelId, connection.localUid, elapsed);
      },
      onLeaveChannel: (connection, stats) => {
        this._emitEvent('LeaveChannel', connection.channelId, connection.localUid);
      },
      onUserJoined: (connection, remoteUid, elapsed) => {
        this._emitEvent('UserJoined', remoteUid, elapsed);
      },
      onUserOffline: (connection, remoteUid, reason) => {
        this._emitEvent('UserOffline', remoteUid, reason);
      },
      onRemoteVideoStateChanged: (connection, remoteUid, state, reason, elapsed) => {
        this._emitEvent('RemoteVideoStateChanged', remoteUid, state, reason, elapsed);
      },
      onLocalAudioStateChanged: (connection, state, error) => {
        this._emitEvent('LocalAudioStateChanged', state, error);
      },
      onError: (err, msg) => {
        this._emitEvent('Error', err, msg);
      },
    };
    this._engine.registerEventHandler(this._registeredHandler);
  }

  _emitEvent(eventName, ...args) {
    const handlers = this._eventHandlers[eventName];
    if (handlers) {
      handlers.forEach(handler => handler(...args));
    }
  }

  addListener(eventName, handler) {
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  }

  removeListener(eventName, handler) {
    if (this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = this._eventHandlers[eventName].filter(h => h !== handler);
    }
  }

  enableVideo() {
    return this._engine.enableVideo();
  }

  disableVideo() {
    return this._engine.disableVideo();
  }

  enableAudio() {
    return this._engine.enableAudio();
  }

  disableAudio() {
    return this._engine.disableAudio();
  }

  setChannelProfile(profile) {
    // Profile is already set during initialization in v4
    // This is a no-op for compatibility
    return Promise.resolve();
  }

  setClientRole(role) {
    const v4Role = role === 1 ? ClientRoleType.ClientRoleBroadcaster : ClientRoleType.ClientRoleAudience;
    return this._engine.setClientRole(v4Role);
  }

  joinChannel(token, channelName, optionalInfo, optionalUid) {
    return this._engine.joinChannel(token, channelName, optionalUid || 0, {
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  }

  leaveChannel() {
    return this._engine.leaveChannel();
  }

  switchCamera() {
    return this._engine.switchCamera();
  }

  muteLocalAudioStream(muted) {
    return this._engine.muteLocalAudioStream(muted);
  }

  muteLocalVideoStream(muted) {
    return this._engine.muteLocalVideoStream(muted);
  }

  startPreview() {
    return this._engine.startPreview();
  }

  stopPreview() {
    return this._engine.stopPreview();
  }

  destroy() {
    this._engine.unregisterEventHandler(this._registeredHandler);
    return this._engine.release();
  }

  release() {
    return this.destroy();
  }
}

// For backward compatibility with v3 naming
const RtcEngine = {
  create: async (appId) => {
    const engine = createAgoraRtcEngine();
    engine.initialize({
      appId: appId,
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
    });
    engine.enableVideo();
    return new RtcEngineWrapper(engine);
  },
};

const ChannelProfile = {
  Communication: ChannelProfileType.ChannelProfileCommunication,
  LiveBroadcasting: ChannelProfileType.ChannelProfileLiveBroadcasting,
  Game: ChannelProfileType.ChannelProfileGame,
};

const ClientRole = {
  Broadcaster: 1,
  Audience: 2,
};

// Video View Components with v4 API - MUST USE JSX SYNTAX!
const RtcLocalView = {
  SurfaceView: (props) => {
    // Extract only the props that are valid for v4 RtcSurfaceView
    const { style, canvas: customCanvas, renderMode, channelId, zOrderMediaOverlay, ...otherProps } = props;
    
    // Build the canvas configuration
    const canvasConfig = {
      uid: 0,
      sourceType: 0, // Local video
      renderMode: renderMode || RenderModeType.RenderModeHidden,
      ...(customCanvas || {}),
    };
    
    return (
      <RtcSurfaceView
        style={style}
        canvas={canvasConfig}
      />
    );
  },
};

const RtcRemoteView = {
  SurfaceView: (props) => {
    // Extract only the props that are valid for v4 RtcSurfaceView
    const { uid, style, canvas: customCanvas, renderMode, channelId, zOrderMediaOverlay, ...otherProps } = props;
    
    console.log('RtcRemoteView.SurfaceView rendering with:', { uid, renderMode, channelId });
    
    // Build the canvas configuration
    const canvasConfig = {
      uid: Number(uid) || 0,
      sourceType: 1, // Remote video
      renderMode: renderMode !== undefined ? renderMode : RenderModeType.RenderModeFit,
      ...(customCanvas || {}),
    };
    
    console.log('Canvas config:', canvasConfig);
    
    return (
      <RtcSurfaceView
        style={style}
        canvas={canvasConfig}
        zOrderMediaOverlay={zOrderMediaOverlay}
      />
    );
  },
};

const VideoRenderMode = {
  Hidden: RenderModeType.RenderModeHidden,
  Fit: RenderModeType.RenderModeFit,
  Adaptive: RenderModeType.RenderModeAdaptive,
};

// Backward compatible VideoRemoteState mapping (v3 to v4)
const VideoRemoteState = {
  // v3 API enum names mapped to v4 API enum values
  Stopped: RemoteVideoStateV4.RemoteVideoStateStopped,
  Frozen: RemoteVideoStateV4.RemoteVideoStateFrozen,
  Failed: RemoteVideoStateV4.RemoteVideoStateFailed,
  Starting: RemoteVideoStateV4.RemoteVideoStateStarting,
  Decoding: RemoteVideoStateV4.RemoteVideoStateDecoding,
  
  // Also include v4 API enum values for direct access (keeping old names for compatibility)
  VideoRemoteStateStopped: RemoteVideoStateV4.RemoteVideoStateStopped,
  VideoRemoteStateFrozen: RemoteVideoStateV4.RemoteVideoStateFrozen,
  VideoRemoteStateFailed: RemoteVideoStateV4.RemoteVideoStateFailed,
  VideoRemoteStateStarting: RemoteVideoStateV4.RemoteVideoStateStarting,
  VideoRemoteStateDecoding: RemoteVideoStateV4.RemoteVideoStateDecoding,
  
  // Also include v4 API enum values with correct v4 naming
  RemoteVideoStateStopped: RemoteVideoStateV4.RemoteVideoStateStopped,
  RemoteVideoStateFrozen: RemoteVideoStateV4.RemoteVideoStateFrozen,
  RemoteVideoStateFailed: RemoteVideoStateV4.RemoteVideoStateFailed,
  RemoteVideoStateStarting: RemoteVideoStateV4.RemoteVideoStateStarting,
  RemoteVideoStateDecoding: RemoteVideoStateV4.RemoteVideoStateDecoding,
};

export {
  RtcEngine,
  ChannelProfile,
  ClientRole,
  RtcLocalView,
  RtcRemoteView,
  VideoRemoteState,
  VideoRenderMode,
  // Also export v4 API directly
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  RtcSurfaceView,
  RenderModeType,
};
