import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  Text,
} from 'react-native';

import {
  Card,
  Button,
  Title,
  ActivityIndicator,
  withTheme,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';

import axios from '../../../axios';
import {GlobalContext} from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';

function ChangePassword({theme, navigation}) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: theme.colors.secondary,
      justifyContent: 'flex-end',
    },
    card: {
      width: '100%',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 8,
      shadowOpacity: 0.86,
      elevation: 30, //for Andriod
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingBottom: 10,
    },
    inputCard: {
      marginVertical: 5,
      marginHorizontal: 5,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, //for Andriod,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#E5DDD5',
    },
    card1: {
      paddingBottom: 10,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
    },
    inputStyle: {
      paddingHorizontal: 10,
      borderRadius: 20,

      color: theme.colors.text,
    },
    buttonStyles: {
      display: 'flex',
      justifyContent: 'center',
      width: 200,
      backgroundColor: theme.colors.primary,
      marginVertical: 5,
      color: '#fff',
      borderRadius: 50,
      paddingHorizontal: 30,
      paddingVertical: 10,

      fontWeight: '700',
      fontSize: 120,
    },
    title: {
      fontSize: 30,
      marginVertical: 15,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-medium,Baskerville',
      color: theme.colors.primary,
      textAlign: 'center',
    },
    text: {
      textAlign: 'center',
      marginVertical: 5,
    },
    link: {
      fontFamily: 'sans-serif-medium,Baskerville',
      fontWeight: 'bold',
      fontSize: 15,
      color: '#008545',
    },
    modalView: {
      position: 'absolute',
      bottom: 2,
      width: '100%',
      backgroundColor: 'white',
    },
    modalButtonView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });
  const {state, dispatch} = useContext(GlobalContext);

  const [passwordCurrent, setPasswordCurrent] = React.useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enableshift, setenableShift] = useState(false);

  const submitData = () => {
    dispatch({type: actionTypes.SET_LOADING, payload: true});
    // //apply validation here first
    axios
      .patch(
        '/api/users/updatePassword',
        {
          passwordCurrent,
          password,
          confirmPassword,
        },
        {
          headers: {
            authorization: 'Bearer ' + state.userToken,
          },
        },
      )
      .then(({data: response}) => {
        AsyncStorage.setItem('userToken', response.token).catch((e) => {
          Alert.alert('someting went wrong' + e.message);
        });
        AsyncStorage.setItem(
          'user',
          JSON.stringify(response.data.user),
        ).catch((e) => Alert.alert('someting went wrong' + e.message));
        dispatch({type: actionTypes.SET_LOADING, payload: false});
        Alert.alert('Password Change Successfully');
        navigation.navigate('Profile');
      })
      .catch((error) => {
        console.log(error);
        dispatch({type: actionTypes.SET_LOADING, payload: false});
        Alert.alert('Fail', error.response.data.message);
      });
  };
  return (
    <KeyboardAvoidingView enabled={enableshift} style={styles.root}>
      <Card style={styles.card}>
        <Card.Cover
          resizeMode="stretch"
          source={require('../../assets/dev/smiley.png')}
          style={{
            backgroundColor: 'transparent',
            alignSelf: 'center',
            borderRadius: 20,
            marginTop: 5,
            marginBottom: 10,
            width: 120,
            height: 120,
          }}
        />
        <Card.Content>
          <Title style={styles.title}>Change Password</Title>
        </Card.Content>
        <Card style={styles.inputCard}>
          <TextInput
            placeholderTextColor={theme.colors.text}
            secureTextEntry={true}
            placeholder="Current Password"
            style={styles.inputStyle}
            value={passwordCurrent}
            onFocus={() => setenableShift(false)}
            onChangeText={(text) => setPasswordCurrent(text)}
          />
        </Card>

        <Card style={styles.inputCard}>
          <TextInput
            placeholderTextColor={theme.colors.text}
            placeholder="New Password"
            style={styles.inputStyle}
            value={password}
            secureTextEntry={true}
            onFocus={() => setenableShift(true)}
            onChangeText={(text) => setPassword(text)}
          />
        </Card>

        <Card style={styles.inputCard}>
          <TextInput
            placeholderTextColor={theme.colors.text}
            placeholder="Confirm Password"
            style={styles.inputStyle}
            value={confirmPassword}
            secureTextEntry={true}
            onFocus={() => setenableShift(true)}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </Card>
        <View style={{alignItems: 'center'}}>
          <Button
            disabled={state.loading}
            color="#fff"
            theme={{fonts: {regular: 'Apple Color Emoji'}}}
            style={styles.buttonStyles}
            onPress={() => submitData()}>
            <Text style={{fontSize: 15}}> Submit</Text>
          </Button>
          {state.loading ? (
            <ActivityIndicator color={theme.colors.primary} size="large" />
          ) : null}
        </View>

        <Text
          style={{...styles.link, ...styles.text}}
          onPress={() => navigation.navigate('Profile')}>
          Back to Profile
        </Text>
      </Card>
    </KeyboardAvoidingView>
  );
}
export default withTheme(ChangePassword);
