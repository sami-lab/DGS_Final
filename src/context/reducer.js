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
    case actionTypes.SET_ARTICLE_CATEGORIES:
      return {
        ...prevState,
        articleCategories: action.articleCategories,
      };
    case actionTypes.SET_ARTICLES:
      return {
        ...prevState,
        articles: action.articles,
        articlesTotalRecords: action.articlesTotalRecords,
      };
    case actionTypes.SET_VIDEOS_CATEGORIES:
      return {
        ...prevState,
        videosCategories: action.videosCategories,
      };
    case actionTypes.SET_VIDEOS:
      return {
        ...prevState,
        videos: action.videos,
        videosTotalRecords: action.videosTotalRecords,
      };
    case actionTypes.SET_CONNECT_CATEGORIES:
      return {
        ...prevState,
        connectCategories: action.connectCategories,
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
