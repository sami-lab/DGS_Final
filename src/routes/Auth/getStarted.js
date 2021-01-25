import React from 'react';
import {StyleSheet, ImageBackground, Text} from 'react-native';
import {Button, Card, Title, Colors, withTheme} from 'react-native-paper';

function GetStarted({theme, navigation}) {
  navigation.navigate('Register');

  const styles = StyleSheet.create({
    root: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
    },
    card: {
      width: '100%',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 8,
      shadowOpacity: 0.26,
      elevation: 20, //for Andriod
      backgroundColor: 'white',
      paddingVertical: 60,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    title: {
      fontSize: 32,
      marginVertical: 15,
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontFamily: 'sans-serif-medium,Baskerville',
      color: theme.colors.primary,
      textAlign: 'center',
    },
    button: {
      borderRadius: 50,
      backgroundColor: theme.colors.secondary, //FFD729
      paddingHorizontal: 30,
      paddingVertical: 10,
      fontWeight: 'bold',
      fontSize: 30,
    },
  });
  return (
    <ImageBackground
      source={require('../../assets/dev/ImageBackground.png')}
      style={styles.root}>
      <Card style={styles.card}>
        <Card.Cover
          resizeMode="stretch"
          source={require('../../assets/dev/logo.png')}
          style={{
            borderRadius: 10,
            elevation: 5,
            marginBottom: 10,
            width: '100%',
            height: 185,
          }}
        />
        <Card.Content>
          <Title style={styles.title}>Welcome</Title>
        </Card.Content>
        <Card.Actions style={{justifyContent: 'center'}}>
          <Button
            style={styles.button}
            color={Colors.primary}
            onPress={() => navigation.navigate('Auth')}>
            <Text style={{fontSize: 20, fontWeight: '700'}}> Get Started</Text>
          </Button>
        </Card.Actions>
      </Card>
    </ImageBackground>
  );
}

export default withTheme(GetStarted);
