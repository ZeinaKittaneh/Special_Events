import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended : true}));
app.use(cors())
//register routes in Express app
app.use('/posts', postRoutes); // add all "posts" routes 
app.use('/user', userRoutes); // add all "user" routes {login, signup} 

// app.get('/', (req, res) => {
//     res.send('Welcome to My memories app!');
// });//to be shown on the first request of our website

const PORT = process.env.PORT || 5000; //the port will be filled by Heroku
//connect to mongoDB
mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
.catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);//no warnings on console