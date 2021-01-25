import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import React, { useEffect, useState, useContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, View, StatusBar, Dimensions, Platform } from 'react-native';
import AuthStack from './src/components/stacks/authStack';
import TabsStack from './src/components/stacks/tabStack';
import { GlobalContext } from './src/context/GlobalContext';
import { withTheme } from 'react-native-paper';

import Spinner from './src/components/spinner';
import * as actionTypes from './src/context/actions';
import axios from './axios';
// console.log("firebase");
// console.log(firebase.notifications);


const App = ({ theme }) => {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const { state, dispatch } = useContext(GlobalContext);
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  useEffect(() => {
    const fetchToken = async () => {
      // setIsLoading(false);
      let userToken = null;
      let user = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
        user = await AsyncStorage.getItem('user');
      } catch (e) {
        console.log('Error Fetching Token');
        dispatch({
          type: actionTypes.LOGOUT,
        });
        setLoadingAuth(false);
      }

      if (userToken != null) {
        //validate Token Here from server or async storage to find user state

        //validating through server
        try {
          const response = await axios.post('/users/validateToken', null, {
            headers: {
              authorization: 'Bearer ' + userToken,
            },
          });
          response.data.data.user !== null
            ? dispatch({
              type: actionTypes.LOGIN,
              token: userToken,
              user: response.data.data.user,
            })
            : null;
          setLoadingAuth(false);
          return;
        } catch (e) {
          dispatch({
            type: actionTypes.LOGOUT,
          });
          setLoadingAuth(false);
        }
      } else {
        setLoadingAuth(false);
      }
    };
    fetchToken();
  }, []);

  //firebase notification (King Commented)
  // const createChannel = () => {
  //   const channel = new firebase.notifications.Ios.Channel(
  //     'channelId',
  //     'channelName',
  //     firebase.notifications.Ios.Importance.Max,
  //   ).setDescription('Description');
  //   firebase.notifications().ios.createChannel(channel);
  // };

  // const notificationsListener = () => {
  //   firebase.notifications().onNotification((notification) => {
  //     if (Platform.OS === 'android') {
  //       const localNotification = new firebase.notifications.Notification({
  //         sound: 'default',
  //         vibrate: 1,
  //         show_in_foreground: true,
  //       })
  //         .setNotificationId(notification.notificationId)
  //         .setTitle(notification.title)
  //         .setSubtitle(notification.subtitle)
  //         .setBody(notification.body)
  //         .setData(notification.data)
  //         .android.setChannelId('channelId')
  //         .android.setPriority(firebase.notifications.Android.Priority.High);

  //       firebase
  //         .notifications()
  //         .displayNotification(localNotification)
  //         .catch((err) => console.log(err));
  //     }
  //   });
  // };
  // const initialNotification = () => {
  //   firebase.messaging().onMessage((initialMessage) => {
  //     console.log('Initial Message: ', initialMessage);
  //   });
  // };
  // const getToken = async () => {
  //   const firebaseToken = await firebase.messaging().getToken();
  //   console.log("firebaseToken")
  //   console.log(firebaseToken)
  //   // if (firebaseToken) {
  //   //   firebase.messaging().subscribeToTopic('video');
  //   // }
  // };



  // King commented

  useEffect(() => {
    // getToken();
    // initialNotification();
    // createChannel();
    // notificationsListener();
  }, []);


  // useEffect(() => {
  //   //Assume a message-notification contains a "type" property in the data payload of the screen to open
  //   firebase.messaging().onNotificationOpenedApp((remoteMessage) => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     //navigation.navigate(remoteMessage.data.type);
  //   });
  //   //Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
  //       }
  //       //setLoading(false);
  //     });
  // }, []);
  if (loadingAuth)
    return (
      <View style={styles.root}>
        <Spinner visible={loadingAuth} />
      </View>
    );
  return (
    <>
      <StatusBar barStyle="default" backgroundColor={theme.colors.secondary} />

      {state.userToken !== null ? <TabsStack /> : <AuthStack />}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  Gif: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default withTheme(App);
