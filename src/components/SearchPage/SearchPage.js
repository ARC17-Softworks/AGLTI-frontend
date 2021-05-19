import React, { Component } from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Box,
    Stack,
    Avatar,
    Heading,
    Wrap,
    WrapItem,
  } from "@chakra-ui/react";
import SearchBox from '../search-box/search-box.component';

function SearchPage() {
    return (
        <div>
            <Box zIndex={-1} position= "absolute" bg="#171923" h="100vh" color="white" w="100%">
                <SearchBox />
            <Table variant="simple" w="80%"  ml="8%" mt="6%">
                <Thead>
                    <Tr color="black">
                        <Th>Developer</Th>
                        <Th>Skills</Th>
                        <Th isNumeric>Rating</Th>
                    </Tr>
                </Thead>
                <Tbody bg="#2D3748">
                    <Tr>
                        <Td>
                            <Wrap >
                                <WrapItem>
                                    <Avatar h="50px" w="50px" size="sm" name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
                                </WrapItem>
                                <WrapItem>
                                    <Heading as="h2" size="xl" mt="10px">Bilal</Heading>
                                </WrapItem>
                            </Wrap>
                        </Td>
                        <Td>Html, CSS, Javascript</Td>
                        <Td isNumeric>2.5</Td>
                    </Tr>
                </Tbody>
            </Table>  
            </Box>
        </div>
    )
}

export default SearchPage
