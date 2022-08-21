import { getBlob, getDownloadURL, list, ref, uploadBytes } from "firebase/storage";
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

export async function getSharedAvatarURLs() {
    const refShared = ref(storage, '/avatar/shared/');
    const avatarRefs = await list(refShared, { maxResults: 100 });
    const avatarURLs = await Promise.all(
        avatarRefs.items.map(async (ref) => {
            return { ref, url: await getDownloadURL(ref) };
        })
    );
    return avatarURLs;
}

export async function uploadAvatar(uid, image) {
    const refAvatar = ref(storage, `/avatar/uploaded/${uid}`);
    await uploadBytes(refAvatar, image);
    // upload done if no error raised
}

export async function selectFromDefaultAvatar(uid, avatarRef) {
    const selectedImage = await getBlob(avatarRef);
    await uploadAvatar(uid, selectedImage);
}