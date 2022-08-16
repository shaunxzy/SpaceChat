import {createContext} from "react";

const AuthContext = createContext({
    user: {},
    visitor: {},
    loginVisitor: () => {},
    signup: ()=>{},
    login: ()=>{},
    finishTutorial: () => {},
    getAvatar: () => {}
})

export default AuthContext;