import {child, get, ref} from "firebase/database";
import {db} from "../firebase/customFirebase";
import {LoadChannel} from "./LoadInfo";

export const FetchChannel = async (pathWay) => {
    return await get(child(ref(db), pathWay)).then(snapshot => {
        if (snapshot.exists()) {
            const ChannelString = snapshot.val();
            //console.log(`fetching channels from ${pathWay}`)
            //console.log(ChannelString)
            return LoadChannel(ChannelString);
        } else {
            console.log("no channels found")
            return []
        }
    })
}