import React, { Component } from 'react';
import { Box, Grid, Heading, Text, Divider, Avatar, Button, Stack, Icon, SimpleGrid } from "@chakra-ui/core";
import DiscussionCard from './DiscussionCard';

class DiscussionSection extends Component {
    render() {
        return (
            <Box zIndex={-1} position= "absolute" bg="#171923" h="100vh" w="100%" color="white" >
                <Box bg="#2D3748" h="85vh" w="70%" ml="8%" mt="5%" borderRadius="lg" color="white" >
                    <Stack isInline spacing="auto" ml="8%" mr="40px">
                        <Heading textAlign="left" size="2xl" mt="10px">Discussions</Heading>
                        <Stack isInline spacing="auto" ml="8%" mr="40px" mt="35px">
                                <Icon name="small-add" size="18px" />
                                <Heading textAlign="left" size="sm">New Discussion</Heading>
                        </Stack>
                    </Stack>
                    <SimpleGrid columns="1" spacing="4" ml="8%" mr="30px" mt="15px">
                        <DiscussionCard />
                        <DiscussionCard />
                        <DiscussionCard />
                        <DiscussionCard />
                        <DiscussionCard />
                    </SimpleGrid>
                </Box>
            </Box>
            
        )
    }
}

export default DiscussionSection;
