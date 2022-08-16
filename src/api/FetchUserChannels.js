import {child, get, ref} from "firebase/database";
import {db} from "../firebase/customFirebase";
import {LoadChannel} from "./LoadInfo";

// fetch channels stored under a user
export const FetchUserChannels = async (userId) => {
    return await get(child(ref(db), userId)).then(snapshot => {
        if (snapshot.exists()) {
            const ChannelString = snapshot.val();
            //console.log(`fetching channels from ${pathWay}`)
            //console.log(ChannelString)
            return LoadChannel(ChannelString);
        } else {
            return Promise.reject('no channel found')
        }
    })
}
