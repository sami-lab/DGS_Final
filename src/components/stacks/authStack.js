import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {StyleSheet} from 'react-native';

import Register from '../../routes/Auth/register';
import Login from '../../routes/Auth/login';
import ResetPassword from '../../routes/Auth/resetPassword';
import ResetToken from '../../routes/Auth/resetToken';
import ForgetPassword from '../../routes/Auth/forgetPassword';
import RegisterationSuccess from '../../routes/Auth/RegisterationSuccess';

const Stack = createStackNavigator();

const myOptions = {
  title: 'Home',
  headerTintColor: 'white',
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
export default function AuthStack() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Login">
      <Stack.Screen
        name="RegisterationSuccess"
        component={RegisterationSuccess}
        options={{...myOptions, title: 'Success'}}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{...myOptions, title: 'Login'}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{...myOptions, title: 'Register'}}
      />

      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{...myOptions, title: 'Forget Password'}}
      />
      <Stack.Screen
        name="ResetToken"
        component={ResetToken}
        options={{...myOptions, title: 'Reset Password'}}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{...myOptions, title: 'Reset Password'}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
