import React, { useState, useContext, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {
  Card,
  Button,
  withTheme,
  Modal,
  Portal,
  Title,
} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GlobalContext } from '../../context/GlobalContext';
import * as actionTypes from '../../context/actions';
import axios from '../../../axios';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';
import SearchableDropdown from 'react-native-searchable-dropdown';
import countries from '../../assets/dev/geo.json';
import Spinner from '../../components/spinner';

import countriesData from '../../assets/dev/countries.json';
import states from '../../assets/dev/states.json';
import { terms, privacy } from '../../components/termsPrivacy';
//This is to validate that we can move to next step
//this will return false if validation fail
async function validateSteps(
  step,
  username,
  name,
  email,
  password,
  confirmPassword,
  divorseStatus,
  country,
  city,
  gender,
  age
) {
  console.log(
    'from validations',
    step,
    username,
    name,
    email,
    password,
    confirmPassword,
    divorseStatus,
    country,
    city,
    gender,
    age
  );
  let status = false;
  let message = '';
  switch (step) {
    //verify for username,
    case 1:
      if (username && name) {
        try {
          const res = await axios.post('/users/validateUsername', {
            username,
          });
          status = true;
          message = 'success';
        } catch (err) {
          console.log(err.message);
          status = false;
          message = err.response.data.message;
        }
      } else {
        status = false;
        message = 'Usernname cannot be empty';
      }

      break;
    //verify for email
    case 2:
      status = true;
      if (
        !password ||
        !confirmPassword ||
        (password !== confirmPassword && status == true)
      ) {
        status = false;
        message = 'Password and confirm does not match';
        break;
      }
      if (password.length <= 5 && status == true) {
        status = false;
        message = 'A User Password must have more or equal then 5 characters';
        break;
      }
      if (
        email &&
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gim.test(
          email
        ) &&
        status === true
      ) {
        try {
          await axios.post('/users/validateEmail', {
            email,
          });

          status = true;
        } catch (error) {
          console.log(error);
          status = false;
          message = error.response.data.message;
        }
      } else {
        status = false;
        message = 'Invalid Email';
      }
      break;
    //verify for divorse status
    case 3:
      if (!divorseStatus || divorseStatus == null) {
        status = false;
        message = 'Please Select one option';
      } else {
        status = true;
        break;
      }
      break;
    case 4:
      if (country && country != null) {
        if (city && city != null) {
          status = true;
          break;
        } else {
          status = false;
          message = 'Please Select City';
        }
      } else {
        status = false;
        message = 'Please Select country';
      }
      break;
    case 5:
      if (gender && gender != null) {
        status = true;
        break;
      } else {
        status = false;
        message = 'Please Select your Gender';
      }
      break;
    case 6:
      if (age && age != null) {
        status = true;
        break;
      } else {
        status = false;
        message = 'Please Select your Age';
      }
      break;
    case 7:
      status = true;
      break;
    case 8:
      status = true;
      break;
    default:
      status = false;
      break;
  }
  return { status, message };
}
function Register({ theme, navigation }) {
  const styles = StyleSheet.create({
    root: {
      flex: 1,
    },

    inputCard: {
      marginVertical: 15,
      width: Dimensions.get('screen').width * 0.8,
      shadowColor: '#000',
      alignSelf: 'center',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5, //for Andriod,
      borderRadius: 5,
      borderWidth: 0.6,
      borderColor: '#E5DDD5',
    },
    inputStyle: {
      paddingLeft: 30,
      borderRadius: 20,
      paddingVertical: 12,
    },
    buttonStyles: {
      display: 'flex',
      justifyContent: 'center',
      width: Dimensions.get('screen').width * 0.4,
      backgroundColor: theme.colors.darkPink,
      marginVertical: 15,
      color: '#fff',
      borderRadius: 50,
    },
    buttonText: {
      fontFamily: theme.fonts.bold.fontFamily,
      fontSize: 19,
      textTransform: 'capitalize',
      paddingVertical: 5,
    },
    title: {
      fontSize: 25,
      paddingVertical: 15,
      fontFamily: theme.fonts.bold.fontFamily,
      textAlign: 'center',
    },
    text: {
      fontFamily: theme.fonts.regular.fontFamily,
      textAlign: 'center',
      marginVertical: 5,
    },
    dropdownIconContainer: {
      width: Dimensions.get('screen').height * 0.05,
      height: Dimensions.get('screen').height * 0.05,
      backgroundColor: theme.colors.darkPink,
      borderRadius: Dimensions.get('screen').height * 0.04,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal: {
      alignSelf: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      width: '80%',
      paddingBottom: 15,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 2,
    },
    privacyTitle: {
      fontSize: 20,
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 5,
      fontWeight: 'bold',
      fontFamily: theme.fonts.bold.fontFamily,
      marginBottom: 5,
    },
    privacyText: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontSize: 12,
      fontWeight: '200',
      marginBottom: 5,
      textAlign: 'center',
      color: theme.colors.grey,
    },
  });
  const { state, dispatch } = useContext(GlobalContext);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const usernameRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();
  const [confirmPassword, setConfirmPassword] = useState('');
  const confirmPasswordRef = useRef();
  const [divorseStatus, setDivorseStatus] = useState('');
  const [countryName, setCountryName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [availalbleStates, setAvailableStates] = useState([]);
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  const [enableshift, setenableShift] = useState(false);
  //Logic states
  const [step, setStep] = useState(1);
  const [Ecountry, setEcountry] = useState('');
  const handleBackStep = () => {
    setStep((previousStep) => previousStep - 1);
  };
  const handleNextStep = async () => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    let status = false,
      err = '',
      res = {};
    switch (step) {
      // case 1:
      //   res = await validateSteps(step);
      //   status = res.status;
      //   break;
      case 1:
        res = await validateSteps(step, username, name);
        status = res.status;
        err = res.message;
        break;
      case 2:
        res = await validateSteps(
          step,
          null,
          null,
          email,
          password,
          confirmPassword
        );
        status = res.status;
        err = res.message;
        break;
      case 3:
        res = await validateSteps(
          step,
          null,
          null,
          null,
          null,
          null,
          divorseStatus
        );
        status = res.status;
        err = res.message;
        break;
      case 4:
        res = await validateSteps(
          step,
          null,
          null,
          null,
          null,
          null,
          null,
          countryName,
          city
        );
        status = res.status;
        err = res.message;
        break;
      case 5:
        res = await validateSteps(
          step,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          gender
        );
        status = res.status;
        err = res.message;
        break;
      case 6:
        res = await validateSteps(
          step,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          age
        );
        status = res.status;
        err = res.message;
        break;
      case 7:
        res = await validateSteps(
          step,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        );
        status = res.status;
        err = res.message;
        break;
      case 8:
        res = await validateSteps(
          step,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          null
        );
        status = res.status;
        err = res.message;
        break;
      default:
        break;
    }
    if (status) {
      if (step === 8) {
        await submitData();
      } else {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        setStep((previousStep) => previousStep + 1);
      }
    } else {
      dispatch({ type: actionTypes.SET_LOADING, payload: false });
      Alert.alert('Fail', err);
    }
  };

  useEffect(() => {
    if (countryId > 0) {
      setCity('');
      const state = states.filter((item) => +item.country_id === countryId);
      setAvailableStates(state);
    }
  }, [countryId]);
  //Final Submission
  const submitData = async (e) => {
    dispatch({ type: actionTypes.SET_LOADING, payload: true });
    // //apply validation here first
    axios
      .post('/users/signup', {
        name,
        username,
        email,
        divorseStatus,
        country: countryName,
        city,
        gender,
        age,
        password,
        confirmPassword,
      })
      .then((response) => {
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        setStep(1);
        navigation.navigate('RegisterationSuccess', {
          user: response.data.data.user,
          token: response.data.token,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: actionTypes.SET_LOADING, payload: false });
        Alert.alert(
          'Fail',
          error.response ? error.response.data.message : error.message
        );
      });
  };

  const firstscreen = (
    <>
      <ImageBackground
        source={require('../../assets/dev/dottile.png')}
        resizeMode="repeat"
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height * 0.9,
          justifyContent: 'flex-end',
        }}
      >
        <Card style={{ ...styles.card, ...styles.card1, marginBottom: 10 }}>
          <Card.Actions style={{ marginLeft: 5 }}>
            <MaterialCommunityIcons
              style={{
                marginLeft: 3,
                backgroundColor: '#fff',
                borderRadius: 50,
              }}
              name="arrow-left-circle"
              size={35}
              color={theme.colors.primary}
              onPress={() => navigation.goBack()}
            />
          </Card.Actions>
        </Card>
        <View style={{ justifyContent: 'center', flex: 1 }}>
          <Card
            style={{
              ...styles.card,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
              paddingVertical: 30,
            }}
          >
            <Card.Cover
              resizeMode="center"
              source={require('../../assets/dev/logo.png')}
              style={{
                borderRadius: 4,
                elevation: 5,
                marginBottom: 10,
                width: Dimensions.get('screen').width * 0.9,
                height: 185,
                marginTop: 10,
                alignSelf: 'center',
              }}
            />
            <Card.Content>
              <Text style={styles.title}>
                Register by answering 6 quick questions.
              </Text>
            </Card.Content>
            <Card.Actions style={{ justifyContent: 'center' }}>
              <Button
                style={styles.buttonStyles}
                theme={{ fonts: { regular: 'Apple Color Emoji' } }}
                onPress={handleNextStep}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: theme.colors.light,
                  }}
                >
                  {' '}
                  Continue
                </Text>
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </ImageBackground>
    </>
  );
  const firstSection = (
    <>
      <View style={styles.root}>
        <Spinner visible={state.loading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/forgetPasswordTopCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Platform.OS === 'android'
                  ? Dimensions.get('screen').height * 0.2
                  : Dimensions.get('screen').height * 0.28,
            }}
          />
        </View>

        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            width: Dimensions.get('screen').width,
            height:
              Platform.OS === 'android'
                ? Dimensions.get('screen').height * 0.53
                : Dimensions.get('screen').height * 0.53,
          }}
        >
          <Card.Content>
            <Text style={styles.title}>Choose a username.</Text>
          </Card.Content>
          <Card elevation={2} style={styles.inputCard}>
            <TextInput
              placeholder="Full name"
              placeholderTextColor="#C7C7CD"
              style={styles.inputStyle}
              value={name}
              onSubmitEditing={() => usernameRef.current.focus()}
              blurOnSubmit={false}
              onFocus={() => setenableShift(true)}
              onChangeText={(text) => setName(text)}
            />
          </Card>
          <Card style={styles.inputCard}>
            <TextInput
              placeholderTextColor="#C7C7CD"
              placeholder="Username"
              ref={usernameRef}
              style={styles.inputStyle}
              value={username}
              onFocus={() => setenableShift(true)}
              onChangeText={(text) => setUsername(text.trim())}
            />
          </Card>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Button
              color="#fff"
              disabled={state.loading}
              style={styles.buttonStyles}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}> Previous</Text>{' '}
            </Button>
            <Button
              color="#fff"
              disabled={state.loading}
              style={styles.buttonStyles}
              onPress={handleNextStep}
            >
              <Text style={styles.buttonText}> Continue</Text>{' '}
            </Button>
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 0,
            margin: 0,
          }}
        >
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/loginBottomCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.2,
            }}
          />
        </View>
      </View>
    </>
  );
  const secondSection = (
    <>
      <View style={styles.root}>
        <Spinner visible={state.loading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/loginTopCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Platform.OS === 'android'
                  ? Dimensions.get('screen').height * 0.2
                  : Dimensions.get('screen').height * 0.28,
            }}
          />
        </View>

        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.53,
          }}
        >
          <Card.Content>
            <Text style={styles.title}> Enter your Email and Password </Text>
          </Card.Content>
          <Card style={styles.inputCard}>
            <TextInput
              placeholder="Email"
              style={styles.inputStyle}
              placeholderTextColor="#C7C7CD"
              value={email}
              onSubmitEditing={() => passwordRef.current.focus()}
              blurOnSubmit={false}
              onFocus={() => setenableShift(true)}
              onChangeText={(text) => setEmail(text.trim())}
            />
          </Card>
          <Card style={styles.inputCard}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#C7C7CD"
              style={styles.inputStyle}
              value={password}
              ref={passwordRef}
              onSubmitEditing={() => confirmPasswordRef.current.focus()}
              blurOnSubmit={false}
              secureTextEntry={true}
              onFocus={() => setenableShift(true)}
              onChangeText={(text) => setPassword(text.trim())}
            />
          </Card>
          <Card style={styles.inputCard}>
            <TextInput
              placeholderTextColor="#C7C7CD"
              placeholder="Confirm Password"
              style={styles.inputStyle}
              ref={confirmPasswordRef}
              value={confirmPassword}
              secureTextEntry={true}
              onFocus={() => setenableShift(true)}
              onChangeText={(text) => setConfirmPassword(text.trim())}
            />
          </Card>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Button
              color="#fff"
              disabled={state.loading}
              style={styles.buttonStyles}
              onPress={handleBackStep}
            >
              <Text style={styles.buttonText}> Previous</Text>{' '}
            </Button>
            <Button
              color="#fff"
              disabled={state.loading}
              style={styles.buttonStyles}
              onPress={handleNextStep}
            >
              <Text style={styles.buttonText}> Continue</Text>{' '}
            </Button>
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 0,
            margin: 0,
          }}
        >
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/resetPasswordBottomCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.2,
            }}
          />
        </View>
      </View>
    </>
  );
  const thirdSection = (
    <>
      <View style={styles.root}>
        <Spinner visible={state.loading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/forgetPasswordTopCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Platform.OS === 'android'
                  ? Dimensions.get('screen').height * 0.2
                  : Dimensions.get('screen').height * 0.28,
            }}
          />
        </View>
        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            width: Dimensions.get('screen').width * 0.9,
          }}
        >
          <View
            style={{
              height: Dimensions.get('screen').height * 0.5,
              justifyContent: 'center',
            }}
          >
            <Card.Content>
              <Text style={styles.title}> Which one are you?</Text>
            </Card.Content>
            <View
              style={{
                height: Dimensions.get('screen').height * 0.35,
                justifyContent: 'space-between',
              }}
            >
              <DropDownPicker
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
                defaultValue={divorseStatus}
                items={[
                  {
                    label: 'Thinking of separating',
                    value: 'Thinking of separating',
                    icon: () => {},
                  },
                  {
                    label: 'I’m going through a divorce',
                    value: 'I’m going through a divorce',
                    icon: () => {},
                  },
                  {
                    label: 'I’m already divorced',
                    value: 'I’m already divorced',
                    icon: () => {},
                  },
                ]}
                placeholder="Choose one"
                placeholderStyle={{
                  justifyContent: 'flex-start',
                  paddingHorizontal: 10,
                  fontSize: 16,
                  fontFamily: theme.fonts.regular.fontFamily,
                  color: theme.colors.grey,
                }}
                style={{
                  ...styles.inputStyle,
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                  borderBottomLeftRadius: 40,
                  borderBottomRightRadius: 40,
                }}
                containerStyle={{
                  height: 55,
                  width: Dimensions.get('screen').width * 0.89,
                  alignSelf: 'center',
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
                labelStyle={{
                  color: theme.colors.grey,
                  fontFamily: theme.fonts.regular.fontFamily,
                  fontSize: 16,
                }}
                dropDownStyle={{
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                }}
                onChangeItem={(item) => setDivorseStatus(item.value)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <Button
                  color="#fff"
                  disabled={state.loading}
                  style={styles.buttonStyles}
                  onPress={handleBackStep}
                >
                  <Text style={styles.buttonText}> Previous</Text>{' '}
                </Button>
                <Button
                  color="#fff"
                  disabled={state.loading}
                  style={styles.buttonStyles}
                  onPress={handleNextStep}
                >
                  <Text style={styles.buttonText}> Continue</Text>{' '}
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 0,
            margin: 0,
          }}
        >
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/forgetPasswordBottomCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.2,
            }}
          />
        </View>
      </View>
    </>
  );
  const fourthSection = (
    <>
      <View style={styles.root}>
        <Spinner visible={state.loading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/loginTopCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Platform.OS === 'android'
                  ? Dimensions.get('screen').height * 0.2
                  : Dimensions.get('screen').height * 0.28,
            }}
          />
        </View>

        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            width: Dimensions.get('screen').width,
            height: Dimensions.get('screen').height * 0.53,
          }}
        >
          <Card.Content>
            <Text style={styles.title}> Select Your Location</Text>
          </Card.Content>
          {/* <Card style={styles.inputCard}>
            <DropDownPicker
              items={[
                {
                  label: 'USA',
                  value: 'usa',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                  hidden: true,
                },
                {
                  label: 'UK',
                  value: 'uk',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                },
                {
                  label: 'France',
                  value: 'france',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                },
              ]}
              searchTextInputProps={{onFocus: () => setenableShift(true)}}
              placeholder="Select Country"
              defaultValue={Ecountry}
              containerStyle={{height: 55, zIndex: 200}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa', zIndex: 200}}
              onChangeItem={(item) => setEcountry(item.value)}
              searchable={true}
              searchablePlaceholder="Search for an item"
              searchablePlaceholderTextColor="gray"
              seachableStyle={{}}
              searchableError={() => <Text>Not Found</Text>}
            />
          </Card>
          <View style={styles.inputCard}>
            <DropDownPicker
              items={[
                {
                  label: 'USA',
                  value: 'usa',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                  hidden: true,
                },
                {
                  label: 'UK',
                  value: 'uk',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                },
                {
                  label: 'France',
                  value: 'france',
                  icon: () => <Icon name="flag" size={18} color="#900" />,
                },
              ]}
              searchTextInputProps={{onFocus: () => setenableShift(true)}}
              placeholder="Select an item"
              defaultValue={Ecountry}
              containerStyle={{height: 50, zIndex: 100}}
              style={{backgroundColor: '#fafafa'}}
              itemStyle={{
                justifyContent: 'flex-start',
              }}
              dropDownStyle={{backgroundColor: '#fafafa'}}
              onChangeItem={(item) => setEcountry(item.value)}
              searchable={true}
              searchablePlaceholder="Search for an item"
              searchablePlaceholderTextColor="gray"
              seachableStyle={{}}
              searchableError={() => <Text>Not Found</Text>}
            />
          </View> */}
          <Card style={styles.inputCard}>
            <SearchableDropdown
              resetValue={false}
              onFocus={() => setenableShift(true)}
              onTextChange={(text) => console.log(text)}
              //On text change listner on the searchable input
              onItemSelect={(item) => {
                setCountryId(item.id);
                setCountryName(item.name);
              }}
              //onItemSelect called after the selection from the dropdown
              //containerStyle={{padding: 5}}
              //suggestion container style
              textInputStyle={{
                //inserted text style
                padding: 12,
              }}
              itemStyle={{
                //single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
              }}
              itemTextStyle={{
                //text style of a single dropdown item
                color: '#222',
              }}
              itemsContainerStyle={{
                //items container style you can pass maxHeight
                //to restrict the items dropdown hieght
                maxHeight: '60%',
              }}
              items={countriesData.map((item, i) => {
                const obj = {
                  id: item.id,
                  name: item.name,
                };
                return obj;
              })}
              //mapping of item array
              defaultIndex={countryName}
              //default selected item index
              placeholder="Select Country"
              //place holder for the search input
              //reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              //To remove the underline from the android input
            />
          </Card>
          <Card style={styles.inputCard}>
            <SearchableDropdown
              onFocus={() => setenableShift(true)}
              //On text change listner on the searchable input
              onTextChange={(text) => console.log(text)}
              onItemSelect={(item) => setCity(item.name)}
              //onItemSelect called after the selection from the dropdown
              //containerStyle={{padding: 5}}
              //suggestion container style
              textInputStyle={{
                //inserted text style
                padding: 12,
              }}
              itemStyle={{
                //single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
              }}
              itemTextStyle={{
                //text style of a single dropdown item
                color: '#222',
              }}
              itemsContainerStyle={{
                //items container style you can pass maxHeight
                //to restrict the items dropdown hieght
                maxHeight: '80%',
              }}
              setSort={(item, searchedText) =>
                item.name.toLowerCase().startsWith(searchedText.toLowerCase())
              }
              items={
                availalbleStates
                  ? availalbleStates.length > 0 &&
                    availalbleStates.map((item, i) => {
                      const obj = {
                        id: item.id,
                        name: item.name,
                      };
                      return obj;
                    })
                  : []
              }
              //mapping of item array
              defaultIndex={city}
              //default selected item index
              placeholder="Select State"
              //place holder for the search input
              resetValue={false}
              //reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              //To remove the underline from the android input
            />
          </Card>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Button
              color="#fff"
              disabled={state.loading}
              style={styles.buttonStyles}
              onPress={handleBackStep}
            >
              <Text style={styles.buttonText}> Previous</Text>{' '}
            </Button>
            <Button
              color="#fff"
              disabled={state.loading}
              style={styles.buttonStyles}
              onPress={handleNextStep}
            >
              <Text style={styles.buttonText}> Continue</Text>{' '}
            </Button>
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 0,
            margin: 0,
          }}
        >
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/resetPasswordBottomCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.2,
            }}
          />
        </View>
      </View>
    </>
  );
  const fifthSection = (
    <>
      <View style={styles.root}>
        <Spinner visible={state.loading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/forgetPasswordTopCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Platform.OS === 'android'
                  ? Dimensions.get('screen').height * 0.25
                  : Dimensions.get('screen').height * 0.31,
            }}
          />
        </View>

        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            width: Dimensions.get('screen').width,
          }}
        >
          <Card.Content>
            <Text style={styles.title}> Select Your Gender</Text>
          </Card.Content>

          <View
            style={{
              height: Dimensions.get('screen').height * 0.4,
              justifyContent: 'space-around',
            }}
          >
            <DropDownPicker
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
              items={[
                { label: 'Male', value: 'Male', icon: () => {} },
                { label: 'Female', value: 'Female', icon: () => {} },
              ]}
              placeholder="Choose one"
              placeholder="Choose one"
              placeholderStyle={{
                justifyContent: 'flex-start',
                paddingHorizontal: 10,
                fontSize: 16,
                fontFamily: theme.fonts.regular.fontFamily,
                color: theme.colors.grey,
              }}
              style={{
                ...styles.inputStyle,
                borderTopLeftRadius: 40,
                borderTopRightRadius: 40,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
              }}
              containerStyle={{
                height: 55,
                width: Dimensions.get('screen').width * 0.89,
                alignSelf: 'center',
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
              labelStyle={{
                color: theme.colors.grey,
                fontFamily: theme.fonts.regular.fontFamily,
                fontSize: 16,
              }}
              dropDownStyle={{
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
              defaultValue={gender}
              onChangeItem={(item) => setGender(item.value)}
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
            >
              <Button
                color="#fff"
                disabled={state.loading}
                style={styles.buttonStyles}
                onPress={handleBackStep}
              >
                <Text style={styles.buttonText}> Previous</Text>{' '}
              </Button>
              <Button
                color="#fff"
                disabled={state.loading}
                style={styles.buttonStyles}
                onPress={handleNextStep}
              >
                <Text style={styles.buttonText}> Continue</Text>{' '}
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 0,
            margin: 0,
          }}
        >
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/resetPasswordBottomCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.25,
            }}
          />
        </View>
      </View>
    </>
  );
  const sixSection = (
    <>
      <View style={styles.root}>
        <Spinner visible={state.loading} />
        <View>
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/resetPasswordTopCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height:
                Platform.OS === 'android'
                  ? Dimensions.get('screen').height * 0.25
                  : Dimensions.get('screen').height * 0.31,
            }}
          />
        </View>

        <KeyboardAvoidingView
          behavior="position"
          enabled={enableshift}
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            flex: 1,
            width: Dimensions.get('screen').width * 0.9,
          }}
        >
          <View
            style={{
              height: Dimensions.get('screen').height * 0.5,
              justifyContent: 'center',
            }}
          >
            <Text style={styles.title}> How old are you? </Text>

            <View
              style={{
                height: Dimensions.get('screen').height * 0.35,
                justifyContent: 'space-between',
              }}
            >
              <DropDownPicker
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
                items={[
                  {
                    label: '30 or under',
                    value: '30 or under',
                    icon: () => {},
                  },
                  { label: '31-40', value: '31-40', icon: () => {} },
                  { label: '41-50', value: '41-50', icon: () => {} },
                  { label: '51-60', value: '51-60', icon: () => {} },
                  { label: 'over 60', value: 'over 60', icon: () => {} },
                ]}
                style={{
                  ...styles.inputStyle,
                  borderTopLeftRadius: 40,
                  borderTopRightRadius: 40,
                  borderBottomLeftRadius: 40,
                  borderBottomRightRadius: 40,
                }}
                placeholder="Choose one"
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
                defaultValue={age}
                onChangeItem={(item) => setAge(item.value)}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}
              >
                <Button
                  color="#fff"
                  disabled={state.loading}
                  style={styles.buttonStyles}
                  onPress={handleBackStep}
                >
                  <Text style={styles.buttonText}> Previous</Text>{' '}
                </Button>
                <Button
                  color="#fff"
                  disabled={state.loading}
                  style={styles.buttonStyles}
                  onPress={handleNextStep}
                >
                  <Text style={styles.buttonText}> Submit</Text>{' '}
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>

        <View
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: 0,
            margin: 0,
          }}
        >
          <Image
            resizeMode="stretch"
            source={require('../../assets/dev/forgetPasswordBottomCurve.png')}
            style={{
              width: Dimensions.get('screen').width,
              height: Dimensions.get('screen').height * 0.25,
            }}
          />
        </View>
      </View>
    </>
  );

  const sevenSection = (
    <Portal>
      <Modal
        visible={step === 7}
        onDismiss={() => console.log('dismiss')}
        contentContainerStyle={{
          ...styles.modal,
          height: '90%',
          padding: 3,
        }}
      >
        <>
          <Text style={styles.privacyTitle}> Privacy policy</Text>
          <View
            style={{
              borderBottomColor: theme.colors.grey,
              borderBottomWidth: 1,
              marginVertical: 7,
              alignSelf: 'center',
              width: '80%',
            }}
          />
          <ScrollView>
            <Text style={styles.privacyText}>{privacy}</Text>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: '70%',
                padding: 5,
                backgroundColor: theme.colors.darkPink,
                borderRadius: 50,
              }}
              onPress={handleNextStep}
            >
              <Text style={{ textAlign: 'center', padding: 5, color: '#fff' }}>
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </Modal>
    </Portal>
  );
  const eigthSection = (
    <Portal>
      <Modal
        visible={step === 8}
        onDismiss={() => console.log('dismiss')}
        contentContainerStyle={{
          ...styles.modal,
          height: '90%',
          padding: 3,
        }}
      >
        <>
          <Text style={styles.privacyTitle}> Terms & Conditions</Text>
          <View
            style={{
              borderBottomColor: theme.colors.grey,
              borderBottomWidth: 1,
              marginVertical: 7,
              alignSelf: 'center',
              width: '80%',
            }}
          />
          <ScrollView>
            <Text style={styles.privacyText}>{terms}</Text>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                width: '70%',
                padding: 5,
                backgroundColor: theme.colors.darkPink,
                borderRadius: 50,
              }}
              onPress={handleNextStep}
            >
              <Text style={{ textAlign: 'center', padding: 5, color: '#fff' }}>
                Accept
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </Modal>
    </Portal>
  );
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        {step === 1 ? firstSection : null}
        {step === 2 ? secondSection : null}
        {step === 3 ? thirdSection : null}
        {step == 4 ? fourthSection : null}
        {step == 5 ? fifthSection : null}
        {step == 6 ? sixSection : null}
        {step == 7 ? sevenSection : null}
        {step == 8 ? eigthSection : null}
      </View>
    </TouchableWithoutFeedback>
  );
}
export default withTheme(Register);
