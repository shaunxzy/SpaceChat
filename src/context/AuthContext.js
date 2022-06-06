import {createContext} from "react";

const AuthContext = createContext({
    user: {},
    visitor: {},
    loginVisitor: () => {},
    signup: ()=>{},
    login: ()=>{},
    finishTutorial: () => {}
})

export default AuthContext;