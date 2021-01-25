import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {ActivityIndicator, withTheme} from 'react-native-paper';

function Loader(props) {
  return (
    <Spinner
      visible={props.visible}
      customIndicator={
        <ActivityIndicator
          animating={true}
          size={50}
          color={props.theme.colors.darkPink}
        />
      }
    />
  );
}
export default withTheme(Loader);
