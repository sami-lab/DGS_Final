/**
 * @format
 */
import React, { useContext } from 'react';
import { AppRegistry } from 'react-native';
import App from './App';
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { GlobalProvider, GlobalContext } from './src/context/GlobalContext';

import { name as appName } from './app.json';

const fontConfig = {
  web: {
    regular: {
      fontFamily: 'ProductSans-Regular',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'ProductSans-Bold',
      fontWeight: 'bold',
    },
    italic: {
      fontFamily: 'ProductSans-Italic',
      fontWeight: 'normal',
    },
    boldItalic: {
      fontFamily: 'ProductSans-BoldItalic',
      fontWeight: 'bold',
    },
  },
  android: {
    regular: {
      fontFamily: 'ProductSans-Regular',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'ProductSans-Bold',
      fontWeight: 'bold',
    },
    italic: {
      fontFamily: 'ProductSans-Italic',
      fontWeight: 'normal',
    },
    boldItalic: {
      fontFamily: 'ProductSans-BoldItalic',
      fontWeight: 'bold',
    },
  },
  ios: {
    regular: {
      fontFamily: 'ProductSans-Regular',
      fontWeight: 'normal',
    },
    bold: {
      fontFamily: 'ProductSans-Bold',
      fontWeight: 'bold',
    },
    italic: {
      fontFamily: 'ProductSans-Italic',
      fontWeight: 'normal',
    },
    boldItalic: {
      fontFamily: 'ProductSans-BoldItalic',
      fontWeight: 'bold',
    },
  },
};
const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    background: '#F4F5FA',
    text: '#333333',
    primary: '#EE2A7B',
    lightPink: '#FE0BCB',
    darkPink: '#B43181',
    secondary: '#EEB727',
    grey: '#868686',
    light: '#fff',
    dark: '#000',
  },
  fonts: configureFonts(fontConfig),
};

const CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    background: '#333333',
    text: '#ffffff',
    lightPink: '#FE0BCB',
    darkPink: '#B43181',
    secondary: '#FFD51E',
    grey: '#868686',
    light: '#fff',
    dark: '#000',
  },
  fonts: configureFonts(fontConfig),
};

function Root() {
  return (
    <GlobalProvider>
      <Main />
    </GlobalProvider>
  );
}
function Main() {
  const { state } = useContext(GlobalContext);
  console.log('Current State from index', state);
  const theme = state.isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <App />
      </NavigationContainer>
    </PaperProvider>
  );
}
AppRegistry.registerComponent(appName, () => Root);
