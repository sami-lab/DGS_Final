import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  Dimensions,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Platform
} from 'react-native';
import {Card, Button, Title, withTheme} from 'react-native-paper';
import Spinner from '../../components/spinner';
import {GlobalContext} from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import axios from '../../../axios';

function ResetToken({theme, navigation}) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },

    inputCard: {
      marginVertical: 15,
      width: Dimensions.get('screen').width * 0.8,
      shadowColor: '#000',
      alignSelf: 'center',
      shadowOffset: {width: 0, height: 2},
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
      height: Dimensions.get('screen').height * 0.06,
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
  const {state, dispatch} = useContext(GlobalContext);

  const [code, setCode] = React.useState('');
  const [enableshift, setenableShift] = useState(false);

  const submitData = () => {
    dispatch({type: actionTypes.SET_LOADING, payload: true});
    // //apply validation here first
    axios
      .post('/users/validateResetToken/' + code)
      .then((res) => {
        dispatch({type: actionTypes.SET_LOADING, payload: false});
        //redirect to password sucuss view
        navigation.navigate('ResetPassword', {
          token: code,
        });
      })
      .catch((error) => {
        dispatch({type: actionTypes.SET_LOADING, payload: false});
        Alert.alert(
          'Fail',
          error.response ? error.response.data.message : error.message,
        );
      });
  };
  const validateinput = () => {
    return code != null && code.length === 4;
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
            height: Platform.OS === 'android' ? Dimensions.get('screen').height * 0.15 :Dimensions.get('screen').height * 0.2,
          }}
        />
      </View>
      <KeyboardAvoidingView
        behavior="position"
        enabled={enableshift}
        style={{
          alignSelf: 'center',
          width: Dimensions.get('screen').width,
          height: Platform.OS === 'android' ? Dimensions.get('screen').height * 0.6 :Dimensions.get('screen').height * 0.65,
        }}>
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
          <Title style={styles.title}>Enter 4 Digit code we email you</Title>
        </Card.Content>
        <Card style={styles.inputCard}>
          <TextInput
            placeholder="Code"
            style={styles.inputStyle}
            value={code}
            onFocus={() => setenableShift(true)}
            onChangeText={(text) => setCode(text)}
          />
        </Card>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Button
            color="#fff"
            disabled={state.loading}
            style={styles.buttonStyles}
            onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}> Previous</Text>{' '}
          </Button>
          <Button
            color="#fff"
            disabled={state.loading || !validateinput()}
            style={styles.buttonStyles}
            onPress={submitData}>
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
        }}>
        <Image
          resizeMode="stretch"
          source={require('../../assets/dev/forgetPasswordBottomCurve.png')}
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.15,
          }}
        />
      </View>
    </View>
  );
}
export default withTheme(ResetToken);
