import React, { Component } from 'react';
import { Box, SimpleGrid, Stack, Icon, Heading, Grid, Avatar, Text, Divider, Tag, Button } from '@chakra-ui/core';

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
                            <Stack direction="column" ml="1px" mr="23%" spacing={4}>
                                <Avatar size="xl"  ml="23%"/>
                                <Box bg="#4A5568" w="25vh" h="20vh" color="white" mt="-40%" borderRadius="lg">
                                    <Stack>
                                        <Text mt="30%" textAlign="center">Bilal Zubairi</Text>
                                        <Heading textAlign="center" mt="auto" as="h6" size="s">
                                            Project Manager
                                        </Heading>
                                    </Stack>
                                </Box>
                            </Stack>

                            <Stack direction="column" ml="1px" mr="23%" spacing={4}>
                                <Avatar size="xl"  ml="23%"/>
                                <Box bg="#4A5568" w="25vh" h="20vh" color="white" mt="-40%" borderRadius="lg">
                                    <Stack>
                                        <Text mt="30%" textAlign="center">Bilal Rizwan</Text>
                                        <Heading textAlign="center" mt="auto" as="h6" size="s">
                                            Frontend Developer
                                        </Heading>
                                    </Stack>
                                </Box>
                            </Stack>

                            <Stack direction="column" ml="1px" mr="23%" spacing={4}>
                                <Avatar size="xl"  ml="23%"/>
                                <Box bg="#4A5568" w="25vh" h="20vh" color="white" mt="-40%" borderRadius="lg">
                                    <Stack>
                                        <Text mt="30%" textAlign="center">Bilal Rizwan</Text>
                                        <Heading textAlign="center" mt="auto" as="h6" size="s">
                                            Frontend Developer
                                        </Heading>
                                    </Stack>
                                </Box>
                            </Stack>

                            <Stack direction="column" ml="1px" mr="23%" spacing={4}>
                                <Avatar size="xl"  ml="23%"/>
                                <Box bg="#4A5568" w="25vh" h="20vh" color="white" mt="-40%" borderRadius="lg">
                                    <Stack>
                                        <Text mt="30%" textAlign="center">Bilal Rizwan</Text>
                                        <Heading textAlign="center" mt="auto" as="h6" size="s">
                                            Frontend Developer
                                        </Heading>
                                    </Stack>
                                </Box>
                            </Stack>
                        </Grid>

                        <Icon name="chevron-right" size="80px" mt="40px" ml="10px" mr="10px"/>
                     </Stack>
                 </Box>
                 <Box h="38vh" w="85vw" mt="30px" borderRadius="lg" bg="#2D3748" >
                 <Heading size="xl" textAlign="left" ml="102px" >Previous Members</Heading>
                     <Stack isInline>
                        <Icon name="chevron-left" size="80px" mt="40px" ml="10px"/>

                        <Grid templateColumns="repeat(4, 1fr)" gap={6} ml="1px" mr="8%" mt="1%">
                            <Stack direction="column" ml="1px" mr="23%" spacing={4}>
                                <Avatar size="xl"  ml="23%"/>
                                <Box bg="#4A5568" w="25vh" h="20vh" color="white" mt="-40%" borderRadius="lg">
                                    <Stack>
                                        <Text mt="30%" textAlign="center">Anas Zafar</Text>
                                        <Heading textAlign="center" mt="auto" as="h6" size="s">
                                            Frontend Developer
                                        </Heading>
                                    </Stack>
                                </Box>
                            </Stack>

                            <Stack direction="column" ml="1px" mr="23%" spacing={4}>
                                <Avatar size="xl"  ml="23%"/>
                                <Box bg="#4A5568" w="25vh" h="20vh" color="white" mt="-40%" borderRadius="lg">
                                    <Stack>
                                        <Text mt="30%" textAlign="center">Anas Zafar</Text>
                                        <Heading textAlign="center" mt="auto" as="h6" size="s">
                                            Frontend Developer
                                        </Heading>
                                    </Stack>
                                </Box>
                            </Stack>

                            <Stack direction="column" ml="1px" mr="23%" spacing={4}>
                                <Avatar size="xl"  ml="23%"/>
                                <Box bg="#4A5568" w="25vh" h="20vh" color="white" mt="-40%" borderRadius="lg">
                                    <Stack>
                                        <Text mt="30%" textAlign="center">Anas Zafar</Text>
                                        <Heading textAlign="center" mt="auto" as="h6" size="s">
                                            Frontend Developer
                                        </Heading>
                                    </Stack>
                                </Box>
                            </Stack>

                            <Stack direction="column" ml="1px" mr="23%" spacing={4}>
                                <Avatar size="xl"  ml="23%"/>
                                <Box bg="#4A5568" w="25vh" h="20vh" color="white" mt="-40%" borderRadius="lg">
                                    <Stack>
                                        <Text mt="30%" textAlign="center">Anas Zafar</Text>
                                        <Heading textAlign="center" mt="auto" as="h6" size="s">
                                            Frontend Developer
                                        </Heading>
                                    </Stack>
                                </Box>
                            </Stack>
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
