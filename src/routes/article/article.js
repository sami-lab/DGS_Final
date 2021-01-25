import React, {useEffect, useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import {Card, withTheme} from 'react-native-paper';
import {WebView} from 'react-native-webview';

import MainHeader from '../../components/mainChildHeader';
import axios from '../../../axios';
import {GlobalContext} from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import Spinner from '../../components/spinner';

function Article({theme, navigation, route}) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },

    inputCard: {
      marginVertical: 15,
      width: Dimensions.get('screen').width * 0.85,
      alignSelf: 'center',
    },
    inputStyle: {
      paddingHorizontal: 30,
      paddingVertical: 20,
    },
    title: {
      fontSize: 30,
      paddingVertical: 2,
      fontFamily: theme.fonts.bold.fontFamily,
    },
    date: {
      fontFamily: theme.fonts.regular.fontFamily,
      color: theme.colors.grey,
      marginBottom: 5,
      fontSize: 15,
    },
    text: {
      fontFamily: theme.fonts.regular.fontFamily,
      color: theme.colors.grey,
      marginVertical: 5,
      marginBottom: 5,
    },
  });
  const {state, dispatch} = useContext(GlobalContext);
  const [article, setArticle] = useState(null);
  const [date, setDate] = useState('');
  useEffect(() => {
    dispatch({type: actionTypes.SET_LOADING, payload: true});
    axios
      .get('/article/' + route.params.id, {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(({data: response}) => {
        dispatch({type: actionTypes.SET_LOADING, payload: false});
        setArticle(response.data.doc);
        let d = new Date(response.data.doc.date);
        setDate(
          'Posted on ' +
            d.getDate() +
            '/' +
            d.getMonth() +
            1 +
            '/' +
            d.getFullYear() +
            ' by ' +
            response.data.doc.postedBy.name,
        );
      })
      .catch((error) => {
        dispatch({type: actionTypes.SET_LOADING, payload: false});
        Alert.alert(
          'Fail To fetch data',
          error.response ? error.response.data.message : error.message,
        );
        return;
      });
  }, []);
  return (
    <View style={styles.root}>
      <Spinner visible={state.loading} />
      <MainHeader navigation={navigation} />

      {article != null ? (
        <ScrollView persistentScrollbar={true}>
          <View style={{justifyContent: 'center', flex: 1}}>
            <View style={styles.inputCard}>
              <Text style={styles.title}>{article.title}</Text>
              <Text style={styles.date}>{date}</Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <WebView
              style={{
                alignSelf: 'center',
                backgroundColor: 'transparent',
                width: Dimensions.get('screen').width * 0.85,
                height: Dimensions.get('screen').height * 0.5,
              }}
              startInLoadingState={false}
              scalesPageToFit={true}
              source={{html: `${article.matter}`}}
              javaScriptEnabled={true}
              domStorageEnabled={true}
            />
          </View>
        </ScrollView>
      ) : null}
    </View>
  );
}

export default withTheme(Article);
