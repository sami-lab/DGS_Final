import React, { useContext } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTheme, Avatar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

import { GlobalContext } from '../context/GlobalContext';
import * as actionTypes from '../context/actions';
//import Orientation from 'react-native-orientation';

export default function MainHeader() {
  const theme = useTheme();
  const { dispatch } = useContext(GlobalContext);
  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user');
      dispatch({ type: actionTypes.LOGOUT });
    } catch (e) {
      Alert.alert('someting went wrong');
    }
  };

  // React.useEffect(() => {
  //   Orientation.lockToPortrait();
  // }, []);
  return (
    <ImageBackground
      resizeMode="stretch"
      source={require('../assets/dev/mainCurve.png')}
      style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.15,
        justifyContent: 'center',
      }}
    >
      {/* <TouchableOpacity
        onPress={signOut}
        style={{alignSelf: 'flex-end', marginTop: 75, marginRight: 20}}>
        <Avatar.Icon
          size={40}
          icon="login-variant"
          color={theme.colors.light}
          style={{
            alignSelf: 'center',
            marginBottom: 1,
            backgroundColor: theme.colors.secondary,
          }}
        />

        <Text
          style={{
            color: theme.colors.secondary,
            fontFamily: theme.fonts.regular.fontFamily,
            fontSize: 12,
          }}>
          Sign out
        </Text>
      </TouchableOpacity> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
