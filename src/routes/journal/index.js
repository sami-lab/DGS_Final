import React, { useContext } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { Card, withTheme, Button } from 'react-native-paper';
import MainHeader from '../../components/mainChildHeader';
function JournalYourJourney({ theme, navigation }) {
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
      fontSize: 19,
      lineHeight: 25,
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
          source={require('../../assets/dev/JournalYourJourney.png')}
          style={{
            marginBottom: 10,
            width: 150,
            height: 150,
            alignSelf: 'center',
          }}
        />
        <Card.Content style={{ alignItems: 'center' }}>
          <Text style={styles.title}>
            While going through my divorce, one thing that really helped me was
            journaling, and you should too! Enjoy these weekly exercises to help
            you express your thoughts. You can save and re-read them anytime
            you’re doubting yourself!
          </Text>
        </Card.Content>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Button
            color="#fff"
            style={styles.buttonStyles}
            onPress={() => navigation.navigate('List')}
          >
            <Text style={styles.buttonText}> Journal now!</Text>{' '}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default withTheme(JournalYourJourney);
