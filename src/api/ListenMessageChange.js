import { db } from "../firebase/customFirebase"
import { ref, onChildAdded } from "firebase/database"

export const ListenMessageChange = (book) => {
    const dbRef = ref(db, book);

}