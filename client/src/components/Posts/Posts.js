import React from "react";
import Post from "./Post/Post";
// import useStyles from "./styles"
import {Grid} from '@mui/material';
//to fetch the data from redux store we use Selector:
import {useSelector} from 'react-redux';
import { CircularProgress } from '@mui/material';

const Posts=({setCurrentID}) => {
    const posts = useSelector((state) => state.posts);
    console.log(posts);
    // const classes = useStyles();

    return (
        !posts.length ? <CircularProgress/> : 
        (<Grid className="classes.container" container alignItems="stretch" spacing={3}>
            {
                posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6}>
                        <Post post={post} setCurrentId= {setCurrentID}/>
                    </Grid>
                ))
            }
        </Grid>)      
    );
}

export default Posts;