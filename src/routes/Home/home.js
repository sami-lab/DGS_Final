import React, { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Card, withTheme, Button } from 'react-native-paper';
import MainHeader from '../../components/mainHeader';
function Home({ theme, navigation }) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },
    imageCard: {
      marginHorizontal: 4,
      marginVertical: 10,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },

    title: {
      fontSize: 22,
      lineHeight: 30,
      paddingVertical: 15,
      fontFamily: theme.fonts.bold.fontFamily,
      textAlign: 'center',
    },
  });

  return (
    <ScrollView style={styles.root}>
      <MainHeader />
      <View
        style={{
          width: Dimensions.get('window').width * 0.9,
          alignSelf: 'center',
          marginVertical: 10,
          justifyContent: 'center',
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >
        <TouchableOpacity
          style={styles.imageCard}
          onPress={() => {
            navigation.navigate('AskJackie');
          }}
        >
          <Image
            source={require('../../assets/dev/askJackie.png')}
            style={{
              borderRadius: 15,
              width: 95,
              height: 100,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageCard}
          onPress={() => {
            navigation.navigate('Articles');
          }}
        >
          <Image
            source={require('../../assets/dev/learn.png')}
            style={{
              borderRadius: 15,
              width: 95,
              height: 100,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageCard}
          onPress={() => {
            navigation.navigate('Connect');
          }}
        >
          <Image
            source={require('../../assets/dev/connect.png')}
            style={{
              borderRadius: 15,
              width: 95,
              height: 100,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageCard}
          onPress={() => {
            navigation.navigate('Breathe');
          }}
        >
          <Image
            source={require('../../assets/dev/watch.png')}
            style={{
              borderRadius: 15,
              width: 95,
              height: 100,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageCard}
          onPress={() => {
            navigation.navigate('Love');
          }}
        >
          <Image
            source={require('../../assets/dev/love.png')}
            style={{
              borderRadius: 15,
              width: 95,
              height: 100,
            }}
          />
        </TouchableOpacity>
      </View>
      <Image
        resizeMode="contain"
        source={require('../../assets/dev/logo.png')}
        style={{
          alignSelf: 'center',
          borderRadius: 15,
          width: Dimensions.get('window').width * 0.85,
          height: Dimensions.get('window').height * 0.3,
        }}
      />
    </ScrollView>
  );
}

export default withTheme(Home);
