import { getDatabase, ref, set } from "firebase/database";
import { db } from "../firebase/customFirebase";

export function UseMessage ( {usr, message} ) {

    set(ref(db, `users/${usr}`), {
        message: message
    })

    return 1;

}