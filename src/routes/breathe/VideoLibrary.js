import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
  TextInput,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';

import { withTheme, Card } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import MainHeader from '../../components/mainChildHeader';
import axios, { apiUrl } from '../../../axios';
import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import Spinner from '../../components/spinner';

function VideoLibrary({ theme, navigation }) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },
    card: {
      width: Dimensions.get('screen').width * 0.9,
      alignSelf: 'center',
      //for Andriod,
    },
    rowContainer: {
      justifyContent: 'center',
    },
    icon: {
      position: 'absolute',
      left: 10,
      top: 8,
      color: theme.colors.grey,
    },
    imageIcon: {
      position: 'absolute',
      left: 35,
      top: 35,
      opacity: 0.7,
      color: theme.colors.light,
      zIndex: 10,
    },
    inputCard: {
      marginVertical: 5,
      width: Dimensions.get('screen').width * 0.85,
      shadowColor: '#000',
      alignSelf: 'center',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 1, //for Andriod,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#E5DDD5',
    },
    inputStyle: {
      borderRadius: 40,
    },
    input1: {
      paddingLeft: 50,
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
      width: Dimensions.get('screen').width * 0.85,
      alignSelf: 'center',
      fontSize: 22,
      paddingVertical: 3,
      fontFamily: theme.fonts.bold.fontFamily,
    },
  });
  const { state, dispatch } = useContext(GlobalContext);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState(null);
  const [categories, setCategories] = useState([]);
  const [scroll, setScroll] = useState(1);
  const [lastCall, setLastCall] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('');

  const fetchCategories = () => {
    axios
      .get('/breatheCategories/', {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(({ data: response }) => {
        setError(false);
        setCategories([{ name: 'None', _id: '' }, ...response.data.doc]);
      })
      .catch((error) => {
        setError(true);
        Alert.alert(
          'Fail To fetch data',
          error.response ? error.response.data.message : error.message
        );
        return;
      });
  };
  const fetchAll = () => {
    axios
      .get('/breathe', {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(({ data: response }) => {
        setError(false);
        setScroll(1);
        setLastCall(1);
        setTotalRecords(response.total);
        setVideos(response.data.doc);
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
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
  };

  //Either select is empty or search is empty, server will manage it
  const fetchByCategorySearch = () => {
    axios
      .get(
        `/breathe/videos/${selectedCategory ? selectedCategory : null}/${
          search ? search : null
        }?page=1`,
        {
          headers: {
            authorization: 'Bearer ' + state.userToken,
          },
        }
      )
      .then(({ data: response }) => {
        setError(false);

        setScroll(1);
        setLastCall(1);
        setTotalRecords(response.total);
        setVideos(response.data.doc);
      })
      .catch((error) => {
        setError(true);

        Alert.alert(
          'Fail To fetch data',
          error.response ? error.response.data.message : error.message
        );
        return;
      });
  };
  useEffect(() => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    fetchCategories();
    fetchAll();
  }, []);
  useEffect(() => {
    if (
      selectedCategory != '' ||
      (search != null && search.trim().length > 0)
    ) {
      fetchByCategorySearch();
    } else {
      fetchAll();
    }
  }, [selectedCategory]);

  const searchVideo = () => {
    if (
      (search != null && search.trim().length > 0) ||
      selectedCategory != ''
    ) {
      fetchByCategorySearch();
    } else {
      fetchAll();
    }
  };
  //The Function handling pagination
  const addVideos = () => {
    if (
      (!selectedCategory || selectedCategory == null) &&
      (!search || search == null)
    ) {
      axios
        .get('/breathe?page=' + scroll, {
          headers: {
            authorization: 'Bearer ' + state.userToken,
          },
        })
        .then(({ data: response }) => {
          setTotalRecords(response.total);
          setVideos((vi) => vi.concat(response.data.doc));
          setLastCall(scroll);
          setError(false);
        })
        .catch((error) => {
          setScroll((s) => s - 1);
          setError(true);
        });
    } else {
      axios
        .get(
          `/breathe/videos/${selectedCategory ? selectedCategory : null}/${
            search ? search : null
          }?page=${scroll}`,
          {
            headers: {
              authorization: 'Bearer ' + state.userToken,
            },
          }
        )
        .then(({ data: response }) => {
          setTotalRecords(response.total);
          setVideos((vi) => vi.concat(response.data.doc));
          setLastCall(scroll);
          setError(false);
        })
        .catch((error) => {
          setScroll((s) => s - 1);
          setError(true);
        });
    }
  };
  useEffect(() => {
    if (scroll - 1 === lastCall) {
      addVideos();
    }
  }, [scroll]);
  return (
    <View style={styles.root}>
      <MainHeader navigation={navigation} />
      <Spinner visible={state.loading} />

      <View>
        <Text style={styles.title}>Search Now</Text>

        <Card style={styles.inputCard}>
          <ModalSelector
            data={categories.map((item) => {
              const obj = {
                label: item.name.charAt(0).toUpperCase() + item.name.slice(1),
                key: item._id,
              };
              return obj;
            })}
            initValue="Select Category!"
            selectStyle={{
              height: 50,
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingLeft: 30,
            }}
            optionStyle={{
              justifyContent: 'center',
            }}
            optionTextStyle={{
              color: 'black',
              fontFamily: theme.fonts.regular.fontFamily,
              fontSize: 16,
            }}
            cancelStyle={{
              display: 'none',
            }}
            backdropPressToClose={true}
            cancelButtonAccessible={false}
            onChange={(option) => {
              setSelectedCategoryValue(option.label);
              setSelectedCategory(option.key);
            }}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <TextInput
                style={{
                  color: 'black',
                  fontFamily: theme.fonts.regular.fontFamily,
                  fontSize: 16,
                  paddingLeft: 30,
                }}
                editable={false}
                placeholder="Select Category"
                value={selectedCategoryValue}
              />
              <MaterialIcons
                name="keyboard-arrow-down"
                size={36}
                color={theme.colors.light}
                style={{
                  marginHorizontal: 5,
                  alignSelf: 'center',
                  borderRadius: 50,
                  backgroundColor: theme.colors.darkPink,
                }}
              />
            </View>
          </ModalSelector>
        </Card>
        <Card elevation={1} style={{ ...styles.inputCard }}>
          <MaterialIcons name="search" size={32} style={styles.icon} />
          <TextInput
            placeholder="Search"
            style={{ ...styles.inputStyle, ...styles.input1 }}
            value={search}
            onSubmitEditing={searchVideo}
            onChangeText={(text) => setSearch(text)}
          />
        </Card>
      </View>
      {videos.length > 0 ? (
        <FlatList
          data={videos}
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
          keyExtractor={(item, index) => item._id}
          enableEmptySections={true}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.imageCard}
              onPress={() => {
                navigation.navigate('Video', { item });
              }}
            >
              <MaterialIcons
                name="play-circle-outline"
                size={32}
                style={styles.imageIcon}
              />
              <Image
                source={{ uri: apiUrl + '/files/' + item.thumbnail }}
                style={{
                  borderRadius: 15,
                  width: 95,
                  height: 100,
                }}
              />
            </TouchableOpacity>
          )}
          numColumns={3}
          onEndReached={() => {
            if (videos.length < totalRecords) {
              setScroll((s) => s + 1);
            }
          }}
          onEndReachedThreshold={0.3}
        />
      ) : !state.loading && error ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ ...styles.title, width: '80%', textAlign: 'center' }}>
            Opps no records found in this Category
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export default withTheme(VideoLibrary);
