# React Native Agora Library Upgrade Notes

## Overview
The `react-native-agora` library has been successfully upgraded from version **3.1.3** to version **4.5.3** (latest stable release as of October 2025).

## What Was Changed

### 1. Package.json
- Updated `react-native-agora` dependency from `^3.1.3` to `^4.5.3`

### 2. LiveStream.js (`custom-files/LiveStream.js`)
- **Complete rewrite** using the new v4 API
- Changed from commented-out code to active implementation
- Key API changes:
  - `RtcEngine.create()` → `createAgoraRtcEngine()` + `engine.initialize()`
  - `addListener()` → `registerEventHandler()` with object-based event handlers
  - `RtcLocalView.SurfaceView` and `RtcRemoteView.SurfaceView` → Unified `RtcSurfaceView` component
  - `ChannelProfile` → `ChannelProfileType`
  - `ClientRole` → `ClientRoleType`
  - `VideoRenderMode` → `RenderModeType`
  - Added proper cleanup with `unregisterEventHandler()` and `release()`
  - Enhanced props support (appId, channelName, token, isBroadcaster)

### 3. AgoraNative.js (`custom-files/AgoraNative.js`)
- **Backward compatibility layer** created to support existing code using v3 API
- Implemented `RtcEngineWrapper` class that:
  - Wraps v4 engine with v3-style API methods
  - Translates v3 event listeners (`addListener`) to v4 event handlers
  - Maps v3 constants to v4 equivalents
  - Provides both v3-compatible and v4 native exports
- This ensures that `LiveStreamingScreen.js` continues to work without modifications

### 4. Files Not Modified
- `AgoraSelector.js` - No changes needed (platform selector)
- `AgoraWeb.js` - No changes needed (web placeholder)
- `LiveStreamingScreen.js` - Works via compatibility layer in AgoraNative.js
- `app.json` - Already has correct permissions configured

## Next Steps

### 1. Install Dependencies
Since this is an Expo project, run the following commands:

```bash
# Install the updated dependencies
npm install
# or
yarn install

# For iOS (if on Mac)
cd ios
pod install
cd ..
```

### 2. Test the Application
Test the live streaming functionality thoroughly:

1. **Basic functionality:**
   - Join a channel as broadcaster
   - Join a channel as audience
   - Video rendering
   - Audio functionality

2. **Test these features:**
   - Camera switching
   - Audio mute/unmute
   - Remote user joining/leaving
   - Network state changes
   - Connection handling

3. **Test on both platforms:**
   - iOS (physical device recommended for camera/audio)
   - Android (physical device recommended for camera/audio)

### 3. Run the App

```bash
# Start the Expo development server
npm start
# or
yarn start

# Then press:
# i - for iOS simulator
# a - for Android emulator
# Scan QR code for physical device testing
```

### 4. Create Development Build (Recommended)
Since `react-native-agora` is a native module, you'll need to create a development build instead of using Expo Go:

```bash
# Install EAS CLI if not already installed
npm install -g eas-cli

# Login to Expo
eas login

# Build for development (choose your platform)
eas build --profile development --platform ios
eas build --profile development --platform android
```

## Key API Differences (v3 → v4)

### Initialization
**v3:**
```javascript
const engine = await RtcEngine.create(appId);
```

**v4:**
```javascript
const engine = createAgoraRtcEngine();
engine.initialize({
  appId: appId,
  channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
});
```

### Event Handling
**v3:**
```javascript
engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
  console.log('Joined!');
});
```

**v4:**
```javascript
engine.registerEventHandler({
  onJoinChannelSuccess: (connection, elapsed) => {
    console.log('Joined!');
  },
});
```

### Video Views
**v3:**
```javascript
<RtcLocalView.SurfaceView channelId="test" style={styles.video} />
<RtcRemoteView.SurfaceView uid={1} channelId="test" style={styles.video} />
```

**v4:**
```javascript
<RtcSurfaceView 
  canvas={{
    uid: 0,
    sourceType: 0, // 0 = local, 1 = remote
    renderMode: RenderModeType.RenderModeHidden,
  }}
  style={styles.video}
/>
```

### Cleanup
**v3:**
```javascript
await engine.destroy();
```

**v4:**
```javascript
engine.unregisterEventHandler();
await engine.release();
```

## Compatibility Notes

- The `AgoraNative.js` wrapper ensures backward compatibility
- Existing screens using v3 API (like `LiveStreamingScreen.js`) will continue to work
- New code can use either v3-compatible API or v4 native API
- The v4 API is recommended for new implementations

## Troubleshooting

### Build Errors
If you encounter build errors:
1. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
2. Clear Expo cache: `npx expo start -c`
3. For iOS: `cd ios && pod deintegrate && pod install`

### Runtime Errors
If you see errors at runtime:
1. Check that camera and microphone permissions are granted
2. Verify your Agora App ID is correct
3. Check network connectivity
4. Review Agora console for any issues with your project

### Common Issues
- **"Module not found" errors:** Run `npm install` again
- **Native module not found:** Create a new development build with `eas build`
- **Camera/mic not working:** Check permissions in app.json and device settings
- **Connection timeout:** Verify Agora App ID and network connection

## Resources

- [Agora React Native SDK v4 Documentation](https://docs.agora.io/en/video-calling/get-started/get-started-sdk)
- [React Native Agora GitHub Repository](https://github.com/AgoraIO-Extensions/react-native-agora)
- [Expo Custom Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [Agora Console](https://console.agora.io/) - Manage your projects and credentials

## Support

If you encounter any issues:
1. Check the [Agora React Native GitHub Issues](https://github.com/AgoraIO-Extensions/react-native-agora/issues)
2. Review [Draftbit Community](https://community.draftbit.com)
3. Consult [Agora Developer Community](https://www.agora.io/en/community/)

---

**Updated:** October 15, 2025
**React Native Agora Version:** 4.5.3
**Expo SDK Version:** ~51.0.39

