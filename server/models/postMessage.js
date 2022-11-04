import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    favorite:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: new Date(),
    },
    userId:{
        type: String
    }
});

//convert schema into model
const PostMessage = mongoose.model('PostMessage', postSchema);

//export Mongoose model from post message file
export default PostMessage; 
