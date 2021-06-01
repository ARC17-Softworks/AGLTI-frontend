import React, { useReducer, createContext, useCallback } from 'react';

const initialState = { applicants: 0, tasks: 0 };

const ProjectDashboardContext = createContext({ applicants: 0, tasks: 0 });

const projectDashboardReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APPLICANTS':
      return {
        ...state,
        applicants: action.payload,
      };
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.payload,
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
  const setTasks = useCallback(data => {
    dispatch({ type: 'SET_TASKS', payload: data });
  }, []);

  return (
    <ProjectDashboardContext.Provider
      value={{
        applicants: state.applicants,
        setApplicants,
        setTasks,
      }}
      {...props}
    />
  );
};

export { ProjectDashboardContext, ProjectDashboardProvider };
