import { authContext } from "../contexts/AuthContext";
import{useContext} from 'react'

const useAuthContext = () => {
    const context = useContext(authContext)

    if(!context){
        throw Error("useAuthContext can only be used from"
        + " the authContextProvider")
    }
    return context
}

export default useAuthContext