import React, { useContext, useState } from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import {
  Redirect,
  Switch,
  BrowserRouter as Route,
  useRouteMatch,
} from 'react-router-dom';
import { ProjectDashboardSideNav } from '../../components/layout/ProjectDashboardSideNav';
import { ProjectDashboardProvider } from '../../context/projectDashboard';
import { AuthContext } from '../../context/auth';
import { InfoArea } from '../../components/project/InfoArea';
import { OpeningsArea } from '../../components/project/OpeningsArea';
import { MemberArea } from '../../components/project/MemberArea';
import { TasksArea } from '../../components/project/TasksArea';

export const ProjectDashboard = () => {
  const context = useContext(AuthContext);
  const { path } = useRouteMatch();

  const [devSearch, setDevSearch] = useState('');

  if (!context.profile) {
    return <Redirect to="/createprofile" />;
  }

  if (!context.profile.activeProject) {
    return <Redirect to="/dashboard" />;
  }

  if (devSearch.length === 24) {
    return <Redirect to={`/developer/search/${devSearch}`} />;
  }

  return (
    <ProjectDashboardProvider>
      <Box>
        <Grid templateColumns={{ md: '250px auto', sm: '70px auto' }}>
          <GridItem>
            <ProjectDashboardSideNav />
          </GridItem>
          <GridItem>
            <Switch>
              <Route exact path={path}>
                <TasksArea />
              </Route>
              <Route exact path={`${path}/info`}>
                <InfoArea />
              </Route>
              <Route exact path={`${path}/openings`}>
                <OpeningsArea setDevSearch={setDevSearch} />
              </Route>
              <Route exact path={`${path}/members`}>
                <MemberArea />
              </Route>
            </Switch>
          </GridItem>
        </Grid>
      </Box>
    </ProjectDashboardProvider>
  );
};
