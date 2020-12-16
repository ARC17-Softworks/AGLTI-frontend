import React, { Component } from 'react';
import { Box, Grid, Heading, Text, Divider, Avatar, Button, Stack, Icon, SimpleGrid } from "@chakra-ui/core";


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
                            <Box background="#4A5568" height="80px" borderRadius="lg">
                                <Stack isInline spacing="auto" mr="40px">
                                    <Stack isInline ml="8%">
                                        <Avatar src="https://bit.ly/broken-link" size="lg" mt="8px"/>
                                        <Stack spacing="0" textAlign="left">
                                            <Heading as="h3" size="lg" mt="8px">Discussion Title</Heading>
                                            <Text mt="-4px">Anas Zafar</Text>
                                            <Text mt="-4px" fontSize="xs">Oct 5</Text>
                                        </Stack>
                                        <Icon name="edit" size="20px" mt="12px"/>
                                    </Stack>
                                    <Box bg="#718096" h="50px" w="50px" mt="15px" borderRadius="lg">
                                        <Heading as="h2" size="xl">13</Heading>
                                    </Box>
                                </Stack>
                            </Box>

                            <Box background="#4A5568" height="80px" borderRadius="lg">
                                <Stack isInline spacing="auto" mr="40px">
                                    <Stack isInline ml="8%">
                                        <Avatar src="https://bit.ly/broken-link" size="lg" mt="8px"/>
                                        <Stack spacing="0" textAlign="left">
                                            <Heading as="h3" size="lg" mt="8px">Discussion Title</Heading>
                                            <Text mt="-4px">Anas Zafar</Text>
                                            <Text mt="-4px" fontSize="xs">Oct 5</Text>
                                        </Stack>
                                    </Stack>
                                    <Box bg="#718096" h="50px" w="50px" mt="15px" borderRadius="lg">
                                        <Heading as="h2" size="xl">5</Heading>
                                    </Box>
                                </Stack>
                            </Box>

                            <Box background="#4A5568" height="80px" borderRadius="lg">
                                <Stack isInline spacing="auto" mr="40px">
                                    <Stack isInline ml="8%">
                                        <Avatar src="https://bit.ly/broken-link" size="lg" mt="8px"/>
                                        <Stack spacing="0" textAlign="left">
                                            <Heading as="h3" size="lg" mt="8px">Discussion Title</Heading>
                                            <Text mt="-4px">Anas Zafar</Text>
                                            <Text mt="-4px" fontSize="xs">Oct 5</Text>
                                        </Stack>
                                    </Stack>
                                    <Box bg="#718096" h="50px" w="50px" mt="15px" borderRadius="lg">
                                        <Heading as="h2" size="xl">5</Heading>
                                    </Box>
                                </Stack>
                            </Box>

                            <Box background="#4A5568" height="80px" borderRadius="lg">
                                <Stack isInline spacing="auto" mr="40px">
                                    <Stack isInline ml="8%">
                                        <Avatar src="https://bit.ly/broken-link" size="lg" mt="8px"/>
                                        <Stack spacing="0" textAlign="left">
                                            <Heading as="h3" size="lg" mt="8px">Discussion Title</Heading>
                                            <Text mt="-4px">Anas Zafar</Text>
                                            <Text mt="-4px" fontSize="xs">Oct 5</Text>
                                        </Stack>
                                    </Stack>
                                    <Box bg="#718096" h="50px" w="50px" mt="15px" borderRadius="lg">
                                        <Heading as="h2" size="xl">5</Heading>
                                    </Box>
                                </Stack>
                            </Box>

                            <Box background="#4A5568" height="80px" borderRadius="lg">
                                <Stack isInline spacing="auto" mr="40px">
                                    <Stack isInline ml="8%">
                                        <Avatar src="https://bit.ly/broken-link" size="lg" mt="8px"/>
                                        <Stack spacing="0" textAlign="left">
                                            <Heading as="h3" size="lg" mt="8px">Discussion Title</Heading>
                                            <Text mt="-4px">Anas Zafar</Text>
                                            <Text mt="-4px" fontSize="xs">Oct 5</Text>
                                        </Stack>
                                    </Stack>
                                    <Box bg="#718096" h="50px" w="50px" mt="15px" borderRadius="lg">
                                        <Heading as="h2" size="xl">5</Heading>
                                    </Box>
                                </Stack>
                            </Box>
                        </SimpleGrid>
                </Box>
            </Box>
            
        )
    }
}

export default DiscussionSection
