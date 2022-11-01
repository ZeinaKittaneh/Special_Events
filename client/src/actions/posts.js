import * as api from '../api';
import {FETCH_ALL, DELETE, CREATE, UPDATE} from '../constants/actionTypes';
import useAuthContext from '../hooks/useAuthContext';

//create actions:
//use async from redux thunk, b.c payload should be passed asyncronuosely
/**
 * 
 * function handleChange(field) {
  return function(e) {
    e.preventDefault()
    // Do something here
  }
}
 */
export function getPosts(user){
    return async function(dispatchAction){
        try { //is from the response of the api
            const {data} = await api.fetchPosts(user); //axios.get(url); url: http://localhost:5000/posts
            dispatchAction({type: FETCH_ALL, payload: data});
        } catch (error) {
            console.log(error);
        }
    }
};

export const createPost = (post, user) => async(dispatchAction) => {
    try {
        const {data} = await api.createPost(post, user); ////axios.post(url, newPost)
        console.log("data before dispatching actions!", post);
        dispatchAction({type: CREATE, payload:data})
    } catch (error) {
        console.log(error.message);      
    }
}

export const updatePost = (id, post, user) => async(dispatchAction) => {
    try {
        const {data} = await api.updatePost(id, post, user); //returns the updated memory
        console.log("updated post received : ", post);
        dispatchAction({type: UPDATE, payload:data});
    } catch (error) {
        console.log(error.message);      
    }
}

export const deletePost = (id, user) => async(dispatchAction) => {
    try {
        await api.deletePost(id, user); 
        console.log("post to be deleted : ", id);
        dispatchAction({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);    //better without message  
    }
}

export const likePost = (id, user) => async(dispatchAction) => {
    try {
        console.log("user in like : ", user)
        const {data} = await api.likePost(id, user); //returns the updated memory
        console.log("likes data = ", data)
        dispatchAction({type: UPDATE, payload:data});
    } catch (error) {
        console.log(error);      
    }
}
