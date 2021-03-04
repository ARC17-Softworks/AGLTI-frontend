import React, { Component } from 'react';
import { Box, Grid, SimpleGrid, Stack, Heading, Icon, Text, Button, Tag, CloseButton, Badge, Avatar, AvatarBadge, Divider } from "@chakra-ui/core";
import PositionCard from './PositionCard';
import OfferCard from './OfferCard';

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
                        <PositionCard />
                        <PositionCard />
                        <PositionCard />
                        <PositionCard />
                    </Grid>
                    <Icon name="chevron-right" size="80px" ml="40px" mt="80px" mr="20px"/>
                </Stack>
                 </Box>


                <Box h="50vh" w="85vw" borderRadius="lg" bg="#2D3748" >
                    <Heading textAlign="left" size="xl" ml="8%">Offered</Heading>
                    <Stack isInline spacing="auto" ml="10px" mr="40px" >
                        <Icon name="chevron-left" size="80px" mt="80px" ml="10px"/>
                        <Grid templateColumns="repeat(4, 1fr)" gap={6} ml="-120px" mr="8%" mt="1%">
                            <OfferCard />
                            <OfferCard />
                            <OfferCard />
                            <OfferCard />
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
