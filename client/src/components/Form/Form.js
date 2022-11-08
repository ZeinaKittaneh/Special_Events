import React, {useState, useEffect} from "react";
// import useStyles from "./styles"
import {TextField, Button, Typography, Paper, Alert} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/system';
import './styles.css'
// import theme from './styles';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import { createPost, updatePost} from "../../actions/posts";
import useAuthContext from "../../hooks/useAuthContext";
// currentIdReceived, setCurrentID, closeModal

const Form=(props) => {
    const [postData, setPostData] = useState({
        creator: '',
        title:'',
        message:'',
        tags:'',
        category: '',
        selectedFile:'',
        createdAt: ''
    });
    const [message, setMessage] = useState(null);
    const [messageSeverity, setMessageSeverity] = useState(null);
    
    const dispatchAction = useDispatch();
    let {user} = useAuthContext()
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!user){
            setMessage("Please login before creating a post!");   
            setMessageSeverity("error");
            return
        }
        if(user.data){
            user = user.data
        }
        if(props.currentId != null) //if post id was sent, it means it is an update
            {
                try{
                    if(postData.creator == "" || postData.title == ""){
                        setMessage("Title and Creator fields can't be empty!");   
                        setMessageSeverity("error");
                    }
                    else{
                        dispatchAction(updatePost(props.currentId, postData, user));
                        console.log("updating memory for: ", props.currentId);
                        setMessage("Memory successfully updated!");
                        setMessageSeverity("success");
                    }
                }
                catch(error){
                    setMessage("Error while updating memory!");
                    setMessageSeverity("error");
                }
            }
            else
            {
                try{
                    console.log("posted data", postData);
                    if(postData.creator == "" || postData.title == ""){
                        setMessage("Title and Creator fields can't be empty!"); 
                        setMessageSeverity("error");
                    }
                    else{
                        postData.createdAt = new Date();
                        dispatchAction(createPost(postData, user));
                        setMessage("Memory successfully added!");
                        setMessageSeverity("success");
                    }
                }
                catch(error){
                    setMessage("Error while adding memory!");
                    setMessageSeverity("error");
                }
            }//on click submit
        clearForm(e);
        console.log('props obj:', props);
    }
    
    const post = useSelector((state) => props.currentId ? state.posts.find(
        (p) => p._id === props.currentId) : null  
    );
    
    useEffect(() => {
        if(post) {
            setPostData(post);
            console.log("changed!");
        }
    },[post])

    const clearForm = (e) => {
        e.preventDefault();

        props.setCurrentID(null);
        setPostData({
            creator: '',
            title:'',
            message:'',
            tags:'',
            category:'',
            selectedFile:'',
            createdAt: ''
        });
    }
    // const classes = useStyles();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    return (
        <Paper className="paper" sx={style}>
            <form autoComplete="off" noValidate spacing={1} className="form">
                <Typography variant="h6" gutterBottom style={{fontWeight : 550}}>
                    {props.currentId ? 'Editing' : 'Creating'} a Memory
                </Typography>
                <TextField required className="textField" name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}  onChange={((event) => setPostData({...postData, creator: event.target.value}))}/>  
                <TextField required className="textField" name="title" variant="outlined" label="Title" fullWidth value={postData.title}  onChange={((event) => setPostData({...postData, title: event.target.value}))}/>  
                <TextField className="textField" name="message" variant="outlined" label="Message" fullWidth value={postData.message}  onChange={((event) => setPostData({...postData, message: event.target.value}))}/>  
                <TextField className="textField" name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}  onChange={((event) => setPostData({...postData, tags: event.target.value.split(",")}))}/>  
                <TextField className="textField" name="category" variant="outlined" label="Category" fullWidth value={postData.category}  onChange={((event) => setPostData({...postData, category: event.target.value}))}/>  
                <div className="fileInput">
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile:base64})}/>
                </div>
                <Button className="buttonSubmit" variant="contained" color="primary" size="large" onClick={handleSubmit} type="submit" fullWidth>Submit</Button>
                <Button sx={{marginBottom: "10px"}} variant="contained" color="error" size="small" type="submit" fullWidth onClick={clearForm}>Clear Form</Button>
                
                {message && <Alert severity={messageSeverity}>{message}</Alert>}
            </form>
        </Paper>
    )
}

export default Form;