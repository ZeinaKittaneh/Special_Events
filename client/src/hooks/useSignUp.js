import { useState } from "react";
import useAuthContext from "./useAuthContext"
import * as api from "../api"
import axios from 'axios';

export const UseSignUp = () => {
    const [isLoading, setIsLoading] = useState(null)
    const [isError, setIsError] = useState(null)
    const userUrl = '/user';//get all users requests in the database

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

        await axios.post(userUrl + "/signup", JSON.stringify({"email": email, "password": password}), {
            headers: {
            'Content-Type': 'application/json'
            }
          }
        ).then((response) => {
            // const jsonResponse = response.json()
            //call dispatch from useAuthContext
            dispatch({type: "LOGIN", payload: response})

            //store the user in the local storage
            localStorage.setItem('user', JSON.stringify(response.data))

            setIsLoading(false)
          }).catch((error) => {
            console.log("received payload sent not working: email: ", email + ", pass:" + password)

            console.log(error)
            if(error.response != null)
              setIsError(error.response.data.error)
            else
              setIsError("Error while sending data!")
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
