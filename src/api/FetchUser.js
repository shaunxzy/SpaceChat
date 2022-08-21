import {child, get, ref, remove, set} from "firebase/database";
import {auth, db} from "../firebase/customFirebase";
import {createUserWithEmailAndPassword, deleteUser, updateProfile, signInWithEmailAndPassword} from "firebase/auth";

// fetch user information from real time database based on its uid
export const FetchUser = async (uid) => {
    return await get(child(ref(db), `user/${uid}`)).then(snapshot => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return Promise.reject(new Error(`no such user ${uid}`))
        }
    })
}

export const SetUser = async (userInfo) => {
    return await set(ref(db, `users/${userInfo.uid}`), {...userInfo})
        .then(success => {
        return true
    }).catch(e => {
        return Promise.reject(new Error(`failed to set user on database, error log is ${e.message}`))
    })
}

//create a new user and sign in
export const CreateUser = async ( {email, password, name} ) => {
    const uid = await createUserWithEmailAndPassword(auth, email, password).then(UserCredential => {
        return UserCredential.user.uid
    }).catch(e => {
        throw new Error(`failed to register user, error log is ${e}`)
    })

    const userInfo = {
        uid: uid,
        username: name,
        channels: {
            singular: {},
            multiple: {}
        },
        firstUse: true
    }

    return SetUser(userInfo)
}

export const deleteUserAuthFirebase = async () => {
    const usr = auth.currentUser
    const uid = usr.uid

    //console.log(usr.uid)

    await remove(ref(db, `users/${uid}`)).catch(e => Promise.reject(e))

    return await deleteUser(usr).then(() => true).catch(e => Promise.reject(e))
}