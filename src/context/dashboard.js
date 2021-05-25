import React, { useReducer, createContext, useCallback } from 'react';

const initialState = { offers: 0 };

const DashboardContext = createContext({ offers: 0 });

const dashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_OFFERS':
      return {
        ...state,
        offers: action.payload,
      };
    default:
      return state;
  }
};

const DashboardProvider = props => {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const setOffers = useCallback(data => {
    dispatch({ type: 'SET_OFFERS', payload: data });
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        offers: state.offers,
        setOffers,
      }}
      {...props}
    />
  );
};

export { DashboardContext, DashboardProvider };
