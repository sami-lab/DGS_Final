import React, {useEffect, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  Image,
  SafeAreaView,
  Platform
} from 'react-native';
import {Card, Title, Button, withTheme} from 'react-native-paper';
import axios from '../../../axios';
import AsyncStorage from '@react-native-community/async-storage';
import {GlobalContext} from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';

function RegisterationSuccess({theme, navigation, route}) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },

    buttonStyles: {
      display: 'flex',
      justifyContent: 'center',
      width: Dimensions.get('screen').width * 0.7,
      backgroundColor: theme.colors.darkPink,
      marginVertical: 15,
      color: '#fff',
      borderRadius: 50,
    },
    buttonText: {
      fontFamily: theme.fonts.bold.fontFamily,
      fontSize: 19,
      textTransform: 'capitalize',
      paddingVertical: 5,
    },
    title: {
      fontSize: 35,
      paddingVertical: 5,
      paddingHorizontal: 15,
      fontFamily: theme.fonts.bold.fontFamily,
    },
    text: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 17,
      paddingVertical: 5,
      paddingHorizontal: 15,
    },
  });
  const {dispatch} = useContext(GlobalContext);

  useEffect(() => {
    const auth = () => {
      dispatch({type: actionTypes.SET_LOADING, payload: true});
      // //apply validation here first

      //save token and user in async storage
      AsyncStorage.setItem('userToken', route.params.token).catch((e) => {
        dispatch({type: actionTypes.SET_LOADING, payload: false});
        Alert.alert('someting went wrong' + e.message);
        navigation.navigate('Login');
      });
      AsyncStorage.setItem('user', JSON.stringify(route.params.user)).catch(
        (e) => {
          dispatch({type: actionTypes.SET_LOADING, payload: false});
          Alert.alert('someting went wrong' + e.message);
          navigation.navigate('Login');
        },
      );

      dispatch({
        type: actionTypes.LOGIN,
        token: route.params.token,
        user: route.params.user,
      });
      dispatch({type: actionTypes.SET_LOADING, payload: false});
    };
    setTimeout(() => {
      auth();
    }, 2000);
  }, []);
  return (
    <View style={styles.root}>
      <View>
        <Image
          resizeMode="stretch"
          source={require('../../assets/dev/forgetPasswordTopCurve.png')}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.2,
          }}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          flex: 1,
          width: Dimensions.get('screen').width,
        }}>
        <Card.Content>
          <Title style={styles.title}>Congratulations</Title>
          <Text style={styles.text}>
            Thank you! The Divorced Girl Smiling app is like having a friend
            with you at all times. We’re here to help answer your questions,
            connect you with trusted professionals, and inspire you in this new
            chapter of your life.
          </Text>
        </Card.Content>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            resizeMode="center"
            source={require('../../assets/dev/approve.png')}
            style={{
              marginBottom: 10,
              width: '100%',
              height: 205,
            }}
          />
          {/* <Button
            color="#fff"
            style={styles.buttonStyles}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}> Continue to Login</Text>{' '}
          </Button> */}
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 0,
          margin: 0,
        }}>
        <Image
          resizeMode="stretch"
          source={require('../../assets/dev/resetPasswordBottomCurve.png')}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.2,
          }}
        />
      </View>
    </View>
  );
}

export default withTheme(RegisterationSuccess);
