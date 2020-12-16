import React, { Component } from 'react';
import { Box, Icon, SimpleGrid } from "@chakra-ui/core";
import InfoIcon from '@material-ui/icons/Info';
import PeopleIcon from '@material-ui/icons/People';
import InboxIcon from '@material-ui/icons/Inbox';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ForumIcon from '@material-ui/icons/Forum';
import HelpIcon from '@material-ui/icons/Help';

class Navbar extends Component {
  render() {
    return (
      <Box zIndex={1} bg="#2D3748" h="100%" w="60px" position= "absolute" color="white">
        <SimpleGrid columns={1} spacing={8} mt="90px" ml="10px">
          <InfoIcon style={{ fontSize: 40 }}/>
          <PeopleIcon style={{ fontSize: 40 }} />  
          <InboxIcon style={{ fontSize: 40 }}/>
          <FormatListBulletedIcon style={{ fontSize: 40 }} />
          <ForumIcon style={{ fontSize: 40 }} />
        </SimpleGrid>

        <SimpleGrid columns={1} spacing={8} mt="120px" ml="10px">
          <HelpIcon style={{ fontSize: 40 }} />
        </SimpleGrid>
        
      </Box>
    )
  }
}

export default Navbar
