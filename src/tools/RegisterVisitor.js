import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref, set } from "firebase/database";
import { db } from "../firebase/customFirebase";

async function Register(host, hostname, name, password, id) {
    console.log(`setting up at ${host}:${hostname} under the name of ${name}`);

    return await set(ref(db, `visitors/${id}`), {
        host: host, hostname: hostname, name: name, password: password, channel: {}
    }).then(
        () => true
    ).catch(e => {
        console.log(e.code)
        return false
    })
}

export const RegisterVisitor = ({ host, hostname, name, password }) => {
    const visitorId = uuidv4()

    return Register(host, hostname, name, password, visitorId).then(data => data &&
        {link: `visitor/${visitorId}`, password: password})

}