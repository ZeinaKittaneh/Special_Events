import * as api from '../api';
import {FETCH_ALL, DELETE, CREATE, UPDATE} from '../constants/actionTypes';
//create actions:
//use async from redux thunk, b.c payload should be passed asyncronuosely
export const getPosts = () => async(dispatchAction) => {
    try { //is from the response of the api
        const {data} = await api.fetchPosts(); //axios.get(url); url: http://localhost:5000/posts
        dispatchAction({type: FETCH_ALL, payload: data}); 

    } catch (error) {
        console.log(error);
    }
    
}

export const createPost = (post) => async(dispatchAction) => {
    try {
        const {data} = await api.createPost(post); ////axios.post(url, newPost)
        console.log("data before dispatching actions!", post);
        dispatchAction({type: CREATE, payload:data})
    } catch (error) {
        console.log(error.message);      
    }
}

export const updatePost = (id, post) => async(dispatchAction) => {
    try {
        const {data} = await api.updatePost(id, post); //returns the updated memory
        console.log("updated post received : ", post);
        dispatchAction({type: UPDATE, payload:data});
    } catch (error) {
        console.log(error.message);      
    }
}

export const deletePost = (id) => async(dispatchAction) => {
    try {
        await api.deletePost(id); 
        console.log("post to be deleted : ", id);
        dispatchAction({type: DELETE, payload: id});
    } catch (error) {
        console.log(error);    //better without message  
    }
}

export const likePost = (id) => async(dispatchAction) => {
    try {
        const {data} = await api.likePost(id); //returns the updated memory
        dispatchAction({type: UPDATE, payload:data});
    } catch (error) {
        console.log(error);      
    }
}