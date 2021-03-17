import React, { Component } from 'react';
import { Box, Grid, SimpleGrid, Stack, Heading, Icon, Text, Button, Tag, CloseButton, Badge, Avatar, AvatarBadge, Divider } from "@chakra-ui/core";

class OfferCard extends Component {
    render() {
        return (
            <Stack direction="column" ml="8%" mr="23%" spacing={4}>
                        <Avatar size="xl" mt="3%" ml="30%"/>
                        <Box bg="#4A5568" w="120%" h="28vh" color="white" mt="-40%" borderRadius="lg">
                            <Stack>
                                <Text mt="25%" textAlign="center">Bilal Rizwan</Text>
                                <Divider mt="1%" w="80%" ml="10%"/>
                                <Heading textAlign="center" mt="auto" as="h6" size="s">
                                    Position Title
                                </Heading>
                                <Stack isInline spacing={2} ml="10px" mr="10%" mt="2%" >
                                    <Tag size="xs" bg="#718096" borderRadius="lg" color="white">HTML</Tag>
                                    <Tag size="xs" bg="#718096" borderRadius="lg" color="white">CSS</Tag>
                                    <Tag size="xs" bg="#718096" borderRadius="lg" color="white">Javascript</Tag>
                                </Stack>
                                <Button w="100%" h="5vh" bg="#E53E3E" align="end" roundedTop="0" roundedBottom="lg" variant="solid">
                                    cancel offer
                                </Button>
                            </Stack>
                        </Box>
                    </Stack>
        )
    }
}

export default OfferCard;
