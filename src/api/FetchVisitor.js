import {child, get, ref} from "firebase/database";
import {db} from "../firebase/customFirebase";


export const FetchVisitor = async (pathWay) => {
    return await get(child(ref(db), pathWay)).then(snapshot => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("no such visitor")
            return undefined
        }
    }).catch(e => {
        console.log("error")
    })
}