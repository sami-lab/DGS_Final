import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {StyleSheet} from 'react-native';

import Connect from '../../routes/connect/index';
import connectProfessionals from '../../routes/connect/connectProfessionals';
import ConnectCategories from '../../routes/connect/connectCategories';
import ProfessionalDetails from '../../routes/connect/ProfessionalDetails';

const Stack = createStackNavigator();

const myOptions = {
  title: 'Articles',
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
export default function ConnectStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Connect"
        component={Connect}
        options={{...myOptions, title: 'Connect'}}
      />
      <Stack.Screen
        name="ConnectCategories"
        component={ConnectCategories}
        options={{...myOptions, title: 'Connect'}}
      />
      <Stack.Screen
        name="ConnectProfessionals"
        component={connectProfessionals}
        options={{...myOptions, title: 'Connect'}}
      />
      <Stack.Screen
        name="ProfessionalDetails"
        component={ProfessionalDetails}
        options={{...myOptions, title: 'Connect'}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
