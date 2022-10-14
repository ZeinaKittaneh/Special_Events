import { useState } from "react";
import useAuthContext from "./useAuthContext"
import * as api from "../api"
import axios from 'axios';

export const UseSignUp = () => {
    const [isLoading, setIsLoading] = useState(null)
    const [isError, setIsError] = useState(null)
    const userUrl = 'https://happy-memories.herokuapp.com/user';//get all posts requests in the database

    const {dispatch} = useAuthContext()

    const signup = async(email, password) => {
        setIsLoading(true)
        setIsError(false)
        
        //sending signup request to server
        // const response = await api.loginUser(JSON.stringify({email, password}))
        // fetch("api/user/signup",
        // {method: "Post",
        // headers: {"Content-Type": "application/json"},
        // body: JSON.stringify({email, password})
        // })

        await axios.post(userUrl, {"body":{email, password}}, {
            headers: {
            'Content-Type': 'application/json'
            }
          }
        ).then((response) => {
            const jsonResponse = response.json()
            //call dispatch from useAuthContext
            dispatch({type: "LOGIN", payload: jsonResponse})

            //store the user in the local storage
            localStorage.setItem(JSON.stringify({jsonResponse}))

            setIsLoading(false)
          }).catch((error) => {
            setIsError("Server Error!")
            setIsLoading(false)
          })

        // const jsonResponse = await response.json()

        // //error case
        // if(!response.ok){
        //     isError(jsonResponse.error)
        //     setIsLoading(false)
        // }

        // //success response
        // if(response.ok){
            
        // }
    }
    return {signup, isLoading, isError}
}
