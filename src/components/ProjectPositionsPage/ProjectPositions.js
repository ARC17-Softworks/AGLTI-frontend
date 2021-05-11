import React, { useState } from 'react';
import { Box, Grid, SimpleGrid, Stack, Heading, Icon, Text, Button, Tag, CloseButton, Badge, Avatar, AvatarBadge, Divider } from "@chakra-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PositionCard from './PositionCard';
import OfferCard from './OfferCard';
import ApplicantCard from './ApplicantCard';

function ProjectPositionsSection() {

    const skills = [0];
    const [positions,setPositions] = useState([
        {
          id: 1,
          title: "Title of Position",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
          skills : ["Javascript", "Reactjs", "CSS"]
        },
        {
            id: 2,
            title: "Title of Discussion",
            description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
            skills : ["Javascript", "Reactjs", "CSS"]
        },
        {
            id: 3,
            title: "Title of Discussion",
            description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
            skills : ["Javascript", "Reactjs", "CSS"]
        }
      ]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        let obj1 = {title: document.getElementById("title").value,
                    description: document.getElementById("description").value,
                    skills: document.getElementById("skills").value.split(',')}
        let obj2 = positions;
        obj2.push(obj1)
        setPositions(obj2);
        handleClose();
    }

    return (
        <Box zIndex={-1} bg="#171923" h="100%" color="white" >
            <SimpleGrid columns={1} spacing={4} ml="8%">
            <Box h="50vh" w="85vw" mt="6%" borderRadius="lg" bg="#2D3748" >
                <Stack isInline spacing="auto" ml="102px" mr="40px">
                    <Heading textAlign="left" size="xl">Positions</Heading>
                        <Button ml="8%" mr="40px" mt="1px" color="black" onClick={handleClickOpen}>
                            <Stack isInline spacing="auto">
                                <Icon name="small-add" size="18px" />
                                <Heading textAlign="left" size="sm">Add Position</Heading>
                            </Stack>
                        </Button>
                </Stack>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Position</DialogTitle>
                <DialogContent>
                <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Position Title"
                        type="text"
                        fullWidth
                        // value={}
                        // onChange={(e)=>handleChange(e)}
                        // onChange={handleChange}
                        // onChange={(e)=>setTitle(e.target.value)}
                        // onChange={handleChange}    
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        label="Position Description"
                        type="text"
                        fullWidth
                        // value={}
                        // onChange={(e)=>handleChange(e)}
                        // onChange={handleChange}
                        // onChange={(e)=>setTitle(e.target.value)}
                        // onChange={handleChange}    
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="skills"
                        label="Skills"
                        type="text"
                        fullWidth
                        // value={}
                        // onChange={(e)=>handleChange(e)}
                        // onChange={this.handleChange}
                        // onChange={(e)=>setDescription(e.target.value)}
                        //   onChange={handleChange}    
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary" type="submit">
                    Add
                    </Button>
                </DialogActions>
            </Dialog>
                <Stack isInline spacing="auto" ml="10px" mr="40px" >
                    <Icon name="chevron-left" size="80px" mt="80px" ml="10px"/>
                    {positions.map((position, id) => {
                        return(
                            <Grid templateColumns="repeat(4, 1fr)" gap={4} ml="6px">
                                <PositionCard key={id} position={position}/>
                            </Grid>
                        );
                    }
                    )}
                    <Icon name="chevron-right" size="80px" ml="40px" mt="80px" mr="20px"/>
                </Stack>
            </Box>


            <Box h="50vh" w="85vw" borderRadius="lg" bg="#2D3748" >
                <Heading textAlign="left" size="xl" ml="8%">Offered</Heading>
                <Stack isInline spacing="auto" ml="10px" mr="40px" >
                    <Icon name="chevron-left" size="80px" mt="80px" ml="10px"/>
                    <Grid templateColumns="repeat(4, 1fr)" gap={4} ml="-120px" mr="8%" mt="1%">
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
                        <ApplicantCard />
                        <ApplicantCard />
                        <ApplicantCard />
                        <ApplicantCard />
                    </Grid>
                    <Icon name="chevron-right" size="80px" ml="90px" mt="80px" mr="20px"/>
                </Stack>
            </Box>
            </SimpleGrid>
        </Box>
        )
}

export default ProjectPositionsSection;
