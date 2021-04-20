import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Alert,
  Platform,
} from 'react-native';
import { Card, Button, Title, withTheme } from 'react-native-paper';
import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import axios from '../../../axios';
import Spinner from '../../components/spinner';

function ForgetPassword({ theme, navigation }) {
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
      width: Dimensions.get('screen').width * 0.4,
      backgroundColor: theme.colors.darkPink,
      marginVertical: 15,
      color: '#fff',
      borderRadius: 50,
    },
    buttonText: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontWeight: '600',
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

  const [email, setEmail] = React.useState('');
  const [enableshift, setenableShift] = useState(false);

  const submitData = () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    // //apply validation here first
    axios
      .post('/users/forgetpassword', {
        email,
      })
      .then((res) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        Alert.alert(`Password Send to Email successfuly`);
        //redirect to password sucuss view
        navigation.navigate('ResetToken');
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
    return (
      email != null &&
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gim.test(
        email
      )
    );
  };
  return (
    <View style={styles.root}>
      <Spinner visible={state.loading} />
      <View>
        <Image
          resizeMode="stretch"
          source={require('../../assets/dev/forgetPasswordTopCurve.png')}
          style={{
            width: Dimensions.get('screen').width,
            height:
              Platform.OS === 'android'
                ? Dimensions.get('screen').height * 0.2
                : Dimensions.get('screen').height * 0.23,
          }}
        />
      </View>
      <KeyboardAvoidingView
        behavior="position"
        enabled={enableshift}
        style={{
          alignSelf: 'center',
          width: Dimensions.get('screen').width,
          height:
            Platform.OS === 'android'
              ? Dimensions.get('screen').height * 0.51
              : Dimensions.get('screen').height * 0.6,
        }}
      >
        <Image
          resizeMode="center"
          source={require('../../assets/dev/lock.png')}
          style={{
            marginBottom: 10,
            width: '100%',
            height: 205,
          }}
        />
        <Card.Content>
          <Title style={styles.title}>Forget Your Password ?</Title>
        </Card.Content>
        <Card style={styles.inputCard}>
          <TextInput
            placeholder="Email"
            style={styles.inputStyle}
            value={email}
            onFocus={() => setenableShift(true)}
            onChangeText={(text) => setEmail(text)}
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
            <Text style={styles.buttonText}> Next</Text>{' '}
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
          source={require('../../assets/dev/forgetPasswordBottomCurve.png')}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.21,
          }}
        />
      </View>
    </View>
  );
}
export default withTheme(ForgetPassword);
