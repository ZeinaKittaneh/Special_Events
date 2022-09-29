import React, {useState, useEffect} from "react";
import {Container, AppBar, Typography, Grow, Grid} from '@mui/material';
import memories from "./images/memories.jpg"
import memoryBackground from "./images/background.jpg"
import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import useStyles from "./styles"
import { useDispatch } from "react-redux"; // to dispatch actions
import {getPosts} from './actions/posts';

const App = () => {
    const [currentId, setCurrentId] = useState(null);
    const classes = useStyles();
    const dispatchAction = useDispatch();
    useEffect(()=>{
        dispatchAction(getPosts()); 
        // when we dispatch the action, we go to the posts reducers to handle the logic of fetching All posts 
    }, [currentId, dispatchAction]);

    return(
        <Container maxWidth="lg">
            <AppBar className={classes.appBar} position="static" color="inherit" style={{ 
                    backgroundImage: `url(${memoryBackground})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',}}>
                <Typography className={classes.heading} variant="h3" align="center" >
                    Memories
                </Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container className={classes.mainContainer} justify="space-between" alignItems="stretch" spacing = "3">
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentID={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentID={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App;