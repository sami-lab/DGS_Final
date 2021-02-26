import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import { StyleSheet } from 'react-native';

import Home from '../../routes/Home/home';

const Stack = createStackNavigator();

export default function JornalStack({ navigation, route }) {
  React.useLayoutEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    navigation.setOptions({ tabBarVisible: false });
  }, [navigation, route]);
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="index" component={Home} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
