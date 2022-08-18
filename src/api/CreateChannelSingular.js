import {v4 as uuidv4} from 'uuid';
import {child, get, remove, ref, set} from "firebase/database";
import { db } from "../firebase/customFirebase";

//write channelId in user's contact book
const WriteChannel = async (channelId, user1, user2, name) => {
    return await get(child(ref(db), user1)).then(snapshot => {
        if (!snapshot.exists()) {
            set(ref(db, user2), {
                channelId, name
            }).then(data => {
                console.log("channel set up success", data);
                return data
            })
        } else {
            return Promise.reject(new Error('no such user'))
        }
    })

    /*
    set(ref(db, `users/${user1}/channels/singular/${user2}`), {
        channelId: channelId
    }).then(data => {
        console.log("channel set up success");
    })
     */
}

//user1 and user2 are ids.
export const CreateChannelSingular = async (user1, name1, user2, name2) => {
    const channelId = uuidv4()


    WriteChannel(channelId, user1, user2, name2).then(data => console.log(`user1: ${data}`));



    return await WriteChannel(channelId, user2, user1, name1);
}

export const createChannel = async (channelId) => {
    return await set(ref(db, `channel/${channelId}`), {
        id: channelId
    }).then(snapshot => `channel ${channelId} created`)
        .catch(error => Promise.reject(error.message))
}

export const deleteChannel = async (channelId) => {
    return await remove(ref(db,
        `channel/${channelId}`))
        .then(snapshot => `channel ${channelId} removed`)
        .catch(error =>
        Promise.reject(error.message))
}

export const addChannel = async (userId, info, channelType) => {
    if (channelType === 'singular') {
        return await set(ref(db, `users/${userId}/channel/singular`), { ...info })
            .then(data => true)
            .catch(error => Promise.reject(error.message))
    } else if (channelType === 'multiple') {
        return await set(ref(db, `users/${userId}/channel/multiple`), {...info})
            .then(data => true).catch(error => Promise.reject(error.message))
    } else {
        Promise.reject(new Error(`expect channelType to be either singular or multiple, received ${channelType}`))
    }
}