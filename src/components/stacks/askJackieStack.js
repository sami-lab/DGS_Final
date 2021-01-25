import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {StyleSheet} from 'react-native';

import AskJackie from '../../routes/askJackie/index';
import Questions from '../../routes/askJackie/questions';

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
export default function AskJackieStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="AskJackie"
        component={AskJackie}
        options={{...myOptions, title: 'Ask Jackie'}}
      />
      <Stack.Screen
        name="Questions"
        component={Questions}
        options={{...myOptions, title: 'Ask Jackie'}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
