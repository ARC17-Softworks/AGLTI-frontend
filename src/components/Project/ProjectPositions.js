import React, { Component } from 'react';
import { Box, Grid, SimpleGrid, Stack, Heading, Icon, Text, Button, Tag, CloseButton, Badge, Avatar, AvatarBadge, Divider } from "@chakra-ui/core";

class ProjectPositionsSection extends Component {
    render() {
        return (
            <Box zIndex={-1} bg="#171923" h="100%" color="white" >
                <SimpleGrid columns={1} spacing={4} ml="8%">
                 <Box h="50vh" w="85vw" mt="6%" borderRadius="lg" bg="#2D3748" >
                    <Stack isInline spacing="auto" ml="102px" mr="40px">
                        <Heading textAlign="left" size="xl">Positions</Heading>
                            <Stack isInline spacing="auto" ml="8%" mr="40px" mt="12px">
                                <Icon name="small-add" size="18px" />
                                <Heading textAlign="left" size="sm">Add Position</Heading>
                            </Stack>
                    </Stack>
                    <Stack isInline spacing="auto" ml="10px" mr="40px" >
                        <Icon name="chevron-left" size="80px" mt="80px" ml="10px"/>
                    <Grid templateColumns="repeat(4, 1fr)" gap={16} ml="6px">
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
                    </Grid>
                    <Icon name="chevron-right" size="80px" ml="40px" mt="80px" mr="20px"/>
                </Stack>
                 </Box>




                 <Box h="50vh" w="85vw" borderRadius="lg" bg="#2D3748" >
                 <Heading textAlign="left" size="xl" ml="8%">Offered</Heading>
                 <Stack isInline spacing="auto" ml="10px" mr="40px" >
                 <Icon name="chevron-left" size="80px" mt="80px" ml="10px"/>
                 <Grid templateColumns="repeat(4, 1fr)" gap={6} ml="-120px" mr="8%" mt="1%">
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
                </Grid>
                <Icon name="chevron-right" size="80px" ml="90px" mt="80px" mr="20px"/>
                </Stack>
                 </Box>

                

                 <Box h="50vh" w="85vw" borderRadius="lg" bg="#2D3748" >
                 <Heading textAlign="left" size="xl" ml="8%">Applicants</Heading>
                 <Stack isInline spacing="auto" ml="10px" mr="40px" >
                 <Icon name="chevron-left" size="80px" mt="80px" ml="10px"/>
                 <Grid templateColumns="repeat(4, 1fr)" gap={6} ml="-120px" mr="8%" mt="1%">
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
                                <Stack isInline spacing={0} >
                                    <Button w="50%" h="5vh" bg="#48BB78" roundedTop="0" roundedBottomLeft="lg" variant="solid">
                                        Accept
                                    </Button>
                                    <Button w="50%" h="5vh" bg="#E53E3E" roundedTop="0" roundedBottomRight="lg" variant="solid">
                                        Reject
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
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
                                <Stack isInline spacing={0} >
                                    <Button w="50%" h="5vh" bg="#48BB78" roundedTop="0" roundedBottomLeft="lg" variant="solid">
                                        Accept
                                    </Button>
                                    <Button w="50%" h="5vh" bg="#E53E3E" roundedTop="0" roundedBottomRight="lg" variant="solid">
                                        Reject
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
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
                                <Stack isInline spacing={0} >
                                    <Button w="50%" h="5vh" bg="#48BB78" roundedTop="0" roundedBottomLeft="lg" variant="solid">
                                        Accept
                                    </Button>
                                    <Button w="50%" h="5vh" bg="#E53E3E" roundedTop="0" roundedBottomRight="lg" variant="solid">
                                        Reject
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
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
                                <Stack isInline spacing={0} >
                                    <Button w="50%" h="5vh" bg="#48BB78" roundedTop="0" roundedBottomLeft="lg" variant="solid">
                                        Accept
                                    </Button>
                                    <Button w="50%" h="5vh" bg="#E53E3E" roundedTop="0" roundedBottomRight="lg" variant="solid">
                                        Reject
                                    </Button>
                                </Stack>
                            </Stack>
                        </Box>
                    </Stack>
                </Grid>
                <Icon name="chevron-right" size="80px" ml="90px" mt="80px" mr="20px"/>
                </Stack>
                 </Box>
                </SimpleGrid>
            </Box>
        )
    }
}

export default ProjectPositionsSection
