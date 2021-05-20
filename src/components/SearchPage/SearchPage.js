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
    Text,
    Tag,
    Stack,
    Avatar,
    Heading,
    Wrap,
    WrapItem,
    Grid,
    GridItem,
    SimpleGrid,
  } from "@chakra-ui/react";
  import Checkbox from '@material-ui/core/Checkbox';
  import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import SearchBox from '../search-box/search-box.component';

function SearchPage() {
    return (
        <div>
            <Box zIndex={-1} position= "absolute" bg="#171923" h="100vh" color="white" w="100%">
            <Grid
  h="80vh"
  templateRows="repeat(2, 1fr)"
  templateColumns="repeat(5, 1fr)"
  gap={4}
  ml="6%"
  mt="6%"
>
  <GridItem rowSpan={2} colSpan={1} bg="#2D3748" ml="4%">
  <FormGroup column>
      <FormControlLabel
        control={<Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} name="checkedA"/>}
        label="HTML"
      />
      <FormControlLabel
        control={<Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} name="checkedA" />}
        label="CSS"
      />
      <FormControlLabel
        control={<Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} name="checkedA" />}
        label="Javascript"
      />
      <FormControlLabel
        control={<Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} name="checkedA" />}
        label="React js"
      />
      <FormControlLabel
        control={<Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} name="checkedA" />}
        label="React Native"
      />
      <FormControlLabel
        control={<Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} name="checkedA" />}
        label="Node js"
      />
      <FormControlLabel
        control={<Checkbox color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} name="checkedA" />}
        label="Python"
      />
    </FormGroup>
  </GridItem>
  <GridItem colSpan={4} bg="#2D3748" mr="6%" h="80vh" overflow="auto">
  <SimpleGrid columns={1} spacingX="40px" spacingY="20px" ml="40px" mr="40px" mt="10px" mb="10px">
  <Box bg="#4A5568" height="110px" w="800px" alignItems="start">
      <Heading mt="10px">Title</Heading>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">HTML</Tag>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">CSS</Tag>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">Reactjs</Tag>
      <Text isTruncated ml="5px" mr="5px">
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
        </Text>
  </Box>
  <Box bg="#4A5568" height="110px" w="800px" alignItems="start">
      <Heading mt="10px">Title</Heading>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">HTML</Tag>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">CSS</Tag>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">Reactjs</Tag>
      <Text isTruncated ml="5px" mr="5px">
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
        </Text>
  </Box>
  <Box bg="#4A5568" height="110px" w="800px" alignItems="start">
      <Heading mt="10px">Title</Heading>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">HTML</Tag>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">CSS</Tag>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">Reactjs</Tag>
      <Text isTruncated ml="5px" mr="5px">
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
        </Text>
  </Box>
  <Box bg="#4A5568" height="110px" w="800px" alignItems="start">
      <Heading mt="10px">Title</Heading>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">HTML</Tag>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">CSS</Tag>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">Reactjs</Tag>
      <Text isTruncated ml="5px" mr="5px">
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
        </Text>
  </Box>
  <Box bg="#4A5568" height="110px" w="800px" alignItems="start">
      <Heading mt="10px">Title</Heading>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">HTML</Tag>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">CSS</Tag>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">Reactjs</Tag>
      <Text isTruncated ml="5px" mr="5px">
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
        </Text>
  </Box>
  <Box bg="#4A5568" height="110px" w="800px" alignItems="start">
      <Heading mt="10px">Title</Heading>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">HTML</Tag>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">CSS</Tag>
      <Tag isInline size="xs" bg="#718096" ml="3px" mt="5px" mr="3px" borderRadius="lg" color="white">Reactjs</Tag>
      <Text isTruncated ml="5px" mr="5px">
        Lorem ipsum is placeholder text commonly used in the graphic, print, and
        publishing industries for previewing layouts and visual mockups.
        </Text>
  </Box>
</SimpleGrid>
  </GridItem>
</Grid>
                {/* <SearchBox />
            <Table variant="simple" w="80%"  ml="8%" mt="6%">
                <Thead>
                    <Tr color="black">
                        <Th></Th>
                        <Th>Developer</Th>
                        <Th>Skills</Th>
                        <Th isNumeric>Rating</Th>
                    </Tr>
                </Thead>
                <Tbody bg="#2D3748">
                    <Tr>
                        <Td><Checkbox
                                color="primary"
                                inputProps={{ 'aria-label': 'secondary checkbox' }}
                            />
                        </Td>
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
            </Table>   */}
            </Box>
        </div>
    )
}

export default SearchPage
