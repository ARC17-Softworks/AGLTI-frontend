import React, { createContext, useReducer, useContext } from 'react';
import { createPortal } from 'react-dom';
import NotificationAlert from '../components/notifications/NotificationAlert';

const initialState = [];

export const AlertContext = createContext(initialState);

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';
export const REMOVE_ALL = 'REMOVE_ALL';

export const alertReducer = (state, action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        {
          id: +new Date(),
          status: action.payload.status,
          message: action.payload.message,
        },
      ];
    case REMOVE:
      return state.filter(t => t.id !== action.payload.id);
    case REMOVE_ALL:
      return initialState;
    default:
      return state;
  }
};

export const AlertProvider = props => {
  const [alert, alertDispatch] = useReducer(alertReducer, initialState);
  const alertData = { alert, alertDispatch };
  return (
    <AlertContext.Provider value={alertData}>
      {props.children}

      {createPortal(<NotificationAlert alert={alert} />, document.body)}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  return useContext(AlertContext);
};
