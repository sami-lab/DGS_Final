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

function EditUser({theme, navigation, route}) {
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

  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case 'name':
          return route.params.name;
        case 'phone':
          return route.params.phone;
        case 'email':
          return route.params.email;
        case 'picture':
          return route.params.picture;
      }
    }
    return '';
  };
  const {state, dispatch} = useContext(GlobalContext);
  const [name, setName] = useState(getDetails('name'));
  const [phone, setPhone] = useState(getDetails('phone'));
  const [email, setEmail] = useState(getDetails('email'));
  const [picture, setPicture] = useState(getDetails('picture'));
  const [enableshift, setenableShift] = useState(false);

  const submitData = () => {
    dispatch({type: actionTypes.SET_LOADING, payload: true});
    // //apply validation here first
    axios
      .patch(
        '/users/updateMe',
        {
          name,
          phone,
          email,
          picture,
        },
        {
          headers: {
            authorization: 'Bearer ' + state.userToken,
          },
        },
      )
      .then(({data: response}) => {
        AsyncStorage.setItem(
          'user',
          JSON.stringify(response.data.updatedUser),
        ).catch((e) => Alert.alert('someting went wrong' + e.message));
        dispatch({type: actionTypes.SET_LOADING, payload: false});
        Alert.alert('User Updated Successfully');
        navigation.navigate('Profile');
      })
      .catch((error) => {
        console.log(error);
        dispatch({type: actionTypes.SET_LOADING, payload: false});
        Alert.alert('Fail', error.response.data.message);
      });
  };
  return (
    <KeyboardAvoidingView
      behavior="position"
      enabled={enableshift}
      style={styles.root}>
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
          <Title style={styles.title}>Update Profile</Title>
        </Card.Content>
        <Card style={styles.inputCard}>
          <TextInput
            placeholderTextColor={theme.colors.text}
            placeholder="Name"
            style={styles.inputStyle}
            value={name}
            onFocus={() => setenableShift(false)}
            onChangeText={(text) => setName(text)}
          />
        </Card>

        <Card style={styles.inputCard}>
          <TextInput
            placeholderTextColor={theme.colors.text}
            placeholder="Email"
            style={styles.inputStyle}
            value={email}
            onFocus={() => setenableShift(true)}
            onChangeText={(text) => setEmail(text)}
          />
        </Card>

        <Card style={styles.inputCard}>
          <TextInput
            placeholderTextColor={theme.colors.text}
            placeholder="Confirm Password"
            style={styles.inputStyle}
            value={phone}
            onFocus={() => setenableShift(true)}
            onChangeText={(text) => setPhone(text)}
          />
        </Card>
        <View style={{alignItems: 'center'}}>
          <Button
            disabled={state.loading}
            color="#fff"
            theme={{fonts: {regular: 'Apple Color Emoji'}}}
            style={styles.buttonStyles}
            onPress={() => submitData()}>
            <Text style={{fontSize: 15}}> Update</Text>
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
export default withTheme(EditUser);
