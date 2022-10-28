import axios from 'axios';

const url = 'https://happy-memories.herokuapp.com/posts';//get all posts requests in the database
const userUrl = 'https://happy-memories.herokuapp.com/user';//get all users requests in the database

export const fetchPosts = (user) => axios.get(url, { Authorization: `Bearer ${user.token}` });

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