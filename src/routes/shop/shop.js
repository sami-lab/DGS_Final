import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  Linking,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { withTheme, Card, Title } from 'react-native-paper';
import axios, { apiUrl } from '../../../axios';
import MainHeader from '../../components/mainChildHeader';
import Spinner from '../../components/spinner';

import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
function Shop({ theme, navigation, route }) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },

    professionalsCard: {
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: 5,
      paddingVertical: 10,
      margin: 5,
      width: Dimensions.get('window').width * 0.88,
      alignSelf: 'center',
    },

    text: {
      marginTop: 5,
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 12,
      marginBottom: 5,
      textAlign: 'center',
    },
  });
  const { state, dispatch } = useContext(GlobalContext);

  const [shops, setShops] = useState([]);
  const [error, setError] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const fetchShops = () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    setPageLoaded(true);
    axios
      .get(`/shop/`, {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(({ data: response }) => {
        //save token and user in async storage
        setShops(response.data.doc);
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        setError(true);
        Alert.alert(
          'Fail To fetch data',
          error.response ? error.response.data.message : error.message
        );
      });
  };

  useEffect(() => {
    fetchShops();
  }, []);
  return (
    <View style={styles.root}>
      <MainHeader navigation={navigation} backRoute="Home" />

      <Spinner visible={state.loading} />
      {shops.length > 0 ? (
        <ScrollView style={{ marginTop: 15 }} persistentScrollbar={true}>
          {shops.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={styles.professionalsCard}
              onPress={() => Linking.openURL(item.website)}
            >
              <View style={{ alignItems: 'center' }}>
                <Image
                  resizeMode="cover"
                  source={{ uri: apiUrl + '/files/' + item.image }}
                  style={{
                    backgroundColor: 'transparent',
                    borderRadius: 4,
                    width: Dimensions.get('window').width * 0.8,
                    height: 130,
                    marginBottom: 4,
                  }}
                />

                <Text style={styles.text}>{item.description}</Text>
                <View
                  style={{
                    borderBottomColor: theme.colors.grey,
                    borderBottomWidth: 1,
                    marginBottom: 2,
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (!state.loading && pageLoaded) || error ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ ...styles.title, width: '80%', textAlign: 'center' }}>
            Opps no records found
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export default withTheme(Shop);
