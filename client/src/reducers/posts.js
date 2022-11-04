import {FETCH_ALL, DELETE, CREATE, UPDATE, RESET} from '../constants/actionTypes';
export default (posts = [], action) => {
    // console.log("payload received in actions: ", action.payload);
    switch (action.type){
        case FETCH_ALL:
            return action.payload;//our actual posts
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
            //map through the post if we find the id we want to make the update for, we return the new payload from action, otherwise we keep the post as it is
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case DELETE:
            //map through the post if we find the id we want to make the update for, we return the new payload from action, otherwise we keep the post as it is
            return posts.filter((post) => post._id !== action.payload);
        case RESET:
            return [];
        default:
            return posts;
    }
}


