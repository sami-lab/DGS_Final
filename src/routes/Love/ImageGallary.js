import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Alert,
  PermissionsAndroid,
  TouchableOpacity,
} from 'react-native';
import { withTheme, Portal, Modal } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob';
const fs = RNFetchBlob.fs;
const config = RNFetchBlob.config;

import Share from 'react-native-share';
import MainHeader from '../../components/mainChildHeader';
import Spinner from '../../components/spinner';
import axios, { apiUrl } from '../../../axios';
import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import MasonryList from 'react-native-masonry-list';

function convertToBase64(file_url, option) {
  let imagePath = null;
  RNFetchBlob.config({
    fileCache: true,
  })
    .fetch('GET', file_url)
    // the image is now dowloaded to device's storage
    .then((resp) => {
      // the image path you can use it directly with Image component
      imagePath = resp.path();
      return resp.readFile('base64');
    })
    .then(async (base64Data) => {
      var base64Data = `data:image/png;base64,` + base64Data;

      // here's base64 encoded image
      try {
        if (option) {
          const result = await Share.shareSingle({
            title: 'shareVia',
            message: 'A photo from Gallary of Divorsed Smiling Girl',
            url: base64Data,
            social: option,
            type: 'url',
          });
          console.log('result ', JSON.stringify(result));
        } else {
          const result = await Share.open({
            message: 'A photo from Gallary of Divorsed Smiling Girl',
            url: base64Data,
          });
          console.log('result ', JSON.stringify(result));
        }
      } catch (error) {
        console.log(error.message);
      }

      // remove the file from storage
      return fs.unlink(imagePath);
    });
}
function ImageGallary({ theme, navigation }) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },
    card: {
      width: Dimensions.get('screen').width * 0.9,
      alignSelf: 'center',
      //for Andriod,
    },

    imageCard: {
      marginHorizontal: 4,
      marginVertical: 4,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    title: {
      fontSize: 20,
      marginTop: 10,
      marginBottom: 5,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold.fontFamily,
      marginBottom: 5,
    },
    text: {
      fontFamily: theme.fonts.regular.fontFamily,
      marginBottom: 5,
    },
    modal: {
      alignSelf: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      width: '80%',
      paddingBottom: 15,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    text: {
      color: '#3f2949',
      marginTop: 10,
    },
  });
  const { state, dispatch } = useContext(GlobalContext);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [scroll, setScroll] = useState(1);
  const [lastCall, setLastCall] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modelOpen, setModelOpen] = useState(false);

  const onShare = (img, option) => {
    convertToBase64(apiUrl + '/files/' + img, option);
  };

  // This opions is for downloading image
  const checkPermission = async (url) => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage(url);
        } else {
          // If permission denied then show alert
          alert('Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };
  const downloadImage = (url) => {
    // Main function to download the image
    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = url;
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    console.log(options, ext);
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        // Showing alert after successful downloading
        setSelectedImage(null);
      })
      .catch((e) => console.log(e.message));
  };

  const getExtention = (filename) => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  //inital data load
  useEffect(() => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    setPageLoaded(true);
    axios
      .get('/ImageGallery?page=' + scroll, {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(({ data: response }) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });

        setTotalRecords(response.total);
        setImages(response.data.doc);
        setError(false);
      })
      .catch((error) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        setError(true);

        Alert.alert(
          'Fail To fetch data',
          error.response ? error.response.data.message : error.message
        );
        return;
      });
  }, []);
  const addImages = () => {
    axios
      .get('/ImageGallery?page=' + scroll, {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(({ data: response }) => {
        setTotalRecords(response.total);
        setImages((imgs) => imgs.concat(response.data.doc));
        setLastCall(scroll);
        setError(false);
      })
      .catch((error) => {
        setScroll((s) => s - 1);
        setError(true);
      });
  };

  useEffect(() => {
    if (scroll - 1 === lastCall) {
      addImages();
    }
  }, [scroll]);
  return (
    <View style={styles.root}>
      <MainHeader navigation={navigation} backRoute="Love" />

      <Spinner visible={state.loading} />

      {images.length > 0 ? (
        // images.map((item) => (
        //   <Image
        //     key={item._id}
        //     source={{ uri: apiUrl + '/files/' + item.image }}
        //     style={{
        //       width: 100,
        //       height: 100,
        //     }}
        //   />
        // ))
        <MasonryList
          style={{ backgroundColor: 'transparent' }}
          images={images.map((item) => {
            console.log(item.image);
            return {
              uri: apiUrl + '/files/' + item.image,
            };
          })}
          onEndReachedThreshold={0.3}
          onEndReached={() => {
            if (images.length < totalRecords) {
              setScroll(scroll + 1);
            }
          }}
          onPressImage={(item, index) => {
            setSelectedImage(item);
            setModelOpen(true);
          }}
        />
      ) : (!state.loading && pageLoaded) || error ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ ...styles.title, width: '80%', textAlign: 'center' }}>
            Opps no records found in this Category
          </Text>
        </View>
      ) : null}
      {selectedImage ? (
        <Portal>
          <Modal
            visible={modelOpen}
            onDismiss={() => setModelOpen(false)}
            contentContainerStyle={{
              ...styles.modal,
              height: selectedImage.masonryDimensions.height + 150,
              padding: 3,
            }}
          >
            <>
              <Image
                resizeMode="contain"
                source={{ uri: selectedImage.source.uri }}
                style={{
                  alignSelf: 'center',
                  width: '80%',

                  height: selectedImage.masonryDimensions.height + 100,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: '70%',
                    padding: 5,
                    backgroundColor: theme.colors.darkPink,
                    borderRadius: 50,
                  }}
                  onPress={() => checkPermission(selectedImage.source.uri)}
                >
                  <Text
                    style={{ textAlign: 'center', padding: 5, color: '#fff' }}
                  >
                    Download
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginVertical: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialCommunityIcons
                  style={{
                    padding: 5,
                    marginHorizontal: 3,
                  }}
                  color="blue"
                  name="facebook"
                  size={40}
                  onPress={() =>
                    onShare(selectedImage.image, Share.Social.FACEBOOK)
                  }
                />
                <Image
                  style={{
                    marginHorizontal: 3,
                    width: 35,
                    height: 35,
                  }}
                  source={require('../../assets/dev/instaLogo.png')}
                  onPress={() =>
                    onShare(selectedImage.image, Share.Social.INSTAGRAM)
                  }
                />
                <MaterialCommunityIcons
                  style={{
                    padding: 5,
                    marginHorizontal: 3,
                    color: '#1A91DA',
                  }}
                  name="twitter"
                  size={40}
                  onPress={() =>
                    onShare(selectedImage.image, Share.Social.TWITTER)
                  }
                />
                <MaterialCommunityIcons
                  style={{
                    padding: 5,
                    marginHorizontal: 3,
                    color: '#1A91DA',
                  }}
                  name="share-variant"
                  size={40}
                  onPress={() => onShare(selectedImage.image)}
                />
              </View> */}
            </>
          </Modal>
        </Portal>
      ) : null}
    </View>
  );
}

export default withTheme(ImageGallary);
