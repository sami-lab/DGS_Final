import React, { useContext, useState, useRef } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback ,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Button, withTheme, Card } from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import axios from '../../../axios';
import Spinner from '../../components/spinner';
import MainHeader from '../../components/mainChildHeader';

function Create({ theme, navigation, route }) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },

    inputCard: {
      marginVertical: 10,
      width: Dimensions.get('screen').width * 0.85,
      shadowColor: '#000',
      alignSelf: 'center',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 1, //for Andriod,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#E5DDD5',
    },
    inputStyle: {
      paddingHorizontal: 20,
      borderRadius: 40,
      height:45
    },
    buttonStyles: {
      display: 'flex',
      width: Dimensions.get('screen').width * 0.6,
      backgroundColor: theme.colors.darkPink,
      marginVertical: 5,
      color: '#fff',
      borderRadius: 50,
      paddingVertical: 7,
    },
    buttonText: {
      fontFamily: theme.fonts.bold.fontFamily,
      fontSize: 19,
      textTransform: 'capitalize',

      color: '#fff',
    },
    buttonText1: {
      fontFamily: theme.fonts.bold.fontFamily,
      fontSize: 12,

      textTransform: 'capitalize',
      paddingVertical: 5,
    },
    title: {
      fontSize: 30,
      paddingVertical: 10,
      fontFamily: theme.fonts.bold.fontFamily,
      textAlign: 'center',
    },
    text: {
      fontFamily: theme.fonts.regular.fontFamily,
      textAlign: 'center',
      marginVertical: 5,
    },
  });

  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case 'title':
          return route.params.title;
        case 'description':
          return route.params.description;
        case 'image':
          return route.params.image;
      }
    }
    return '';
  };

  const { state, dispatch } = useContext(GlobalContext);
  const [title, setTitle] = React.useState(getDetails('title'));
  const [description, setDescription] = React.useState(
    getDetails('description')
  );
  const descriptionRef = useRef();
  const [singleFile, setSingleFile] = useState(
    getDetails('image') ? { name: getDetails('image') } : undefined
  );
  const [enableshift, setenableShift] = useState(false);

  const handleUpload = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
      });
      // Setting the state to show single file attributes
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
      } else {
        // For Unknown Error
        Alert.alert('Unknown Error: ' + JSON.stringify(err));
      }
    }
  };
  const submitData = () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    const data = new FormData();
    console.log(title, description, singleFile);
    data.append('title', title);
    data.append('description', description);
    data.append('image', singleFile);

    // //apply validation here first

    axios
      .post('/journal/', data, {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(({ data: response }) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        navigation.navigate('List');
      })
      .catch((error) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        Alert.alert(
          'Fail',
          error.response ? error.response.data.message : error.message
        );
      });
  };
  const updateData = () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    if (singleFile && singleFile !== null) data.append('image', singleFile);

    // //apply validation here first

    axios
      .patch(`/journal/${route.params._id}`, data, {
        headers: {
          authorization: 'Bearer ' + state.userToken,
        },
      })
      .then(({ data: response }) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        navigation.navigate('List');
      })
      .catch((error) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        Alert.alert(
          'Fail',
          error.response ? error.response.data.message : error.message
        );
      });
  };
  return (
    <TouchableWithoutFeedback 
      onPress={() => Keyboard.dismiss()}>
    <View style={styles.root}>
      <KeyboardAvoidingView behavior="position" enabled={enableshift}>
        <Spinner visible={state.loading} />
        <MainHeader navigation={navigation} backRoute="List" />
        <Text style={styles.title}>
          {route.params ? 'Update Journal' : 'Journal Your Thoughts'}
        </Text>
        <Card elevation={1} style={styles.inputCard}>
          <TextInput
            placeholder="Title"
            placeholderTextColor="#C7C7CD"
            style={styles.inputStyle}
            value={title}
            onSubmitEditing={() => descriptionRef.current.focus()}
            blurOnSubmit={false}
            onFocus={() => setenableShift(false)}
            onChangeText={(text) => setTitle(text)}
            maxLength={60}
          />
        </Card>

        <Card
          elevation={1}
          style={{
            ...styles.inputCard,
            paddingLeft: 0,
            display: 'flex',
            borderBottomWidth: 0,
          }}
        >
          <TextInput
            placeholder="Description"
            multiline
            numberOfLines={10}
            style={{
              ...styles.inputStyle,
              paddingLeft: 20,
              textAlignVertical: 'top',
              height: Dimensions.get('screen').height * 0.3,
            }}
            ref={descriptionRef}
            value={description}
            onFocus={() => setenableShift(true)}
            onChangeText={(text) => setDescription(text)}
          />
        </Card>
      </KeyboardAvoidingView>

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          width: Dimensions.get('screen').width * 0.85,
        }}
      >
        {/* <Button
          color="#fff"
          style={{
            ...styles.buttonStyles,
            width: Dimensions.get('screen').width * 0.35,
            display: 'flex',
            alignItems: 'center',
            paddingVertical: 0,
          }}
          onPress={handleUpload}
        >
          <Text style={styles.buttonText1}>Choose File</Text>{' '}
          <Entypo name="attachment" size={10} />
        </Button> */}
        {singleFile && singleFile.name && (
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                ...styles.inputStyle,
                marginLeft: 10,
              }}
            >
              {singleFile.name.length > 10
                ? singleFile.name.slice(0, 10) + '...'
                : singleFile.name}
            </Text>
            <MaterialIcons
              name="highlight-remove"
              size={32}
              color={theme.colors.primary}
              onPress={() => setSingleFile(null)}
              style={{ marginRight: 10 }}
            />
          </View>
        )}
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          color="#fff"
          disabled={state.loading}
          style={{
            ...styles.buttonStyles,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={route.params ? updateData : submitData}
        >
          <Text style={styles.buttonText}>{route.params ? 'Edit' : 'Add'}</Text>
          <MaterialIcons
            name={route.params ? 'system-update-tv' : 'post-add'}
            size={22}
            color={theme.colors.light}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

export default withTheme(Create);
