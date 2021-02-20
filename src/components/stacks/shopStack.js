import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet } from 'react-native';

import Shop from '../../routes/shop/shop';

const Stack = createStackNavigator();

export default function ShopStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Shop" component={Shop} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
