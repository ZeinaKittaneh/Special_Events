import React, {useState, useEffect} from "react";
import {Box, Container, Modal, Typography, Grow, Grid, Button, Tooltip} from '@mui/material';
// import memories from "./images/memories.jpg"
// import memoryBackground from "./images/background.jpg"
import Posts from "../components/Posts/Posts";
import Form from "../components/Form/Form";
import useStyles from "../styles"
import { useDispatch } from "react-redux"; // to dispatch actions
import GetPosts from '../actions/posts';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
// import { GoogleOAuthProvider } from '@react-oauth/google';

const style = {
    position: "fixed", right: "8vw", bottom: "20px",
    backgroundColor: "#fff", color: "#25467D", borderRadius: "40px", fontSize: "3rem", padding:"7px", 
    ':hover': {color: 'white'},
};

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatchAction = useDispatch();
    useEffect(()=>{
        dispatchAction(GetPosts()); 
        // when we dispatch the action, we go to the posts reducers to handle the logic of fetching All posts 
    }, [currentId, dispatchAction]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    // console.log("client id = ", process.env.REACT_APP_GOOGLE_API_TOKEN);
    return(
        // <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>

            <Container maxWidth="lg">
                {/* <AppBar className={classes.appBar} position="static" color="inherit" style={{ 
                        backgroundImage: `url(${memoryBackground})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',}}>
                    <Typography className={classes.heading} variant="h3" align="center" >
                        Memories
                    </Typography>
                </AppBar> */}
                <Grow in>
                    <Container sx={{position: "relative"}}>
                        <Grid container
                        style={{margin: 40}}>
                            <Grid item xs={10}>
                                <Posts setCurrentID={setCurrentId}/>
                            </Grid>
                            {/* <Grid item xs={12} sm={3.5}>
                                <Form currentId={currentId} setCurrentID={setCurrentId}/>
                            </Grid> */}
                        </Grid>
                        <Tooltip title="Add new event">
                            <Button onClick={handleOpen} sx={style}
                            variant="contained">
                                <FontAwesomeIcon icon={faPlus} />
                            </Button>
                        </Tooltip>
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"                           
                            >
                                <div>
                                    <Form currentId={currentId} setCurrentID={setCurrentId}/>    
                                </div>
                            </Modal>
                    </Container>
                </Grow>
            </Container>
        // </GoogleOAuthProvider>
    )
}

export default Home;