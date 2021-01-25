import React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {Card, withTheme, Button} from 'react-native-paper';
import MainHeader from '../../components/mainHeader';

function Love({theme, navigation, route}) {
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
      fontSize: 22,
      lineHeight: 30,
      paddingVertical: 15,
      fontFamily: theme.fonts.bold.fontFamily,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.root}>
      <MainHeader />
      <View style={{justifyContent: 'center', flex: 1}}>
        <Image
          source={require('../../assets/dev/love.png')}
          style={{
            marginBottom: 10,
            width: 200,
            height: 200,
            alignSelf: 'center',
          }}
        />
        <Card.Content style={{alignItems: 'center'}}>
          <Text style={styles.title}>
            Browse little doses of encouragement and hope just for you.
          </Text>
        </Card.Content>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Button
            color="#fff"
            style={styles.buttonStyles}
            onPress={() => navigation.navigate('ImageGallary')}>
            <Text style={styles.buttonText}> Browse now!</Text>{' '}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default withTheme(Love);
