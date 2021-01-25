import React, {useContext} from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {Card, withTheme, Button} from 'react-native-paper';
import MainHeader from '../../components/mainHeader';
function Connect({theme, navigation}) {
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
          source={require('../../assets/dev/connect.png')}
          style={{
            marginBottom: 10,
            width: 200,
            height: 200,
            alignSelf: 'center',
          }}
        />
        <Card.Content style={{alignItems: 'center'}}>
          <Text style={styles.title}>
            Contact trusted professionals, including divorce attorneys,
            financial planners, real estate agents, therapists, divorce coaches
            and more.
          </Text>
        </Card.Content>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Button
            color="#fff"
            style={styles.buttonStyles}
            onPress={() => navigation.navigate('ConnectCategories')}>
            <Text style={styles.buttonText}> Connect now!</Text>{' '}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default withTheme(Connect);
