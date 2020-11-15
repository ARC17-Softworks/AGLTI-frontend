import React, { Component } from 'react';
import { Box, Stack, Heading, Icon, Image, Menu, MenuButton, Button, MenuList, MenuItem } from "@chakra-ui/core";

class HeaderBar extends Component {
    render() {
        return (
            <Box zIndex={2} bg="#000000" position= "absolute" w="100%" h="8vh" color="#FFFFFF">
                <Stack isInline spacing="auto" >
                    <Heading ml="5%">AGLTI</Heading>
                    <Stack isInline align="center">
                        <Icon name="bell" size="28px" />
                        <Box border= "2px solid #FFFFFF" box-sizing="border-box" mr="40px">
                                <Menu bg="#000000">
                                    <MenuButton as={Button} rightIcon="chevron-down" bg="black">
                                        <Image
                                        rounded="full"
                                        size="30px"
                                        src="https://bit.ly/sage-adebayo"
                                        alt="Segun Adebayo"
                                        />
                                    </MenuButton>
                                    <MenuList bg="#000000">
                                        <MenuItem>My Profile</MenuItem>
                                        <MenuItem>Settings</MenuItem>
                                        <MenuItem>Logout</MenuItem>
                                    </MenuList>
                                </Menu>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        )
    }
}

export default HeaderBar
