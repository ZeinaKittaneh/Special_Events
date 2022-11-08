import React from "react";
import Post from "./Post/Post";
// import useStyles from "./styles"
import {Grid, Typography} from '@mui/material';
//to fetch the data from redux store we use Selector:
import {useSelector} from 'react-redux';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from "react";

const Posts=({setCurrentID}) => {
    const posts = useSelector((state) => state.posts);
    // console.log(posts);
    // const classes = useStyles();
    const [empty, setEmpty] = new useState(true)

    useEffect(() => {
        if(posts.length != 0) {
            setEmpty(false);
        }
        else
            setEmpty(true)
    },[posts.length, posts])
    
    return (
        <div>
            {empty && <Typography sx={{color: "white"}}>Start adding events using the button below</Typography>}
            {!posts ? <CircularProgress/> : 
            (<Grid className="classes.container" container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) => (
                        <Grid key={post._id} item xs={12} sm={6} md={4}>
                            <Post post={post} setCurrentId= {setCurrentID}/>
                        </Grid>
                    ))
                }
            </Grid>)}
        </div>
    );
}

export default Posts;