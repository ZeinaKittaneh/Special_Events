import express from 'express';
import {getPosts, createPost, updatePost, deletePost, likePost, favPost} from '../controllers/posts.js'
import verifyAuth from '../middleware/verifyAuth.js';

const router = express.Router()

//make router check the authorization of request before carry on to the posts routes
router.use(verifyAuth)

router.get('/', getPosts);// from controllers
router.post('/', createPost); // from controllers
router.patch('/:id', updatePost); //update a specific memory based on the id
router.delete('/:id', deletePost); //delete a specific memory based on the id
router.patch('/:id/likePost', likePost); //like a specific memory based on the id
router.patch('/:id/favPost', favPost); //make a specific memory a favorite based on the id

export default router;