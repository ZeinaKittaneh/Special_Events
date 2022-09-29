import React, {useState, useEffect} from "react";
// import useStyles from "./styles"
import {TextField, Button, Typography, Paper} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/system';
import './styles.css'
// import theme from './styles';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { createPost, updatePost} from "../../actions/posts";


const Form=(currentIdReceived, setCurrentID) => {
    const [postData, setPostData] = useState({
        creator: '',
        title:'',
        message:'',
        tags:'',
        selectedFile:'',
    });
    
    const dispatchAction = useDispatch();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(currentIdReceived.currentId != null) //if post id was sent, it means it is an update
            {
                dispatchAction(updatePost(currentIdReceived.currentId, postData));
                console.log("updating memory for: ", currentIdReceived.currentId)
            }
        else
            {dispatchAction(createPost(postData));}//on click submit
        clearForm(e);
    }
    
    const post = useSelector((state) => currentIdReceived ? state.posts.find(
        (p) => p._id === currentIdReceived.currentId) : null  
    );
    
    useEffect(() => {
        if(post) {
            setPostData(post);
            console.log("changed!");
        }
    },[post])

    const clearForm = (e) => {
        e.preventDefault();

        currentIdReceived.setCurrentID(null);
        setPostData({
            creator: '',
            title:'',
            message:'',
            tags:'',
            selectedFile:'',
        });
    }
    // const classes = useStyles();
    
    return (
        <Paper className="paper">
            <form autoComplete="off" noValidate spacing={1} className="form">
                <Typography variant="h6" gutterBottom style={{fontWeight : 550}}>
                    {currentIdReceived.currentId ? 'Editing' : 'Creating'} a Memory
                </Typography>
                <TextField className="textField" name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}  onChange={((event) => setPostData({...postData, creator: event.target.value}))}/>  
                <TextField className="textField" name="title" variant="outlined" label="Title" fullWidth value={postData.title}  onChange={((event) => setPostData({...postData, title: event.target.value}))}/>  
                <TextField className="textField" name="message" variant="outlined" label="Message" fullWidth value={postData.message}  onChange={((event) => setPostData({...postData, message: event.target.value}))}/>  
                <TextField className="textField" name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}  onChange={((event) => setPostData({...postData, tags: event.target.value.split(",")}))}/>  
                <div className="fileInput">
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile:base64})}/>
                </div>
                <Button className="buttonSubmit" variant="contained" color="primary" size="large" onClick={handleSubmit} type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="error" size="small" type="submit" fullWidth onClick={clearForm}>Clear Form</Button>
            </form>
        </Paper>
    )
}

export default Form;