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
  TouchableOpacity,
} from 'react-native';
import { Title, Card, FAB, withTheme, Portal, Modal } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';

import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import MainHeader from '../../components/mainChildHeader';

import axios from '../../../axios';
import Spinner from '../../components/spinner';
import { privacy, terms } from '../../components/termsPrivacy';

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
    text: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginVertical: 15,
      color: theme.colors.grey,
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
    privacyTitle: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 5,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold.fontFamily,
      marginBottom: 5,
    },
    privacyText: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 12,
      fontWeight: '200',
      marginBottom: 5,

      color: theme.colors.grey,
    },
    modal: {
      alignSelf: 'center',
      backgroundColor: 'rgb(255, 255, 255)',
      width: '90%',
      paddingBottom: 15,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
  });
  const { state, dispatch } = useContext(GlobalContext);
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [termsModal, setTermsModal] = useState(false);
  const [privacyModal, setPrivacyModal] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      try {
        const res = await axios.get('/users/me', {
          headers: {
            authorization: 'Bearer ' + state.userToken,
          },
        });
        console.log(res.data.data.user);
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
      .delete(`/users/deleteMe`, {
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
        console.log(err);
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

  const renderPrivacyModal = (
    <Portal>
      <Modal
        visible={privacyModal}
        onDismiss={() => setPrivacyModal((m) => !m)}
        contentContainerStyle={{
          ...styles.modal,
          height: '90%',
          padding: 6,
        }}
      >
        <>
          <Text style={styles.privacyTitle}> Privacy policy</Text>
          <View
            style={{
              borderBottomColor: theme.colors.grey,
              borderBottomWidth: 1,
              marginVertical: 7,
              alignSelf: 'center',
              width: '80%',
            }}
          />
          <ScrollView style={{ paddingHorizontal: 6 }}>
            <Text
              style={{
                ...styles.privacyText,
                fontWeight: 'bold',
                fontSize: 15,
                textAlign: 'center',
              }}
            >
              Please read these Terms of Use (the “Terms”) carefully &
              thoroughly!
            </Text>
            <Text style={styles.privacyText}>{privacy}</Text>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: '70%',
                padding: 5,
                backgroundColor: theme.colors.darkPink,
                borderRadius: 50,
              }}
              onPress={() => setPrivacyModal((m) => !m)}
            >
              <Text style={{ textAlign: 'center', padding: 5, color: '#fff' }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </Modal>
    </Portal>
  );
  const renderTermsModal = (
    <Portal>
      <Modal
        visible={termsModal}
        onDismiss={() => setTermsModal((m) => !m)}
        contentContainerStyle={{
          ...styles.modal,
          height: '90%',
          padding: 6,
        }}
      >
        <>
          <Text style={styles.privacyTitle}> Terms & Conditions</Text>
          <View
            style={{
              borderBottomColor: theme.colors.grey,
              borderBottomWidth: 1,
              marginVertical: 7,
              alignSelf: 'center',
              width: '80%',
            }}
          />
          <ScrollView style={{ paddingHorizontal: 6 }}>
            <Text
              style={{
                ...styles.privacyText,
                fontWeight: 'bold',
                fontSize: 15,
                textAlign: 'center',
              }}
            >
              Please read these Terms of Use (the “Terms”) carefully &
              thoroughly!
            </Text>
            <Text style={styles.privacyText}>{terms}</Text>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: '70%',
                padding: 5,
                backgroundColor: theme.colors.darkPink,
                borderRadius: 50,
              }}
              onPress={() => setTermsModal((m) => !m)}
            >
              <Text style={{ textAlign: 'center', padding: 5, color: '#fff' }}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </Modal>
    </Portal>
  );
  return (
    <>
      <View style={styles.root}>
        <MainHeader navigation={navigation} backRoute="Home" />
        <Spinner visible={state.loading} />
        {renderTermsModal}
        {renderPrivacyModal}
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Text style={styles.text} onPress={() => setTermsModal(true)}>
              Terms
            </Text>
            <Text style={styles.text} onPress={() => setPrivacyModal(true)}>
              Privacy
            </Text>
          </View>
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
        theme={{ colors: { accent: 'red' } }}
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
