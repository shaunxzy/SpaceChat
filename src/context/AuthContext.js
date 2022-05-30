import {createContext} from "react";

const AuthContext = createContext({
    user: {},
    visitor: {},
    loginVisitor: () => {},
    signup: ()=>{},
    login: ()=>{}
})

export default AuthContext;