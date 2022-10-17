import express from 'express';
import {getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js'
const router = express.Router();

router.get('/', getPosts);// from controllers
router.post('/', createPost); // from controllers
router.patch('/:id', updatePost); //update a specific memory based on the id
router.delete('/:id', deletePost); //delete a specific memory based on the id
router.patch('/:id/likePost', likePost); //like a specific memory based on the id

export default router;