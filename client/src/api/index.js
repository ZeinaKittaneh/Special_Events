import axios from 'axios';

const url = 'http://localhost:5000/posts';//get all posts requests in the database
const userUrl = 'http://localhost:5000/user';//get all users requests in the database

export const fetchPosts = (user) => axios.get(url, { headers: { Authorization: `Bearer ${user.token}` } });

export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id, updatedMemory) => axios.patch(`${url}/${id}`, updatedMemory);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);


export const loginUser = (user) => axios.post(userUrl, {"body":user}, {
    headers: {
    'Content-Type': 'application/json'
    }
  }
)