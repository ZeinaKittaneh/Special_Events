//All memories Grid:
import React from "react";
// import useStyles from "./styles"
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MorehorizIcon from '@mui/icons-material/MoreHoriz';

import './styles.css';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post=({post, setCurrentId}) => {
    const dispatchAction = useDispatch();
    // const classes = useStyles();
    return (
        <Card className="Card">
            <CardMedia className={"Media"} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title = {post.title}/>
            <div className="Overlay">
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={"Overlay2"}>
                <Button style={{color: 'white'}} size="small" onClick={()=>{console.log("id selected:", post._id); setCurrentId(post._id)}}>
                    <MorehorizIcon fontSize="default"/>
                </Button>
            </div>
            <div className="Details">
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>
            <CardContent>
                <Typography className={"Title"} variant="h6" gutterBottom>
                    {post.title}
                </Typography>
                <Typography className={"Title"} variant="body2" color="textSecondary" component="p">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={'CardActions'}>
                <Button size="small" color="primary" onClick={()=>dispatchAction(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small"/>
                    Like &nbsp; {post.likeCount} &nbsp;
                </Button>
                <Button size="small" color="primary" onClick={()=>dispatchAction(deletePost(post._id))}>
                    <DeleteIcon fontSize="small"/>
                    Delete 
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post;