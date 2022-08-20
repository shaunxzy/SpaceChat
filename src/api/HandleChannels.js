import {v4 as uuidv4} from 'uuid';
import {child, get, remove, ref, set} from "firebase/database";
import { db, auth } from "../firebase/customFirebase";
import {LoadChannel, LoadMessage} from "./LoadInfo";


export const createChannel = async () => {
    const channelId = uuidv4()
    return await set(ref(db, `channel/${channelId}`), {
        id: channelId
    }).then(snapshot => {
        console.log(`channel ${channelId} created`)
        return channelId
    })
        .catch(error => Promise.reject(error))
}

export const deleteChannel = async (channelId) => {
    return await remove(ref(db,
        `channel/${channelId}`))
        .then(snapshot => `channel ${channelId} removed`)
        .catch(error =>
        Promise.reject(error))
}

// add a specific channel to a user folder
export const addChannel = async (channelId, channelName, channelType) => {
    const objTime = new Date()

    const userId = auth.currentUser.uid

    console.log(userId)

    if (channelType === 'singular') {
        return await set(ref(db, `users/${userId}/channel/singular/${channelName}`),
            {channelId, name:channelName, timeStamp: objTime.getTime()})
            .then(data => true)
            .catch(error => Promise.reject(error))
    } else if (channelType === 'multiple') {
        return await set(ref(db, `users/${userId}/channel/multiple/${channelName}`),
            {channelId, name:channelName, timeStamp: objTime.getTime()})
            .then(data => true).catch(error => Promise.reject(error))
    } else {
        Promise.reject(new Error(`expect channelType to be either singular or multiple, received ${channelType}`))
    }
}

// fetch a list of channels from a user folder
export const fetchChannels = async (channelType) => {
    const userId = auth.currentUser.uid

    if (channelType === 'singular') {
        return await get(child(ref(db), `users/${userId}/channel/singular`))
            .then(snapshot => {
                if (snapshot.exists()) {
                    const ChannelString = snapshot.val();
                    return LoadChannel(ChannelString);
                } else {
                    return Promise.reject(new Error('no such channel'))
                }
            })
            .catch(error => Promise.reject(error.message))
    } else if (channelType === 'multiple') {
        return await get(child(ref(db), `users/${userId}/channel/multiple`))
            .then(snapshot => {
                if (snapshot.exists()) {
                    const ChannelString = snapshot.val();
                    return LoadChannel(ChannelString);
                } else {
                    return Promise.reject(new Error('no such channel'))
                }
            })
            .catch(error => Promise.reject(error.message))
    } else {
        Promise.reject(new Error(`expect channelType to be either singular or multiple, received ${channelType}`))
    }
}