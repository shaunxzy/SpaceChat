import {v4 as uuidv4} from 'uuid';
import {child, get, getDatabase, ref, set} from "firebase/database";
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
            console.log(`user ${user1} not found`)
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