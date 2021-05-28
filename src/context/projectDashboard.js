import React, { useReducer, createContext, useCallback } from 'react';

const initialState = { applicants: 0 };

const ProjectDashboardContext = createContext({ applicants: 0 });

const projectDashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APPLICANTS':
      return {
        ...state,
        applicants: action.payload,
      };
    default:
      return state;
  }
};

const ProjectDashboardProvider = props => {
  const [state, dispatch] = useReducer(projectDashboardReducer, initialState);

  const setApplicants = useCallback(data => {
    dispatch({ type: 'SET_APPLICANTS', payload: data });
  }, []);

  return (
    <ProjectDashboardContext.Provider
      value={{
        applicants: state.applicants,
        setApplicants,
      }}
      {...props}
    />
  );
};

export { ProjectDashboardContext, ProjectDashboardProvider };
