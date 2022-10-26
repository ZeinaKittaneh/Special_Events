import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const verifyAuth = async (req, res, next) => {
    //get headers from the request
    const auth = req.headers.authorization

    //if no headers found
    if(!auth)
        return res.status(401).json({error: 'Authorization token required!'})

    //get token from the headers: bearer part1.part2.part3
    const token = auth.split(' ')[1]

    try{
        //verify if token is valid
        const {_id} = jwt.verify(token, process.env.SECRET)
        //get the user id from database
        req.user =  await User.findOne({_id}).select('_id')
        console.log("connection authorized successfully :)")
        next()

    }catch(error){
        console.log(error)
        res.status(401).json({error: 'Invalid token!'})
    }
}

export default verifyAuth