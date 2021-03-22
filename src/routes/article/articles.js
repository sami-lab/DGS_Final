import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Alert,
  TextInput,
  FlatList,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { withTheme, Card, Title } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Spinner from '../../components/spinner';
import MainHeader from '../../components/mainChildHeader';
import axios, { apiUrl } from '../../../axios';
import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';

function Articles({ theme, navigation }) {
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
      height:45

    },
    input1: {
      paddingLeft: 40,
    },

    title: {
      width: Dimensions.get('screen').width * 0.85,
      alignSelf: 'center',
      fontSize: 22,
      paddingVertical: 3,
      fontFamily: theme.fonts.bold.fontFamily,
    },
    articleCard: {
      display: 'flex',
      elevation: 2,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
      flexDirection: 'row',
      backgroundColor: 'white',
      marginVertical: 5,
      borderRadius: 5,
      width: Dimensions.get('screen').width * 0.85,
    },
    cardtitle: {
      fontSize: 17,
      marginTop: 5,
      marginBottom: 5,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold.fontFamily,
      marginBottom: 5,
    },
    text: {
      fontFamily: theme.fonts.regular.fontFamily,
      color: theme.colors.grey,
    },
  });
  const { state, dispatch } = useContext(GlobalContext);
  const [articles, setArticles] = useState(state.articles);
  const [error, setError] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const [search, setSearch] = useState(null);
  const [categories, setCategories] = useState(state.articleCategories);
  const [scroll, setScroll] = useState(1);
  const [lastCall, setLastCall] = useState(1);
  const [totalRecords, setTotalRecords] = useState(state.articlesTotalRecords);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryValue, setSelectedCategoryValue] = useState('');

  const fetchCategories = () => {
    axios
      .get('/articleCategories/', {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(({ data: response }) => {
        setCategories([{ name: 'None', _id: '' }, ...response.data.doc]);
        dispatch({
          type: actionTypes.SET_ARTICLE_CATEGORIES,
          articleCategories: [{ name: 'None', _id: '' }, ...response.data.doc],
        });
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
  };
  const fetchAll = () => {
    axios
      .get('/article/', {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(({ data: response }) => {
        setScroll(1);
        setLastCall(1);
        setTotalRecords(response.total);
        setArticles(response.data.doc);
        dispatch({
          type: actionTypes.SET_ARTICLES,
          articles: response.data.doc,
          articlesTotalRecords: response.total,
        });
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
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
  };

  //Either select is empty or search is empty, server will manage it
  const fetchByCategorySearch = () => {
    axios
      .get(
        `/article/articles/${selectedCategory ? selectedCategory : null}/${
          search ? search : null
        }`,
        {
          headers: {
            authorization: 'Bearer ' + state.userToken,
          },
        }
      )
      .then(({ data: response }) => {
        setScroll(1);
        setLastCall(1);
        setTotalRecords(response.total);
        setArticles(response.data.doc);
        setError(false);
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

  ///Inital Call
  useEffect(() => {
    if (
      (state.articleCategories && state.articleCategories.length === 0) ||
      (state.articles && state.articles.length === 0)
    ) {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      setPageLoaded(true);
      fetchCategories();
      fetchAll();
    }
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

  const searchArticle = () => {
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
  const addArticles = () => {
    if (
      (!selectedCategory || selectedCategory == null) &&
      (!search || search == null)
    ) {
      axios
        .get('/article?page=' + scroll, {
          headers: {
            authorization: 'Bearer ' + state.userToken,
          },
        })
        .then(({ data: response }) => {
          setTotalRecords(response.total);
          setVideos((vi) => vi.concat(response.data.doc));
          dispatch({
            type: actionTypes.SET_ARTICLES,
            articles: articles.concat(response.data.doc),
            articlesTotalRecords: response.total,
          });
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
          `/aticle/articles/${selectedCategory ? selectedCategory : null}/${
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
          setArticles((vi) => vi.concat(response.data.doc));
          setLastCall(scroll);
        })
        .catch((error) => {
          setScroll((s) => s - 1);
        });
    }
  };
  useEffect(() => {
    if (scroll - 1 === lastCall) {
      addArticles();
    }
  }, [scroll]);
  return (
    <View style={styles.root}>
      <MainHeader navigation={navigation} />

      <Spinner visible={state.loading} backRoute="Grow" />
      {/* For Search */}
      <View>
        <Text style={styles.title}>Search Now</Text>

        <Card style={styles.inputCard}>
          <ModalSelector
            data={categories.map((item) => {
              const obj = {
                label: item.name.toUpperCase(),
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
                placeholderTextColor="#C7C7CD"
                style={{
                  color: 'black',
                  fontFamily: theme.fonts.regular.fontFamily,
                  fontSize: 16,
                  paddingLeft: 30,
                  height:45
                }}
                editable={false}
                placeholder="Select Category"
                value={selectedCategoryValue}
              />
              <View  style={{
                  marginHorizontal:5,
                  alignSelf: 'center',
                  borderRadius: 50,
                  backgroundColor: theme.colors.darkPink,
                }}>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={36}
                  color={theme.colors.light}
                
                />
                </View>
            </View>
          </ModalSelector>
        </Card>

        <Card elevation={1} style={{ ...styles.inputCard }}>
          <MaterialIcons name="search" size={28} style={styles.icon} />
          <TextInput
            placeholderTextColor="#C7C7CD"
            placeholder="Search"
            style={{ ...styles.inputStyle, ...styles.input1 }}
            value={search}
            onSubmitEditing={searchArticle}
            onChangeText={(text) => setSearch(text)}
          />
        </Card>
      </View>
      {articles.length > 0 ? (
        <FlatList
          data={articles}
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
          keyExtractor={(item, index) => item._id}
          enableEmptySections={true}
          renderItem={({ item }) => {
            let d = new Date(item.date);
            let date =
              'Posted on ' +
              d.getDate() +
              '/' +
              d.getMonth() +
              1 +
              '/' +
              d.getFullYear();
            return (
              <TouchableWithoutFeedback 
onPress={() => Keyboard.dismiss()}>
              <TouchableOpacity
                key={item._id}
                style={styles.articleCard}
                onPress={() => navigation.navigate('Article', { item })}
              >
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Image
                    source={{ uri: apiUrl + '/files/' + item.thumbnail }}
                    style={{
                      backgroundColor: 'transparent',
                      borderRadius: 4,
                      marginVertical: 10,
                      marginLeft: 10,
                      width: 85,
                      height: 85,
                    }}
                  />
                </View>
                <View style={{ flex: 2, marginLeft: 3 }}>
                  <Card.Content>
                    <Text style={styles.cardtitle}>{item.title}</Text>
                    <View
                      style={{
                        borderBottomColor: theme.colors.grey,
                        borderBottomWidth: 1,
                        marginBottom: 5,
                      }}
                    />
                    <Text style={styles.text}>{date}</Text>
                    <Text style={styles.text}>
                      Posted By {item.postedBy.name}
                    </Text>
                  </Card.Content>
                </View>
              </TouchableOpacity>
              </TouchableWithoutFeedback>
            );
          }}
          onEndReached={() => {
            if (articles.length < totalRecords) {
              setScroll((s) => s + 1);
            }
          }}
          onEndReachedThreshold={0.3}
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
    </View>
  );
}

export default withTheme(Articles);
