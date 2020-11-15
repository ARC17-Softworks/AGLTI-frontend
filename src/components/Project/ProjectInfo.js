import React, { Component } from 'react';
import { Box, Grid, Heading, Text, Divider, Avatar, Button, Stack, Icon } from "@chakra-ui/core";

class ProjectInfoSection extends Component {
    render() {
        return (
            <Box zIndex={-1} position= "absolute" bg="#171923" h="100vh" color="white" >
                <Grid templateColumns="repeat(1, 2fr)">
                    <Box h="80vh" w="80%" ml="8%" mt="6%" borderRadius="lg" bg="#2D3748" >
                    <Stack isInline spacing="auto" ml="8%" mr="40px">
                        <Heading textAlign="left" size="2xl" mt="10px">Project Title</Heading>
                        <Icon name="edit" size="24px" mt="20px"/>
                    </Stack>
                        <Text ml="8%" pt="2%">
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and
                            publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and
                            publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and
                            publishing industries for previewing layouts and visual mockups..Lorem ipsum is placeholder text commonly used in the graphic, print, and
                            publishing industries for previewing layouts and visual mockups.Lorem ipsum is placeholder text commonly used in the graphic, print, and
                            publishing industries for previewing layouts and visual mockups.
                        </Text>
                        <Divider pt="2%" ml="8%" mr="4%" borderColor="#1A202C" borderWidth="3px" />
                        <Heading textAlign="left" ml="8%" mt="1%" as="h6" size="s">
                            Created By
                        </Heading>
                        <Avatar src="https://bit.ly/broken-link" ml="8%" mt="1%" size="2xl"/>
                        <Stack isInline spacing="auto" mr="30px">
                        <Heading textAlign="left" ml="8%" mt="1%" as="h3" size="lg">
                            Bilal Zubairi
                        </Heading>
                        <Button variantColor="red" size="md" >
                            Close Project
                        </Button>
                        </Stack>
                        <Text fontSize="sm" ml="8%" mt="1px">
                            Created on 24/10/20
                        </Text>
                    </Box>
                </Grid>
            </Box>
        )
    }
}

export default ProjectInfoSection
