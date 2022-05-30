import { getDatabase, ref, set } from "firebase/database";
import { db } from "../firebase/customFirebase";

export async function UseMessage ( {user, channel, message, time} ) {

    console.log(`setting at channel/${channel}`)

    await set(ref(db, `channel/${channel}/${time}`), {
        message: message, name: user
    }).then(promise => {
        console.log(`add message to channel/${channel}/${time}`)
        }
    )

    return 1;

}