import {child, get, ref} from "firebase/database";
import {db} from "../firebase/customFirebase";

export const FetchChannelId = async (pathWay) => {
    return await get(child(ref(db), pathWay)).then(snapshot => {
        if (snapshot.exists()) {
            const channel = snapshot.val();
            console.log(channel)
            return channel;
        } else {
            console.log("no such Channel")
            return undefined
        }
    })
}