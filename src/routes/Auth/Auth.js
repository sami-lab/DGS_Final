import React from 'react';
import {StyleSheet, ImageBackground, Dimensions, View} from 'react-native';
import {Button, Card, withTheme} from 'react-native-paper';

function Auth({theme, navigation}) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },
    root: {
      width: '100%',
      height: '100%',

      justifyContent: 'flex-end',
    },
    card: {
      width: '100%',
      shadowColor: 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 8,
      shadowOpacity: 0.86,
      elevation: 5, //for Andriod
      backgroundColor: 'white',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderWidth: 1,
      borderColor: '#E5DDD5',
    },
    button: {
      borderRadius: 50,
      width: 150,
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 10,
      fontWeight: 'bold',
      fontSize: 15,
    },
    button2: {
      backgroundColor: '#00BF60',
    },
  });
  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('../../assets/dev/Auth.png')}
        resizeMode="stretch"
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height * 0.9,
          justifyContent: 'flex-end',
        }}>
        <Card style={styles.card}>
          <Card.Actions style={{justifyContent: 'space-around'}}>
            <Button
              style={styles.button}
              color="#fff"
              onPress={() => navigation.navigate('Register')}>
              JOIN NOW
            </Button>
            <Button
              style={{...styles.button, ...styles.button2}}
              color="#fff"
              onPress={() => navigation.navigate('Login')}>
              LOGIN
            </Button>
          </Card.Actions>
        </Card>
      </ImageBackground>
    </View>
  );
}

export default withTheme(Auth);
