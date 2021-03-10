import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { withTheme } from 'react-native-paper';
import Profile from '../../routes/userProfile/profile';
//import EditUser from '../../routes/userProfile/editUser';
//import ChangePassword from '../../routes/userProfile/changePassword';

const Stack = createStackNavigator();

function ProfileStack({ theme }) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
      {/* <Stack.Screen name="EditUser" component={EditUser} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} /> */}
    </Stack.Navigator>
  );
}

export default withTheme(ProfileStack);
