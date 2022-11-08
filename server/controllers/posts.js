//here we define all our requests to make the routes more organized
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js'

//finding smth in the post models might take time, 
//so we need to make it async and add the await keyword
export const getPosts = async(req, res) => {
    try {
        const userId = req.user._id
        const postMessages = await PostMessage.find({userId});
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(440).json({message: error.message});
    }
}

export const createPost = async (req, res) => {
    let post = req.body;
    const user_id = {userId: req.user._id}
    post = {...post, ...user_id};
    const newPost = new PostMessage(post);

    try {
        await newPost.save();//to create the post
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    // const {id: _id} = req.params; //here we renamed our id to _id
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags, createdAt } = req.body;
    //to check if the id is a valid mongoose id :
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with that id');

    const post = req.body;//sent from frontend

    const updatedPost = { creator, title, message, tags, selectedFile, createdAt, _id: id };
    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });
  
    res.json(updatedPost); //send the updated post    
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    //to check if the id is a valid mongoose id :
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);
  
    res.json("Post deleted successfully !"); //send the updated post    
}

export const likePost = async (req, res) => {
    const { id } = req.params;
    //to check if the id is a valid mongoose id :
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with that id');

    const oldPost = await PostMessage.findById(id); // we need to change the likecount, first get the old number and increment it
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: oldPost.likeCount + 1}, { new: true });// new true : to return the new object
  
    res.json(updatedPost); //send the updated post    
}

export const favPost = async (req, res) => {
    const { id } = req.params;
    //to check if the id is a valid mongoose id :
    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with that id');

    const oldPost = await PostMessage.findById(id); // we need to change the favorite state, first get the old state and flip it
    const updatedPost = await PostMessage.findByIdAndUpdate(id, {favorite: !oldPost.favorite}, { new: true });// new true : to return the new object
  
    res.json(updatedPost); //send the updated post    
}