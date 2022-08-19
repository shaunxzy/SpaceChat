const { initializeApp } = require('firebase/app')
const { uploadBytes, ref, uploadString, getStorage, connectStorageEmulator } = require("firebase/storage")

const config = {
    firebaseConfig: {
        apiKey: "AIzaSyAlQsYzTiE3txQTVBR2bvYzmmECURJjSjM",
        authDomain: "project-480cb.firebaseapp.com",
        databaseURL: "https://project-480cb-default-rtdb.firebaseio.com",
        projectId: "project-480cb",
        storageBucket: "project-480cb.appspot.com",
        messagingSenderId: "445657898125",
        appId: "1:445657898125:web:ba81ec887fc4bfa9c396c4",
        measurementId: "G-YM01K5GLQP"
    }
}


const app = initializeApp(config.firebaseConfig)

const message2 = '5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';

const storage = getStorage()

connectStorageEmulator(storage, 'localhost', 9199)

const mockUpload = async () => {
    return await uploadString(ref(storage, 'someChild'), message2, 'base64').then((snapshot) => {
        return 'Uploaded a base64 string!';
    }).catch(e => {
        return Promise.reject(new Error(e))
    });
}

test('carefully test if storage can be used', async () => {
    await expect(mockUpload()).resolves.toBe('Uploaded a base64 string!')
})