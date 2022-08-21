import {v4 as uuidv4} from 'uuid';
import {child, get, remove, ref, set} from "firebase/database";
import { db } from "../firebase/customFirebase";
import {LoadChannel, LoadMessage} from "./LoadInfo";

//write channelId in user's contact book
// channel type can only be 'singular' or 'multiple'
const SetChannel = async (user, channelId, channelName, channelType) => {
    if (channelType === 'singular') {

    } else if (channelType === '') {

    }

    /*
    set(ref(db, `users/${user1}/channels/singular/${user2}`), {
        channelId: channelId
    }).then(data => {
        console.log("channel set up success");
    })
     */
}

//user1 and user2 are ids.
export const HandleChannels = async (user1, name1, user2, name2) => {
    const channelId = uuidv4()


    SetChannel(channelId, user1, user2, name2).then(data => console.log(`user1: ${data}`));



    return await SetChannel(channelId, user2, user1, name1);
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

export const addChannel = async (userId, channelId, channelName, channelType) => {
    const objTime = new Date()

    if (channelType === 'singular') {
        return await set(ref(db, `users/${userId}/channel/singular/${channelName}`),
            {channelId, name:channelName, timeStamp: objTime.getTime()})
            .then(data => true)
            .catch(error => Promise.reject(error.message))
    } else if (channelType === 'multiple') {
        return await set(ref(db, `users/${userId}/channel/multiple/${channelName}`),
            {channelId, name:channelName, timeStamp: objTime.getTime()})
            .then(data => true).catch(error => Promise.reject(error.message))
    } else {
        Promise.reject(new Error(`expect channelType to be either singular or multiple, received ${channelType}`))
    }
}

export const fetchChannels = async (userId, channelType) => {
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