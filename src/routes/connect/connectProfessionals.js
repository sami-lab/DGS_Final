import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
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
function connectCategories({ theme, navigation, route }) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },
    card: {
      width: Dimensions.get('screen').width * 0.9,
      alignSelf: 'center',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10, //for Andriod,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#E5DDD5',
    },

    professionalsCard: {
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
      backgroundColor: 'white',
      borderRadius: 5,
    },
    title: {
      fontSize: 17,
      marginTop: 10,
      marginBottom: 5,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold.fontFamily,
      marginBottom: 5,
    },
    text: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 12,
      marginBottom: 5,
    },
  });
  const { state, dispatch } = useContext(GlobalContext);

  const [professionals, setProfessional] = useState([]);
  const [category, setCategory] = useState(route.params.category);
  const [error, setError] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const fetchProfessionals = () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    setPageLoaded(true);
    axios
      .get(`/connectProfessionals/professionals/${category}`, {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(({ data: response }) => {
        //save token and user in async storage
        setProfessional(response.data.doc);
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
    fetchProfessionals();
  }, [category]);
  return (
    <View style={styles.root}>
      <MainHeader navigation={navigation} />

      <Spinner visible={state.loading} />
      {professionals.length > 0 ? (
        <ScrollView style={{ marginTop: 15 }} persistentScrollbar={true}>
          <Card style={styles.card}>
            {professionals.map((pro) => (
              <TouchableOpacity
                key={pro._id}
                style={styles.professionalsCard}
                onPress={() =>
                  navigation.navigate('ProfessionalDetails', { item: pro })
                }
              >
                <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Image
                    source={{ uri: apiUrl + '/files/' + pro.image }}
                    style={{
                      backgroundColor: 'transparent',
                      borderRadius: 4,

                      width: 105,
                      height: 130,
                    }}
                  />
                </View>
                <View style={{ flex: 2, marginLeft: 5 }}>
                  <Card.Content>
                    <Title style={styles.title}>{pro.name}</Title>
                    <View
                      style={{
                        borderBottomColor: theme.colors.grey,
                        borderBottomWidth: 1,
                        marginBottom: 2,
                      }}
                    />
                    <Text style={styles.text}>{pro.description}</Text>
                  </Card.Content>
                </View>
              </TouchableOpacity>
            ))}
          </Card>
        </ScrollView>
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

export default withTheme(connectCategories);
