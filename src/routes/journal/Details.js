import React, { useContext, useEffect, useState } from 'react';
// import ActionButton from 'react-native-action-button';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MainHeader from '../../components/mainChildHeader';
import { apiUrl } from '../../../axios';

const Details = ({ theme, navigation, route }) => {
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

    buttonStyles: {
      display: 'flex',
      width: Dimensions.get('screen').width * 0.6,
      backgroundColor: theme.colors.darkPink,
      marginVertical: 5,
      color: '#fff',
      borderRadius: 50,
      paddingVertical: 7,
    },
    buttonText: {
      fontFamily: theme.fonts.bold.fontFamily,
      fontSize: 19,
      textTransform: 'capitalize',

      color: '#fff',
    },
  });
  const [note, setNote] = useState(route.params.item);

  return (
    <>
      <View style={styles.root}>
        <ScrollView>
          <MainHeader navigation={navigation} />

          {note != null && (
            <>
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                {note.image && (
                  <Image
                    resizeMode="cover"
                    style={{
                      width: Dimensions.get('window').width * 0.8,
                      height: Dimensions.get('window').height * 0.3,
                    }}
                    source={{ uri: apiUrl + '/files/' + note.image }}
                  />
                )}
              </View>
              <View
                style={{
                  alignItems: 'center',
                  margin: 5,
                  paddingHorizontal: 10,
                }}
              >
                <Text style={styles.title}>{note.title}</Text>
                <View
                  style={{
                    borderBottomColor: theme.colors.grey,
                    borderBottomWidth: 1,
                    marginVertical: 7,
                    width: '50%',
                  }}
                />
                <Text style={styles.text}>{note.description}</Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20,
                  }}
                >
                  <TouchableOpacity
                    color="#fff"
                    style={{
                      ...styles.buttonStyles,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate('Create', note)}
                  >
                    <Text style={styles.buttonText}>Update</Text>
                    <MaterialCommunityIcons
                      name="circle-edit-outline"
                      size={22}
                      color={theme.colors.light}
                      style={{ marginLeft: 5 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default withTheme(Details);
