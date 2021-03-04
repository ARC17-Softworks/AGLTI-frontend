import React, { Component } from 'react';
import { Box, Grid, Heading, Text, Divider, Avatar, Button, Stack, Icon, SimpleGrid } from "@chakra-ui/core";

class DiscussionCard extends Component {
    render() {
        return (
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
        )
    }
}

export default DiscussionCard
