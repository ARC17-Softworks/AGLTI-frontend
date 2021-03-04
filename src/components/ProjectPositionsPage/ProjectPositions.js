import React, { Component } from 'react';
import { Box, Grid, SimpleGrid, Stack, Heading, Icon, Text, Button, Tag, CloseButton, Badge, Avatar, AvatarBadge, Divider } from "@chakra-ui/core";
import PositionCard from './PositionCard';
import OfferCard from './OfferCard';
import ApplicantCard from './ApplicantCard';

class ProjectPositionsSection extends Component {
    render() {
        return (
            <Box zIndex={-1} bg="#171923" h="100%" color="white" >
                <SimpleGrid columns={1} spacing={4} ml="8%">
                 <Box h="50vh" w="85vw" mt="6%" borderRadius="lg" bg="#2D3748" >
                    <Stack isInline spacing="auto" ml="102px" mr="40px">
                        <Heading textAlign="left" size="xl">Positions</Heading>
                            <Stack isInline spacing="auto" ml="8%" mr="40px" mt="12px">
                                <Icon name="small-add" size="18px" />
                                <Heading textAlign="left" size="sm">Add Position</Heading>
                            </Stack>
                    </Stack>
                    <Stack isInline spacing="auto" ml="10px" mr="40px" >
                        <Icon name="chevron-left" size="80px" mt="80px" ml="10px"/>
                    <Grid templateColumns="repeat(4, 1fr)" gap={16} ml="6px">
                        <PositionCard />
                        <PositionCard />
                        <PositionCard />
                        <PositionCard />
                    </Grid>
                    <Icon name="chevron-right" size="80px" ml="40px" mt="80px" mr="20px"/>
                </Stack>
                 </Box>


                <Box h="50vh" w="85vw" borderRadius="lg" bg="#2D3748" >
                    <Heading textAlign="left" size="xl" ml="8%">Offered</Heading>
                    <Stack isInline spacing="auto" ml="10px" mr="40px" >
                        <Icon name="chevron-left" size="80px" mt="80px" ml="10px"/>
                        <Grid templateColumns="repeat(4, 1fr)" gap={6} ml="-120px" mr="8%" mt="1%">
                            <OfferCard />
                            <OfferCard />
                            <OfferCard />
                            <OfferCard />
                        </Grid>
                        <Icon name="chevron-right" size="80px" ml="90px" mt="80px" mr="20px"/>
                    </Stack>
                </Box>

                
                <Box h="50vh" w="85vw" borderRadius="lg" bg="#2D3748" >
                    <Heading textAlign="left" size="xl" ml="8%">Applicants</Heading>
                    <Stack isInline spacing="auto" ml="10px" mr="40px" >
                        <Icon name="chevron-left" size="80px" mt="80px" ml="10px"/>
                        <Grid templateColumns="repeat(4, 1fr)" gap={6} ml="-120px" mr="8%" mt="1%">
                            <ApplicantCard />
                            <ApplicantCard />
                            <ApplicantCard />
                            <ApplicantCard />
                        </Grid>
                        <Icon name="chevron-right" size="80px" ml="90px" mt="80px" mr="20px"/>
                    </Stack>
                 </Box>
                </SimpleGrid>
            </Box>
        )
    }
}

export default ProjectPositionsSection;
