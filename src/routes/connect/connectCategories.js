import React, { useEffect, useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  Alert,
} from 'react-native';
import { Card, withTheme, Button } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DropDownPicker from 'react-native-dropdown-picker';

import MainHeader from '../../components/mainChildHeader';
import Spinner from '../../components/spinner';
import axios from '../../../axios';
import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';

function ConnectCategories({ theme, navigation }) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },

    inputCard: {
      height: 60,
      width: Dimensions.get('screen').width * 0.85,
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2, //for Andriod,
      borderRadius: 2,
      borderWidth: 1,
      borderColor: '#E5DDD5',
    },
    inputStyle: {
      justifyContent: 'flex-start',
      paddingHorizontal: 10,
    },
    buttonStyles: {
      display: 'flex',
      justifyContent: 'center',
      width: Dimensions.get('screen').width * 0.6,
      backgroundColor: theme.colors.darkPink,
      marginVertical: 15,
      color: '#fff',
      borderRadius: 50,
    },
    buttonText: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 18,
      textTransform: 'capitalize',
      paddingVertical: 5,
    },
    title: {
      fontSize: 22,
      paddingVertical: 15,
      fontFamily: theme.fonts.bold.fontFamily,
      textAlign: 'center',
    },
    dropdownIconContainer: {
      width: Dimensions.get('screen').height * 0.05,
      height: Dimensions.get('screen').height * 0.05,
      backgroundColor: theme.colors.darkPink,
      borderRadius: Dimensions.get('screen').height * 0.04,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  const { state, dispatch } = useContext(GlobalContext);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  useEffect(() => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    axios
      .get('/connectCategories/', {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(({ data: response }) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        setCategories(response.data.doc);
      })
      .catch((error) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        Alert.alert(
          'Fail To fetch data',
          error.response ? error.response.data.message : error.message
        );
        return;
      });
  }, []);

  const submit = () => {
    if (category.length > 0) {
      navigation.navigate('ConnectProfessionals', {
        category: category,
      });
    } else {
      Alert.alert('Error', 'Please Select Category');
    }
  };
  return (
    <View style={styles.root}>
      <Spinner visible={state.loading} />
      <MainHeader navigation={navigation} />

      <View style={{ justifyContent: 'center', flex: 1 }}>
        <Card.Content style={{ alignItems: 'center' }}>
          <Text style={styles.title}>Select Category</Text>
        </Card.Content>

        <View
          style={{
            justifyContent: 'space-around',
            height: Dimensions.get('screen').height * 0.6,
          }}
        >
          {categories.length > 0 && (
            <DropDownPicker
              items={categories.map((item) => {
                const obj = {
                  label: item.name.toUpperCase(),
                  value: item._id,
                  icon: () => {},
                };
                return obj;
              })}
              customArrowUp={() => (
                <View style={styles.dropdownIconContainer}>
                  <MaterialIcons
                    name="keyboard-arrow-up"
                    size={36}
                    color={theme.colors.light}
                  />
                </View>
              )}
              customArrowDown={() => (
                <View style={styles.dropdownIconContainer}>
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={36}
                    color={theme.colors.light}
                  />
                </View>
              )}
              style={{
                ...styles.inputStyle,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
              }}
              placeholder="Select one"
              placeholderStyle={{
                justifyContent: 'flex-start',
                paddingHorizontal: 10,
                fontSize: 16,
                fontFamily: theme.fonts.regular.fontFamily,
                color: theme.colors.grey,
              }}
              renderSeperator={() => (
                <View
                  style={{
                    height: 1,
                    borderBottomWidth: 1,
                    width: '80%',
                    alignSelf: 'center',
                    borderBottomColor: theme.colors.grey,
                  }}
                ></View>
              )}
              itemStyle={{
                justifyContent: 'flex-start',
                paddingLeft: 20,
                paddingVertical: 10,
              }}
              containerStyle={{
                height: 55,
                width: Dimensions.get('screen').width * 0.89,
                alignSelf: 'center',
              }}
              labelStyle={{
                color: theme.colors.grey,
                fontFamily: theme.fonts.regular.fontFamily,
                fontSize: 16,
              }}
              dropDownStyle={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              onChangeItem={(item) => setCategory(item.value)}
            />
          )}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Button color="#fff" style={styles.buttonStyles} onPress={submit}>
              <Text style={styles.buttonText}> Check the List</Text>{' '}
            </Button>
          </View>
        </View>
        {/* {categories.length > 0 &&
            categories.map((item) => (
              <View
                key={item._id}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Button
                  color="#fff"
                  style={styles.buttonStyles}
                  onPress={() =>
                    navigation.navigate('ConnectProfessionals', {
                      category: item._id,
                    })
                  }>
                  <Text style={styles.buttonText}> {item.name}</Text>{' '}
                </Button>
              </View>
            ))} */}
      </View>
    </View>
  );
}

export default withTheme(ConnectCategories);
