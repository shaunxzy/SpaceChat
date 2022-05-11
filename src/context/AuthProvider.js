import {auth, db} from "../firebase/customFirebase"
import { ref, set } from "firebase/database"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {useNavigate} from "react-router-dom";

export function useAuth() {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const navigate = useNavigate();

    function signup(email, password) {
        //console.log(email, password)
        //setCurrentUser({email: email, password: password});
        createUserWithEmailAndPassword(auth, email, password).then(UserCredential => {
            const user = UserCredential.user;
            try {
                set(ref(db, `users/${user.uid}`), {
                    uid: user.uid,
                    username: email,
                    password: password,
                    channels: {
                        singular: {},
                        mutilple: {}
                    }
                }).then(ip => {
                    console.log(ip);
                })
            } catch (error) {
                console.error(error)
            }
        })
    }

    function login(email, password) {
        //console.log("logging")
        try{
            signInWithEmailAndPassword(auth, email, password).then(UserCredential => {
                const user = UserCredential.user;

                return user.uid;
            })
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        //console.log('render')
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })

        return () => {unsubscribe()}
    }, [])

    const value = {
        currentUser: currentUser,
        signup: signup,
        login: login
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
