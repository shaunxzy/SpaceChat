import { storage } from "../../firebase/customFirebase";
import { connectStorageEmulator, deleteObject, getBytes, ref, uploadBytes } from "firebase/storage";
import { getAvatarURL, uploadAvatar } from "../../api/Avatar";

connectStorageEmulator(storage, "127.0.0.1", 9199);


it("can upload file to firebase storage", async () => {
    const buffer = new Uint8Array([1, 1, 1, 1, 1, 1]);
    const result = await uploadBytes(
        ref(storage, "test/hello"),
        buffer,
        { contentType: "plain/text" });
    // console.log(result);
    expect(result.metadata.size).toBe(6);
});

it("gets an URL of an uploaded avatar", async () => {
    const uid = "asdfghjkl";

    await uploadBytes(
        ref(storage, `avatar/uploaded/${uid}`),
        new Uint8Array([1, 1, 1, 1]),
        { contentType: "image/png" }
    );

    const url = await getAvatarURL(uid);
    // console.log(url);
    expect(url).toContain(`avatar%2Fuploaded%2F${uid}`);
});

it("gets an URL of default avatar if no uploaded", async () => {
    const uid = "non-existing-uid";

    await uploadBytes(
        ref(storage, `/avatar/shared/thiscatdoesnotexist-1.com.jpeg`),
        new Uint8Array([1, 1, 1, 1]),
        { contentType: "image/png" }
    );

    const url = await getAvatarURL(uid);
    // console.log(url);
    expect(url).toContain("avatar%2Fshared%2Fthiscatdoesnotexist-1.com.jpeg");
});

it("uploads avatar", async () => {
    const uid = "uploaded_avatar";

    await uploadAvatar(uid, new Uint8Array([1, 1, 1, 1]));

    const rAvatar = ref(storage, `avatar/uploaded/${uid}`);
    const downloaded = await getBytes(rAvatar);
    // console.log(downloaded);
    expect(downloaded.byteLength).toBe(4);

    await deleteObject(rAvatar);
});