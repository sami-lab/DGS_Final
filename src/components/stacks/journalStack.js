import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet } from 'react-native';

import Index from '../../routes/journal/index';
import List from '../../routes/journal/List';
import Details from '../../routes/journal/Details';
import Create from '../../routes/journal/Create';

const Stack = createStackNavigator();

export default function JornalStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="index" component={Index} />
      <Stack.Screen name="List" component={List} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="Create" component={Create} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
