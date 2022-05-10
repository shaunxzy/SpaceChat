import {createContext} from "react";

const AuthContext = createContext({
    currentUser: '',
    signup: ()=>{},
    login: ()=>{}
})

export default AuthContext;