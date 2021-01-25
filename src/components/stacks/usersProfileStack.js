import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {StyleSheet} from 'react-native';
import {withTheme} from 'react-native-paper';
import EditUser from '../../routes/Auth/editUser';
import Profile from '../../routes/Auth/profile';
import ChangePassword from '../../routes/Auth/changePassword';

const Stack = createStackNavigator();

function AuthStack({theme}) {
  const myOptions = {
    title: 'Home',
    headerTintColor: 'white',
    headerTitleStyle: {
      flex: 1,
      color: 'white',

      fontWeight: 'normal',
    },
    headerStyle: {
      backgroundColor: theme.colors.primary,
    },
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{...myOptions, title: 'Profile'}}
      />
      <Stack.Screen
        name="EditUser"
        component={EditUser}
        options={{...myOptions, title: 'Upate my Account'}}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{...myOptions, title: 'Change Password'}}
      />
    </Stack.Navigator>
  );
}

export default withTheme(AuthStack);
const styles = StyleSheet.create({});
