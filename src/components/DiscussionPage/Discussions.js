import React, { useState, useEffect } from 'react';
import { Box, Grid, Heading, Text, Divider, Avatar, Button, Stack, Icon, SimpleGrid } from "@chakra-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DiscussionCard from './DiscussionCard';
import { Domain } from '@material-ui/icons';
import { set } from 'lodash';

function DiscussionSection() {
    const [discussionList,setDiscussion] = useState([
        {
          id: 1,
          user: "Bilal Rizwan",
          title: "Tile of Discussion",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
          imageURL: "https://bit.ly/broken-link",
          date: "5/5/2021"
        },
        {
            id: 2,
            user: "Anas",
            title: "Tile of Discussion",
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam posuere dui vel urna egestas rutrum. ",
            imageURL: "https://bit.ly/broken-link",
            date: "8/5/2021"
          }
      ]);

    const [open, setOpen] = React.useState(false);
    // const [details, setDetails] = useState([]);
    // const [title, setTitle] = useState();
    // const [description, setDescription] = useState();
    // const [state, setState] = React.useState({
    //     title: "",
    //     description: ""
    //   })

    // useEffect(() => {
    //     setDetails(discussionList);
    //   },[]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const handleAdd = () => {
    let obj1 = {user: document.getElementById("user").value,
                title: document.getElementById("title").value,
                description: document.getElementById("description").value,
                date: document.getElementById("date").value}
    let obj2 = discussionList;
    obj2.push(obj1)
    setDiscussion(obj2);
    handleClose();
}

return (
    <Box zIndex={-1} position= "absolute" bg="#171923" h="100vh" w="100%" color="white" >
        <Box bg="#2D3748" h="85vh" w="70%" ml="8%" mt="5%" borderRadius="lg" color="white" >
            <Stack isInline spacing="auto" ml="8%" mr="40px">
                <Heading textAlign="left" size="2xl" mt="10px">Discussions</Heading>
                <Button ml="8%" mr="40px" mt="35px" color="black" onClick={handleClickOpen}>
                <Stack isInline spacing="auto"  >
                    <Icon name="small-add" size="18px" />
                    <Heading textAlign="left" size="sm">New Discussion</Heading>
                    {/* {showForm && renderForm()} */}
                </Stack>
                </Button>
            </Stack>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Discussion</DialogTitle>
                <DialogContent>
                <TextField
                        autoFocus
                        margin="dense"
                        id="user"
                        label="User Name"
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
                        id="title"
                        label="Discussion Title"
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
                        label="Description"
                        type="text"
                        fullWidth
                        // value={}
                        // onChange={(e)=>handleChange(e)}
                        // onChange={this.handleChange}
                        // onChange={(e)=>setDescription(e.target.value)}
                        //   onChange={handleChange}    
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="date"
                        label="Date"
                        type="text"
                        fullWidth
                        // value={}
                        // onChange={(e)=>handleChange(e)}
                        // onChange={handleChange}
                        // onChange={(e)=>setTitle(e.target.value)}
                        // onChange={handleChange}    
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
            {discussionList.map((detail, id) => {
                return(
                    <SimpleGrid columns="1" spacing="4" ml="8%" mr="30px" mt="15px">
                        <DiscussionCard key={id} detail={detail}/>
                    </SimpleGrid>
                    );
                }
                )}
        </Box>
    </Box>
    )
}

export default DiscussionSection;
