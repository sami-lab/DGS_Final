import React from 'react';
import { Text, Dimensions } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import Home from '../../components/stacks/homeStack';
import AskJackie from '../../components/stacks/askJackieStack';
import Articles from '../../components/stacks/articleStack';
import Connect from '../../components/stacks/connectStack';
import Breathe from '../../components/stacks/breatheStack';
import Love from '../../components/stacks/loveStack';
import ShopStack from '../../components/stacks/shopStack';
import BookStack from '../../components/stacks/bookStack';
import JournalStack from '../../components/stacks/journalStack';
import UsersProfileStack from '../../components/stacks/usersProfileStack';

import { withTheme } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ask from '../../assets/dev/askTab.svg';
import ConnectSvg from '../../assets/dev/connectTab.svg';
import ArticleSvg from '../../assets/dev/articleTab.svg';
import Video from '../../assets/dev/videoTab.svg';
import ImageGallary from '../../assets/dev/imageGallaryTab.svg';

const Tab = createBottomTabNavigator();
const deviceHeight = Dimensions.get('window').height
function TabScreen(props) {
  const { theme } = props;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarButton: [
          'Shop',
          'Books',
          'Journal',
          'AskJackie',
          'Articles',
          'Connect',
          'Breathe',
          'Love',
          'Profile',
        ].includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'AskJackie') {
            return <Ask width="60" height="60" fill={color} />;
          } else if (route.name === 'Home')
            return <MaterialIcons name="home" size={42} color={color} />;
          else if (route.name === 'Connect') {
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
          ///borderTopLeftRadius: 40,
          //borderTopRightRadius: 40,
          //borderRadius: 40,
          backgroundColor: theme.colors.light,
        },

        keyboardHidesTabBar: true,
        style: {
          height: deviceHeight/10,
          backgroundColor: 'transparent',
          borderTopColor: 'transparent',
          elevation: 0,
          //position: 'absolute',
          //left: '37%',
          //bottom: 5,
          width: '100%',
          //width: Dimensions.get('window').width * 0.3,
          alignSelf: 'center',
          justifyContent: 'center',

          borderTopWidth: 0,
        },
        indicatorStyle: {
          width: 0,
          height: 0,
          elevation: 0,
        },
        //showLabel: false,
        activeTintColor: theme.colors.darkPink,
        inactiveTintColor: theme.colors.darkPink,
        activeBackgroundColor: 'transparent',
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
      <Tab.Screen name="Shop" component={ShopStack} />
      <Tab.Screen name="Books" component={BookStack} />
      <Tab.Screen name="Journal" component={JournalStack} />
      <Tab.Screen name="Profile" component={UsersProfileStack} />

      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
}
export default withTheme(TabScreen);
