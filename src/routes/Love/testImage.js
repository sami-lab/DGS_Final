import React, { useEffect, useState, useContext } from 'react';
import {
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  FlatList,
  Text,
  Alert,
} from 'react-native';
import { withTheme, Portal, Modal } from 'react-native-paper';

import axios, { apiUrl } from '../../../axios';
import MainHeader from '../../components/mainChildHeader';
import Spinner from '../../components/spinner';
import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import UUIDGenerator from 'react-native-uuid-generator';

const { width } = Dimensions.get('window');

/// to calcualte width and height of images
const processImages = async (images) => {
  const processedImages = [...images];
  for (const i in images) {
    const image = processedImages[i];
    await Image.getSize(apiUrl + '/files/' + image.image, (width, height) => {
      processedImages[i] = {
        ...image,
        width,
        height,
        fullHeight: height,
        fullWidth: width,
      };
    });
  }
  return processedImages;
};

function Test({ theme, navigation }) {
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

  const [cols, setCols] = useState(
    Array(2)
      .fill(2)
      .map((_) => ({ bricks: [], colHeight: 0 }))
  );
  const COLUMN_WIDTH = width / 2;
  const IMAGE_SPACING = COLUMN_WIDTH * 0.01;
  const COL_WIDTH = COLUMN_WIDTH - IMAGE_SPACING / 2;

  useEffect(() => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    setPageLoaded(true);
    axios
      .get('/ImageGallery', {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(async ({ data: response }) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        setTotalRecords(response.total);
        const processedImages = await processImages(response.data.doc);
        setImages(processedImages);
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

  const layoutBricks = (image) => {
    //const newCols = [...cols];

    //images.forEach((image) => {
    let wd = COL_WIDTH; //width for image
    const widthReductionFactor = COL_WIDTH / image.width;
    const ht = image.height * widthReductionFactor;
    return renderItem(image, ht, wd, IMAGE_SPACING);

    // const heightsArray = newCols.map(({ colHeight }) => colHeight);
    // const shortestColumnIndex = heightsArray.findIndex(
    //   (colHt) => colHt === Math.min.apply(Math, heightsArray)
    // );

    // const shortestColumn = newCols[shortestColumnIndex];

    // newCols[shortestColumnIndex] = {
    //   bricks: [...shortestColumn.bricks, currentImage],
    //   colHeight: shortestColumn.colHeight + ht,
    // };
    // });

    //setCols(newCols);
  };

  const layout = async (imgs) => {
    //setImages(processImages)
    //console.log(processedImages);
    //layoutBricks(processedImages);
  };

  //to render images
  const renderItem = (item, ht, wd, imageSpacing) => (
    <TouchableWithoutFeedback
      style={{ width: wd, height: ht }}
      onPress={() => {
        setSelectedImage(item);
        setModelOpen(true);
      }}
    >
      <Image
        source={{ uri: apiUrl + '/files/' + item.image }}
        style={{
          width: wd,
          height: ht,
          marginBottom: imageSpacing,
          marginHorizontal: imageSpacing - 1,
        }}
        resizeMode="contain"
      />
    </TouchableWithoutFeedback>
  );

  //pagination
  const addImages = () => {
    axios
      .get('/ImageGallery?page=' + scroll, {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(async ({ data: response }) => {
        setTotalRecords(response.total);
        const processedImages = await processImages(response.data.doc);
        setImages((imgs) => imgs.concat(processedImages));

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
      console.log('calling', scroll - 1, lastCall);
      addImages();
    }
  }, [scroll]);
  return (
    <>
      <View style={styles.root}>
        <MainHeader navigation={navigation} />
        <Spinner visible={state.loading} />
        {images.length > 0 ? (
          <FlatList
            data={images}
            contentContainerStyle={{
              alignSelf: 'center',
              alignItems: 'center',
              flexGrow: 1,
            }}
            keyExtractor={(item, index) => {
              return (
                item.colHeight +
                Math.floor(
                  Math.random() * Math.floor(new Date().getTime())
                ).toString() +
                new Date().getTime().toString() +
                index * Math.random() * 1001
              );
            }}
            enableEmptySections={true}
            renderItem={({ item }) => {
              return layoutBricks(item);
            }}
            onEndReached={() => {
              if (images.length < totalRecords) {
                setScroll((s) => s + 1);
              }
            }}
            onEndReachedThreshold={0.3}
            numColumns={2}
          />
        ) : (!state.loading && pageLoaded) || error ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text
              style={{ ...styles.title, width: '80%', textAlign: 'center' }}
            >
              Opps no records found in this Category
            </Text>
          </View>
        ) : null}
        {selectedImage ? (
          <Portal>
            <Modal
              visible={modelOpen}
              onDismiss={() => {
                setModelOpen(false);
              }}
              contentContainerStyle={{
                ...styles.modal,
                width:
                  Dimensions.get('window').width * 0.9 > selectedImage.fullWidth
                    ? selectedImage.fullWidth
                    : Dimensions.get('window').width * 0.9,
                height:
                  selectedImage.fullHeight >=
                  Dimensions.get('window').height * 0.8
                    ? Dimensions.get('window').height * 0.8
                    : selectedImage.fullHeight,
              }}
            >
              <>
                <Image
                  resizeMode="stretch"
                  source={{ uri: apiUrl + '/files/' + selectedImage.image }}
                  style={{
                    alignSelf: 'center',
                    width:
                      Dimensions.get('window').width * 0.9 >
                      selectedImage.fullWidth
                        ? selectedImage.fullWidth - 15
                        : Dimensions.get('window').width * 0.9 - 15,
                    height:
                      selectedImage.fullHeight >=
                      Dimensions.get('window').height * 0.8
                        ? Dimensions.get('window').height * 0.8 - 20
                        : selectedImage.fullHeight - 20,
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
    </>
  );
}

export default withTheme(Test);
