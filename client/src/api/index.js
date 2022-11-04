import axios from 'axios';

const url = 'http://localhost:5000/posts';//get all posts requests in the database
const userUrl = 'http://localhost:5000/user';//get all users requests in the database

export const fetchPosts = (user) => axios.get(url, { headers: { Authorization: `Bearer ${user.token}` } });

export const createPost = (newPost, user) => axios.post(url, newPost, { headers: { Authorization: `Bearer ${user.token}` } });

export const updatePost = (id, updatedMemory, user) => axios.patch(`${url}/${id}`, updatedMemory, { headers: { Authorization: `Bearer ${user.token}` } });

export const deletePost = (id, user) => axios.delete(`${url}/${id}`, { headers: { Authorization: `Bearer ${user.token}` } });

export const likePost = (id, user) => axios.patch(`${url}/${id}/likePost`,0 , { headers: { Authorization: `Bearer ${user.token}` } });

export const favPost = (id, user) => axios.patch(`${url}/${id}/favPost`,0 , { headers: { Authorization: `Bearer ${user.token}` } });

export const loginUser = (user) => axios.post(userUrl, {"body":user}, {
    headers: {
    'Content-Type': 'application/json'
    }
  }
)