import React, { Component } from 'react';
import { Box, Grid, SimpleGrid, Stack, Heading, Icon, Text, Button, Tag, CloseButton, Badge, Avatar, AvatarBadge, Divider } from "@chakra-ui/core";

function ApplicantCard(props) {
    let skillArr = props.applicant.skills;
        return (
            <Stack direction="column" ml="8%" mr="23%" spacing={0}>
            <Avatar size="xl" mt="6px" ml="45px"/>
            <Box bg="#4A5568" w="180px" h="25vh" color="white" mt="-30%" roundedTop="lg">
                <Stack spacing={-5} mt="auto" spacing={0}>
                    <Text mt="50px" textAlign="center">{props.applicant.name}</Text>
                    <Divider mt="3px" w="150px" ml="10%"/>
                    <Heading textAlign="center" mt="5px" as="h6" size="s">
                        {props.applicant.title}
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
                        <Stack isInline spacing={0} >
                                    <Button w="100px" h="5vh" bg="#48BB78" roundedTop="0" roundedBottomLeft="lg" variant="solid">
                                        Accept
                                    </Button>
                                    <Button w="100px" h="5vh" bg="#E53E3E" roundedTop="0" roundedBottomRight="lg" variant="solid">
                                        Reject
                                    </Button>
                                </Stack>
                    </Stack>
        )
}

export default ApplicantCard;
