import React, { useReducer, createContext } from 'react';
import { useQuery, gql } from '@apollo/client';

const initialState = { user: null };

const AuthContext = createContext({
  user: null,
  login: data => {},
  logout: () => {},
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const AuthProvider = props => {
  const isPopulated = initialState.user !== null;
  const { data } = useQuery(CHECK_AUTH, {
    skip: isPopulated,
    fetchPolicy: 'network-only',
  });
  if (!isPopulated) {
    if (data.checkAuth.user.id) {
      initialState.user = {
        id: data.checkAuth.user.id,
        name: data.checkAuth.user.name,
        avatar: data.checkAuth.user.avatar,
      };
    }
  }
  console.log(initialState);
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = data => {
    dispatch({ type: 'LOGIN', payload: data });
  };

  const logout = data => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
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

export { AuthContext, AuthProvider };
