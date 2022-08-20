import {auth, db} from "../firebase/customFirebase"
import { ref, set } from "firebase/database"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {useContext, useEffect, useState} from "react";
import AuthContext from "./AuthContext";
import {FetchVisitor} from "../api/FetchVisitor";
import {HandleUser} from "../api/HandleUser";

export function useAuth() {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [currentVisitor, setCurrentVisitor] = useState(JSON.parse(localStorage.getItem("visitor")))


    async function signup(email, password, name) {
        //console.log(email, password)
        //setCurrentUser({email: email, password: password});
        return await createUserWithEmailAndPassword(auth, email, password).then(UserCredential => {
            const user = UserCredential.user;
            const userInfo = {
                uid: user.uid,
                username: name,
                email: email,
                password: password,
                channels: {
                    singular: {}
                },
                firstUse: true
            }

            setCurrentUser(userInfo);

            set(ref(db, `users/${user.uid}`), userInfo).then(ip => {
                localStorage.setItem("user", JSON.stringify(userInfo));
                console.log(ip);
            }).catch(e => {
                console.error(e)
            })

            console.log(currentUser)

            return user.uid
        })
    }

    async function login(email, password) {

        return await signInWithEmailAndPassword(auth, email, password).then(UserCredential => {
            const user = UserCredential.user;

            HandleUser(user.uid).then(userInfo => {
                if (userInfo !== undefined) {
                    setCurrentUser(userInfo);
                    localStorage.setItem("user", JSON.stringify(userInfo));
                }
            })

            return user.uid;
        }).catch(() => {
            alert("login failed, please check your email address and password");
            return undefined
        })
    }

    async function visitorLogin({ id, password }) {
        return await FetchVisitor(`visitors/${id}`).then(visitor => {
            if (visitor !== undefined) {
                if(visitor.password === password) {
                    setCurrentVisitor(visitor)
                    localStorage.setItem("visitor", JSON.stringify(visitor));
                    return visitor
                } else {
                    console.log("password incorrect")
                    localStorage.setItem("user", "");
                    return undefined
                }
            }
        })
    }

    async function finishTut({ id }) {
        console.log(`${id} finished tutorial`)
        return await set(ref(db, `users/${id}/firstUse`), false).then(() => {
            setCurrentUser(prev => {return {...prev, firstUse: false}});
            localStorage.setItem("user", JSON.stringify({...currentUser, firstUse: false}));
        })
    }

    useEffect(() => {
        //console.log('render')
        const unsubscribe = auth.onAuthStateChanged(user => {
            HandleUser(user.uid).then(userInfo => {
                if (userInfo !== undefined) {
                    setCurrentUser(userInfo);
                    localStorage.setItem("user", JSON.stringify(userInfo));
                }
            })
        })

        return () => {unsubscribe()}
    }, [])

    const value = {
        user: currentUser,
        visitor: currentVisitor,
        loginVisitor: visitorLogin,
        signup: signup,
        login: login,
        finishTutorial: finishTut,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
