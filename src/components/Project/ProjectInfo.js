import React, { useState, useEffect } from 'react';
import { Box, Grid, Heading, Text, Divider, Avatar, Button, Stack, Icon, useDisclosure } from "@chakra-ui/core";
import { Fade, ScaleFade, Slide, SlideFade } from "@chakra-ui/react";


function ProjectInfoSection() {
    let projectList = [
        {
          id: 1,
          name: "Bilal Rizwan",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
          imageURL: "https://bit.ly/broken-link",
          date: "5/5/2021"
        }
      ];
    
    const [projects, setProjects] = useState([]);
    const { isOpen, onToggle } = useDisclosure();

    useEffect(() => {
        setProjects(projectList);
      },[]);
      console.log(projects);
        return (
            <Box zIndex={-1} position= "absolute" bg="#171923" h="100vh" color="white" w="100%">
                {projects.map((project, id) => {
                    return(
                <Fade in={!isOpen}>
                    <Box h="80vh" w="80%" ml="8%" mt="6%" borderRadius="lg" bg="#2D3748" alignContent="center" key={id} >
                    <Stack isInline spacing="auto" ml="8%" mr="40px">
                        <Heading textAlign="left" size="2xl" mt="10px">Project Title</Heading>
                        <Icon name="edit" size="24px" mt="20px"/>
                    </Stack>
                        <Text ml="8%" pt="2%" textAlign="left">
                            {project.description}
                        </Text>
                        <Divider pt="2%" ml="8%" mr="4%" borderColor="#1A202C" borderWidth="3px" />
                        <Heading textAlign="left" ml="8%" mt="1%" as="h6" size="s">
                            Created By
                        </Heading>
                        <Stack>
                        <Avatar src={project.imageURL} ml="8%" mt="1%" size="2xl" alignItems="left"/>
                        <Stack isInline spacing="auto" mr="30px">
                        <Heading textAlign="left" ml="8%" mt="1%" as="h3" size="lg">
                        {project.name}
                        </Heading>
                        <Button variantColor="red" size="md" onClick={onToggle}>
                            Close Project
                        </Button>
                        </Stack>
                        <Text fontSize="sm" ml="8%" mt="1px" textAlign="left">
                            Created on {project.date}
                        </Text>
                        </Stack>
                    </Box>
                    </Fade>
                );
                })
                }
            </Box>
        )
    }

export default ProjectInfoSection
