import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet } from 'react-native';

import Love from '../../routes/Love/index';
import ImageGallary from '../../routes/Love/ImageGallary';
import images from '../../routes/Love/images';
import image from '../../routes/Love/testImage';
import test from '../../routes/Love/test';

const Stack = createStackNavigator();

const myOptions = {
  title: 'Ask jackie',
  headerTintColor: 'primary',
  headerTitleStyle: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'normal',
  },
  headerStyle: {
    backgroundColor: '#006aff',
  },
};
export default function LoveStack() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Love">
      <Stack.Screen
        name="Love"
        component={Love}
        options={{ ...myOptions, title: 'Love' }}
      />
      <Stack.Screen
        name="ImageGallary"
        component={ImageGallary}
        options={{ ...myOptions, title: 'Image Gallary' }}
      />
      <Stack.Screen
        name="images"
        component={images}
        options={{ ...myOptions, title: 'Image Gallary' }}
      />
      <Stack.Screen
        name="image"
        component={image}
        options={{ ...myOptions, title: 'Image Gallary' }}
      />
      <Stack.Screen
        name="test"
        component={test}
        options={{ ...myOptions, title: 'Image Gallary' }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
