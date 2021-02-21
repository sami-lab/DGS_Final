import React, { useContext } from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useTheme, Avatar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

import { GlobalContext } from '../context/GlobalContext';
import * as actionTypes from '../context/actions';
export default function mainChildHeader({ navigation, backRoute }) {
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
  return (
    <ImageBackground
      resizeMode="stretch"
      source={require('../assets/dev/mainCurve.png')}
      style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.17,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      }}
    >
      <TouchableOpacity
        style={{ marginLeft: 30, marginTop: -25 }}
        onPress={() =>
          backRoute ? navigation.navigate(backRoute) : navigation.goBack()
        }
      >
        <Image
          resizeMode="stretch"
          source={require('../assets/dev/arrow-left.png')}
          style={{
            width: 40,
            height: 25,
          }}
        />
      </TouchableOpacity>

      {/* <TouchableOpacity
        onPress={signOut}
        style={{alignSelf: 'flex-end', marginTop: 80, marginRight: 20}}>
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
