import React, { Component } from 'react';
import { Box, SimpleGrid, Stack, Icon, Heading, Grid, Avatar, Text, Divider, Tag, Button } from '@chakra-ui/core';
import ProjectMemberCard from './ProjectMemberCard';

export class ProjectMembersSection extends Component {
    render() {
        return (
            <Box zIndex={-1} h="100vh" bg="#171923" color="white">
                <SimpleGrid columns={0} spacing={0} ml="8%">
                <Box h="38vh" w="85vw" mt="100px" borderRadius="lg" bg="#2D3748" >
                     <Heading size="xl" textAlign="left" ml="102px" >Members</Heading>
                     <Stack isInline>
                        <Icon name="chevron-left" size="80px" mt="40px" ml="10px"/>
                        
                        <Grid templateColumns="repeat(4, 1fr)" gap={6} ml="1px" mr="8%" mt="1%">
                            <ProjectMemberCard />
                            <ProjectMemberCard />
                            <ProjectMemberCard />
                            <ProjectMemberCard />
                        </Grid>

                        <Icon name="chevron-right" size="80px" mt="40px" ml="10px" mr="10px"/>
                     </Stack>
                 </Box>

                 
                 <Box h="38vh" w="85vw" mt="30px" borderRadius="lg" bg="#2D3748" >
                 <Heading size="xl" textAlign="left" ml="102px" >Previous Members</Heading>
                     <Stack isInline>
                        <Icon name="chevron-left" size="80px" mt="40px" ml="10px"/>

                        <Grid templateColumns="repeat(4, 1fr)" gap={6} ml="1px" mr="8%" mt="1%">
                            <ProjectMemberCard />
                            <ProjectMemberCard />
                            <ProjectMemberCard />
                            <ProjectMemberCard />
                        </Grid>

                        <Icon name="chevron-right" size="80px" mt="40px" ml="1px"/>
                     </Stack>
                 </Box>
                </SimpleGrid>
            </Box>
        )
    }
}

export default ProjectMembersSection
