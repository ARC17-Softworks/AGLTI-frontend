import React, { Component } from 'react';
import { Box, Grid, SimpleGrid, Stack, Heading, Icon, Text, Button, Tag, CloseButton, Badge, Avatar, AvatarBadge, Divider } from "@chakra-ui/core";

class PositionCard extends Component {
    render() {
        return (
            <Stack direction="row" spacing={-5} mt="auto">
                        <Stack spacing={0}>
                            <Box w="120%" h="37vh" bg="#4A5568" roundedTop="lg">
                                <Heading textAlign="center" mt="1%" as="h6" size="s">
                                    Position Title
                                </Heading>
                                <Text ml="8%" mt="2%" fontSize="xs">
                                Lorem ipsum is placeholder text commonly used in the graphic, print, and
                                publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and
                                publishing industries for previewing layouts and visual mockups.
                                </Text>
                                <Stack isInline spacing={2} ml="10px" mr="10%"  >
                                    <Tag size="xs" bg="#718096" borderRadius="lg" color="white">HTML</Tag>
                                    <Tag size="xs" bg="#718096" borderRadius="lg" color="white">CSS</Tag>
                                    <Tag size="xs" bg="#718096" borderRadius="lg" color="white">Javascript</Tag>
                                </Stack>
                            </Box>
                            
                            <Button w="120%" h="5vh" bg="#718096" roundedTop="0" roundedBottom="lg" variant="solid">
                                Search Developers
                            </Button>
                        </Stack>
                        </Stack>
        )
    }
}

export default PositionCard;
