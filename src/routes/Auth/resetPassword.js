import React, { useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
  Image,
  SafeAreaView,
  TextInput,
  Text,
} from 'react-native';

import { Card, Button, Title, withTheme } from 'react-native-paper';

import axios from '../../../axios';
import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import Spinner from '../../components/spinner';

function ResetPassword({ theme, navigation, route }) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },

    inputCard: {
      marginVertical: 15,
      width: Dimensions.get('screen').width * 0.8,
      shadowColor: '#000',
      alignSelf: 'center',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 10, //for Andriod,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: '#E5DDD5',
    },
    inputStyle: {
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    buttonStyles: {
      display: 'flex',
      justifyContent: 'center',
      width: Dimensions.get('screen').width * 0.4,
      backgroundColor: theme.colors.darkPink,
      marginVertical: 15,
      color: '#fff',
      borderRadius: 50,
    },
    buttonText: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 19,
      textTransform: 'capitalize',
      paddingVertical: 5,
    },
    title: {
      fontSize: 25,
      paddingVertical: 15,
      fontFamily: theme.fonts.bold.fontFamily,
      textAlign: 'center',
    },
    text: {
      fontFamily: theme.fonts.regular.fontFamily,
      textAlign: 'center',
      marginVertical: 5,
    },
  });
  const { state, dispatch } = useContext(GlobalContext);

  const [code, setCode] = React.useState(route.params.token);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const confirmPasswordRef = useRef(null);
  const [enableshift, setenableShift] = useState(false);

  const submitData = () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    // //apply validation here first
    axios
      .patch('/users/resetPassword/' + code, {
        password,
        confirmPassword,
      })
      .then((response) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        Alert.alert(response.data.message);
        navigation.navigate('Login');
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        Alert.alert(
          'Fail',
          error.response ? error.response.data.message : error.message
        );
      });
  };
  const validateinput = () => {
    return (
      password != null &&
      confirmPassword != null &&
      password.length > 4 &&
      password === confirmPassword
    );
  };
  return (
    <SafeAreaView style={styles.root}>
      <Spinner visible={state.loading} />
      <View>
        <Image
          resizeMode="stretch"
          source={require('../../assets/dev/resetPasswordTopCurve.png')}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.2,
          }}
        />
      </View>
      <KeyboardAvoidingView
        behavior="position"
        enabled={enableshift}
        style={{
          alignSelf: 'center',
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height * 0.52,
        }}
      >
        <Image
          resizeMode="center"
          source={require('../../assets/dev/unlock.png')}
          style={{
            marginBottom: 10,
            width: '100%',
            height: 205,
          }}
        />
        <Card.Content>
          <Title style={styles.title}>Reset Your Password </Title>
        </Card.Content>
        <Card style={styles.inputCard}>
          <TextInput
            placeholder="Password"
            style={styles.inputStyle}
            value={password}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            secureTextEntry={true}
            onFocus={() => setenableShift(true)}
            onChangeText={(text) => setPassword(text)}
          />
        </Card>
        <Card style={styles.inputCard}>
          <TextInput
            placeholder="confirm Password"
            style={styles.inputStyle}
            value={confirmPassword}
            ref={confirmPasswordRef}
            secureTextEntry={true}
            onFocus={() => setenableShift(true)}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </Card>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Button
            color="#fff"
            disabled={state.loading}
            style={styles.buttonStyles}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}> Previous</Text>{' '}
          </Button>
          <Button
            color="#fff"
            disabled={state.loading || !validateinput()}
            style={styles.buttonStyles}
            onPress={submitData}
          >
            <Text style={styles.buttonText}> Reset</Text>{' '}
          </Button>
        </View>
      </KeyboardAvoidingView>

      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: 0,
          margin: 0,
        }}
      >
        <Image
          resizeMode="stretch"
          source={require('../../assets/dev/resetPasswordBottomCurve.png')}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.21,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
export default withTheme(ResetPassword);
