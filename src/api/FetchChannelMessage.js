import {child, get, ref} from "firebase/database";
import {LoadMessage} from "./LoadInfo";
import { db } from "../firebase/customFirebase";


export const FetchChannelMessage = async (channelId) => {

    return await get(child(ref(db), `channel/${channelId}`)).then(snapshot => {
        if (snapshot.exists()) {
            const messageString = snapshot.val();
            return LoadMessage(messageString);
        } else {
            return Promise.reject(new Error('no such channel'))
        }
    })
}

/*
export const FetchMessage = ({user, type, channel}) => {

    return get(child(ref(db), channel)).then(snapshot => {
        if (snapshot.exists()) {

            const messageString = snapshot.val();
            return LoadInfo(messageString);

        } else {
            console.log("No data available")
        }
    }).catch(e => {
        console.error(e);
    })

}
*/