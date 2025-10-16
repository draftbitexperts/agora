import * as React from 'react';
import { Vimeo } from 'react-native-vimeo-iframe';
import {
  View,
  Dimensions,
  Image,
  Text,
  FlatList,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import { ExpoImage } from '@draftbit/ui';
import imageSource from '../utils/imageSource';
import Images from '../config/Images';

export const VimeoVideoPlayer = ({ height, width, quality, data }) => {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const videoCallbacks = {
    onReady: event => {
      console.log('Vimeo player ready:', event);
    },
    onError: error => {
      console.error('Vimeo player error:', error);
    },
    onLoad: event => {
      console.log('Vimeo player loaded:', event);
    },
    onPlay: event => {
      console.log('Vimeo player play:', event);
    },
    onPause: event => {
      console.log('Vimeo player pause:', event);
    },
    onEnd: event => {
      console.log('Vimeo player ended:', event);
    },
  };

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [playerStates, setPlayerStates] = React.useState({});
  const [retryCounts, setRetryCounts] = React.useState({});
  const [loadingStates, setLoadingStates] = React.useState({});
  const flatListRef = React.useRef(null);

  const handleViewableItemsChanged = React.useCallback(
    ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;
        setCurrentIndex(newIndex);
      }
    },
    [data]
  );

  const isLandscape = screenWidth > screenHeight;

  const renderVideoItem = ({ item, index }) => {
    const videoId = item?.videoId;
    const retryCount = retryCounts[index] || 0;
    if (!videoId) {
      return (
        <View style={[styles.videoContainer, styles.errorContainer]}>
          <Text style={styles.text}>No video ID found</Text>
        </View>
      );
    }

    // Responsive width logic
    const ASPECT_RATIO = 16 / 9;
    const videoWidth = isLandscape ? screenWidth - 150 : screenWidth - 60;
    //const videoHeight = isLandscape ? 400 : 200;
    const videoHeight = videoWidth / ASPECT_RATIO; // New logic

    // Dynamic margin logic
    let marginLeft = 20;
    let marginRight = 20;
    // if (index === 0) {
    //   marginRight = 20;
    // } else if (index === data.length - 1) {
    //   marginLeft = 20;
    //   marginRight = 20;
    // }

    const isLoading = loadingStates[index] !== false;

    return (
      <View
        style={[
          styles.videoContainer,
          {
            backgroundColor: 'transparent',
            paddingBottom: 20,
            paddingHorizontal: 0,
            width: videoWidth,
            marginLeft,
            marginRight,
          },
        ]}
        key={`vimeo-${index}-${videoId}-${retryCount}`}
      >
        <View
          style={[
            styles.vimeoPlayerContainer,
            {
              width: videoWidth,
              height: videoHeight,
              backgroundColor: '#181A20',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            },
          ]}
        >
          {/* Gray window to prevent the white line issue */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderWidth: 1,
              borderColor: '#181A20',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          {isLoading && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#181A20',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 2,
              }}
            >
              <ActivityIndicator size="small" color="#fff" />
            </View>
          )}

          <Vimeo
            key={`vimeo-player-${index}-${videoId}-${retryCount}`}
            videoId={videoId}
            handlers={videoCallbacks}
            quality={quality || '1080p'}
            otherProps={{
              autoplay: false,
              muted: true,
              controls: true,
              responsive: true,
              dnt: true,
              loop: false,
              playsinline: true,
            }}
            width={videoWidth}
            minWidth={videoWidth}
            maxWidth={videoWidth}
            style={{ width: '100%', height: '100%' }}
            onReady={event => {
              setLoadingStates(prev => ({ ...prev, [index]: false }));
              setPlayerStates(prev => ({ ...prev, [index]: 'ready' }));
            }}
            onError={error => {
              setLoadingStates(prev => ({ ...prev, [index]: false }));
              setPlayerStates(prev => ({ ...prev, [index]: 'error' }));
            }}
            onLoad={event => {
              setLoadingStates(prev => ({ ...prev, [index]: false }));
              setPlayerStates(prev => ({ ...prev, [index]: 'loaded' }));
            }}
          />
        </View>

        <View style={{ paddingHorizontal: 0 }}>
          <View style={styles.videoDetailsContainer}>
            <View style={styles.actionsContainer}>
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                resizeMode={'cover'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                source={imageSource(Images['foundationiconpng'])}
                style={styles.image}
              />
              <Text style={styles.text}>{item.action}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                resizeMode={'cover'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                source={imageSource(Images['rpegreen'])}
                style={styles.image}
              />
              <Text style={styles.text}>{item.singleRounds}</Text>
            </View>
            <View style={styles.actionsContainer}>
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                resizeMode={'cover'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                source={imageSource(Images['timergreen'])}
                style={styles.image}
              />
              <Text style={styles.text}>{item.duration} Mins</Text>
            </View>
          </View>
          {/* Equipments View */}
          {Array.isArray(item.equipments) && item.equipments.length > 0 && (
            <View style={styles.videoDetailsContainer}>
              {item.equipments.map((eq, idx) => (
                <View
                  key={eq.imageName + idx}
                  style={{
                    ...styles.actionsContainer,
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginHorizontal: 5,
                  }}
                >
                  <Text
                    style={{
                      ...styles.text,
                      fontSize: 13,
                      textAlign: 'center',
                      marginBottom: 4,
                      marginTop: 0,
                    }}
                  >
                    {eq.name}
                  </Text>
                  <ExpoImage
                    allowDownscaling={true}
                    cachePolicy={'disk'}
                    contentPosition={'center'}
                    resizeMode={'cover'}
                    transitionDuration={300}
                    transitionEffect={'cross-dissolve'}
                    transitionTiming={'ease-in-out'}
                    source={imageSource(Images[eq.imageName])}
                    style={{ width: 36, height: 36 }}
                  />
                </View>
              ))}
            </View>
          )}
          <View style={{ paddingVertical: 10 }}>
            <Text
              style={{
                color: 'white',
                fontSize: 28,
                fontWeight: 'bold',
                fontFamily: 'Inter_400Regular',
              }}
            >
              {item.title}
            </Text>
          </View>
          <View style={styles.actionsContainer}>
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              resizeMode={'cover'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              source={imageSource(Images['FitnessCoachComp'])}
              style={styles.image}
            />
            <Text style={styles.text}>
              {currentIndex + 1}/{data.length} Step Videos
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container]}>
      <FlatList
        ref={flatListRef}
        data={data}
        renderItem={renderVideoItem}
        keyExtractor={(item, index) => `video-${index}-${item.videoId}`}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        getItemLayout={(data, index) => ({
          length: isLandscape ? screenWidth - 150 : screenWidth - 60,
          offset: (isLandscape ? screenWidth - 150 : screenWidth - 60) * index,
          index,
        })}
        style={styles.carousel}
      />

      {/* Simple pagination dots */}
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = {
  container: {
    borderRadius: 24,
    paddingVertical: 20,
    width: '100%',
  },
  carousel: {
    width: '100%',
  },
  videoContainer: {
    borderRadius: 0,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3843544D',
    marginRight: 0,
  },
  vimeoPlayer: {
    overflow: 'hidden',
    backgroundColor: '#3843544D',
  },
  paginationDot: {
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    width: 8,
    height: 8,
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#00FF00FF',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  videoDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 5,
  },
  vimeoPlayerContainer: {
    width: '100%',
    borderRadius: 24,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Inter_400Regular',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  image: {
    width: 24,
    height: 24,
  },
};

// import * as React from "react";
// import { Vimeo } from "react-native-vimeo-iframe";
// import {
//   View,
//   Dimensions,
//   TouchableOpacity,
//   Image,
//   Text,
//   FlatList,
// } from "react-native";
// import { useSharedValue } from "react-native-reanimated";

// const defaultWidth = Dimensions.get("window").width;

// export const VimeoVideoPlayer = ({ height, width, quality, data }) => {
//   const videoCallbacks = {
//     onReady: (event) => {
//       console.log("Vimeo player ready:", event);
//     },
//     onError: (error) => {
//       console.error("Vimeo player error:", error);
//     },
//     onLoad: (event) => {
//       console.log("Vimeo player loaded:", event);
//     },
//     onPlay: (event) => {
//       console.log("Vimeo player play:", event);
//     },
//     onPause: (event) => {
//       console.log("Vimeo player pause:", event);
//     },
//     onEnd: (event) => {
//       console.log("Vimeo player ended:", event);
//     },
//   };

//   const [currentIndex, setCurrentIndex] = React.useState(0);
//   const [playerStates, setPlayerStates] = React.useState({});
//   const [retryCounts, setRetryCounts] = React.useState({});
//   const flatListRef = React.useRef(null);

//   const handleViewableItemsChanged = React.useCallback(
//     ({ viewableItems }) => {
//       if (viewableItems.length > 0) {
//         const newIndex = viewableItems[0].index;
//         setCurrentIndex(newIndex);
//       }
//     },
//     [data]
//   );

//   const viewabilityConfig = {
//     itemVisiblePercentThreshold: 50,
//   };

//   // Validate data before rendering
//   React.useEffect(() => {
//     if (data && data.length > 0) {
//       console.log(
//         "VimeoVideoPlayer data:",
//         data.map((item, idx) => ({
//           index: idx,
//           videoId: item.videoId,
//           title: item.title || "No title",
//         }))
//       );
//     }
//   }, [data]);

//   const handleRetry = (index) => {
//     setRetryCounts((prev) => ({ ...prev, [index]: (prev[index] || 0) + 1 }));
//     setPlayerStates((prev) => ({ ...prev, [index]: "loading" }));
//   };

//   const renderVideoItem = ({ item, index }) => {
//     const videoId = item?.videoId;
//     const retryCount = retryCounts[index] || 0;
//     const playerState = playerStates[index];

//     if (!videoId) {
//       console.warn(`No videoId found for index ${index}`);
//       return (
//         <View style={[styles.videoContainer, styles.errorContainer]}>
//           <Text style={styles.errorText}>No video ID found</Text>
//         </View>
//       );
//     }

//     return (
//       <View
//         style={[styles.videoContainer]}
//         key={`vimeo-${index}-${videoId}-${retryCount}`}
//       >
//         <Vimeo
//           key={`vimeo-player-${index}-${videoId}-${retryCount}`}
//           videoId={videoId}
//           handlers={videoCallbacks}
//           otherProps={{
//             height: 300,
//             backgroundColor: "transparent",
//             autoplay: false,
//             muted: true,
//             controls: true,
//             responsive: true,
//             dnt: true,
//             loop: false,
//             playsinline: true,
//           }}
//           width={defaultWidth - 40}
//           minWidth={defaultWidth - 40}
//           maxWidth={defaultWidth - 40}
//           style={styles.vimeoPlayer}
//           onReady={(event) => {
//             setPlayerStates((prev) => ({ ...prev, [index]: "ready" }));
//           }}
//           onError={(error) => {
//             setPlayerStates((prev) => ({ ...prev, [index]: "error" }));
//           }}
//           onLoad={(event) => {
//             setPlayerStates((prev) => ({ ...prev, [index]: "loaded" }));
//           }}
//         />
//       </View>
//     );
//   };

//   return (
//     <View style={[styles.container]}>
//       <FlatList
//         ref={flatListRef}
//         data={data}
//         renderItem={renderVideoItem}
//         keyExtractor={(item, index) => `video-${index}-${item.videoId}`}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onViewableItemsChanged={handleViewableItemsChanged}
//         viewabilityConfig={viewabilityConfig}
//         getItemLayout={(data, index) => ({
//           length: width || defaultWidth - 40,
//           offset: (width || defaultWidth - 40) * index,
//           index,
//         })}
//         style={styles.carousel}
//       />

//       {/* Simple pagination dots */}
//       <View style={styles.paginationContainer}>
//         {data.map((_, index) => (
//           <View
//             key={index}
//             style={[
//               styles.paginationDot,
//               index === currentIndex && styles.paginationDotActive,
//             ]}
//           />
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = {
//   container: {
//     borderRadius: 24,
//     height: 300,
//   },
//   carousel: {
//     paddingHorizontal: 10,
//     gap: 10,
//   },
//   videoContainer: {
//     borderRadius: 24,
//     flex: 1,
//     overflow: "hidden",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "transparent",
//     marginRight: 10,
//     // width: defaultWidth - 40,
//   },
//   vimeoPlayer: {
//     overflow: "hidden",
//     backgroundColor: "transparent",
//   },
//   paginationDot: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 50,
//     width: 8,
//     height: 8,
//     marginHorizontal: 4,
//   },
//   paginationDotActive: {
//     backgroundColor: "#007AFF",
//   },
//   paginationContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
// };
