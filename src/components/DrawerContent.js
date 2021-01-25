// import React, {useContext} from 'react';
// import {View, StyleSheet, TouchableOpacity} from 'react-native';
// import {
//   useTheme,
//   Avatar,
//   Title,
//   Caption,
//   Drawer,
//   Text,
//   TouchableRipple,
//   Switch,
//   Alert,
// } from 'react-native-paper';
// import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
// import AsyncStorage from '@react-native-community/async-storage';

// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import {GlobalContext} from '../context/GlobalContext';
// import * as actionTypes from '../context/actions';

// export default function DrawerContent(props) {
//   const paperTheme = useTheme();

//   const {state, dispatch} = useContext(GlobalContext);

//   const signOut = async () => {
//     // setUserToken(null);
//     // setIsLoading(false);
//     try {
//       await AsyncStorage.removeItem('userToken');
//       await AsyncStorage.removeItem('user');
//       dispatch({type: actionTypes.LOGOUT});
//     } catch (e) {
//       Alert.alert('someting went wrong');
//     }
//   };
//   return (
//     <View style={{flex: 1}}>
//       <DrawerContentScrollView {...props}>
//         <View style={styles.drawerContent}>
//           <View style={styles.userInfoSection}>
//             <View style={{flexDirection: 'row', marginTop: 15}}>
//               <TouchableOpacity
//                 onPress={() => props.navigation.navigate('UserProfile')}>
//                 <Avatar.Image
//                   source={{
//                     uri:
//                       'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Favatar_147144&psig=AOvVaw2000h_IRY7LtVV7Ywq2T1t&ust=1608150155118000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjwtqjo0O0CFQAAAAAdAAAAABAD',
//                   }}
//                   size={50}
//                 />
//               </TouchableOpacity>
//               <View style={{marginLeft: 15, flexDirection: 'column'}}>
//                 <Title style={styles.title}>{state.user.name}</Title>
//                 <Caption style={styles.caption}>{state.user.email}</Caption>
//               </View>
//             </View>
//           </View>

//           <Drawer.Section style={styles.drawerSection}>
//             <DrawerItem
//               icon={({color, size}) => (
//                 <Icon name="home-outline" color={color} size={size} />
//               )}
//               label="Ask Jackie"
//               onPress={() => {
//                 props.navigation.navigate('AskJackie');
//               }}
//             />
//             <DrawerItem
//               icon={({color, size}) => (
//                 <Icon name="account-outline" color={color} size={size} />
//               )}
//               label="Video Library"
//               onPress={() => {
//                 props.navigation.navigate('VideoLibrary');
//               }}
//             />
//             <DrawerItem
//               icon={({color, size}) => (
//                 <Icon name="bookmark-outline" color={color} size={size} />
//               )}
//               label="Resources"
//               onPress={() => {
//                 props.navigation.navigate('Resources');
//               }}
//             />
//             <DrawerItem
//               icon={({color, size}) => (
//                 <Icon name="bookmark-outline" color={color} size={size} />
//               )}
//               label="Website"
//               onPress={() => {
//                 props.navigation.navigate('Website');
//               }}
//             />
//             <DrawerItem
//               icon={({color, size}) => (
//                 <Icon name="account-check-outline" color={color} size={size} />
//               )}
//               label="News Letter"
//               onPress={() => {
//                 props.navigation.navigate('NewsLetter');
//               }}
//             />
//             <DrawerItem
//               icon={({color, size}) => (
//                 <Icon name="account-check-outline" color={color} size={size} />
//               )}
//               label="Get Matched"
//               onPress={() => {
//                 props.navigation.navigate('GetMatched');
//               }}
//             />
//             <DrawerItem
//               icon={({color, size}) => (
//                 <Icon name="account-check-outline" color={color} size={size} />
//               )}
//               label="Ask Jackie"
//               onPress={() => {
//                 props.navigation.navigate('AskJackie');
//               }}
//             />
//           </Drawer.Section>
//           <Drawer.Section title="Preferences">
//             <TouchableRipple
//               onPress={() => {
//                 dispatch({type: actionTypes.TOGGLE_THEME});
//               }}>
//               <View style={styles.preference}>
//                 <Text>Dark Theme</Text>
//                 <View pointerEvents="none">
//                   <Switch value={paperTheme.dark} />
//                 </View>
//               </View>
//             </TouchableRipple>
//           </Drawer.Section>
//         </View>
//       </DrawerContentScrollView>
//       <Drawer.Section style={styles.bottomDrawerSection}>
//         <DrawerItem
//           icon={({color, size}) => (
//             <Icon name="exit-to-app" color={color} size={size} />
//           )}
//           label="Sign Out"
//           onPress={() => {
//             signOut();
//           }}
//         />
//       </Drawer.Section>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1,
//   },
//   userInfoSection: {
//     paddingLeft: 20,
//   },
//   title: {
//     fontSize: 16,
//     marginTop: 3,
//     fontWeight: 'bold',
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//   },
//   row: {
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   section: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   paragraph: {
//     fontWeight: 'bold',
//     marginRight: 3,
//   },
//   drawerSection: {
//     marginTop: 15,
//   },
//   bottomDrawerSection: {
//     marginBottom: 15,
//     borderTopColor: '#f4f4f4',
//     borderTopWidth: 1,
//   },
//   preference: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },
// });
