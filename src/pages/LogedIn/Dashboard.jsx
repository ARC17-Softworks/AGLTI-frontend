import React, { useContext } from 'react';
import { Grid, GridItem, Box } from '@chakra-ui/react';
import {
  Redirect,
  Switch,
  BrowserRouter as Route,
  useRouteMatch,
} from 'react-router-dom';
import { DashboardSideNav } from '../../components/layout/DashboardSideNav';
import { AuthContext } from '../../context/auth';
import { ProfileArea } from '../../components/dashboard/ProfileArea';

export const Dashboard = () => {
  const context = useContext(AuthContext);
  const { path } = useRouteMatch();

  if (!context.profile) {
    return <Redirect to="/createprofile" />;
  }

  return (
    <Box>
      <Grid templateColumns={{ md: '250px auto', sm: '70px auto' }}>
        <GridItem>
          <DashboardSideNav />
        </GridItem>
        <GridItem>
          <Box maxW="container.xl" px={10} pt={2} mx="auto">
            <Switch>
              <Route exact path={path}>
                <ProfileArea />
              </Route>
            </Switch>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
