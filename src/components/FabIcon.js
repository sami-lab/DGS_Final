import React from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {withTheme} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

function FabIcon(props) {
  const a = new Animated.Value(0);
  const [animation, setAnimation] = React.useState(a);
  const [open, setOpen] = React.useState(false);
  const toggleMenu = () => {
    const toValue = open ? 0 : 1;

    Animated.spring(animation, {
      toValue: toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();
    setOpen((open) => !open);
  };

  const pinStyle = {
    transform: [
      {scale: animation},
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [20, -50],
        }),
      },
    ],
  };
  const pinStyle1 = {
    transform: [
      {scale: animation},
      {
        translateX: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 50],
        }),
      },
    ],
  };
  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  return (
    <View style={[styles.container, props.style]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: 5,
        }}>
        <TouchableWithoutFeedback
          style={{zIndex: 1000}}
          onPress={() => {
            toggleMenu();
            props.navigation.navigate('ChangePassword');
          }}>
          <Animated.View
            style={[styles.button, styles.secondary, styles.menu, pinStyle1]}>
            <AntDesign name="lock" size={20} color={props.theme.colors.white} />
          </Animated.View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            toggleMenu();
            props.navigation.navigate('EditUser', props.user);
          }}>
          <Animated.View
            style={[styles.button, styles.secondary, styles.menu, pinStyle]}>
            <AntDesign name="edit" size={20} color={props.theme.colors.white} />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <AntDesign name="plus" size={24} color={props.theme.colors.white} />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    //position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: '#F02A4B',
    shadowOpacity: 0.3,
    shadowOffset: {height: 10},
    elevation: 3,
  },
  menu: {
    backgroundColor: '#F02A4B',
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#FFF',
  },
});
export default withTheme(FabIcon);
