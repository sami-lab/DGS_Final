import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet } from 'react-native';

import Book from '../../routes/book/book';

const Stack = createStackNavigator();

export default function BookStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Book" component={Book} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
