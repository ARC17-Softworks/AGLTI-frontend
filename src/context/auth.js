import React, { useReducer, createContext } from 'react';
import { useQuery, gql } from '@apollo/client';

const initialState = { user: null, profile: null };

const AuthContext = createContext({
  user: null,
  profile: null,
  login: data => {},
  setProfile: data => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
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

  const { data } = useQuery(CHECK_AUTH, {
    skip: userPopulated,
    fetchPolicy: 'network-only',
  });

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

  const { data: profileData } = useQuery(CHECK_PROFILE, {
    skip: profilePopulated,
    fetchPolicy: 'network-only',
  });

  if (!profilePopulated && profileData) {
    if (profileData.checkProfile.profile) {
      initialState.profile = {
        skills: profileData.checkProfile.profile.skills,
        activeProject: profileData.checkProfile.profile.activeProject
          ? profileData.checkProfile.profile.activeProject.title
          : profileData.checkProfile.profile.activeProject,
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
    }
  }
`;

const CHECK_PROFILE = gql`
  query checkProfile {
    checkProfile {
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
