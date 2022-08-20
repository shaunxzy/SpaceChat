import {child, get, ref, remove, set, update} from "firebase/database";
import {addChannel, createChannel} from "./HandleChannels"
import {auth, db} from "../firebase/customFirebase";
import {createUserWithEmailAndPassword, deleteUser, updateProfile } from "firebase/auth";
import {v4 as uuidv4} from 'uuid';

// fetch user information from real time database based on its uid
export const HandleUser = async (uid) => {
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
    // create user and sign in
    const uid = await createUserWithEmailAndPassword(auth, email, password).then(UserCredential => {
        return UserCredential.user.uid
    }).catch(e => {
        throw new Error(`failed to register user, error log is ${e}`)
    })

    // update user's display name
    await updateProfile(auth.currentUser, {displayName: name})

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

// create invitation link, register this link with current user id, together with expiration date on realtime database
export const createLinkAndRegisterHost = async () => {
    const hashValue = uuidv4()

    const user = auth.currentUser

    const currentTime = new Date()
    const timeStamp = currentTime.getTime()

    return await set(ref(db, `links/${hashValue}`), {
        host: {id: user.uid, name:user.displayName}, expiration: timeStamp
    }).then(() => hashValue).catch(e => {
        return Promise.reject(new Error(`link creation failed, error log is ${e}`))
    })

}

// firebase auth must be signed in before calling this function
export const registerGuestInvitationLink = async (link, channelType) => {

    const currentTime = new Date()

    //fetch host id from realtime database based on link '/links/...'
    await get(child(ref(db), `links/${link}`)).then(async dataSnapshot => {
        const info = dataSnapshot.val()
        if (dataSnapshot.exists() && currentTime.getTime() - info.expiration <= 60000) {
            const channelId = await createChannel()
            await addChannel(channelId, info.host.name, channelType)
        } else {
            return Promise.reject(new Error(`link ${link} has expired or does not exists`))
        }
    }).catch(e => {
        Promise.reject(new Error(`error occurs, error log is ${e}`))
    })

    // set guest id and name to links
    const guest = auth.currentUser
    return await update(ref(db, `links/${link}`), {
        guest: {id: guest.uid, name: guest.displayName}
    }).then(() => 'success').catch(e => Promise.reject(new Error(`Error occurred as ${e}`)))

}