import {createContext, useReducer} from 'react';

export const authReducer = function(state, action){
    switch(action.type){
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const authContext = createContext();

//a function that calls checking of the action type (reducer actions: login, logout)
//and returns the context provider
export const AuthContextProvider = function({children}){
    //in my reducer I combine all actions/states that I have in my context
    const [state, dispatch] = useReducer(authReducer, {user: null})

    console.log("current state", state)

    return(
        //this context provider will wrap the App component, the children components are the components inside the App
        <authContext.Provider value={{...state, dispatch}}>
            {children}
        </authContext.Provider>
    )
}



