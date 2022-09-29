import { combineReducers } from "redux";
import posts from './posts';

export default combineReducers({
    posts : posts, //will be used inside posts components in client
});

//we can keep posts only, b.c key and value are the same