import React, { useContext, useEffect, useState } from 'react';
// import ActionButton from 'react-native-action-button';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainHeader from '../../components/mainChildHeader';
import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import axios, { apiUrl } from '../../../axios';
import Spinner from '../../components/spinner';

const ProfessionalDetails = ({ theme, navigation, route }) => {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },
    mycard: {
      width: '60%',
      alignSelf: 'center',
      fontFamily: theme.fonts.regular.fontFamily,
      fontWeight: '300',
      flexDirection: 'column',
      marginVertical: 10,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      marginTop: 10,
      marginBottom: 5,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold.fontFamily,
      marginBottom: 5,
    },
    text: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 15,
      fontWeight: '200',
      marginBottom: 5,
      textAlign: 'center',
      color: theme.colors.grey,
    },
    mytext: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 15,
      color: theme.colors.grey,
      fontWeight: '100',
      marginVertical: 10,
      marginLeft: 8,
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
  });
  const { state, dispatch } = useContext(GlobalContext);
  const [professional, setProfessional] = useState(route.params.item);
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchProfessional = async () => {
  //     dispatch({type: actionTypes.SET_LOADING, payload: true});
  //     try {
  //       const res = await axios.get(
  //         `/connectProfessionals/${route.params.id}`,
  //         {
  //           headers: {
  //             authorization: 'Bearer ' + state.userToken,
  //           },
  //         },
  //       );
  //       setProfessional(res.data.data.doc);
  //       dispatch({type: actionTypes.SET_LOADING, payload: false});
  //     } catch (err) {
  //       dispatch({type: actionTypes.SET_LOADING, payload: false});
  //       setError(err);
  //     }
  //   };
  //   fetchProfessional();
  // }, []);
  const openDial = () => {
    if (Platform.OS === 'android') {
      Linking.openURL(`tel:${professional.phone}`);
    } else {
      Linking.openURL(`telprompt:${professional.phone}`);
    }
  };

  if (error) {
    return Alert.alert(
      'Error',
      "Fail to fetch User's data",
      [
        {
          text: 'Retry',
          onPress: () => navigation.navigate('ProfessionalDetails'),
          style: 'default',
        },
        { text: 'Back', onPress: () => navigation.goBack() },
      ],
      { cancelable: false }
    );
  }

  return (
    <>
      <View style={styles.root}>
        <ScrollView>
          <MainHeader navigation={navigation} />

          <Spinner visible={state.loading} />
          {professional != null && (
            <>
              <View
                style={{ alignItems: 'center', justifyContent: 'flex-end' }}
              >
                <Image
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 140 / 2,
                  }}
                  source={{ uri: apiUrl + '/files/' + professional.image }}
                />
              </View>
              <View
                style={{
                  alignItems: 'center',
                  margin: 5,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={styles.title}>{professional.name}</Text>
                <View
                  style={{
                    borderBottomColor: theme.colors.grey,
                    borderBottomWidth: 1,
                    marginVertical: 7,
                    width: '50%',
                  }}
                />
                <Text style={styles.text}>{professional.description}</Text>
              </View>
              <TouchableOpacity
                style={styles.mycard}
                onPress={() => {
                  Linking.openURL(`mailto:${professional.email}`);
                }}
              >
                <View style={styles.cardContent}>
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={30}
                    color={theme.colors.secondary}
                  />
                  <Text style={styles.mytext}>{professional.email}</Text>
                </View>

                <View
                  style={{
                    borderBottomColor: theme.colors.grey,
                    borderBottomWidth: 1,
                    marginVertical: 7,
                    width: '100%',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mycard}
                onPress={() => openDial()}
              >
                <View style={styles.cardContent}>
                  <MaterialCommunityIcons
                    name="phone"
                    size={30}
                    color={theme.colors.secondary}
                  />
                  <Text style={styles.mytext}>{professional.phone}</Text>
                </View>

                <View
                  style={{
                    borderBottomColor: theme.colors.grey,
                    borderBottomWidth: 1,
                    marginVertical: 7,
                    width: '100%',
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.mycard}
                onPress={() =>
                  professional.website
                    ? Linking.openURL(professional.website)
                    : null
                }
              >
                <View style={styles.cardContent}>
                  <MaterialCommunityIcons
                    name="web"
                    size={30}
                    color={theme.colors.secondary}
                  />
                  <Text style={styles.mytext}>
                    {professional.website
                      ? professional.website
                      : 'Not Available'}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default withTheme(ProfessionalDetails);
