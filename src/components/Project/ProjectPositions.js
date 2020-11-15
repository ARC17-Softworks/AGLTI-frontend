import React, { Component } from 'react';
import { Box, Grid, SimpleGrid, Stack, Heading, Icon, Text, Button } from "@chakra-ui/core";

class ProjectPositionsSection extends Component {
    render() {
        return (
            <Box zIndex={-1} bg="#171923" h="100vh" color="white" >
                <SimpleGrid columns={1} spacing={4} ml="8%">
                 <Box h="50vh" w="85vw" mt="6%" borderRadius="lg" bg="#2D3748" >
                    <Stack isInline spacing="auto" ml="8%" mr="40px">
                        <Heading textAlign="left" size="xl">Positions</Heading>
                            <Stack isInline spacing="auto" ml="8%" mr="40px" mt="12px">
                                <Icon name="small-add" size="18px" />
                                <Heading textAlign="left" size="sm">Add Position</Heading>
                            </Stack>
                    </Stack>
                    <Grid templateColumns="repeat(4, 1fr)" gap={6} ml="8%" mr="8%">
                        
                        <Stack spacing={0}>
                            <Box w="100%" h="37vh" bg="#4A5568" roundedTop="lg">
                                <Heading textAlign="center" mt="1%" as="h6" size="s">
                                    Position Title
                                </Heading>
                                <Text ml="8%" mt="2%" fontSize="xs">
                                Lorem ipsum is placeholder text commonly used in the graphic, print, and
                                publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and
                                publishing industries for previewing layouts and visual mockups.
                                </Text>
                            <Grid templateColumns="repeat(3, 1fr)" gap={2} ml="10px" mr="10%" mt="10px">
                                <Box  h="7" bg="#718096" borderRadius="lg">
                                    <Text fontSize="md" textAlign="center" mt="-2%" >HTML</Text>
                                </Box>
                                <Box  h="7" bg="#718096" borderRadius="lg">
                                    <Text fontSize="md" textAlign="center" mt="-2%" >CSS</Text>
                                </Box>
                                <Box  h="7" bg="#718096" borderRadius="lg">
                                    <Text fontSize="lg" textAlign="center" mt="-2%" >Javascript</Text>
                                </Box>
                            </Grid>
                            </Box>
                            
                            <Button w="226px" h="5vh" bg="#718096" roundedTop="0" roundedBottom="lg" variant="solid">
                                Search Developers
                            </Button>
                        </Stack>
                        
                        <Box w="100%" h="20vh" bg="#4A5568" />
                        <Box w="100%" h="20vh" bg="#4A5568" />
                        <Box w="100%" h="20vh" bg="#4A5568" />
                    </Grid>
                 </Box>
                 <Box h="27vh" w="85vw" borderRadius="lg" bg="#2D3748" >
                     
                 </Box>
                 <Box h="27vh" w="85vw" borderRadius="lg" bg="#2D3748" >
                     
                 </Box>
                </SimpleGrid>
            </Box>
        )
    }
}

export default ProjectPositionsSection
