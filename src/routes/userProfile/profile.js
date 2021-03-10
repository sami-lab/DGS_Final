import React, { useContext, useEffect, useState } from 'react';
// import ActionButton from 'react-native-action-button';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Alert,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Title, Card, FAB, withTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import MainHeader from '../../components/mainChildHeader';

import axios from '../../../axios';
import Spinner from '../../components/spinner';

//import FloatingButton from '../../components/FabIcon';
const Profile = ({ theme, navigation }) => {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },
    mycard: {
      marginTop: 8,
      elevation: 3,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      shadowOpacity: 0.26,
      zIndex: 5,
    },
    cardContent: {
      flexDirection: 'row',
      padding: 10,
      zIndex: 5,
    },
    mytext: {
      fontSize: 15,
      marginLeft: 10,
      fontFamily: theme.fonts.bold.fontFamily,
      color: theme.colors.grey,
      alignSelf: 'center',
    },
    // actionButtonIcon: {
    //   fontSize: 20,
    //   height: 22,
    //   color: 'white',
    // },
    fab: {
      position: 'absolute',
      alignSelf: 'center',
      bottom: 15,
    },
  });
  const { state, dispatch } = useContext(GlobalContext);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      try {
        const res = await axios.get('/users/me', {
          headers: {
            authorization: 'Bearer ' + state.userToken,
          },
        });
        setUser(res.data.data.user);
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
      } catch (err) {
        console.log(err);
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        setError(err);
      }
    };
    fetchUser();
  }, []);
  const deleteUser = async () => {
    // try {
    //   await AsyncStorage.removeItem('userToken');
    //   await AsyncStorage.removeItem('user');
    //   dispatch({ type: actionTypes.LOGOUT });
    // } catch (e) {
    //   Alert.alert('someting went wrong');
    // }
    //choose route for delete me
    axios
      .delete(`/users/me`, {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(async (deletedEmp) => {
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('user');
          dispatch({ type: actionTypes.LOGOUT });
        } catch (e) {
          Alert.alert('someting went wrong');
        }
      })
      .catch((err) => {
        Alert.alert('Opps! Someting went wrong');
      });
  };
  if (error) {
    return Alert.alert(
      'Error',
      "Fail to fetch User's data",
      [
        {
          text: 'Retry',
          onPress: () => navigation.navigate('Profile'),
          style: 'default',
        },
        { text: 'Home', onPress: () => navigation.navigate('AskJackie') },
      ],
      { cancelable: false }
    );
  }

  return (
    <>
      <View style={styles.root}>
        <MainHeader navigation={navigation} backRoute="Home" />
        <Spinner visible={state.loading} />
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            width: Dimensions.get('window').width * 0.9,
            alignSelf: 'center',
            paddingVertical: 10,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Image
              style={{
                width: 140,
                height: 140,
                borderRadius: 140 / 2,
                marginTop: -50,
              }}
              source={require('../../assets/dev/avatar.png')}
            />
          </View>

          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Title
              style={{ fontFamily: theme.fonts.bold.fontFamily, fontSize: 25 }}
            >
              {user.name}
            </Title>
          </View>
          <Card style={{ ...styles.mycard, zIndex: 10 }} elevation={3}>
            <View style={{ ...styles.cardContent, zIndex: 10 }}>
              <MaterialIcons
                name="verified-user"
                size={32}
                color={theme.colors.darkPink}
              />
              <Text style={styles.mytext}>{user.username}</Text>
            </View>
          </Card>
          <Card style={styles.mycard} elevation={3}>
            <View style={styles.cardContent}>
              <MaterialIcons
                name="email"
                size={32}
                color={theme.colors.darkPink}
              />
              <Text style={styles.mytext}>{user.email}</Text>
            </View>
          </Card>

          {/* <ActionButton
          buttonColor={theme.colors.primary}
          style={{zIndex: 2000, position: 'absolute'}}>
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Edit"
            onPress={() => navigation.navigate('EditUser')}>
            <MaterialIcons
              name="edit"
              color={theme.colors.primary}
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Notifications"
            onPress={() => {
              navigation.navigate('ChangePassword');
            }}>
            <MaterialIcons
              name="lock"
              color={theme.colors.primary}
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
        </ActionButton> */}
        </ScrollView>
      </View>
      <FAB
        onPress={() => {
          Alert.alert(
            'Delete',
            'Are you sure you want to delete your account?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => deleteUser() },
            ],
            { cancelable: false }
          );
        }}
        style={styles.fab}
        small={false}
        icon="delete"
        theme={{ colors: { accent: theme.colors.darkPink } }}
      />
      {/* <FloatingButton
        style={{ bottom: 5, zIndex: 1000 }}
        navigation={navigation}
        user={user}
      /> */}
    </>
  );
};

export default withTheme(Profile);
