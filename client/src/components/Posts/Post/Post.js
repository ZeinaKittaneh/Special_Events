//All memories Grid:
import React from "react";
// import useStyles from "./styles"
import { Card, CardActions, CardContent, CardMedia, Button, Typography, Modal, Tooltip } from "@mui/material";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MorehorizIcon from '@mui/icons-material/MoreHoriz';
import './styles.css';
import moment from 'moment';
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import Form from "../../Form/Form";
import useAuthContext from "../../../hooks/useAuthContext"; 

const Post=({post, setCurrentId}) => {
    const dispatchAction = useDispatch();
    // const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {setOpen(false); setCurrentId(null)}
    let closeImgStyle = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};
    const {user} = useAuthContext()
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
        <Card className="Card">
            <CardMedia className={"Media"} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title = {post.title}/>
            <div className="Overlay">
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            <div className={"Overlay2"}>
                <Tooltip title="Edit">
                    <Button style={{color: 'white'}} size="small" onClick={()=>{console.log("id selected:", post._id); setCurrentId(post._id); handleOpen()}}>
                        <MorehorizIcon fontSize="default"/>
                    </Button>
                </Tooltip>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"                           
                >   
                    <div>
                        <Form currentId={post._id} setCurrentID={setCurrentId}/>    
                    </div>                 
                </Modal>
            </div>
                <Typography className="Title tag" variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag} `)}{post.category}
                </Typography>
            <CardContent>
                <Typography className={"Title"} gutterBottom>
                    {post.title}
                </Typography>
                <Typography className={"Title"} variant="body2" color="textSecondary" component="p">
                    {post.message}
                </Typography>
            </CardContent>
            <CardActions className={'CardActions'}>
                <Button size="small" color="primary" onClick={()=>{
                    if(!user) {                        
                        return
                    }
                    dispatchAction(likePost(post._id, user))}}>
                    <ThumbUpAltIcon fontSize="small"/>
                    Like &nbsp; {post.likeCount} &nbsp;
                </Button>
                <Button size="small" color="primary" onClick={()=>{
                    if(!user) {                        
                        return
                    }
                    dispatchAction(deletePost(post._id, user))}}>
                    <DeleteIcon fontSize="small"/>
                    Delete 
                </Button>
            </CardActions>
        </Card>
    )
}

export default Post;