import * as actionTypes from './actions';

const reducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.RETRIEVE_TOKEN:
      return {
        ...prevState,
        userToken: action.token,
        loading: false,
      };
    case actionTypes.SET_LOADING:
      console.log('Loading', action.payload);
      return {
        ...prevState,
        loading: action.payload,
      };
    case actionTypes.LOGIN:
      return {
        ...prevState,
        user: action.user,
        userToken: action.token,
        loading: false,
      };
    case actionTypes.LOGOUT:
      return {
        ...prevState,
        user: null,
        userToken: null,
        loading: false,
      };
    case actionTypes.REGISTER:
      return {
        ...prevState,
        user: action.user,
        userToken: action.token,
        loading: false,
      };
    case actionTypes.TOGGLE_THEME:
      console.log('Theme', prevState.isDarkTheme);
      return {
        ...prevState,
        isDarkTheme: !prevState.isDarkTheme,
        loading: false,
      };
    default:
      return state;
  }
};
export default reducer;
