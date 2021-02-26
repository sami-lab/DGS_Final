import React, { useEffect, useState, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  FlatList,
} from 'react-native';
import { withTheme, Card, FAB, IconButton } from 'react-native-paper';
import axios, { apiUrl } from '../../../axios';
import MainHeader from '../../components/mainChildHeader';
import Spinner from '../../components/spinner';

import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
function Journal({ theme, navigation, route }) {
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
      paddingVertical: 10,
      marginTop: 5,
    },

    title: {
      fontSize: 19,
      marginTop: 10,
      marginBottom: 5,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold.fontFamily,
      marginBottom: 5,
    },
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  });
  const { state, dispatch } = useContext(GlobalContext);

  const [journals, setJournals] = useState([]);
  const [error, setError] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);

  const fetchShops = () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    setPageLoaded(true);
    axios
      .get(`/journal/`, {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(({ data: response }) => {
        //save token and user in async storage
        setJournals(response.data.doc);
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

  const deleteNote = (id) => {
    axios
      .delete(`/journal/${id}`, {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then((deletedEmp) => {
        Alert.alert(`Recorded deleted sucessfully`);
        setJournals(journals.filter((i) => i._id !== id));
      })
      .catch((err) => {
        Alert.alert('Opps! Someting went wrong');
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      fetchShops();
    }, [])
  );

  const renderList = (item) => {
    const d = new Date(item.date);
    return (
      <Card
        style={{ margin: 5 }}
        onPress={() => navigation.navigate('Details', { item })}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 6,
          }}
        >
          <View style={{ flexDirection: 'column' }}>
            <Text
              style={{
                opacity: 0.7,
                color: theme.colors.grey,
                fontFamily: theme.fonts.regular.fontFamily,
                fontSize: 10,
                marginLeft: 3,
                marginBottom: 2,
              }}
            >
              {d.toDateString()}
            </Text>
            <Text
              style={{
                marginLeft: 3,
                fontFamily: theme.fonts.regular.fontFamily,
              }}
            >
              {item.title}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <IconButton
              icon="delete"
              size={20}
              style={{ marginRight: 2 }}
              color={theme.colors.darkPink}
              onPress={() => {
                Alert.alert(
                  'Delete',
                  'Are you sure you want to delete note',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    { text: 'OK', onPress: () => deleteNote(item._id) },
                  ],
                  { cancelable: false }
                );
              }}
            />
            <IconButton
              icon="circle-edit-outline"
              size={20}
              color={theme.colors.darkPink}
              onPress={() => {
                navigation.navigate('Create', item);
              }}
            />
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View style={styles.root}>
      <MainHeader navigation={navigation} backRoute="Home" />

      {journals.length > 0 ? (
        <FlatList
          data={journals}
          renderItem={({ item }) => {
            return renderList(item);
          }}
          keyExtractor={(item) => item._id}
          onRefresh={() => fetchShops()}
          refreshing={state.loading}
        />
      ) : (!state.loading && pageLoaded) || error ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            style={{
              ...styles.title,
              width: '80%',
              textAlign: 'center',
              color: theme.colors.grey,
            }}
          >
            Opps no records found{' '}
            <Text
              style={{ fontWeight: '700' }}
              onPress={() => navigation.navigate('Create')}
            >
              Click
            </Text>{' '}
            to add note now.
          </Text>
        </View>
      ) : null}
      <FAB
        onPress={() => navigation.navigate('Create')}
        style={styles.fab}
        small={false}
        icon="plus"
        theme={{ colors: { accent: theme.colors.darkPink } }}
      />
    </View>
  );
}

export default withTheme(Journal);
