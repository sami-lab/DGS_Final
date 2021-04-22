import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
} from 'react-native';
import { Card, withTheme, Colors, Button } from 'react-native-paper';
import MainHeader from '../../components/mainChildHeader';

function AskJackie({ theme, navigation }) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },

    buttonStyles: {
      display: 'flex',
      justifyContent: 'center',
      width: Dimensions.get('screen').width * 0.6,
      backgroundColor: theme.colors.darkPink,
      marginVertical: 15,
      color: '#fff',
      borderRadius: 50,
    },
    buttonText: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 18,
      textTransform: 'capitalize',
      paddingVertical: 5,
    },
    title: {
      width: '90%',
      fontSize: 22,
      lineHeight: 30,
      paddingVertical: 15,
      fontFamily: theme.fonts.bold.fontFamily,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.root}>
      <MainHeader navigation={navigation} backRoute="Home" />

      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Image
          source={require('../../assets/dev/askMe.jpg')}
          style={{
            marginBottom: 10,
            width: 250,
            height: 250,
            alignSelf: 'center',
          }}
        />
        <Card.Content style={{ alignItems: 'center' }}>
          <Text style={styles.title}>
            Ask Jackie a question about divorce or dating and she will try to
            answer it soon.{' '}
          </Text>
        </Card.Content>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Button
            color="#fff"
            style={styles.buttonStyles}
            onPress={() => navigation.navigate('Questions')}
          >
            <Text style={styles.buttonText}> Ask NOW!</Text>{' '}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default withTheme(AskJackie);
