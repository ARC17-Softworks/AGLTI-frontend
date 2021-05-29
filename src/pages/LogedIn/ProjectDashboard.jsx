import React, { useContext } from 'react';
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

export const ProjectDashboard = () => {
  const context = useContext(AuthContext);
  const { path } = useRouteMatch();

  if (!context.profile) {
    return <Redirect to="/createprofile" />;
  }

  if (!context.profile.activeProject) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <ProjectDashboardProvider>
      <Box>
        <Grid templateColumns={{ md: '250px auto', sm: '70px auto' }}>
          <GridItem>
            <ProjectDashboardSideNav />
          </GridItem>
          <GridItem>
            <Box maxW="container.xl" px={10} pt={2} mx="auto">
              <Switch>
                <Route exact path={`${path}/info`}>
                  <InfoArea />
                </Route>
                <Route exact path={`${path}/openings`}>
                  <OpeningsArea />
                </Route>
              </Switch>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </ProjectDashboardProvider>
  );
};
