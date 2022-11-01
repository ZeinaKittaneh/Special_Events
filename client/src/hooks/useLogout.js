import useAuthContext from "./useAuthContext";
import {useDispatch} from 'react-redux';
import { RESET } from "../constants/actionTypes";

export const useLogout = () => {
    const {dispatch} = useAuthContext();
    const dispatchAction = useDispatch();

    const logout = () =>{
        console.log("calling logout")
        localStorage.removeItem('user')
        window.localStorage.clear();
        dispatch({type: "LOGOUT"})
        dispatchAction({type: RESET});
    }
    return {logout}
}
