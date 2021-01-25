import React, {useContext, useEffect, useState} from 'react';
// import ActionButton from 'react-native-action-button';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
  ActivityIndicator,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {Title, Card, Button, withTheme} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import {GlobalContext} from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import axios from '../../../axios';
import FloatingButton from '../../components/FabIcon';
const Profile = ({theme, navigation}) => {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },
    mycard: {
      margin: 3,
      elevation: 3,
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
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
      fontSize: 18,
      marginTop: 3,
      marginLeft: 10,
      marginVertical: 15,
      fontWeight: 'bold',
      fontFamily: 'sans-serif-medium,Baskerville',
      color: theme.colors.text,
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });
  const {state, dispatch} = useContext(GlobalContext);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      dispatch({type: actionTypes.SET_LOADING, payload: true});
      try {
        const res = await axios.get('/users/me', {
          headers: {
            authorization: 'Bearer ' + state.userToken,
          },
        });
        setUser(res.data.data.user);
        dispatch({type: actionTypes.SET_LOADING, payload: false});
      } catch (err) {
        console.log(err);
        dispatch({type: actionTypes.SET_LOADING, payload: false});
        setError(err);
      }
    };
    fetchUser();
  }, []);
  const openDial = () => {
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${user.phone}`);
    } else {
      Linking.openURL(`telprompt:${user.phone}`);
    }
  };

  if (state.loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          animating={true}
          color={theme.colors.primary}
          size="large"
        />
        <Text style={{color: theme.colors.text}}> Fetching User's Data</Text>
      </View>
    );
  }
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
        {text: 'Home', onPress: () => navigation.navigate('AskJackie')},
      ],
      {cancelable: false},
    );
  }

  return (
    <>
      <View style={styles.root}>
        <ImageBackground
          source={require('../../assets/dev/blurBackground.jpg')}
          resizeMode="stretch"
          style={{
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.4,
            justifyContent: 'flex-end',
          }}>
          <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
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

          <View style={{alignItems: 'center', margin: 15}}>
            <Title style={{color: '#fff'}}>{user.name}</Title>
            <Text style={{fontSize: 15, color: '#fff'}}>{user.email}</Text>
          </View>
        </ImageBackground>

        <Card
          style={styles.mycard}
          elevation={3}
          onPress={() => {
            Linking.openURL(`mailto:${user.email}`);
          }}>
          <View style={styles.cardContent}>
            <MaterialIcons
              name="email"
              size={32}
              color={theme.colors.primary}
            />
            <Text style={styles.mytext}>{user.email}</Text>
          </View>
        </Card>
        <Card
          style={{...styles.mycard, zIndex: 10}}
          elevation={3}
          onPress={() => openDial()}>
          <View style={{...styles.cardContent, zIndex: 10}}>
            <Entypo name="phone" size={32} color={theme.colors.primary} />
            <Text style={styles.mytext}>{user.phone}</Text>
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
      </View>
      <FloatingButton
        style={{bottom: 5, zIndex: 1000}}
        navigation={navigation}
        user={user}
      />
    </>
  );
};

export default withTheme(Profile);
