import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const verifyAuth = async (req, res, next) => {
    //get headers from the request
    const {authorization} = req.headers

    //if no headers found
    if(!authorization){
        console.log("auth token required!")
        return res.status(401).json({error: 'Authorization token required!', headers: req.headers})
    }

    //get token from the headers: bearer part1.part2.part3
    const token = authorization.split(' ')[1]

    try{
        //verify if token is valid
        const {_id} = jwt.verify(token, process.env.SECRET)
        //get the user id from database
        req.user =  await User.findOne({_id}).select('_id')
        console.log("connection authorized successfully :)")
        next()

    }catch(error){
        console.log("Invalid token")
        res.status(401).json({error: 'Invalid token!'})
    }
}

export default verifyAuth