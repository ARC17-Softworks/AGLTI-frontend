import React, { Component } from 'react';
import { Box, Grid, SimpleGrid, Stack,  Heading, Icon, Text, Button, Tag, CloseButton, Badge, Avatar, AvatarBadge, Divider } from "@chakra-ui/core";

function PositionCard(props) {
    let skillArr = props.position.skills;
        return (
            <Stack direction="row" spacing={-5} mt="auto">
                        <Stack spacing={0}>
                            <Box w="120%" h="37vh" bg="#4A5568" roundedTop="lg">
                                <Heading textAlign="center" mt="1%" as="h6" size="s">
                                    {props.position.title}
                                </Heading>
                                <Text ml="8%" mt="2%" fontSize="xs">
                                {props.position.description}
                                </Text>
                                {skillArr.map((skill) => {
                                return(
                                    <Tag isInline size="xs" bg="#718096" ml="3px" mr="3px" borderRadius="lg" color="white">{skill}</Tag>
                                );
                            }
                            )}
                            </Box>
                            
                            <Button w="120%" h="5vh" bg="#718096" roundedTop="0" roundedBottom="lg" variant="solid">
                                Search Developers
                            </Button>
                        </Stack>
                        </Stack>
        )
}

export default PositionCard;
