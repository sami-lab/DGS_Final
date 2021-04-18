import React, { useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Card, Button, Title, withTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import axios from '../../../axios';
import Spinner from '../../components/spinner';
import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
function Login({ theme, navigation }) {
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
      elevation: 5, //for Andriod,
      borderRadius: 5,
      borderWidth: 0.6,
      borderColor: '#E5DDD5',
    },
    inputStyle: {
      paddingLeft: 30,
      borderRadius: 20,
      paddingVertical: 12,
    },
    buttonStyles: {
      display: 'flex',
      justifyContent: 'center',
      width: Dimensions.get('screen').width * 0.6,
      backgroundColor: theme.colors.darkPink,
      marginVertical: 15,
      color: '#fff',
      borderRadius: 50,
    },
    buttonText: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 18,
      textTransform: 'capitalize',
      paddingVertical: 5,
    },
    title: {
      fontSize: 40,
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
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const passwordRef = useRef();
  const [enableshift, setenableShift] = useState(false);

  const submitData = () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    // //apply validation here first
    axios
      .post('/users/login', {
        username,
        password,
      })
      .then(({ data: response }) => {
        //save token and user in async storage
        AsyncStorage.setItem('userToken', response.token).catch((e) => {
          dispatch({ type: actionTypes.SET_LOADING, payload: false });
          Alert.alert('someting went wrong' + e.message);
        });
        AsyncStorage.setItem('user', JSON.stringify(response.data.user)).catch(
          (e) => {
            dispatch({ type: actionTypes.SET_LOADING, payload: false });
            Alert.alert('someting went wrong' + e.message);
          }
        );

        dispatch({
          type: actionTypes.LOGIN,
          token: response.token,
          user: response.data.user,
        });
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        Alert.alert(
          'Fail',
          error.response ? error.response.data.message : error.message
        );
      });
  };
  const validateinput = () => {
    return username != null && password.length > 4;
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <Spinner visible={state.loading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/loginTopCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Platform.OS === 'android'
                  ? Dimensions.get('screen').height * 0.2
                  : Dimensions.get('screen').height * 0.28,
            }}
          />
        </View>
        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.53,
          }}
        >
          <Card.Content>
            <Title style={styles.title}>Welcome</Title>
          </Card.Content>
          <Card style={styles.inputCard}>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#C7C7CD"
              style={styles.inputStyle}
              value={username}
              onSubmitEditing={() => passwordRef.current.focus()}
              blurOnSubmit={false}
              onFocus={() => setenableShift(false)}
              onChangeText={(text) => setUsername(text)}
            />
          </Card>
          <Card style={styles.inputCard}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#C7C7CD"
              style={styles.inputStyle}
              value={password}
              secureTextEntry={true}
              ref={passwordRef}
              onFocus={() => setenableShift(true)}
              onChangeText={(text) => setPassword(text)}
            />
          </Card>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text
              style={styles.text}
              onPress={() => navigation.navigate('ForgetPassword')}
            >
              Forget Your Password?
            </Text>
            <Button
              color="#fff"
              disabled={state.loading || !validateinput()}
              style={styles.buttonStyles}
              onPress={() => submitData()}
            >
              <Text style={styles.buttonText}> Log In</Text>{' '}
            </Button>
            <Text style={styles.text}>Don't have an account?</Text>
            <Text style={styles.text}>
              Register by answering{' '}
              <Text style={{ fontWeight: 'bold' }}> 6 quick questions </Text>
            </Text>
            <Button
              color="#fff"
              disabled={state.loading}
              style={styles.buttonStyles}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={styles.buttonText}> Sign Up</Text>{' '}
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
            source={require('../../assets/dev/loginBottomCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.2,
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
export default withTheme(Login);
