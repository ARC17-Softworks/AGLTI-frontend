import React, { Component } from 'react';
import { Box, Grid, SimpleGrid, Stack, Heading, Icon, Text, Button, Tag, CloseButton, Badge, Avatar, AvatarBadge, Divider } from "@chakra-ui/core";

function OfferCard(props) {
    let skillArr = props.offer.skills;
        return (
            <Stack direction="column" ml="8%" mr="23%" spacing={0}>
                        <Avatar size="xl" mt="6px" ml="45px"/>
                        <Box bg="#4A5568" w="180px" h="25vh" color="white" mt="-30%" roundedTop="lg">
                            <Stack spacing={-5} mt="auto" spacing={0}>
                                <Text mt="50px" textAlign="center">{props.offer.name}</Text>
                                <Divider mt="3px" w="150px" ml="10%"/>
                                <Heading textAlign="center" mt="5px" as="h6" size="s">
                                    {props.offer.title}
                                </Heading>
                                <Stack direction="row" spacing={2} ml="3px" mr="3px" mt="2%" >
                                {skillArr.map((skill) => {
                                return(
                                    
                                    <Tag size="xs" bg="#718096" borderRadius="lg" color="white" display="row">{skill}</Tag>
                                    
                                
                                );
                                }
                                )}
                                </Stack>
                            </Stack>
                        </Box>
                        <Button w="180px" h="5vh" bg="#E53E3E" align="end" roundedTop="0" roundedBottom="lg" variant="solid">
                                    cancel offer
                            </Button>
                    </Stack>
        )
}

export default OfferCard;
