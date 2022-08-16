import {child, get, ref} from "firebase/database";
import {LoadMessage} from "./LoadInfo";
import { db } from "../firebase/customFirebase";


export const FetchMessage = async (pathWay) => {

    return await get(child(ref(db), pathWay)).then(snapshot => {
        if (snapshot.exists()) {
            const messageString = snapshot.val();
            return LoadMessage(messageString);
        } else {
            console.log(`no message in this channel ${pathWay}`)
            return []
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