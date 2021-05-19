import React, { useState } from 'react';
import { Box, Heading, Text, Divider, Avatar, Button, Stack, Icon, SimpleGrid } from "@chakra-ui/core";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import DialogTitle from '@material-ui/core/DialogTitle';

export const DiscussionCard = (props) => {

    const [discussionList,setDiscussion] = useState([
        {
          id: "",
          user: "",
          title: "",
          description: "",
          imageURL: "",
          date: ""
        }
    ])

    const [openEdit, setEdit] = React.useState(false);
    const [change,setChange] = useState(false);

    const editData = (e)=>{
        setChange(true);
        e.preventDefault();
        // let obj1 = {user: document.getElementById("user").value,
        //             title: document.getElementById("title").value,
        //             description: document.getElementById("description").value,
        //             date: document.getElementById("date").value}
        // discussionList = obj1;
        props.detail.user = discussionList.user;
        props.detail.title = discussionList.title;
        props.detail.description = discussionList.description;
        props.detail.date = discussionList.date;
        // setDiscussion(e);
        handleClose1()
    }

    

    // const handleAdd = () => {
    //     let obj1 = {user: document.getElementById("user").value,
    //                 title: document.getElementById("title").value,
    //                 description: document.getElementById("description").value,
    //                 date: document.getElementById("date").value}
    //     let obj2 = discussionList;
    //     obj2.push(obj1)
    //     setDiscussion(obj2);
    //     handleClose();
    // }

    const handleClickOpen = () => {
        setEdit(true);
      };
      
    const handleClose1 = () => {
        setEdit(false);
    };

        return (
            <Box background="#4A5568" height="80px" borderRadius="lg">
                <Stack isInline spacing="auto" mr="40px">
                    <Stack isInline ml="8%">
                        <Avatar src="https://bit.ly/broken-link" size="lg" mt="8px"/>
                        <Stack spacing="0" textAlign="left">
                            <Heading as="h3" size="lg" mt="8px">{props.detail.title}</Heading>
                            <Text mt="-4px">{props.detail.user}</Text>
                            <Text mt="-4px" fontSize="xs">{props.detail.date}</Text>
                        </Stack>
                        <Icon name="edit" size="20px" mt="12px" onClick={handleClickOpen}/>
                    </Stack>
                    <Box bg="#718096" h="50px" w="50px" mt="15px" borderRadius="lg">
                        <Heading as="h2" size="xl">13</Heading>
                    </Box>
                </Stack>

                <Dialog fullWidth open={openEdit} onClose={handleClose1} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Discussion</DialogTitle>
          <form onSubmit={(e)=>{editData(e)}}>
          <DialogContent>
          <GridContainer>         
                        <GridItem  xs={12} sm={12} md={6}>
                        <div style={{padding:10}}>
                          <TextField
                            variant="outlined"
                            id="user"
                            label="User Name"
                            type="text"
                            fullWidth
                            defaultValue={props.detail.user}
                            onChange={(e)=>{let obj = discussionList;obj.user = e.target.value ;setDiscussion(obj)}}     
                          />
                          </div>
                      </GridItem>      
                        <GridItem  xs={12} sm={12} md={6}>
                        <div style={{padding:10}}>
                          <TextField
                            variant="outlined"
                            id="title"
                            label="Discussion Title"
                            type="text"
                            fullWidth
                            defaultValue={props.detail.title}
                            onChange={(e)=>{let obj1 = discussionList;obj1.title = e.target.value ;setDiscussion(obj1)}}        
                          />
                          </div>
                      </GridItem>  
                        <GridItem  xs={12} sm={12} md={6}>
                        <div style={{padding:10}}> 
                          <TextField
                            variant="outlined"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            defaultValue={props.detail.description}
                            onChange={(e)=>{let obj = discussionList;obj.description = e.target.value ;setDiscussion(obj)}}
                          />
                          </div>
                      </GridItem>  
                        <GridItem  xs={12} sm={12} md={6}>
                        <div style={{padding:10}}>
                          <TextField
                            variant="outlined"
                            id="date"
                            label="Date"
                            type="text"
                            fullWidth
                            defaultValue={props.detail.date}
                            onChange={(e)=>{let obj = discussionList;obj.date = e.target.value ;setDiscussion(obj)}}
                          /> 
                          </div>
                      </GridItem>         
            </GridContainer>            
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1} color="default">
              Cancel
            </Button>
            <Button type='submit' color="primary">
             UPDATE
            </Button>
          </DialogActions>
          </form>
        </Dialog>

            </Box>
        )
    }

export default DiscussionCard
