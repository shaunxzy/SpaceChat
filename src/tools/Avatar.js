import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/customFirebase";

export async function getAvatarURL(uid) {
    const refUploaded = ref(storage, `/avatar/uploaded/${uid}`);
    try {
        const url = await getDownloadURL(refUploaded);
        return url;
    } catch (avatarFetchError) {
        console.log("custom avatar not found or error");
    }

    let refDefault = ref(storage, "/avatar/shared/thiscatdoesnotexist-1.com.jpeg");
    const url = await getDownloadURL(refDefault);
    return url;
};

export async function uploadAvatar(uid, image) {
    const refAvatar = ref(storage, `/avatar/uploaded/${uid}`);
    await uploadBytes(refAvatar, image);
    // upload done if no error raised
}