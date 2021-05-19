import React, { useContext } from 'react';
import { Grid, GridItem, Box, Image } from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';
import { DashboardSideNav } from '../../components/layout/DashboardSideNav';
import { AuthContext } from '../../context/auth';

export const Dashboard = () => {
  const context = useContext(AuthContext);

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
            <Image boxSize="200px" src={context.user.avatar} />
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};
