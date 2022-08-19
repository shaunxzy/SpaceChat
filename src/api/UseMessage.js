import { ref, set } from "firebase/database";
import { db } from "../firebase/customFirebase";

export async function UseMessage ( {user, channel, message, time, userId, friendId} ) {

    const objTime = new Date(time)

    console.log(objTime.getTime())

    await set(ref(db, `channel/${channel}/${time}`), {
        message: message, name: user
    }).then(() => {
        console.log(`add message to channel/${channel}/${time}`)
        }
    )


    await set(ref(db, `users/${userId}/channels/singular/${friendId}`), {
        timeStamp: objTime.getTime()
    }).then(() => {
        console.log(`channel ${friendId} updated`)
    })

    return 1;

}