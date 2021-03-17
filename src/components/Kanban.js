import React, { Component } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import {Box, Heading} from "@chakra-ui/react";

class Kanban extends React.Component {
    render() {
      const style = {
        padding: "30px",
        paddingTop: "5px",
        backgroundColor: "#2D3748"
      };
  
      return (
        <Box zIndex={-1} position= "absolute" bg="#171923" h="100vh" w="100%" color="white" >
          <Box bg="#2D3748" borderRadius="lg" h="80vh" w="90%" ml="6%" mt="5%" color="white" >
            <Heading as="h1" size="4xl" >Tasks</Heading>
          <KanbanBoard />
          </Box>
        </Box>
      );
    }
  }

  export default Kanban