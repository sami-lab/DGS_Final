import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import { Card, withTheme, Button } from 'react-native-paper';
import { WebView } from 'react-native-webview';

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
  const [openWebView, setOpenWebView] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState('');

  const Webiew = (url) => {
    return (
      <View style={{ width: '100%', height: Dimensions.get('screen').height }}>
        <WebView
          javaScriptEnabled={true}
          downStorageEnabled={true}
          source={{ uri: url }}
        />
      </View>
    );
  };
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
              width: 90,
              height: 90,
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
              width: 90,
              height: 90,
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
              width: 90,
              height: 90,
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
              width: 90,
              height: 90,
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
              width: 90,
              height: 90,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageCard}
          onPress={() => {
            navigation.navigate('Journal');
          }}
        >
          <Image
            source={require('../../assets/dev/JournalYourJourney.png')}
            style={{
              width: 90,
              height: 90,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageCard}
          onPress={() => {
            navigation.navigate('Shop');
          }}
        >
          <Image
            source={require('../../assets/dev/DivorcedGirlDiscounts.png')}
            style={{
              borderRadius: 2,
              width: 90,
              height: 90,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageCard}
          onPress={() => {
            navigation.navigate('Books');
          }}
        >
          <Image
            source={require('../../assets/dev/BooksforYou.png')}
            style={{
              borderRadius: 15,
              width: 90,
              height: 90,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageCard}
          onPress={() => {
            Linking.openURL('https://www.divorcedgirlsmiling.com/');
          }}
        >
          <Image
            source={require('../../assets/dev/SiteandPodcast.png')}
            style={{
              borderRadius: 15,
              width: 90,
              height: 90,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageCard}
          onPress={() => {
            Linking.openURL('https://www.divorcedgirlsmiling.com/');
          }}
        >
          <Image
            source={require('../../assets/dev/SiteandPodcast.png')}
            style={{
              borderRadius: 15,
              width: 90,
              height: 90,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageCard}
          onPress={() => {
            Linking.openURL('https://www.facebook.com/');
          }}
        >
          <Image
            source={require('../../assets/dev/SiteandPodcast.png')}
            style={{
              borderRadius: 15,
              width: 90,
              height: 90,
            }}
          />
        </TouchableOpacity>
      </View>

      {/* <Image
        resizeMode="contain"
        source={require('../../assets/dev/logo.png')}
        style={{
          alignSelf: 'center',
          borderRadius: 15,
          width: Dimensions.get('window').width * 0.90,
          height: Dimensions.get('window').height * 0.3,
        }}
      /> */}
    </ScrollView>
  );
}

export default withTheme(Home);