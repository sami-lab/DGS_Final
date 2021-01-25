import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {StyleSheet} from 'react-native';

import Grow from '../../routes/article/index';
import Articles from '../../routes/article/articles';
import Article from '../../routes/article/article';

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
export default function ArticleStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Grow"
        component={Grow}
        options={{...myOptions, title: 'Articles'}}
      />
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{...myOptions, title: 'Articles'}}
      />
      <Stack.Screen
        name="Article"
        component={Article}
        options={{...myOptions, title: 'Article'}}
      />
    </Stack.Navigator>
  );
}
