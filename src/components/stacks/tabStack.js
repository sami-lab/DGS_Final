import React from 'react';
import { Text } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import Home from '../../routes/Home/home';
import AskJackie from '../../components/stacks/askJackieStack';
import Articles from '../../components/stacks/articleStack';
import Connect from '../../components/stacks/connectStack';
import Breathe from '../../components/stacks/breatheStack';
import Love from '../../components/stacks/loveStack';
import { withTheme } from 'react-native-paper';
import Ask from '../../assets/dev/askTab.svg';
import ConnectSvg from '../../assets/dev/connectTab.svg';
import ArticleSvg from '../../assets/dev/articleTab.svg';
import Video from '../../assets/dev/videoTab.svg';
import ImageGallary from '../../assets/dev/imageGallaryTab.svg';

const Tab = createBottomTabNavigator();

function TabScreen(props) {
  const { theme } = props;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton: ['Home'].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'AskJackie') {
            return <Ask width="60" height="60" fill={color} />;
          } else if (route.name === 'Connect') {
            return <ConnectSvg width="60" height="60" fill={color} />;
          } else if (route.name === 'Articles') {
            return <ArticleSvg width="60" height="60" fill={color} />;
          } else if (route.name === 'Breathe') {
            return <Video width="60" height="60" fill={color} />;
          } else if (route.name === 'Love') {
            return <ImageGallary width="60" height="60" fill={color} />;
          }

          // You can return any component that you like here!
        },
      })}
      tabBarOptions={{
        tabStyle: {
          paddingTop: 6,
        },

        keyboardHidesTabBar: true,
        style: {
          height: 70,
          backgroundColor: theme.colors.light,

          borderTopColor: 'transparent',
          elevation: 10,
          shadowColor: '#313C4F59',
          shadowOffset: {
            height: 1,
          },

          borderTopWidth: 0,
          shadowRadius: 1,
        },
        indicatorStyle: {
          width: 0,
          height: 0,
          elevation: 0,
        },
        activeTintColor: theme.colors.darkPink,
        inactiveTintColor: theme.colors.dark,
        activeBackgroundColor: theme.colors.light,
        //inactiveBackgroundColor: '#00aaff',
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="AskJackie"
        component={AskJackie}
        options={{
          tabBarLabel: ({ tintColor, focused }) => (
            <Text
              style={
                focused
                  ? {
                      color: theme.colors.darkPink,
                      fontFamily: theme.fonts.bold.fontFamily,
                      fontSize: 9,
                      paddingTop: 5,
                    }
                  : {
                      fontFamily: theme.fonts.regular.fontFamily,
                      fontSize: 9,
                      paddingTop: 5,
                      color: theme.colors.grey,
                    }
              }
            >
              Ask Me
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Articles"
        component={Articles}
        options={{
          tabBarLabel: ({ tintColor, focused }) => (
            <Text
              style={
                focused
                  ? {
                      color: theme.colors.darkPink,
                      fontFamily: theme.fonts.bold.fontFamily,
                      fontSize: 9,
                      paddingTop: 5,
                    }
                  : {
                      fontFamily: theme.fonts.regular.fontFamily,
                      fontSize: 9,
                      paddingTop: 5,
                      color: theme.colors.grey,
                    }
              }
            >
              Learn with Me
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Connect"
        component={Connect}
        options={{
          tabBarLabel: ({ tintColor, focused }) => (
            <Text
              style={
                focused
                  ? {
                      color: theme.colors.darkPink,
                      fontFamily: theme.fonts.bold.fontFamily,
                      fontSize: 9,
                      paddingTop: 5,
                    }
                  : {
                      fontFamily: theme.fonts.regular.fontFamily,
                      fontSize: 9,
                      paddingTop: 5,
                      color: theme.colors.grey,
                    }
              }
            >
              Connect
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Breathe"
        component={Breathe}
        options={{
          tabBarLabel: ({ tintColor, focused }) => (
            <Text
              style={
                focused
                  ? {
                      color: theme.colors.darkPink,
                      fontFamily: theme.fonts.bold.fontFamily,
                      fontSize: 9,
                      paddingTop: 5,
                    }
                  : {
                      fontFamily: theme.fonts.regular.fontFamily,
                      fontSize: 9,
                      paddingTop: 5,
                      color: theme.colors.grey,
                    }
              }
            >
              Watch Me
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Love"
        component={Love}
        options={{
          tabBarLabel: ({ tintColor, focused }) => (
            <Text
              style={
                focused
                  ? {
                      color: theme.colors.darkPink,
                      fontFamily: theme.fonts.bold.fontFamily,
                      fontSize: 9,
                      paddingTop: 5,
                    }
                  : {
                      fontFamily: theme.fonts.regular.fontFamily,
                      fontSize: 9,
                      paddingTop: 5,
                      color: theme.colors.grey,
                    }
              }
            >
              A Dose of Love
            </Text>
          ),
        }}
      />
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}
export default withTheme(TabScreen);
