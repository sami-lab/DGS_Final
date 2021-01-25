import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { withTheme, Title, Avatar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios, { apiUrl } from '../../../axios';
import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import Video from 'react-native-video';
import VolumeSlider from '@brlja/react-native-slider';
import Orientation from 'react-native-orientation-locker';
import ScreenOrientation, {
  LANDSCAPE,
} from 'react-native-orientation-locker/ScreenOrientation';
// import {
//   HideNavigationBar,
//   ShowNavigationBar,
// } from 'react-native-navigation-bar-color';

function VideoPlayer({ navigation, theme, route }) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      justifyContent: 'flex-start',
    },
    videoContainer: {
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height * 0.4,
      alignSelf: 'center',
    },
    imageCard: {
      marginHorizontal: 4,
      marginVertical: 4,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    imageIcon: {
      position: 'absolute',
      left: 25,
      top: 25,
      opacity: 0.7,
      color: theme.colors.light,
      zIndex: 10,
    },
    fullScreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
    controls: {},
    titleContainer: {
      paddingVertical: 15,
    },
    title: {
      fontSize: 21,
      fontFamily: theme.fonts.bold.fontFamily,
      color: theme.colors.dark,
      textAlign: 'center',
    },
    text: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 12,
      color: theme.colors.grey,
      textAlign: 'center',
    },

    trackingControls: {
      width: Dimensions.get('screen').width * 0.85,
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      alignSelf: 'center',
    },
    progress: {
      flexDirection: 'row',
      borderRadius: 3,
      alignSelf: 'center',
      width: Dimensions.get('screen').width * 0.55,
      overflow: 'hidden',
    },
    time: {
      paddingHorizontal: 2,
      color: theme.colors.dark,
    },
    innerProgressCompleted: {
      height: 5,
      backgroundColor: theme.colors.darkPink,
    },
    innerProgressRemaining: {
      height: 5,
      backgroundColor: theme.colors.primary,
    },
    generalControls: {
      flex: 1,
      flexDirection: 'row',
      overflow: 'hidden',
      paddingBottom: 10,
    },
    skinControl: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    rateControl: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    volumeControl: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    resizeModeControl: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ignoreSilentSwitchControl: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    controlOption: {
      alignSelf: 'center',
      fontSize: 11,
      color: 'white',
      paddingLeft: 2,
      paddingRight: 2,
      lineHeight: 12,
    },
    nativeVideoControls: {
      top: 0,
      height: 300,
    },
    dropdownIconContainer: {
      width: Dimensions.get('screen').height * 0.085,
      height: Dimensions.get('screen').height * 0.085,
      borderRadius: Dimensions.get('screen').height * 0.05,
      borderColor: theme.colors.darkPink,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.light,
    }

  });
  const player = React.useRef(null);
  const [videoState, setVideoState] = useState({
    rate: 1,
    volume: 1,
    muted: false,
    resizeMode: 'stretch',
    duration: 0.0,
    currentTime: 0.0,
    controls: false,
    fullScreen: false,
    paused: false,
    skin: 'custom',
    ignoreSilentSwitch: null,
    isBuffering: true,
  });
  const [randomVideos, setRandomVideos] = useState([]);
  const [data, setData] = useState(route.params.item);
  //const {video, title, date, postedBy, description} = route.params.item;
  const { state } = useContext(GlobalContext);

  React.useEffect(() => {
    const parent = navigation.dangerouslyGetParent();
    if (videoState.fullScreen) {
      Orientation.unlockAllOrientations();
      parent.setOptions({
        tabBarVisible: false,
      });
      // HideNavigationBar();
    } else {
      Orientation.lockToPortrait();
      parent.setOptions({
        tabBarVisible: true,
      });
      //ShowNavigationBar();
    }

    return () => {
      Orientation.lockToPortrait();
      parent.setOptions({
        tabBarVisible: true,
      });
    };
  }, [videoState.fullScreen]);

  React.useEffect(() => {
    const fetchRandomVideos = () => {
      axios
        .get('/breathe/getRandomVideos', {
          headers: {
            authorization: 'Bearer ' + state.userToken,
          },
        })
        .then(({ data: response }) => {
          setRandomVideos(response.data.doc);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    setTimeout(() => {
      fetchRandomVideos();
    }, 2000);
  }, []);
  const onLoad = (data) => {
    console.log('On load fired!');
    setVideoState({ ...videoState, isBuffering: false, duration: data.duration });
  };
  const onProgress = (data) => {
    if (parseInt(data.currentTime + 0.5) === parseInt(videoState.duration)) {
      setVideoState((v) => {
        return { ...v, currentTime: v.duration };
      });
      return;
    }

    setVideoState((v) => {
      return { ...v, currentTime: data.currentTime };
    });
  };
  const onBuffer = ({ isBuffering }) => {
    setVideoState({ ...videoState, isBuffering });
  };
  const getCurrentTimePercentage = () => {
    if (videoState.currentTime > 0) {
      return (
        parseFloat(videoState.currentTime) / parseFloat(videoState.duration)
      );
    } else {
      return 0;
    }
  };

  const renderRateControl = (rate) => {
    const isSelected = videoState.rate == rate;
    return (
      <TouchableOpacity
        onPress={() => {
          setVideoState({ ...videoState, rate: rate });
        }}>
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? 'bold' : 'normal' },
          ]}>
          {rate}x
        </Text>
      </TouchableOpacity>
    );
  };
  const renderSkinControl = (skin) => {
    const isSelected = videoState.skin == skin;
    const selectControls = skin == 'native' || skin == 'embed';
    return (
      <TouchableOpacity
        onPress={() => {
          setVideoState({ ...videoState, controls: selectControls, skin: skin });
        }}>
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? 'bold' : 'normal' },
          ]}>
          {skin}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderResizeModeControl = (resizeMode) => {
    const isSelected = videoState.resizeMode == resizeMode;
    return (
      <TouchableOpacity
        onPress={() => {
          setVideoState({ ...videoState, resizeMode: resizeMode });
        }}>
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? 'bold' : 'normal' },
          ]}>
          {resizeMode}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderVolumeControl = (volume) => {
    const isSelected = videoState.volume == volume;
    return (
      <TouchableOpacity
        onPress={() => {
          setVideoState({ ...videoState, volume: volume });
        }}>
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? 'bold' : 'normal' },
          ]}>
          {volume * 100}%
        </Text>
      </TouchableOpacity>
    );
  };

  const renderIgnoreSilentSwitchControl = (ignoreSilentSwitch) => {
    const isSelected = videoState.ignoreSilentSwitch == ignoreSilentSwitch;
    return (
      <TouchableOpacity
        onPress={() => {
          setVideoState({
            ...videoState,
            ignoreSilentSwitch: ignoreSilentSwitch,
          });
        }}>
        <Text
          style={[
            styles.controlOption,
            { fontWeight: isSelected ? 'bold' : 'normal' },
          ]}>
          {ignoreSilentSwitch}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderCustomSkin = () => {
    const flexCompleted = getCurrentTimePercentage() * 100;
    const flexRemaining = (1 - getCurrentTimePercentage()) * 100;

    return (
      <View style={styles.root}>
        <TouchableOpacity
          activeOpacity={videoState.fullScreen ? 0.2 : 0.95}
          style={
            videoState.fullScreen
              ? {
                flex: 1,
                ...styles.fullScreen,
                width: videoState.fullScreen
                  ? Dimensions.get('window').width
                  : '100%',
                height: videoState.fullScreen
                  ? Dimensions.get('window').height
                  : '100%',
              }
              : styles.videoContainer
          }
          onPress={() =>
            videoState.fullScreen
              ? setVideoState((v) => {
                return { ...videoState, paused: !v.paused };
              })
              : null
          }>
          {videoState.fullScreen ? (
            <TouchableOpacity
              style={{ position: 'absolute', bottom: 15, right: 25, zIndex: 30 }}
              onPress={() => {
                Orientation.lockToPortrait();
                setVideoState((v) => {
                  return { ...v, fullScreen: false, controls: false };
                });
              }}>
              <MaterialCommunityIcons
                name="fullscreen"
                size={60}
                color="black"
              />
            </TouchableOpacity>
          ) : (
              <>
                <TouchableOpacity
                  style={{ position: 'absolute', top: 15, left: 25, zIndex: 30 }}
                  onPress={() => navigation.goBack()}>
                  <Image
                    resizeMode="stretch"
                    source={require('../../assets/dev/arrow-left.png')}
                    style={{
                      width: 40,
                      height: 25,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ position: 'absolute', top: 250, right: 15, zIndex: 30 }}
                  onPress={() =>
                    setVideoState((v) => {
                      return { ...v, fullScreen: true, controls: true };
                    })
                  }>
                  <MaterialCommunityIcons
                    name="fullscreen"
                    size={40}
                    color="black"
                  />
                </TouchableOpacity>
              </>
            )}
          {videoState.isBuffering ? (
            <ActivityIndicator
              animating
              size={70}
              color={theme.colors.darkPink}
              style={{
                position: 'absolute',
                top: videoState.fullScreen ? '40%' : '30%',
                left: '40%',
              }}
            />
          ) : null}
          {videoState.fullScreen ? (
            <>
              <ScreenOrientation orientation={LANDSCAPE} />
              <StatusBar hidden={true} />
            </>
          ) : null}
          <Video
            ref={player}
            source={{ uri: apiUrl + '/files/' + data.video }}
            style={{
              width: '100%',
              height: '100%',
            }}
            rate={videoState.rate}
            paused={videoState.paused}
            volume={videoState.volume}
            muted={videoState.muted}
            controls={videoState.controls}
            fullscreen={videoState.fullScreen}
            fullscreenAutorotate={true}
            ignoreSilentSwitch={videoState.ignoreSilentSwitch}
            resizeMode={videoState.resizeMode}
            onLoad={onLoad}
            onBuffer={onBuffer}
            onProgress={(data) => onProgress(data)}
            onEnd={() => {
              setVideoState({
                ...videoState,
                fullScreen: false,
                paused: true,
                currentTime: 0.0,
              });
              player.current.seek(0);
            }}
            repeat={false}
          />
        </TouchableOpacity>
        {videoState.fullScreen ? null : (
          <>
            <View style={styles.controls}>
              <View style={styles.titleContainer}>
                <Title style={styles.title}>{data.title}</Title>
                <Text style={styles.text}>
                  By Director {data.postedBy.name}
                </Text>
              </View>
            </View>
            <View style={styles.controls}>
              {/* <View style={styles.generalControls}>
            <View style={styles.skinControl}>
              {renderSkinControl('custom')}
              {renderSkinControl('native')}
              {renderSkinControl('embed')}
            </View>
          </View>
          <View style={styles.generalControls}>
            <View style={styles.rateControl}>
              {renderRateControl(0.5)}
              {renderRateControl(1.0)}
              {renderRateControl(2.0)}
            </View>
            <View style={styles.volumeControl}>
              {renderVolumeControl(0.5)}
              {renderVolumeControl(1)}
              {renderVolumeControl(1.5)}
            </View>
            <View style={styles.resizeModeControl}>
              {renderResizeModeControl('cover')}
              {renderResizeModeControl('contain')}
              {renderResizeModeControl('stretch')}
            </View>
          </View> */}
              <View style={styles.generalControls}>
                {Platform.OS === 'ios' ? (
                  <View style={styles.ignoreSilentSwitchControl}>
                    {renderIgnoreSilentSwitchControl('ignore')}
                    {renderIgnoreSilentSwitchControl('obey')}
                  </View>
                ) : null}
              </View>

              <View style={styles.trackingControls}>
                <Text style={[styles.text, styles.time]}>
                  {Math.floor(videoState.currentTime / 60) < 10
                    ? '0' + Math.floor(videoState.currentTime / 60)
                    : Math.floor(videoState.currentTime / 60)}{' '}
                  :
                  {videoState.currentTime > 60
                    ? parseInt(
                      videoState.currentTime -
                      Math.floor(videoState.currentTime / 60) * 60,
                    ) < 10
                      ? '0' +
                      parseInt(
                        videoState.currentTime -
                        Math.floor(videoState.currentTime / 60) * 60,
                      )
                      : parseInt(
                        videoState.currentTime -
                        Math.floor(videoState.currentTime / 60) * 60,
                      )
                    : parseInt(videoState.currentTime) < 10
                      ? '0' + parseInt(videoState.currentTime)
                      : parseInt(videoState.currentTime)}
                </Text>

                <VolumeSlider
                  minimumValue={0}
                  style={{
                    width: Dimensions.get('screen').width * 0.6,
                    height: 25,
                  }}
                  maximumValue={videoState.duration}
                  value={videoState.currentTime}
                  thumbTintColor={theme.colors.darkPink}
                  minimumTrackTintColor={theme.colors.darkPink}
                  maximumTrackTintColor={theme.colors.darkPink}
                  onValueChange={(value) => {
                    player.current.seek(value);
                    setVideoState({
                      ...videoState,
                      currentTime: value,
                    });
                  }}
                />

                <Text style={[styles.text, styles.time]}>
                  {Math.floor(videoState.duration / 60) < 10
                    ? '0' + Math.floor(videoState.duration / 60)
                    : Math.floor(videoState.duration / 60)}{' '}
                  :
                  {videoState.duration > 60
                    ? parseInt(
                      videoState.duration -
                      Math.floor(videoState.duration / 60) * 60,
                    ) < 10
                      ? '0' +
                      parseInt(
                        videoState.duration -
                        Math.floor(videoState.duration / 60) * 60,
                      )
                      : parseInt(
                        videoState.duration -
                        Math.floor(videoState.duration / 60) * 60,
                      )
                    : parseInt(videoState.duration) < 10
                      ? '0' + parseInt(videoState.duration)
                      : parseInt(videoState.duration)}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (videoState.currentTime <= 5) return;
                    player.current.seek(videoState.currentTime - 5);
                    setVideoState((v) => {
                      return {
                        ...v,
                        currentTime: v.currentTime - 5,
                      };
                    });
                  }}>
                  <MaterialIcons
                    size={28}
                    name="arrow-back-ios"
                    color={theme.colors.darkPink}
                  />
                </TouchableOpacity>

                {videoState.paused ? (
                  <TouchableOpacity
                    onPress={() =>
                      setVideoState((v) => {
                        return {
                          ...v,
                          paused: false,
                        };
                      })
                    }>
                    <View style={styles.dropdownIconContainer}>
                      <MaterialIcons
                        size={36}
                        name="play-arrow"
                        color={theme.colors.darkPink}

                      />
                    </View>
                  </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                      onPress={() =>
                        setVideoState((v) => {
                          return {
                            ...v,
                            paused: true,
                          };
                        })
                      }>
                      <View style={styles.dropdownIconContainer}>

                        <MaterialIcons
                          size={40}
                          name="pause"
                          color={theme.colors.darkPink}
                        />
                      </View>
                    </TouchableOpacity>
                  )}

                <TouchableOpacity
                  onPress={() => {
                    if (videoState.currentTime + 5 > videoState.duration)
                      return;
                    player.current.seek(videoState.currentTime + 10);
                    setVideoState((v) => {
                      return {
                        ...v,
                        currentTime: v.currentTime + 5,
                      };
                    });
                  }}>
                  <MaterialIcons
                    size={28}
                    name="arrow-forward-ios"
                    color={theme.colors.darkPink}
                  />
                </TouchableOpacity>
              </View>
              {/* <View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    marginTop: 3,
                    fontSize: 12,
                  }}
                  onPress={() =>
                    setVideoState((v) => {
                      return {...v, fullScreen: true, controls: true};
                    })
                  }>
                  Full Screen
                </Text>
              </View> */}
              <View
                style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {randomVideos.length > 0 &&
                    randomVideos.map((item, key) => (
                      <TouchableOpacity
                        key={item._id}
                        style={styles.imageCard}
                        onPress={() => {
                          console.log('...............................');
                          setData(item);
                          setVideoState({
                            rate: 1,
                            volume: 1,
                            muted: false,
                            resizeMode: 'stretch',
                            duration: 0.0,
                            currentTime: 0.0,
                            controls: false,
                            fullScreen: false,
                            paused: false,
                            skin: 'custom',
                            ignoreSilentSwitch: null,
                            isBuffering: false,
                          });
                        }}>
                        <MaterialIcons
                          name="play-circle-outline"
                          size={28}
                          style={styles.imageIcon}
                        />
                        <Image
                          source={{ uri: apiUrl + '/files/' + item.thumbnail }}
                          style={{
                            borderRadius: 50,
                            width: 75,
                            height: 80,
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              </View>
            </View>
          </>
        )}
      </View>
    );
  };

  return renderCustomSkin();
}

export default withTheme(VideoPlayer);
