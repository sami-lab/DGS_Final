import React, { createContext, useReducer } from 'react';

import reducer from './reducer';

const initialState = {
  loading: false,
  user: null,
  userToken: null,
  isDarkTheme: false,
  //following states are not global its just for saving api hits to icrease performance
  articleCategories: [],
  articles: [],
  articlesTotalRecords: 0,
  videosCategories: [],
  videos: [],
  videosTotalRecords: 0,
  connectCategories: [],
};
export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
