import React, { useReducer, createContext } from 'react';
import { useQuery, gql } from '@apollo/client';

const initialState = { user: null, profile: null, load: false };

const AuthContext = createContext({
  user: null,
  profile: null,
  load: false,
  login: data => {},
  setProfile: data => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload.user,
        profile: action.payload.profile,
      };
    case 'SET_PROFILE':
      return {
        ...state,
        profile: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        profile: null,
      };
    default:
      return state;
  }
};

const AuthProvider = props => {
  const userPopulated = initialState.user !== null;

  const { data, loading } = useQuery(CHECK_AUTH, {
    skip: userPopulated,
    fetchPolicy: 'network-only',
  });

  initialState.load = loading;
  // console.log(initialState.load);

  if (!userPopulated && data) {
    if (data.checkAuth.user) {
      initialState.user = {
        id: data.checkAuth.user.id,
        name: data.checkAuth.user.name,
        avatar: data.checkAuth.user.avatar,
      };
    }
  }

  const profilePopulated =
    initialState.profile !== null || initialState.user === null;

  if (!profilePopulated && data) {
    if (data.checkAuth.profile) {
      initialState.profile = {
        skills: data.checkAuth.profile.skills,
        activeProject: data.checkAuth.profile.activeProject ? true : false,
      };
    }
  }

  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = data => {
    dispatch({ type: 'LOGIN', payload: data });
  };

  const setProfile = data => {
    dispatch({ type: 'SET_PROFILE', payload: data });
  };

  const logout = data => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        profile: state.profile,
        load: state.load,
        login,
        setProfile,
        logout,
      }}
      {...props}
    />
  );
};

const CHECK_AUTH = gql`
  query checkAuth {
    checkAuth {
      user {
        id
        name
        avatar
      }

      profile {
        skills
        activeProject {
          title
        }
      }
    }
  }
`;

export { AuthContext, AuthProvider };
