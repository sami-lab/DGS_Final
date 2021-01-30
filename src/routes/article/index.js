import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { Card, withTheme, Button } from 'react-native-paper';
import MainHeader from '../../components/mainChildHeader';

function Article({ theme, navigation, route }) {
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
      <MainHeader navigation={navigation} />
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Image
          source={require('../../assets/dev/learn.png')}
          style={{
            marginBottom: 10,
            width: 200,
            height: 200,
            alignSelf: 'center',
          }}
        />
        <Card.Content style={{ alignItems: 'center' }}>
          <Text style={styles.title}>
            Read empowering articles and stories about divorce, parenting,
            dating, relationships and wellness.
          </Text>
        </Card.Content>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Button
            color="#fff"
            style={styles.buttonStyles}
            onPress={() => navigation.navigate('Articles')}
          >
            <Text style={styles.buttonText}>Read NOW!</Text>{' '}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default withTheme(Article);
