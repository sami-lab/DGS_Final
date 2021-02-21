import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Alert } from 'react-native';
import { withTheme, Portal, Modal } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RNFetchBlob from 'rn-fetch-blob';
const fs = RNFetchBlob.fs;
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
              height: selectedImage.masonryDimensions.height + 100,
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
